#!/usr/bin/env node
// Transform AC reports: copy data from input Excel into the Sample-Output.xlsx template without changing formatting.

import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import xlsx from "xlsx"
import XlsxPopulate from "xlsx-populate"

/** Resolve path relative to project root */
function resolveFromRoot(relativePath) {
  return path.resolve(process.cwd(), relativePath)
}

/** Simple arg parsing: --input, --template, --out */
function parseArgs(argv) {
  const args = { input: undefined, template: undefined, out: undefined }
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i]
    const next = argv[i + 1]
    if (arg === "--input" && next) {
      args.input = next
      i++
    } else if (arg === "--template" && next) {
      args.template = next
      i++
    } else if (arg === "--out" && next) {
      args.out = next
      i++
    }
  }
  return args
}

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.R_OK)
    return true
  } catch {
    return false
  }
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/** Detect the header row in a sheet as the first row with >= 2 non-empty cells */
function detectHeaderRow(sheet) {
  const usedRange = sheet.usedRange()
  const startRow = usedRange.startCell().rowNumber()
  const endRow = Math.max(startRow, usedRange.endCell().rowNumber())
  const startCol = usedRange.startCell().columnNumber()
  const endCol = Math.max(startCol, usedRange.endCell().columnNumber())

  for (let r = startRow; r <= Math.min(endRow, startRow + 50); r++) {
    let nonEmpty = 0
    for (let c = startCol; c <= endCol; c++) {
      const v = sheet.cell(r, c).value()
      if (v !== null && v !== undefined && String(v).trim() !== "") nonEmpty++
    }
    if (nonEmpty >= 2) return { headerRow: r, startCol, endCol }
  }
  // fallback to first row
  return { headerRow: startRow, startCol, endCol }
}

/** Read header names from a given row */
function readHeaders(sheet, headerRow, startCol, endCol) {
  const headers = []
  for (let c = startCol; c <= endCol; c++) {
    const v = sheet.cell(headerRow, c).value()
    const name = v == null ? "" : String(v).trim()
    headers.push(name)
  }
  return headers
}

/** Build a case-insensitive header index map */
function buildHeaderIndex(headers) {
  const map = new Map()
  headers.forEach((h, idx) => {
    if (!h) return
    map.set(h.toLowerCase(), idx)
  })
  return map
}

async function main() {
  const args = parseArgs(process.argv)

  const defaultInput = "app/ac-reports/data/input/belive.xlsx"
  const defaultTemplate = "app/ac-reports/data/output/Sample-Output.xlsx"
  const defaultOut = `app/ac-reports/data/output/Output-${new Date()
    .toISOString()
    .replace(/[:.]/g, "-")}.xlsx`

  const inputPath = resolveFromRoot(args.input || defaultInput)
  const templatePath = resolveFromRoot(args.template || defaultTemplate)
  const outPath = resolveFromRoot(args.out || defaultOut)

  if (!fileExists(inputPath)) {
    console.error(`Input file not found: ${inputPath}`)
    process.exit(1)
  }
  if (!fileExists(templatePath)) {
    console.error(`Template file not found: ${templatePath}`)
    process.exit(1)
  }

  // Read input workbook (first sheet to JSON using header row as keys)
  const inputWb = xlsx.readFile(inputPath)
  const inputSheetName = inputWb.SheetNames[0]
  const inputSheet = inputWb.Sheets[inputSheetName]
  const inputRows = xlsx.utils.sheet_to_json(inputSheet, { defval: "" })

  // Load template preserving formatting
  const templateWb = await XlsxPopulate.fromFileAsync(templatePath)
  const sheet = templateWb.sheet(0)

  const { headerRow, startCol, endCol } = detectHeaderRow(sheet)
  const templateHeaders = readHeaders(sheet, headerRow, startCol, endCol)
  const outputColumnCount = templateHeaders.length

  // Build index for input by header name
  const inputHeaderRow = xlsx.utils.sheet_to_json(inputSheet, { header: 1, range: 0 })[0] || []
  const inputHeaderIdx = buildHeaderIndex(inputHeaderRow.map(h => (h == null ? "" : String(h).trim())))

  // Map each input row to output columns by matching header names (case-insensitive)
  const dataMatrix = inputRows.map(rowObj => {
    const rowArray = new Array(outputColumnCount).fill("")
    templateHeaders.forEach((outHeader, idx) => {
      const key = outHeader ? outHeader.toLowerCase() : ""
      if (!key) return
      if (inputHeaderIdx.has(key)) {
        const inputIdx = inputHeaderIdx.get(key)
        const inHeaderName = inputHeaderRow[inputIdx]
        rowArray[idx] = rowObj[inHeaderName] ?? ""
      } else {
        rowArray[idx] = ""
      }
    })
    return rowArray
  })

  // Write starting below header row
  const startRow = headerRow + 1
  const startColumn = startCol
  const endColumn = startCol + outputColumnCount - 1

  if (dataMatrix.length > 0) {
    sheet
      .range(startRow, startColumn, startRow + dataMatrix.length - 1, endColumn)
      .value(dataMatrix)
  }

  // Ensure output directory exists
  ensureDir(path.dirname(outPath))
  await templateWb.toFileAsync(outPath)

  console.log("Done. Wrote:", outPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


