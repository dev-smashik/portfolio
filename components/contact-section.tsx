"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Me</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Feel free to reach out for collaborations, opportunities, or just to say hello!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            className={cn(
              "bg-muted/50 rounded-xl p-8 transition-all duration-1000 transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
            )}
          >
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-full mr-4">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
                  <p className="text-lg font-medium">+8801621942031</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-full mr-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                  <p className="text-sm font-medium">smashik716@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-full mr-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Address</h4>
                  <p className="text-lg font-medium">62/west agargaon, dhaka-1207</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={cn(
              "bg-background rounded-xl shadow-sm border border-border p-8 transition-all duration-1000 transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
            )}
          >
            <h3 className="text-2xl font-bold mb-6">Send Message</h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <p className="text-muted-foreground">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can I help you?"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    rows={6}
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto md:px-8 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
