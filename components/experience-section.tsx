"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

type ExperienceItem = {
  title: string
  value: number
  suffix: string
}

const experienceData: ExperienceItem[] = [
  { title: "UI/UX Design", value: 4, suffix: "+ years" },
  { title: "Web Development", value: 1.5, suffix: "+ years" },
  { title: "Blogging", value: 5, suffix: "+ years" },
  { title: "Completed Projects", value: 15, suffix: "+" },
]

export default function ExperienceSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experienceData.map((item, index) => (
            <ExperienceCounter key={index} title={item.title} value={item.value} suffix={item.suffix} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ExperienceCounterProps {
  title: string
  value: number
  suffix: string
}

function ExperienceCounter({ title, value, suffix }: ExperienceCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

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

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const decimals = value.toString().includes(".") ? 1 : 0
    const duration = 2000
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const easedProgress = easeOutCubic(progress)

      setCount(Number.parseFloat((easedProgress * value).toFixed(decimals)))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [isVisible, value])

  // Easing function for smoother animation
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3)
  }

  return (
    <div ref={counterRef} className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-500">
      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">{title}</h4>
      <div className="relative">
        <div
          className={cn(
            "flex items-end transition-all duration-500",
            isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4",
          )}
        >
          <span className="text-5xl md:text-6xl font-bold">{count.toFixed(count % 1 === 0 ? 0 : 1)}</span>
          <span className="text-sm font-medium text-black/30 dark:text-white/30 mb-2 ml-0.5">{suffix}</span>
        </div>
        <div
          className={cn(
            "absolute -inset-1 rounded-full bg-black/5 dark:bg-white/5 blur-lg transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    </div>
  )
}
