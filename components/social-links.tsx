import { Github, Linkedin, Facebook } from "lucide-react"
import { SiFacebook, SiGithub, SiLinkedin } from "react-icons/si"

const socialLinks = [
  { name: "GitHub", icon: SiGithub, href: "https://github.com/dev-smashik" },
  { name: "LinkedIn", icon: SiLinkedin, href: "https://www.linkedin.com/in/smashik" },
  { name: "Facebook", icon: SiFacebook, href: "https://www.facebook.com/smashik716/" },
]

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => {
        const Icon = social.icon
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-muted hover:bg-black hover:text-white transition-colors duration-200"
            aria-label={social.name}
          >
            <Icon className="h-5 w-5" />
          </a>
        )
      })}
    </div>
  )
}
