"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Target, Zap, ArrowRight, Trophy, Clock, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const roadmaps = [
    {
        id: "push_static",
        name: "Push Static",
        description: "Master pushing static holds with progressive difficulty",
        skills: [
            { name: "L-sit", difficulty: "Beginner", weeks: 4, icon: "🔥", subSkills: [] },
            { name: "V-sit", difficulty: "Intermediate", weeks: 6, icon: "⚡", subSkills: [] },
            {
                name: "Planche",
                difficulty: "Intermediate to Advanced",
                weeks: 40,
                icon: "💪",
                subSkills: [
                    { name: "Planche Lean", weeks: 8, icon: "📐" },
                    { name: "Tuck Planche", weeks: 8, icon: "🤏" },
                    { name: "Advanced Tuck Planche", weeks: 8, icon: "🔥" },
                    { name: "Straddle Planche", weeks: 8, icon: "⭐" },
                    { name: "Full Planche", weeks: 8, icon: "💪" },
                ],
            },
        ],
        totalWeeks: 50,
        color: "bg-gradient-to-br from-[#D4A574] to-[#C19660]",
        borderColor: "border-[#D4A574]",
    },
    {
        id: "pull_static",
        name: "Pull Static",
        description: "Master pulling static holds with focused progression",
        skills: [
            {
                name: "Back Lever",
                difficulty: "Intermediate to Advanced",
                weeks: 12,
                icon: "🔄",
                subSkills: [
                    { name: "Tuck Back Lever", weeks: 3, icon: "🔄" },
                    { name: "Advanced Tuck Back Lever", weeks: 3, icon: "🌀" },
                    { name: "Straddle Back Lever", weeks: 3, icon: "⚡" },
                    { name: "Full Back Lever", weeks: 3, icon: "🎯" },
                ],
            },
            {
                name: "Front Lever",
                difficulty: "Advanced",
                weeks: 16,
                icon: "🏆",
                subSkills: [
                    { name: "Tuck Front Lever", weeks: 4, icon: "🔥" },
                    { name: "Advanced Tuck Front Lever", weeks: 4, icon: "💫" },
                    { name: "Straddle Front Lever", weeks: 4, icon: "⭐" },
                    { name: "Full Front Lever", weeks: 4, icon: "🏆" },
                ],
            },
        ],
        totalWeeks: 28,
        color: "bg-gradient-to-br from-[#7A8471] to-[#6B7562]",
        borderColor: "border-[#7A8471]",
    },
]

