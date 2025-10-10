"use client"
import { useRouter } from "next/navigation"
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
import Image from "next/image"

// Sample data for demonstration
const sampleFoundItems = [
  {
    id: 1,
    itemName: "iPhone 14 Pro",
    description: "Black iPhone 14 Pro with cracked screen, found near the library",
    image: "/placeholder.jpg",
    contactInfo: {
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567"
    }
  },
  {
    id: 2,
    itemName: "MacBook Air",
    description: "Silver MacBook Air 13-inch, found in the cafeteria",
    image: "/placeholder.jpg",
    contactInfo: {
      email: "sarah.smith@email.com",
      phone: "+1 (555) 234-5678"
    }
  },
  {
    id: 3,
    itemName: "AirPods Pro",
    description: "White AirPods Pro in charging case, found in parking lot",
    image: "/placeholder.jpg",
    contactInfo: {
      email: "mike.wilson@email.com",
      phone: "+1 (555) 345-6789"
    }
  },
  {
    id: 4,
    itemName: "Wallet",
    description: "Brown leather wallet containing ID and credit cards",
    image: "/placeholder.jpg",
    contactInfo: {
      email: "lisa.brown@email.com",
      phone: "+1 (555) 456-7890"
    }
  },
  {
    id: 5,
    itemName: "Backpack",
    description: "Blue Nike backpack with laptop compartment",
    image: "/placeholder.jpg",
    contactInfo: {
      email: "david.jones@email.com",
      phone: "+1 (555) 567-8901"
    }
  },
]

export default function FoundItems() {
  const router = useRouter()

  const handleEdit = (id: number) => {
    console.log("Edit item with ID:", id)
    // TODO: Implement edit functionality
  }

  const handleDelete = (id: number) => {
    console.log("Delete item with ID:", id)
    // TODO: Implement delete functionality
  }

  const handleAddNewItem = () => {
    router.push('/addFoundItem')
  }

  return (
    <SidebarInset>
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Found Items</h1>
            <Button onClick={handleAddNewItem}>Add New Found Item</Button>
          </div>
          
          <div className="rounded-md border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">S.No</TableHead>
                  <TableHead className="w-[200px]">Item Name</TableHead>
                  <TableHead className="min-w-[300px]">Description</TableHead>
                  <TableHead className="w-[120px]">Image</TableHead>
                  <TableHead className="w-[200px]">Contact Info</TableHead>
                  <TableHead className="w-[120px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleFoundItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.itemName}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.description}
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
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{item.contactInfo.email}</div>
                        <div className="text-xs text-muted-foreground">{item.contactInfo.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item.id)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
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
