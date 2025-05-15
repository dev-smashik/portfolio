"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

// Expertise data
const expertiseData = {
  Proficient: ["Python", "Java", "C", "C++", "SQL", "Next.js", "Tailwind", "JS", "Flutter", "UI/UX Design"],
  "Familiar with": ["C++", "Python", "Dart", "React"],
  "Operating System": ["Windows", "Kali Linux", "Ubuntu"],
  "Core Skills": [
    "Malware Analysis",
    "Open Source Intelligence(OSINT)",
    "Cryptography",
    "Memory Forensics",
    "Digital Forensics",
    "Metasploit Framework",
    "Competitive Programming and Problem Solving",
    "Machine Learning",
  ],
  "Design Skills": [
    "User Interface/User Experience Design - Android/IOS Application, Web/Desktop Application",
    "Graphics Design - Logo, Banner, Poster, Icon",
  ],
  "Web development": ["Wordpress Theme Development & Customization"],
  "Writing Skills": ["Science and Technology based at Mohakash Bigyan O Projukti and Independent Content Writer"],
  "Leadership Skills": ["Co-Founder and Admin at Mohakash Bigyan O Projukti - Science Education Learning Platform"],
}

// Prepare chart data
const prepareChartData = (skills: string[], category: string) => {
  return skills.map((skill, index) => {
    // Generate a score between 75-95 for proficient skills
    // and 60-80 for familiar skills
    let score = 0
    if (category === "Proficient") {
      score = Math.floor(Math.random() * 20) + 75
    } else if (category === "Familiar with") {
      score = Math.floor(Math.random() * 20) + 60
    } else {
      score = Math.floor(Math.random() * 15) + 80
    }

    return {
      name: skill,
      score: score,
    }
  })
}

// Prepare programming skills chart data
const programmingSkillsData = [
  ...prepareChartData(
    expertiseData["Proficient"].filter((skill) => ["Python", "Java", "C", "C++", "JS", "SQL"].includes(skill)),
    "Proficient",
  ),
  ...prepareChartData(
    expertiseData["Familiar with"].filter((skill) => ["Next.js", "React"].includes(skill)),
    "Familiar with",
  ),
].sort((a, b) => b.score - a.score)

// Prepare web technologies chart data
const webTechData = [
  ...prepareChartData(
    expertiseData["Proficient"].filter((skill) => ["Next.js", "Tailwind", "JS"].includes(skill)),
    "Proficient",
  ),
  ...prepareChartData(
    expertiseData["Familiar with"].filter((skill) => ["React"].includes(skill)),
    "Familiar with",
  ),
  ...prepareChartData(["Wordpress"], "Web development"),
].sort((a, b) => b.score - a.score)

// Prepare security skills chart data
const securitySkillsData = prepareChartData(
  ["Malware Analysis", "OSINT", "Cryptography", "Memory Forensics", "Digital Forensics", "Metasploit"],
  "Core Skills",
).sort((a, b) => b.score - a.score)

// Prepare design skills chart data
const designSkillsData = prepareChartData(
  ["UI/UX Design", "Mobile App Design", "Web Design", "Logo Design", "Banner Design"],
  "Design Skills",
).sort((a, b) => b.score - a.score)

