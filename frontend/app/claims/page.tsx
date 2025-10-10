"use client"
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"

// Sample data for demonstration
const sampleClaims = [
  {
    id: 1,
    itemName: "iPhone 14 Pro",
    studentWhoFound: "John Smith",
    studentWhoOwns: "Alex Johnson",
    dateOfClaim: "2024-01-15",
  },
  {
    id: 2,
    itemName: "MacBook Air",
    studentWhoFound: "Sarah Wilson",
    studentWhoOwns: "Emma Davis",
    dateOfClaim: "2024-01-14",
  },
  {
    id: 3,
    itemName: "AirPods Pro",
    studentWhoFound: "Mike Brown",
    studentWhoOwns: "James Miller",
    dateOfClaim: "2024-01-13",
  },
  {
    id: 4,
    itemName: "Wallet",
    studentWhoFound: "Lisa Garcia",
    studentWhoOwns: "Sophia Martinez",
    dateOfClaim: "2024-01-12",
  },
  {
    id: 5,
    itemName: "Backpack",
    studentWhoFound: "David Lee",
    studentWhoOwns: "Ryan Taylor",
    dateOfClaim: "2024-01-11",
  },
]

export default function ClaimedItems() {
  const handleEdit = (id: number) => {
    console.log("Edit claim with ID:", id)
    // TODO: Implement edit functionality
  }

  const handleDelete = (id: number) => {
    console.log("Delete claim with ID:", id)
    // TODO: Implement delete functionality
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <SidebarInset>
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Claims</h1>
            <Button>Add New Claim</Button>
          </div>
          
          <div className="rounded-md border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">S.No</TableHead>
                  <TableHead className="w-[200px]">Item Name</TableHead>
                  <TableHead className="w-[180px]">Student Who Found</TableHead>
                  <TableHead className="w-[180px]">Student Who Owns</TableHead>
                  <TableHead className="w-[120px]">Date of Claim</TableHead>
                  <TableHead className="w-[120px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleClaims.map((claim, index) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{claim.itemName}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {claim.studentWhoFound}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {claim.studentWhoOwns}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(claim.dateOfClaim)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(claim.id)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(claim.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