export default function RoadmapSelectionPage() {
    const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null)
    const [expandedSkills, setExpandedSkills] = useState<{ [key: string]: boolean }>({})
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const toggleSkillExpansion = (roadmapId: string, skillName: string) => {
        const key = `${roadmapId}-${skillName}`
        setExpandedSkills((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
    }

    const handleRoadmapSelect = async (roadmapId: string) => {
        setIsLoading(true)

        // TODO: Database Integration
        // 1. Create user_roadmaps entry with selected roadmap
        // 2. Initialize user_skill_progress for all skills and sub-skills in the selected roadmap
        // 3. Set first skill as 'current', rest as 'locked'

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsLoading(false)

        // Store selected roadmap in localStorage temporarily (until database integration)
        localStorage.setItem("selectedRoadmap", roadmapId)

        router.push("/dashboard")
    }

    const handleSkipRoadmap = () => {
        // Store preference in localStorage temporarily
        localStorage.setItem("skipRoadmap", "true")
        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen bg-[#F5F1ED] font-poppins">
            {/* Header */}
            <div className="bg-white border-b border-[#E5DDD5]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-[#D4A574] rounded-xl flex items-center justify-center">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-[#3A3A3A]">Welcome to Kuzan</h1>
                        </div>
                        <h2 className="text-xl font-semibold text-[#3A3A3A] mb-2">Choose Your Learning Path</h2>
                        <p className="text-[#6B5B73] max-w-2xl mx-auto">
                            Select a structured roadmap to guide your calisthenics journey, or skip to use our form analyzer freely.
                        </p>
                    </div>
                </div>
            </div>

            {/* Roadmap Selection */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {roadmaps.map((roadmap) => (
                        <Card
                            key={roadmap.id}
                            className={`border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl ${selectedRoadmap === roadmap.id
                                ? `${roadmap.borderColor} shadow-lg scale-105`
                                : "border-[#E5DDD5] hover:border-[#D4A574]"
                                }`}
                            onClick={() => setSelectedRoadmap(roadmap.id)}
                        >
                            <CardHeader className="pb-4">
                                <div className={`w-full h-32 ${roadmap.color} rounded-lg mb-4 flex items-center justify-center`}>
                                    <div className="text-center text-white">
                                        <Trophy className="h-12 w-12 mx-auto mb-2" />
                                        <p className="font-bold text-lg">{roadmap.name}</p>
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-bold text-[#3A3A3A]">{roadmap.name} Roadmap</CardTitle>
                                <p className="text-[#6B5B73] text-sm">{roadmap.description}</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-[#7A8471]" />
                                        <span className="text-[#6B5B73]">~{roadmap.totalWeeks} weeks</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Target className="h-4 w-4 text-[#7A8471]" />
                                        <span className="text-[#6B5B73]">{roadmap.skills.length} main skills</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-[#3A3A3A] mb-2">Skill Progression:</p>
                                    {roadmap.skills.map((skill, index) => (
                                        <div key={skill.name} className="space-y-2">
                                            <div className="flex items-center justify-between p-2 bg-[#FAF8F5] rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-lg">{skill.icon}</span>
                                                    <div>
                                                        <p className="text-sm font-medium text-[#3A3A3A]">{skill.name}</p>
                                                        <p className="text-xs text-[#7A8471]">
                                                            {skill.difficulty} • ~{skill.weeks} weeks
                                                            {skill.subSkills.length > 0 && ` • ${skill.subSkills.length} progressions`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {skill.subSkills.length > 0 && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                toggleSkillExpansion(roadmap.id, skill.name)
                                                            }}
                                                            className="p-2 hover:bg-[#E5DDD5] rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                                                        >
                                                            <ChevronRight
                                                                className={`h-4 w-4 text-[#7A8471] chevron-smooth ${expandedSkills[`${roadmap.id}-${skill.name}`] ? "expanded" : "collapsed"
                                                                    }`}
                                                            />
                                                        </button>
                                                    )}
                                                    {index < roadmap.skills.length - 1 && <ArrowRight className="h-4 w-4 text-[#7A8471]" />}
                                                </div>
                                            </div>

                                            {/* Sub-skills expansion */}
                                            {skill.subSkills.length > 0 && (
                                                <div
                                                    className={`skill-expansion-container ml-6 border-l-2 border-[#E5DDD5] pl-4 ${expandedSkills[`${roadmap.id}-${skill.name}`] ? "expanding" : "collapsing"
                                                        }`}
                                                    style={{
                                                        maxHeight: expandedSkills[`${roadmap.id}-${skill.name}`] ? "500px" : "0px",
                                                        opacity: expandedSkills[`${roadmap.id}-${skill.name}`] ? 1 : 0,
                                                        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                                        paddingTop: expandedSkills[`${roadmap.id}-${skill.name}`] ? "0.5rem" : "0",
                                                        paddingBottom: expandedSkills[`${roadmap.id}-${skill.name}`] ? "0.5rem" : "0",
                                                        marginTop: expandedSkills[`${roadmap.id}-${skill.name}`] ? "0.5rem" : "0",
                                                    }}
                                                >
                                                    <div className="space-y-2">
                                                        {skill.subSkills.map((subSkill, subIndex) => (
                                                            <div
                                                                key={subSkill.name}
                                                                className={`sub-skill-smooth cascade-item-${subIndex + 1} flex items-center justify-between p-3 bg-white rounded-lg border border-[#E5DDD5] ${expandedSkills[`${roadmap.id}-${skill.name}`]
                                                                    ? "visible animate-cascade-emerge"
                                                                    : "animate-cascade-disappear"
                                                                    }`}
                                                                style={{
                                                                    animationDelay: expandedSkills[`${roadmap.id}-${skill.name}`]
                                                                        ? `${subIndex * 100}ms`
                                                                        : `${(skill.subSkills.length - subIndex - 1) * 50}ms`,
                                                                    animationFillMode: "forwards",
                                                                }}
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <span className="text-sm transform transition-transform duration-200 hover:scale-110">
                                                                        {subSkill.icon}
                                                                    </span>
                                                                    <div>
                                                                        <p className="text-xs font-medium text-[#3A3A3A]">{subSkill.name}</p>
                                                                        <p className="text-xs text-[#7A8471]">~{subSkill.weeks} weeks</p>
                                                                    </div>
                                                                </div>
                                                                {subIndex < skill.subSkills.length - 1 && (
                                                                    <ArrowRight className="h-3 w-3 text-[#7A8471] opacity-60" />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Roadmap Summary */}
                                <div className="mt-4 p-3 bg-white rounded-lg border border-[#E5DDD5]">
                                    <div className="text-xs text-[#6B5B73] space-y-1">
                                        <p>
                                            <strong>Goal:</strong>{" "}
                                            {roadmap.id === "push_static"
                                                ? "Master all pushing static holds"
                                                : "Master all pulling static holds"}
                                        </p>
                                        <p>
                                            <strong>Main Skills:</strong> {roadmap.skills.map((s) => s.name).join(" → ")}
                                        </p>
                                        <p>
                                            <strong>Total Progressions:</strong>{" "}
                                            {roadmap.skills.reduce((acc, skill) => acc + Math.max(1, skill.subSkills.length), 0)} skills
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        onClick={() => selectedRoadmap && handleRoadmapSelect(selectedRoadmap)}
                        disabled={!selectedRoadmap || isLoading}
                        size="lg"
                        className="bg-[#D4A574] hover:bg-[#C19660] text-white border-0 font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                Setting up your roadmap...
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <Star className="h-5 w-5 mr-2" />
                                Start My {selectedRoadmap === "push_static" ? "Push" : selectedRoadmap === "pull_static" ? "Pull" : ""}{" "}
                                Journey
                            </div>
                        )}
                    </Button>

                    <Button
                        onClick={handleSkipRoadmap}
                        variant="outline"
                        size="lg"
                        className="border-[#E5DDD5] text-[#6B5B73] bg-white hover:bg-[#FAF8F5] hover:border-[#D4A574] font-semibold px-8 py-4 rounded-xl transition-all duration-200"
                    >
                        Skip - Use Free Analyzer
                    </Button>
                </div>

                <div className="text-center mt-6">
                    <p className="text-xs text-[#7A8471]">
                        You can always change your roadmap or switch to free analysis mode later
                    </p>
                </div>

                {/* Selected Roadmap Preview */}
                {selectedRoadmap && (
                    <div className="mt-8 p-6 bg-white rounded-xl border border-[#D4A574] shadow-lg">
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-[#3A3A3A] mb-2">
                                🎯 You've selected: {roadmaps.find((r) => r.id === selectedRoadmap)?.name} Roadmap
                            </h3>
                            <p className="text-[#6B5B73] text-sm mb-4">
                                {selectedRoadmap === "push_static"
                                    ? "You'll start with L-sit, progress through V-sit, then master all planche progressions from lean to full planche!"
                                    : "You'll master all back lever progressions, then progress through all front lever variations!"}
                            </p>
                            <div className="flex items-center justify-center space-x-6 text-sm text-[#7A8471]">
                                <div className="flex items-center space-x-1">
                                    <Trophy className="h-4 w-4" />
                                    <span>{roadmaps.find((r) => r.id === selectedRoadmap)?.skills.length} main skills</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>~{roadmaps.find((r) => r.id === selectedRoadmap)?.totalWeeks} weeks</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4" />
                                    <span>Progressive mastery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
