"use client"

import { useState } from "react"
import AdminHeader from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ShoppingBag, MessageSquare, TrendingUp, Users, Search, Eye, Edit, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Initial data
const initialProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones with Noise Cancellation",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    status: "active" as const,
    inquiries: 12,
    description: "High-quality wireless headphones with active noise cancellation technology",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Smart Fitness Watch with Heart Rate Monitor",
    category: "Wearables",
    price: 149.99,
    stock: 0,
    status: "out_of_stock" as const,
    inquiries: 8,
    description: "Advanced fitness tracking with heart rate monitoring and GPS",
    createdAt: "2024-01-08",
  },
  {
    id: 3,
    name: "Gaming Mechanical Keyboard RGB Backlit",
    category: "Gaming",
    price: 129.99,
    stock: 23,
    status: "active" as const,
    inquiries: 15,
    description: "Mechanical keyboard with RGB backlighting for gaming enthusiasts",
    createdAt: "2024-01-05",
  },
]

const initialInquiries = [
  {
    id: 1,
    productId: 1,
    productName: "Premium Wireless Headphones with Noise Cancellation",
    customerName: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    message: "Interested in bulk purchase for office use. Can you provide a discount for 50+ units?",
    date: "2024-01-15",
    status: "pending" as const,
  },
  {
    id: 2,
    productId: 2,
    productName: "Smart Fitness Watch with Heart Rate Monitor",
    customerName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8901",
    message: "Need more details about battery life and water resistance rating.",
    date: "2024-01-14",
    status: "responded" as const,
  },
  {
    id: 3,
    productId: 3,
    productName: "Gaming Mechanical Keyboard RGB Backlit",
    customerName: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 234 567 8902",
    message: "When will this be back in stock? I need it for my gaming setup.",
    date: "2024-01-13",
    status: "pending" as const,
  },
]

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: "active" | "out_of_stock"
  inquiries: number
  description: string
  createdAt: string
}

