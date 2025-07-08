"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Share2, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample product data (in real app, this would come from API)
const productData = {
  id: "1",
  name: "Premium Wireless Headphones with Noise Cancellation",
  price: 199.99,
  rating: 4.5,
  reviews: 1234,
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  category: "Electronics",
  inStock: true,
  description:
    "Experience premium sound quality with our advanced wireless headphones featuring active noise cancellation technology. Perfect for music lovers and professionals who demand the best audio experience.",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Premium leather ear cups",
    "Bluetooth 5.0 connectivity",
    "Quick charge technology",
    "Built-in microphone",
  ],
  specifications: {
    Brand: "PurpleShop",
    Model: "PS-WH-001",
    Weight: "250g",
    "Frequency Response": "20Hz - 20kHz",
    Impedance: "32 ohms",
    "Battery Life": "30 hours",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const { toast } = useToast()

  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Product removed from your favorites" : "Product added to your favorites",
    })
  }

  const handleShare = async () => {
    try {
      // Check if Web Share API is supported and available
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: productData.name,
          text: productData.description,
          url: window.location.href,
        }

        // Check if the data can be shared
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData)
          return
        }
      }

      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard",
      })
    } catch (error) {
      // If both sharing and clipboard fail, show manual copy option
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied!",
          description: "Product link copied to clipboard",
        })
      } catch (clipboardError) {
        // Final fallback - show the URL to user
        toast({
          title: "Share this product",
          description: "Copy this link: " + window.location.href,
        })
      }
    }
  }

  const scrollToInquiry = () => {
    const inquirySection = document.getElementById("inquiry-form")
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.phone || !inquiryForm.message) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      })
      return
    }

    // Simulate form submission
    toast({
      title: "Inquiry Sent!",
      description: "We'll get back to you within 24 hours.",
    })

    // Reset form
    setInquiryForm({ name: "", email: "", phone: "", message: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setInquiryForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={productData.images[selectedImage] || "/placeholder.svg"}
                alt={productData.name}
                width={600}
                height={600}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="flex space-x-2">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? "border-purple-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {productData.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{productData.name}</h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(productData.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  {productData.rating} ({productData.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold gradient-text">${productData.price.toFixed(2)}</span>
              </div>

              <div className="flex space-x-4 mb-6">
                <Button className="gradient-bg hover:opacity-90 flex-1" onClick={scrollToInquiry}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Inquire Now
                </Button>
                <Button variant="outline" size="icon" onClick={handleLike}>
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{productData.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <ul className="space-y-1">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="gradient-text">Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(productData.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inquiry Form */}
        <Card className="mt-12" id="inquiry-form">
          <CardHeader>
            <CardTitle className="gradient-text">Product Inquiry</CardTitle>
            <p className="text-gray-600">
              Interested in this product? Send us your inquiry and we'll get back to you soon!
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={inquiryForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inquiryForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={inquiryForm.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={inquiryForm.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us about your inquiry..."
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="gradient-bg hover:opacity-90 w-full">
                Send Inquiry
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
