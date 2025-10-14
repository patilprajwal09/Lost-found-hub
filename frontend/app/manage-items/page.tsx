"use client"

import { useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"

// Sample data for demonstration
const sampleLostItems = [
  {
    id: 1,
    itemName: "iPhone 14 Pro",
    description: "Black iPhone 14 Pro with cracked screen, lost near the library",
    image: "/placeholder.jpg",
    status: "lost",
    contactInfo: {
      email: "alex.martin@email.com",
      phone: "+1 (555) 111-2222"
    },
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    itemName: "MacBook Air",
    description: "Silver MacBook Air 13-inch, lost in the cafeteria",
    image: "/placeholder.jpg",
    status: "lost",
    contactInfo: {
      email: "emma.taylor@email.com",
      phone: "+1 (555) 222-3333"
    },
    createdAt: "2024-01-14"
  },
  {
    id: 3,
    itemName: "AirPods Pro",
    description: "White AirPods Pro in charging case, lost in parking lot",
    image: "/placeholder.jpg",
    status: "lost",
    contactInfo: {
      email: "james.anderson@email.com",
      phone: "+1 (555) 333-4444"
    },
    createdAt: "2024-01-13"
  }
]

const sampleFoundItems = [
  {
    id: 4,
    itemName: "iPhone 14 Pro",
    description: "Black iPhone 14 Pro with cracked screen, found near the library",
    image: "/placeholder.jpg",
    status: "found",
    contactInfo: {
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567"
    },
    createdAt: "2024-01-15"
  },
  {
    id: 5,
    itemName: "MacBook Air",
    description: "Silver MacBook Air 13-inch, found in the cafeteria",
    image: "/placeholder.jpg",
    status: "found",
    contactInfo: {
      email: "sarah.smith@email.com",
      phone: "+1 (555) 234-5678"
    },
    createdAt: "2024-01-14"
  },
  {
    id: 6,
    itemName: "Wallet",
    description: "Brown leather wallet containing ID and credit cards",
    image: "/placeholder.jpg",
    status: "found",
    contactInfo: {
      email: "lisa.brown@email.com",
      phone: "+1 (555) 456-7890"
    },
    createdAt: "2024-01-12"
  }
]

export default function ManageItems() {
  const [activeTab, setActiveTab] = useState("all")

  const handleEdit = (id: number, type: string) => {
    console.log(`Edit ${type} item with ID:`, id)
    // TODO: Implement edit functionality
    // Navigate to edit page or open edit modal
  }

  const handleDelete = (id: number, type: string) => {
    console.log(`Delete ${type} item with ID:`, id)
    // TODO: Implement delete functionality
    // Show confirmation dialog and delete item
  }

  const handleView = (id: number, type: string) => {
    console.log(`View ${type} item with ID:`, id)
    // TODO: Implement view functionality
    // Navigate to item details page
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'lost':
        return <Badge variant="destructive">Lost</Badge>
      case 'found':
        return <Badge variant="default">Found</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const allItems = [...sampleLostItems, ...sampleFoundItems]

  const renderTable = (items: typeof allItems) => (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">S.No</TableHead>
            <TableHead className="w-[200px]">Item Name</TableHead>
            <TableHead className="min-w-[300px]">Description</TableHead>
            <TableHead className="w-[120px]">Image</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[120px]">Created</TableHead>
            <TableHead className="w-[150px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{item.itemName}</TableCell>
              <TableCell className="text-muted-foreground max-w-[300px]">
                <div className="truncate" title={item.description}>
                  {item.description}
                </div>
              </TableCell>
              <TableCell>
                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.itemName}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(item.status)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(item.createdAt)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleView(item.id, item.status)}
                    className="h-8 w-8"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item.id, item.status)}
                    className="h-8 w-8"
                    title="Edit Item"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id, item.status)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    title="Delete Item"
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
  )

  return (
    <SidebarInset>
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Manage Items</h1>
            <div className="flex gap-2">
              <Button variant="outline">Export Data</Button>
              <Button>Add New Item</Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Items ({allItems.length})</TabsTrigger>
              <TabsTrigger value="lost">Lost Items ({sampleLostItems.length})</TabsTrigger>
              <TabsTrigger value="found">Found Items ({sampleFoundItems.length})</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {renderTable(allItems)}
            </TabsContent>

            <TabsContent value="lost" className="mt-6">
              {renderTable(sampleLostItems)}
            </TabsContent>

            <TabsContent value="found" className="mt-6">
              {renderTable(sampleFoundItems)}
            </TabsContent>

            <TabsContent value="recent" className="mt-6">
              {renderTable(allItems.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarInset>
  )
}