type Inquiry = {
  id: number
  productId: number
  productName: string
  customerName: string
  email: string
  phone: string
  message: string
  date: string
  status: "pending" | "responded"
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  })
  const { toast } = useToast()

  // Calculate stats dynamically
  const stats = [
    {
      title: "Total Products",
      value: products.length.toString(),
      change: "+12%",
      icon: ShoppingBag,
      color: "text-blue-600",
    },
    {
      title: "Product Inquiries",
      value: inquiries.length.toString(),
      change: "+23%",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Pending Inquiries",
      value: inquiries.filter((inq) => inq.status === "pending").length.toString(),
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Active Products",
      value: products.filter((p) => p.status === "active").length.toString(),
      change: "+15%",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "responded":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const resetProductForm = () => {
    setNewProduct({ name: "", category: "", price: "", stock: "", description: "" })
  }

  const openAddProductDialog = () => {
    console.log("Opening add product dialog")
    resetProductForm()
    setIsAddProductOpen(true)
  }

  const closeAddProductDialog = () => {
    console.log("Closing add product dialog")
    resetProductForm()
    setIsAddProductOpen(false)
  }

  const handleAddProduct = () => {
    console.log("Add product function called", newProduct)

    // Validation
    if (!newProduct.name.trim()) {
      toast({
        title: "Error",
        description: "Product name is required",
        variant: "destructive",
      })
      return
    }

    if (!newProduct.category) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      })
      return
    }

    const priceNum = Number.parseFloat(newProduct.price)
    if (!newProduct.price || isNaN(priceNum) || priceNum <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      })
      return
    }

    const stockNum = Number.parseInt(newProduct.stock)
    if (!newProduct.stock || isNaN(stockNum) || stockNum < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid stock quantity",
        variant: "destructive",
      })
      return
    }

    if (!newProduct.description.trim()) {
      toast({
        title: "Error",
        description: "Product description is required",
        variant: "destructive",
      })
      return
    }

    // Create new product
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1

    const product: Product = {
      id: newId,
      name: newProduct.name.trim(),
      category: newProduct.category,
      price: priceNum,
      stock: stockNum,
      status: stockNum > 0 ? "active" : "out_of_stock",
      inquiries: 0,
      description: newProduct.description.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    console.log("Creating product:", product)

    // Update products list
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, product]
      console.log("Updated products list:", updatedProducts)
      return updatedProducts
    })

    // Close dialog and reset form
    closeAddProductDialog()

    // Show success message
    toast({
      title: "Success",
      description: "Product added successfully",
    })
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
    })
    setIsEditProductOpen(true)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    // Same validation as add product
    if (!newProduct.name.trim()) {
      toast({
        title: "Error",
        description: "Product name is required",
        variant: "destructive",
      })
      return
    }

    if (!newProduct.category) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      })
      return
    }

    const priceNum = Number.parseFloat(newProduct.price)
    if (!newProduct.price || isNaN(priceNum) || priceNum <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      })
      return
    }

    const stockNum = Number.parseInt(newProduct.stock)
    if (!newProduct.stock || isNaN(stockNum) || stockNum < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid stock quantity",
        variant: "destructive",
      })
      return
    }

    if (!newProduct.description.trim()) {
      toast({
        title: "Error",
        description: "Product description is required",
        variant: "destructive",
      })
      return
    }

    const updatedProduct: Product = {
      ...editingProduct,
      name: newProduct.name.trim(),
      category: newProduct.category,
      price: priceNum,
      stock: stockNum,
      status: stockNum > 0 ? "active" : "out_of_stock",
      description: newProduct.description.trim(),
    }

    setProducts(products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)))
    resetProductForm()
    setIsEditProductOpen(false)
    setEditingProduct(null)
    toast({
      title: "Success",
      description: "Product updated successfully",
    })
  }

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
      setInquiries(inquiries.filter((inq) => inq.productId !== id))
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    }
  }

  const handleUpdateInquiryStatus = (id: number, status: "pending" | "responded") => {
    setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)))
    toast({
      title: "Success",
      description: `Inquiry marked as ${status}`,
    })
  }

  const handleDeleteInquiry = (id: number) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      setInquiries(inquiries.filter((inq) => inq.id !== id))
      toast({
        title: "Success",
        description: "Inquiry deleted successfully",
      })
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || product.status === statusFilter),
  )

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      (inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || inquiry.status === statusFilter),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your products and customer inquiries</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
          {["overview", "products", "inquiries"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              className={activeTab === tab ? "bg-purple-600 text-white hover:bg-purple-700" : ""}
              onClick={() => {
                setActiveTab(tab)
                setSearchTerm("")
                setStatusFilter("all")
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-purple-600">Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inquiries.slice(0, 5).map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{inquiry.customerName}</p>
                          <p className="text-sm text-gray-600 truncate max-w-48">{inquiry.productName}</p>
                          <p className="text-xs text-gray-500">{inquiry.date}</p>
                        </div>
                        <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-purple-600">Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products
                      .sort((a, b) => b.inquiries - a.inquiries)
                      .slice(0, 5)
                      .map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium truncate max-w-48">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.inquiries} inquiries</p>
                          </div>
                          <span className="font-bold text-purple-600">${product.price}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>

                {/* Simple button approach */}
                <Button onClick={openAddProductDialog} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>

            {/* Add Product Dialog */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add New Product</h2>
                    <Button variant="ghost" size="sm" onClick={closeAddProductDialog}>
                      ×
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Enter product name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Wearables">Wearables</SelectItem>
                          <SelectItem value="Gaming">Gaming</SelectItem>
                          <SelectItem value="Photography">Photography</SelectItem>
                          <SelectItem value="Furniture">Furniture</SelectItem>
                          <SelectItem value="Audio">Audio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="Enter price"
                      />
                    </div>

                    <div>
                      <Label htmlFor="stock">Stock *</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        placeholder="Enter stock quantity"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Enter product description"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleAddProduct} className="flex-1 bg-purple-600 hover:bg-purple-700">
                        Add Product
                      </Button>
                      <Button variant="outline" onClick={closeAddProductDialog}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Product Dialog */}
            <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Product Name *</Label>
                    <Input
                      id="edit-name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category">Category *</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Wearables">Wearables</SelectItem>
                        <SelectItem value="Gaming">Gaming</SelectItem>
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-price">Price *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-stock">Stock *</Label>
                    <Input
                      id="edit-stock"
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="Enter stock quantity"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description *</Label>
                    <Textarea
                      id="edit-description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Enter product description"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateProduct} className="flex-1 bg-purple-600 hover:bg-purple-700">
                      Update Product
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        resetProductForm()
                        setIsEditProductOpen(false)
                        setEditingProduct(null)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4 font-medium">Product</th>
                        <th className="text-left p-4 font-medium">Category</th>
                        <th className="text-left p-4 font-medium">Price</th>
                        <th className="text-left p-4 font-medium">Stock</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Inquiries</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-t">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500 truncate max-w-xs">{product.description}</p>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600">{product.category}</td>
                          <td className="p-4 font-medium">${product.price.toFixed(2)}</td>
                          <td className="p-4">{product.stock}</td>
                          <td className="p-4">
                            <Badge className={getStatusColor(product.status)}>{product.status.replace("_", " ")}</Badge>
                          </td>
                          <td className="p-4">{product.inquiries}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" title="View">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleEditProduct(product)} title="Edit">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteProduct(product.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No products found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredInquiries.length === 0 ? (
                <Card className="border-0 shadow-md">
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
                    <p className="text-gray-600">No inquiries match your current search and filter criteria.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <Card key={inquiry.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-semibold text-lg">{inquiry.customerName}</h3>
                            <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p>
                              <strong className="text-gray-700">Product:</strong>{" "}
                              <span className="text-gray-600">{inquiry.productName}</span>
                            </p>
                            <p>
                              <strong className="text-gray-700">Email:</strong>{" "}
                              <span className="text-gray-600">{inquiry.email}</span>
                            </p>
                            <p>
                              <strong className="text-gray-700">Phone:</strong>{" "}
                              <span className="text-gray-600">{inquiry.phone}</span>
                            </p>
                            <p>
                              <strong className="text-gray-700">Date:</strong>{" "}
                              <span className="text-gray-600">{inquiry.date}</span>
                            </p>
                          </div>
                          <div className="mt-3">
                            <p className="text-sm">
                              <strong className="text-gray-700">Message:</strong>
                            </p>
                            <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-3 rounded-lg">{inquiry.message}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 lg:items-end">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleUpdateInquiryStatus(
                                  inquiry.id,
                                  inquiry.status === "pending" ? "responded" : "pending",
                                )
                              }
                            >
                              {inquiry.status === "pending" ? "Mark Responded" : "Mark Pending"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Contact Customer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
