import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Zap, Shield, Truck } from "lucide-react"
import Link from "next/link"

// Sample product data
const products = [
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
]

const categories = ["Electronics", "Wearables", "Photography", "Furniture", "Audio", "Gaming"]

const features = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Quick and reliable shipping",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "Your data is protected",
  },
  {
    icon: Truck,
    title: "Free Returns",
    description: "30-day return policy",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Shop the latest trends and find everything you need in one place
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Shopping
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Shop by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
