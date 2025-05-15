import ProfileHeader from "@/components/profile-header"
import ExperienceSection from "@/components/experience-section"
import AboutSection from "@/components/about-section"
import WorkExperienceSection from "@/components/work-experience-section"
import ProjectsSection from "@/components/projects-section"
import ExpertiseSection from "@/components/expertise-section"
import AchievementsSection from "@/components/achievements-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ProfileHeader />
      <ExperienceSection />
      <AboutSection />
      <WorkExperienceSection />
      <ProjectsSection />
      <ExpertiseSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
