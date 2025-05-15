"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowUpRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SiGithub } from "react-icons/si"

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "Ai Based Resume Scanning & Job Searching",
    description:
      "Ai based resume scanning and job searching platform that matches candidates with job openings.",
    image: "/Jobportal.jpg?height=600&width=800",
    demoLink: "https://ai-resume-checker-and-job-searching.vercel.app/",
    githubLink: "https://github.com/dev-smashik/AI-Resume-Checker-and-Job-Searching",
    tags: ["Next JS", "Tailwind CSS", "Neon DB", "Gemini AI"],
  },
  {
    id: 2,
    title: "Home-Services-Hub",
    description: "Home services hub for booking and managing home services like cleaning, plumbing, and repairs.",
    image: "/homeservice.jpeg?height=600&width=800",
    demoLink: "https://github.com/dev-smashik/Home-Services-Hub-Final-Project",
    githubLink: "https://github.com/dev-smashik/Home-Services-Hub-Final-Project",
    tags: ["Django", "Bootstrap", "MySQL"],
  },
  {
    id: 3,
    title: "Infosec BD UI Design",
    description: "UI design for Infosec BD, a platform for cybersecurity education and resources.",
    image: "/infosecbdui.jpg?height=600&width=800",
    demoLink: "https://www.figma.com/design/6BF1o0nzDKd1GRFeE4pzjV/Infosec-BD-website?node-id=0-1&t=QFOqMVXkEQU4KEq5-1",
    githubLink: "#",
    tags: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    id: 4,
    title: "Internet Speed Test",
    description: "A web application that tests and displays internet speed using python.",
    image: "/speedtest.png?height=600&width=800",
    demoLink: "#",
    githubLink: "https://github.com/dev-smashik/Internet-Speed-Meter-App",
    tags: ["Python"],
  },
  {
    id: 5,
    title: "Vscode Theme - Dev-Wizard",

    description: "A custom Visual Studio Code theme designed for developers, enhancing coding experience.",
    image: "/devwizard.png?height=600&width=800",
    demoLink: "#",
    githubLink: "#",
    tags: ["JavaScript", "JSON", "VSCode"],
  },
  {
    id: 6,
    title: "Hey DJ's Mobile UI Design",
    description: "Mobile UI design for Hey DJ, a music streaming and DJ platform.",
    image: "/heydj.jpg?height=600&width=800",
    demoLink: "https://www.figma.com/design/7aUauVOlDXwzS0nTg50rbJ/Hey-Dj-s?node-id=0-1&t=SIXwrg65KP1QCjgI-1",
    githubLink: "#",
    tags: ["Figma", "Photoshop", "Illustrator"],
  },
]

export default function ProjectsSection() {
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
    <section id="projects" ref={sectionRef} className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Projects</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Explore my recent projects showcasing my skills in development, design, and problem-solving.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    image: string
    demoLink: string
    githubLink: string
    tags: string[]
  }
  index: number
  isVisible: boolean
}

function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "group relative bg-background rounded-xl overflow-hidden shadow-md transition-all duration-500 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        isHovered ? "shadow-xl scale-[1.02]" : "",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-all duration-700",
            isHovered ? "scale-110 brightness-90" : "scale-100",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500",
            isHovered ? "opacity-100" : "",
          )}
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="px-2 py-1 bg-muted text-xs font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:text-black dark:group-hover:text-white">
          {project.title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="default"
            className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-all duration-300"
          >
            <a href={project.demoLink} target="_parent" rel="noopener noreferrer">
              View Project <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>

          <Button 
  asChild 
  variant="outline" 
  size="icon" 
  className="transition-all duration-300 hover:bg-muted"
>
  <a
    href={project.githubLink}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="View source code on GitHub"
    className="flex items-center justify-center"
  >
    <SiGithub className="h-4 w-4" />
  </a>
</Button>
        </div>
      </div>

      {/* Animated Border */}
      <div
        className={cn(
          "absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-500",
          isHovered ? "border-black/20 dark:border-white/20" : "",
        )}
      />
    </div>
  )
}
