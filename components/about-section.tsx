"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Code, BookOpen, Shield, Brain } from "lucide-react"

const skills = [
  { name: "Python", category: "programming" },
  { name: "Java", category: "programming" },
  { name: "C/C++", category: "programming" },
  { name: "SQL", category: "programming" },
  { name: "JavaScript", category: "programming" },
  { name: "Flutter", category: "programming" },
  { name: "UI/UX Design", category: "design" },
  { name: "Cybersecurity", category: "security" },
  { name: "Machine Learning", category: "ai" },
  { name: "Forensics", category: "security" },
]

const interests = [
  { name: "Programming", icon: Code },
  { name: "Blogging", icon: BookOpen },
  { name: "Cybersecurity", icon: Shield },
  { name: "ML", icon: Brain },
]

export default function AboutSection() {
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
    <section id="about" ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div
            className={cn(
              "flex justify-center transition-all duration-1000 transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
            )}
          >
            <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/about-smashik.jpg?height=600&width=480"
                alt="Sheikh Muhammad Ashik"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-sm font-medium">Sheikh Muhammad Ashik</p>
                <p className="text-xs opacity-80">University of Asia Pacific</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div
            className={cn(
              "space-y-6 transition-all duration-1000 delay-300 transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
            )}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg">
                I'm <span className="font-semibold">Sheikh Muhammad Ashik</span>, a 4th-year CSE student at the
                University of Asia Pacific. I'm passionate about programming, malware analysis, UI/UX design, and
                content writing. I'm also a competitive programmer, CTF player, and always eager to learn new things.
              </p>

              <p>
                Co-founder of <span className="font-semibold">Mohakash Bigyan O Projukti</span>, where I also contribute
                as a science-tech writer.
              </p>
            </div>

            {/* Interests */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Interests</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {interests.map((interest, index) => {
                  const Icon = interest.icon
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center p-4 bg-muted rounded-lg text-center transition-all hover:bg-muted/80"
                    >
                      <Icon className="h-8 w-8 mb-2 text-black dark:text-white opacity-80" />
                      <span className="text-sm font-medium">{interest.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      skill.category === "programming" &&
                        "bg-slate-100 text-black hover:bg-slate-950 hover:text-white",
                      skill.category === "design" &&
                        "bg-slate-100 text-black hover:bg-slate-950 hover:text-white",
                      skill.category === "security" && "bg-slate-100 text-black hover:bg-slate-950 hover:text-white",
                      skill.category === "ai" && "bg-slate-100 text-black hover:bg-slate-950 hover:text-white",
                    )}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
