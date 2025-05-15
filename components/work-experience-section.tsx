"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Logos for the scrolling animation - replace with your actual company/technology logos
const logoImages = [
  "/gizantech.jpg?height=60&width=120",
  "/infosecbd.jpg?height=60&width=120",
  "/cyberbangla.jpg?height=60&width=120",
  "/eutropia.jpg?height=60&width=120",
  "/mbop.jpg?height=60&width=120",
  "/bigyanplus.jpg?height=60&width=120",
]

export default function WorkExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section ref={sectionRef} className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Work Experience</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Companies and technologies I've worked with throughout my professional journey.
        </p>

        {/* Scrolling Logos */}
        <div
          className={cn(
            "relative w-full overflow-hidden transition-opacity duration-1000",
            isVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
          {/* <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div> */}

          {/* First row of logos - faster animation */}
          <div className="flex fast-scroll-rtl mb-8">
            {[...logoImages, ...logoImages].map((logo, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0 mx-8">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt={`Company logo ${index + 1}`}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add this style tag inside your component to define the fast animation */}
        <style jsx global>{`
          @keyframes fastScrollRtl {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-50% - 2rem));
            }
          }
          
          .fast-scroll-rtl {
            animation: fastScrollRtl 15s linear infinite;
          }
          
          /* Speed up on hover (optional) */
          .fast-scroll-rtl:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  )
}