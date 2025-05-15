"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

// Expertise data
const expertiseData = {
  Proficient: ["Python", "Java", "C", "C++", "SQL", "Next.js", "Tailwind CSS", "JavaScript", "Flutter", "UI/UX Design"],
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
    expertiseData["Proficient"].filter((skill) => ["Python", "Java", "C", "C++", "JavaScript", "SQL"].includes(skill)),
    "Proficient",
  ),
  ...prepareChartData(
    expertiseData["Familiar with"].filter((skill) => ["Dart", "React"].includes(skill)),
    "Familiar with",
  ),
].sort((a, b) => b.score - a.score)

// Prepare web technologies chart data
const webTechData = [
  ...prepareChartData(
    expertiseData["Proficient"].filter((skill) => ["Next.js", "Tailwind CSS", "JavaScript"].includes(skill)),
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
    <section id="expertise" ref={sectionRef} className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">My Expertise</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          A comprehensive overview of my technical skills, knowledge areas, and professional capabilities.
        </p>

        <div
          className={cn(
            "transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          )}
        >
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="skills">Technical</TabsTrigger>
              <TabsTrigger value="security">CyberSecurity</TabsTrigger>
              <TabsTrigger value="design">UI/UX</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Programming Languages Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Programming Languages</CardTitle>
                    <CardDescription>Proficiency in various programming languages</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={programmingSkillsData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Proficiency"]}
                          cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
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
                  <CardHeader>
                    <CardTitle>Web Technologies</CardTitle>
                    <CardDescription>Proficiency in web development frameworks and tools</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={webTechData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Proficiency"]}
                          cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
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
                <CardHeader>
                  <CardTitle>Operating Systems</CardTitle>
                  <CardDescription>Proficiency in different operating systems</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  {expertiseData["Operating System"].map((os, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-background rounded-lg border border-border flex items-center gap-2"
                    >
                      <div className="w-3 h-3 rounded-full bg-black dark:bg-white"></div>
                      <span>{os}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              {/* Security Skills Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Security & Forensics Skills</CardTitle>
                  <CardDescription>Proficiency in cybersecurity and digital forensics</CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={securitySkillsData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Proficiency"]}
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
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
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Additional Security Skills</CardTitle>
                  <CardDescription>Other security and forensics capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border"
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
                <CardHeader>
                  <CardTitle>Design Skills</CardTitle>
                  <CardDescription>Proficiency in design and UI/UX</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={designSkillsData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Proficiency"]}
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
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
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Design Specializations</CardTitle>
                  <CardDescription>Detailed design capabilities and focus areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expertiseData["Design Skills"].map((skill, index) => (
                      <div key={index} className="p-4 bg-background rounded-lg border border-border">
                        <p>{skill}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="other">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Writing Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Writing Skills</CardTitle>
                    <CardDescription>Content writing and documentation capabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {expertiseData["Writing Skills"].map((skill, index) => (
                        <div key={index} className="p-4 bg-background rounded-lg border border-border">
                          <p>{skill}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Leadership Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Leadership Skills</CardTitle>
                    <CardDescription>Management and organizational capabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {expertiseData["Leadership Skills"].map((skill, index) => (
                        <div key={index} className="p-4 bg-background rounded-lg border border-border">
                          <p>{skill}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Web Development */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Web Development</CardTitle>
                  <CardDescription>Additional web development capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expertiseData["Web development"].map((skill, index) => (
                      <div key={index} className="p-4 bg-background rounded-lg border border-border">
                        <p>{skill}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
