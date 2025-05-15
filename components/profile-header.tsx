"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"
import AnimatedText from "@/components/animated-text"
import TechStack from "@/components/tech-stack"
import SocialLinks from "@/components/social-links"
import Navbar from "@/components/navbar"
import Image from "next/image"

export default function ProfileHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Navbar scrolled={scrolled} />
      <header
        className={cn(
          "w-full py-16 md:py-20 px-4 md:px-8 transition-all duration-300 mt-16",
          scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "",
        )}
      >
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between gap-8">
            <div className="flex flex-col items-center gap-6 md:gap-8 text-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-black dark:border-white shadow-lg">
                <Image
                  src="/smashik.jpg?height=400&width=400"
                  alt="Sheikh Muhammad Ashik"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-4 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Sheikh Muhammad Ashik</h1>

                <div className="h-8 flex justify-center">
                  <AnimatedText />
                </div>

                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Turning complex problems into elegant, user-friendly solutions with code and creativity.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                  <Button 
  asChild
  className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
>
  <a 
    href="/cv-uidesign.pdf" 
    download="Sheikh_Muhammad_Ashik_CV.pdf"
    className="flex items-center"
  >
    <Download className="mr-2 h-4 w-4" />
    Download CV
  </a>
</Button>
                  <SocialLinks />
                </div>
              </div>
            </div>

            <div className="w-full">
              <TechStack />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
