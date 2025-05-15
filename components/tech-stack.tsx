import { cn } from "@/lib/utils"
import { 
  SiNextdotjs, 
  SiReact, 
  SiPython, 
  SiTailwindcss, 
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiGit
} from "react-icons/si"

const technologies = [
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "React", icon: <SiReact /> },
  { name: "Python", icon: <SiPython /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Git", icon: <SiGit /> }
]
export default function TechStack() {
  return (
    <div className="flex flex-col space-y-4 items-center text-center">
      <h3 className="text-sm font-medium text-muted-foreground">Technologies</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm font-medium transition-all hover:bg-muted/80"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              {tech.icon}
            </div>
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  )
}