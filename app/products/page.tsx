"use client"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

// Sample product data
const allProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones with Noise Cancellation",
    price: 199.99,
    rating: 4.5,
    reviews: 1234,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch with Heart Rate Monitor",
    price: 149.99,
    rating: 4.3,
    reviews: 856,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wearables",
    inStock: true,
  },
  {
    id: "3",
    name: "Professional Camera Lens 50mm f/1.8",
    price: 299.99,
    rating: 4.8,
    reviews: 432,
    image: "/placeholder.svg?height=300&width=300",
    category: "Photography",
    inStock: false,
  },
  {
    id: "4",
    name: "Ergonomic Office Chair with Lumbar Support",
    price: 399.99,
    rating: 4.6,
    reviews: 678,
    image: "/placeholder.svg?height=300&width=300",
    category: "Furniture",
    inStock: true,
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker Waterproof",
    price: 79.99,
    rating: 4.4,
    reviews: 923,
    image: "/placeholder.svg?height=300&width=300",
    category: "Audio",
    inStock: true,
  },
  {
    id: "6",
    name: "Gaming Mechanical Keyboard RGB Backlit",
    price: 129.99,
    rating: 4.7,
    reviews: 567,
    image: "/placeholder.svg?height=300&width=300",
    category: "Gaming",
    inStock: true,
  },
  {
    id: "7",
    name: "4K Webcam for Streaming and Video Calls",
    price: 89.99,
    rating: 4.2,
    reviews: 345,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "8",
    name: "Wireless Charging Pad Fast Charge",
    price: 39.99,
    rating: 4.1,
    reviews: 789,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "9",
    name: "Professional Studio Microphone",
    price: 159.99,
    rating: 4.6,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    category: "Audio",
    inStock: true,
  },
  {
    id: "10",
    name: "Smart Home Security Camera",
    price: 119.99,
    rating: 4.3,
    reviews: 567,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "11",
    name: "Wireless Gaming Mouse RGB",
    price: 69.99,
    rating: 4.5,
    reviews: 890,
    image: "/placeholder.svg?height=300&width=300",
    category: "Gaming",
    inStock: true,
  },
  {
    id: "12",
    name: "Standing Desk Converter",
    price: 249.99,
    rating: 4.4,
    reviews: 123,
    image: "/placeholder.svg?height=300&width=300",
    category: "Furniture",
    inStock: false,
  },
]

const categories = ["All", "Electronics", "Wearables", "Photography", "Furniture", "Audio", "Gaming"]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Filter by stock status
    if (showOnlyInStock) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        case "newest":
          return Number.parseInt(b.id) - Number.parseInt(a.id)
        default:
          return 0 // featured - keep original order
      }
    })

    return sorted
  }, [searchTerm, selectedCategory, sortBy, showOnlyInStock])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category.toLowerCase())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products designed to enhance your lifestyle
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 border-2 border-purple-200 focus:border-purple-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showOnlyInStock ? "default" : "outline"}
                className={
                  showOnlyInStock
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                }
                onClick={() => setShowOnlyInStock(!showOnlyInStock)}
              >
                <Filter className="h-4 w-4 mr-2" />
                In Stock Only
              </Button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
              size="sm"
              className={
                selectedCategory === category.toLowerCase()
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              }
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {allProducts.length} products
            {selectedCategory !== "all" && (
              <span className="ml-2">
                in <span className="font-medium capitalize">{selectedCategory}</span>
              </span>
            )}
            {searchTerm && (
              <span className="ml-2">
                for "<span className="font-medium">{searchTerm}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSortBy("featured")
                setShowOnlyInStock(false)
              }}
              className="gradient-bg hover:opacity-90"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More - Only show if there are products */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="text-center">
            <Button className="gradient-bg hover:opacity-90 px-8">Load More Products</Button>
          </div>
        )}
      </div>
    </div>
  )
}
