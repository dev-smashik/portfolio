"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Trophy, Award, Star, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample achievements data - replace with your actual achievements
const achievementsData = [
  {
    id: 1,
    title: "Co-founded Mohakash Bigyan O Projukti",
    date: "January 2020",
    description:
      "Established a science education learning platform that has reached over 650K+ students across Bangladesh, providing accessible science and technology education resources.",
    icon: Trophy,
  },
  {
    id: 2,
    title: "Flag Hunt 2023 Cybersecurity Competition Finalist",
    date: "March 2023",
    description:"Achieved 8th place in the Flag Hunt 2023, a national cybersecurity competition organized by Cyber Bangladesh, showcasing advanced skills in ethical hacking and digital forensics.",
    icon: Award,
  },
  {
    id: 3,
    title: "Intra University CTF 2024 Champion",
    date: "December 2024",
    description:
      "Won the Intra University Capture The Flag (CTF) competition in University of Asia Pacific, demonstrating exceptional skills in cybersecurity and problem-solving.",
    icon: Star,
  },
]

export default function AchievementsSection() {
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
    <section id="achievements" ref={sectionRef} className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Achievements</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Key milestones and accomplishments throughout my academic and professional journey.
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-1/2 z-0"></div>

          {/* Timeline items */}
          <div className="relative z-10">
            {achievementsData.map((achievement, index) => (
              <TimelineItem
                key={achievement.id}
                achievement={achievement}
                index={index}
                isVisible={isVisible}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineItemProps {
  achievement: {
    id: number
    title: string
    date: string
    description: string
    icon: React.ElementType
  }
  index: number
  isVisible: boolean
  isLeft: boolean
}

function TimelineItem({ achievement, index, isVisible, isLeft }: TimelineItemProps) {
  const Icon = achievement.icon

  return (
    <div className={cn("mb-12 flex flex-col md:flex-row items-center", isLeft ? "md:flex-row" : "md:flex-row-reverse")}>
      {/* Timeline content */}
      <div
        className={cn(
          "w-full md:w-1/2 mb-8 md:mb-0 transition-all duration-1000 transform",
          isVisible ? "opacity-100 translate-y-0" : isLeft ? "opacity-0 -translate-x-12" : "opacity-0 translate-x-12",
          isLeft ? "md:pr-12" : "md:pl-12",
        )}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div
          className={cn(
            "bg-background p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow",
            "relative",
          )}
        >
          <div
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-45 bg-background border",
              isLeft ? "-right-2 border-t-0 border-l-0" : "-left-2 border-b-0 border-r-0",
            )}
          ></div>

          <div className="flex items-center mb-3">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{achievement.date}</span>
          </div>

          <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
          <p className="text-muted-foreground">{achievement.description}</p>
        </div>
      </div>

      {/* Timeline dot */}
      <div
        className={cn(
          "relative flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white shadow-md z-10",
          "transition-all duration-1000 transform",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50",
        )}
        style={{ transitionDelay: `${index * 200 + 300}ms` }}
      >
        <Icon className="h-6 w-6 text-white dark:text-black" />
      </div>

      {/* Empty space for the other side on desktop */}
      <div className="hidden md:block md:w-1/2"></div>
    </div>
  )
}
