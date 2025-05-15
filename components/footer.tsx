"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Facebook, ArrowUp, Mail, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SiFacebook, SiGithub, SiLinkedin } from "react-icons/si"

const socialLinks = [
  { name: "GitHub", icon: SiGithub, href: "https://github.com/dev-smashik" },
  { name: "LinkedIn", icon: SiLinkedin, href: "https://www.linkedin.com/in/smashik" },
  { name: "Facebook", icon: SiFacebook, href: "https://www.facebook.com/smashik716/" },
  { name: "Email", icon: Mail, href: "mailto:smashik716@gmail.com" },
]

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Expertise", href: "#expertise" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
]

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Sheikh Muhammad Ashik</h3>
            <p className="text-muted-foreground text-sm">
              CSE Student at University of Asia Pacific, passionate about programming, cybersecurity, and UI/UX design.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <p className="text-sm text-muted-foreground">
              <span className="block">Phone: +8801621942031</span>
              <span className="block">Email: smashik716@gmail.com</span>
              <span className="block">Address: 62/west agargaon, dhaka-1207</span>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Sheikh Muhammad Ashik. All rights reserved.
          </p>
        
        </div>
      </div>

      {/* Scroll to top button */}
      <Button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 p-3 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-lg transition-all duration-300 z-50",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        )}
        size="icon"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </footer>
  )
}
