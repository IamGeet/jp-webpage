import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Truck, Heart, Users, Award, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Trusted Quality",
    description: "We carefully curate every product to ensure the highest quality standards for our customers.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to get your products to you as soon as possible.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We're here to help with any questions or concerns.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our knowledgeable team is always ready to provide product recommendations and support.",
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "Competitive pricing without compromising on quality. Great value for your money.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serving customers worldwide with a commitment to excellence and reliability.",
  },
]

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    description: "Passionate about bringing quality products to customers worldwide.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    description: "Ensures smooth operations and exceptional customer service.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    description: "Curates our product selection to meet customer needs and trends.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">About PurpleShop</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about bringing you the best products at great prices. Our mission is to make shopping easy,
            enjoyable, and accessible for everyone, while maintaining the highest standards of quality and service.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold gradient-text mb-6">Our Story</h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Founded in 2020, PurpleShop started with a simple vision: to create an online marketplace that puts
                    customers first. We believe that shopping should be more than just a transaction – it should be an
                    experience that brings joy and satisfaction.
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    From our humble beginnings as a small team with big dreams, we've grown into a trusted platform
                    serving thousands of customers worldwide. Our commitment to quality, service, and innovation remains
                    at the heart of everything we do.
                  </p>
                  <Button className="gradient-bg hover:opacity-90">Learn More About Our Journey</Button>
                </div>
                <div className="relative">
                  <div className="gradient-bg rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                    <p className="text-lg opacity-90">
                      To provide exceptional products and service that exceed customer expectations, while building
                      lasting relationships based on trust and reliability.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">Why Choose PurpleShop?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <Card className="border-0 shadow-lg gradient-bg text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-8">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                  <p className="opacity-90">
                    We conduct business with honesty, transparency, and ethical practices in everything we do.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="opacity-90">
                    We continuously improve our platform and services to provide the best shopping experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                  <p className="opacity-90">
                    We strive for excellence in every aspect of our business, from products to customer service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold gradient-text mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Have questions about our products or services? We'd love to hear from you. Our team is here to help and
                provide the support you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="gradient-bg hover:opacity-90">Contact Us</Button>
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  Browse Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