export default function ExpertiseSection() {
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
  <section id="expertise" ref={sectionRef} className="py-12 md:py-20 px-3 md:px-4 bg-muted/30">
    <div className="container mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center">My Expertise</h2>
      <p className="text-sm md:text-base text-muted-foreground text-center max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-8 md:mb-12">
        A comprehensive overview of my technical skills, knowledge areas, and professional capabilities.
      </p>

      <div
        className={cn(
          "transition-all duration-1000 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        )}
      >
        <Tabs defaultValue="skills" className="w-full">
          <div className="overflow-x-auto pb-2">
  <TabsList className="flex w-full md:w-auto md:grid md:grid-cols-4 mb-4 md:mb-6">
    <TabsTrigger 
      value="skills" 
      className="flex-1 min-w-16 text-xs sm:text-sm md:text-base py-1.5 px-2 md:px-4"
    >
      Technical
    </TabsTrigger>
    <TabsTrigger 
      value="security" 
      className="flex-1 min-w-16 text-xs sm:text-sm md:text-base py-1.5 px-2 md:px-4"
    >
      Security
    </TabsTrigger>
    <TabsTrigger 
      value="design" 
      className="flex-1 min-w-16 text-xs sm:text-sm md:text-base py-1.5 px-2 md:px-4"
    >
      UI/UX
    </TabsTrigger>
    <TabsTrigger 
      value="other" 
      className="flex-1 min-w-16 text-xs sm:text-sm md:text-base py-1.5 px-2 md:px-4"
    >
      Other
    </TabsTrigger>
  </TabsList>
</div>

          <TabsContent value="skills" className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Programming Languages Chart */}
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Programming Languages</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Proficiency in various programming languages</CardDescription>
                </CardHeader>
                <CardContent className="p-2 md:p-4 h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={programmingSkillsData}
                      layout="vertical"
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={70} 
                        tick={{ fontSize: 12 }}
                        tickMargin={5}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Proficiency"]}
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                        contentStyle={{ fontSize: 12 }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {programmingSkillsData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.score > 80 ? "#000000" : "#666666"}
                            fillOpacity={entry.score / 100}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Web Technologies Chart */}
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Web Technologies</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Proficiency in web development frameworks and tools</CardDescription>
                </CardHeader>
                <CardContent className="p-2 md:p-4 h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={webTechData}
                      layout="vertical"
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={70} 
                        tick={{ fontSize: 12 }}
                        tickMargin={5}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Proficiency"]}
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                        contentStyle={{ fontSize: 12 }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {webTechData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.score > 80 ? "#000000" : "#666666"}
                            fillOpacity={entry.score / 100}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Operating Systems */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">Operating Systems</CardTitle>
                <CardDescription className="text-xs md:text-sm">Proficiency in different operating systems</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 flex flex-wrap gap-2 md:gap-3">
                {expertiseData["Operating System"].map((os, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-background rounded-lg border border-border flex items-center gap-1.5 md:gap-2 text-xs md:text-sm"
                  >
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-black dark:bg-white"></div>
                    <span>{os}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            {/* Security Skills Chart */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">Security & Forensics Skills</CardTitle>
                <CardDescription className="text-xs md:text-sm">Proficiency in cybersecurity and digital forensics</CardDescription>
              </CardHeader>
              <CardContent className="p-2 md:p-4 h-72 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={securitySkillsData}
                    layout="vertical"
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={80} 
                      tick={{ fontSize: 12 }}
                      tickMargin={5}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Proficiency"]}
                      cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                      contentStyle={{ fontSize: 12 }}
                    />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                      {securitySkillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#000000" fillOpacity={entry.score / 100} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Core Skills List */}
            <Card className="mt-6 md:mt-8">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">Additional Security Skills</CardTitle>
                <CardDescription className="text-xs md:text-sm">Other security and forensics capabilities</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {expertiseData["Core Skills"]
                    .filter(
                      (skill) =>
                        !securitySkillsData.some(
                          (item) => item.name === skill || item.name === skill.split("(")[0].trim(),
                        ),
                    )
                    .map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-background rounded-lg border border-border text-xs md:text-sm"
                      >
                        <div className="w-2 h-2 rounded-full bg-black dark:bg-white"></div>
                        <span>{skill}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design">
            {/* Design Skills Chart */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">Design Skills</CardTitle>
                <CardDescription className="text-xs md:text-sm">Proficiency in design and UI/UX</CardDescription>
              </CardHeader>
              <CardContent className="p-2 md:p-4 h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={designSkillsData}
                    layout="vertical"
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={80} 
                      tick={{ fontSize: 12 }}
                      tickMargin={5}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Proficiency"]}
                      cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                      contentStyle={{ fontSize: 12 }}
                    />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                      {designSkillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#000000" fillOpacity={entry.score / 100} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Design Skills Details */}
            <Card className="mt-6 md:mt-8">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">Design Specializations</CardTitle>
                <CardDescription className="text-xs md:text-sm">Detailed design capabilities and focus areas</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  {expertiseData["Design Skills"].map((skill, index) => (
                    <div key={index} className="p-3 md:p-4 bg-background rounded-lg border border-border text-xs md:text-sm">
                      <p>{skill}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other">
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {/* Writing Skills */}
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Writing Skills</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Content writing and documentation capabilities</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {expertiseData["Writing Skills"].map((skill, index) => (
                      <div key={index} className="p-3 md:p-4 bg-background rounded-lg border border-border text-xs md:text-sm">
                        <p>{skill}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leadership Skills */}
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Leadership Skills</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Management and organizational capabilities</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {expertiseData["Leadership Skills"].map((skill, index) => (
                      <div key={index} className="p-3 md:p-4 bg-background rounded-lg border border-border text-xs md:text-sm">
                        <p>{skill}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Web Development */}
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Web Development</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Additional web development capabilities</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {expertiseData["Web development"].map((skill, index) => (
                      <div key={index} className="p-3 md:p-4 bg-background rounded-lg border border-border text-xs md:text-sm">
                        <p>{skill}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </section>
  )
}
