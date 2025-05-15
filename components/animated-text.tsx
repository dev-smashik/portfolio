"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const roles = ["UI / UX Designer", "Developer", "Blogger", "Tech Enthusiast"]

export default function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        // Current word
        const fullText = roles[currentIndex]

        // If deleting, remove the last character
        // If typing, add the next character
        setCurrentText((prev) =>
          isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1),
        )

        // If we've completed typing the word
        if (!isDeleting && currentText === fullText) {
          // Wait a bit before starting to delete
          setTimeout(() => setIsDeleting(true), 1500)
        }

        // If we've deleted the word
        if (isDeleting && currentText === "") {
          setIsDeleting(false)
          // Move to the next word
          setCurrentIndex((prev) => (prev + 1) % roles.length)
        }
      },
      isDeleting ? 100 : 150,
    )

    return () => clearTimeout(timeout)
  }, [currentIndex, currentText, isDeleting])

  return (
    <div className="flex items-center text-xl md:text-2xl font-medium text-muted-foreground">
      <span>{currentText}</span>
      <span className={cn("ml-1 inline-block w-[3px] h-6 bg-black", "animate-[blink_1s_infinite]")}></span>
    </div>
  )
}
