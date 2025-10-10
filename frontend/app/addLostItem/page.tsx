"use client"

import { useState } from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import Image from "next/image"

export default function AddLostItem() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    email: "",
    phone: "",
    image: null as File | null
  })
  
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }))
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }))
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append('itemName', formData.itemName)
      submitData.append('description', formData.description)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      if (formData.image) {
        submitData.append('image', formData.image)
      }

      // TODO: Replace with actual API call
      console.log('Submitting lost item:', {
        itemName: formData.itemName,
        description: formData.description,
        email: formData.email,
        phone: formData.phone,
        image: formData.image?.name
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Reset form after successful submission
      setFormData({
        itemName: "",
        description: "",
        email: "",
        phone: "",
        image: null
      })
      setImagePreview(null)
      
      alert('Lost item reported successfully!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SidebarInset>
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Report Lost Item</CardTitle>
                <CardDescription>
                  Report your lost item to help others identify and return it to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Item Name */}
                  <div className="space-y-2">
                    <Label htmlFor="itemName">Item Name *</Label>
                    <Input
                      id="itemName"
                      name="itemName"
                      type="text"
                      placeholder="e.g., iPhone 14 Pro, MacBook Air, Wallet"
                      value={formData.itemName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the item, its condition, and where you last saw it..."
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Item Image</Label>
                    <div className="space-y-4">
                      {!imagePreview ? (
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                            <div className="mt-4">
                              <Label
                                htmlFor="image"
                                className="cursor-pointer"
                              >
                                <span className="mt-2 block text-sm font-medium text-muted-foreground">
                                  Click to upload an image
                                </span>
                                <span className="mt-1 block text-xs text-muted-foreground">
                                  PNG, JPG, GIF up to 10MB
                                </span>
                              </Label>
                              <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                            <Image
                              src={imagePreview}
                              alt="Item preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={removeImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          itemName: "",
                          description: "",
                          email: "",
                          phone: "",
                          image: null
                        })
                        setImagePreview(null)
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.itemName || !formData.description || !formData.email || !formData.phone}
                    >
                      {isSubmitting ? "Submitting..." : "Report Lost Item"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
