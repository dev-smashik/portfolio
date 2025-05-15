"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
  { name: "Achievements", href: "#achievements" },
]

interface NavbarProps {
  scrolled: boolean
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-8",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background/50 backdrop-blur-sm",
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="#" className="text-xl font-bold">
            dev-smashik
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md py-4 px-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
