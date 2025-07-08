"use client"

import Link from "next/link"
import { LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-purple-600 to-purple-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/admin-dashboard" className="flex items-center space-x-2">
            <div className="bg-white w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/admin-dashboard" className="text-white hover:text-purple-200 transition-colors">
              Dashboard
            </Link>
            <Link href="/" className="text-white hover:text-purple-200 transition-colors" target="_blank">
              View Website
            </Link>
            <Button
              variant="ghost"
              className="text-white hover:bg-purple-700"
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  window.location.href = "/"
                }
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-500">
            <div className="flex flex-col space-y-4">
              <Link href="/admin-dashboard" className="text-white hover:text-purple-200 transition-colors">
                Dashboard
              </Link>
              <Link href="/" className="text-white hover:text-purple-200 transition-colors" target="_blank">
                View Website
              </Link>
              <Button
                variant="ghost"
                className="text-white hover:bg-purple-700 justify-start"
                onClick={() => {
                  if (window.confirm("Are you sure you want to logout?")) {
                    window.location.href = "/"
                  }
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
