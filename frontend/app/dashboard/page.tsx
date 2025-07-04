"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    Trophy,
    Target,
    BarChart3,
    Star,
    CheckCircle,
    Lock,
    Play,
    Camera,
    TrendingUp,
    Award,
    Zap,
    LogOut,
    Settings,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Roadmap configurations
const roadmapConfigs = {
    push_static: {
        name: "Push Static",
        skills: [
            {
                id: "lsit",
                name: "L-sit",
                status: "completed",
                score: 85,
                completedAt: "2024-01-15",
                attempts: 12,
                icon: "🔥",
                difficulty: "Beginner",
                subSkills: [],
            },
            {
                id: "vsit",
                name: "V-sit",
                status: "completed",
                score: 78,
                completedAt: "2024-01-18",
                attempts: 15,
                icon: "⚡",
                difficulty: "Intermediate",
                subSkills: [],
            },
            {
                id: "planche",
                name: "Planche",
                status: "current",
                score: 72,
                startedAt: "2024-01-20",
                attempts: 8,
                icon: "💪",
                difficulty: "Intermediate to Advanced",
                currentSubSkill: "planche_lean",
                subSkills: [
                    {
                        id: "planche_lean",
                        name: "Planche Lean",
                        status: "current",
                        score: 72,
                        attempts: 8,
                        icon: "📐",
                    },
                    {
                        id: "tuck_planche",
                        name: "Tuck Planche",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "🤏",
                    },
                    {
                        id: "advanced_tuck_planche",
                        name: "Advanced Tuck Planche",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "🔥",
                    },
                    {
                        id: "straddle_planche",
                        name: "Straddle Planche",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "⭐",
                    },
                    {
                        id: "full_planche",
                        name: "Full Planche",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "💪",
                    },
                ],
            },
        ],
        currentSkill: "planche",
        currentSubSkill: "planche_lean",
        currentGoal: "Master the Planche Lean",
        currentGoalIcon: "📐",
        color: "from-[#D4A574] to-[#C19660]",
        accentColor: "[#D4A574]",
    },
    pull_static: {
        name: "Pull Static",
        skills: [
            {
                id: "back_lever",
                name: "Back Lever",
                status: "current",
                score: 68,
                startedAt: "2024-01-18",
                attempts: 15,
                icon: "🔄",
                difficulty: "Intermediate to Advanced",
                currentSubSkill: "tuck_back_lever",
                subSkills: [
                    {
                        id: "tuck_back_lever",
                        name: "Tuck Back Lever",
                        status: "current",
                        score: 68,
                        attempts: 15,
                        icon: "🔄",
                    },
                    {
                        id: "advanced_tuck_back_lever",
                        name: "Advanced Tuck Back Lever",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "🌀",
                    },
                    {
                        id: "straddle_back_lever",
                        name: "Straddle Back Lever",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "⚡",
                    },
                    {
                        id: "full_back_lever",
                        name: "Full Back Lever",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "🎯",
                    },
                ],
            },
            {
                id: "front_lever",
                name: "Front Lever",
                status: "locked",
                score: null,
                attempts: 0,
                icon: "🏆",
                difficulty: "Advanced",
                subSkills: [
                    {
                        id: "tuck_front_lever",
                        name: "Tuck Front Lever",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "🔥",
                    },
                    {
                        id: "advanced_tuck_front_lever",
                        name: "Advanced Tuck Front Lever",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "💫",
                    },
                    {
                        id: "straddle_front_lever",
                        name: "Straddle Front Lever",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "⭐",
                    },
                    {
                        id: "full_front_lever",
                        name: "Full Front Lever",
                        status: "locked",
                        score: null,
                        attempts: 0,
                        icon: "🏆",
                    },
                ],
            },
        ],
        currentSkill: "back_lever",
        currentSubSkill: "tuck_back_lever",
        currentGoal: "Master the Tuck Back Lever",
        currentGoalIcon: "🔄",
        color: "from-[#7A8471] to-[#6B7562]",
        accentColor: "[#7A8471]",
    },
}

// Free analysis mode (no roadmap)
const freeAnalysisConfig = {
    name: "Free Analysis",
    skills: [],
    currentSkill: null,
    currentGoal: "Analyze any calisthenics skill",
    currentGoalIcon: "🎯",
    color: "from-[#D4A574] to-[#C19660]",
    accentColor: "[#D4A574]",
}

export default function DashboardPage() {
    const [userData, setUserData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null)
    const [skipRoadmap, setSkipRoadmap] = useState(false)
    const [expandedSkills, setExpandedSkills] = useState<{ [key: string]: boolean }>({})
    const router = useRouter()

    const toggleSkillExpansion = (skillId: string) => {
        setExpandedSkills((prev) => ({
            ...prev,
            [skillId]: !prev[skillId],
        }))
    }

    useEffect(() => {
        // Check localStorage for roadmap selection or skip preference
        const roadmapChoice = localStorage.getItem("selectedRoadmap")
        const skipChoice = localStorage.getItem("skipRoadmap")

        if (roadmapChoice) {
            setSelectedRoadmap(roadmapChoice)
        } else if (skipChoice === "true") {
            setSkipRoadmap(true)
        } else {
            // No selection made, redirect to roadmap selection
            router.push("/roadmap-selection")
            return
        }

        // Generate mock data based on selection
        const generateUserData = () => {
            if (skipChoice === "true") {
                return {
                    id: "user-123",
                    email: "user@example.com",
                    roadmap: null,
                    stats: {
                        totalAnalyses: 8,
                        averageScore: 75,
                        currentStreak: 3,
                        skillsCompleted: 0,
                        totalSkills: 0,
                    },
                    recentAnalyses: [
                        { date: "2024-01-22", skill: "Planche", score: 65 },
                        { date: "2024-01-21", skill: "Front Lever", score: 70 },
                        { date: "2024-01-20", skill: "Handstand", score: 82 },
                    ],
                }
            }

            const config = roadmapConfigs[roadmapChoice as keyof typeof roadmapConfigs]
            const completedSkills = config.skills.filter((s) => s.status === "completed").length

            return {
                id: "user-123",
                email: "user@example.com",
                roadmap: {
                    id: roadmapChoice,
                    name: config.name,
                    currentSkill: config.currentSkill,
                    skills: config.skills,
                },
                stats: {
                    totalAnalyses: roadmapChoice === "push_static" ? 20 : 15,
                    averageScore: roadmapChoice === "push_static" ? 78 : 70,
                    currentStreak: roadmapChoice === "push_static" ? 5 : 4,
                    skillsCompleted: completedSkills,
                    totalSkills: config.skills.length,
                },
                recentAnalyses:
                    roadmapChoice === "push_static"
                        ? [
                            { date: "2024-01-22", skill: "Planche Lean", score: 72 },
                            { date: "2024-01-21", skill: "Planche Lean", score: 68 },
                            { date: "2024-01-20", skill: "V-sit", score: 78 },
                        ]
                        : [
                            { date: "2024-01-22", skill: "Tuck Back Lever", score: 68 },
                            { date: "2024-01-21", skill: "Tuck Back Lever", score: 65 },
                            { date: "2024-01-20", skill: "Tuck Back Lever", score: 62 },
                        ],
            }
        }

        // Simulate loading
        setTimeout(() => {
            setUserData(generateUserData())
            setIsLoading(false)
        }, 1000)
    }, [router])

    const handleSignOut = async () => {
        // Clear localStorage
        localStorage.removeItem("selectedRoadmap")
        localStorage.removeItem("skipRoadmap")
        router.push("/auth")
    }

    const handleChangeRoadmap = () => {
        // Clear current selection and go back to roadmap selection
        localStorage.removeItem("selectedRoadmap")
        localStorage.removeItem("skipRoadmap")
        router.push("/roadmap-selection")
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "text-green-600 bg-green-50 border-green-200"
            case "current":
                return "text-[#D4A574] bg-[#FAF8F5] border-[#D4A574]"
            case "locked":
                return "text-gray-400 bg-gray-50 border-gray-200"
            default:
                return "text-gray-400 bg-gray-50 border-gray-200"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-5 w-5" />
            case "current":
                return <Play className="h-5 w-5" />
            case "locked":
                return <Lock className="h-5 w-5" />
            default:
                return <Lock className="h-5 w-5" />
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#D4A574] border-t-transparent mx-auto mb-4"></div>
                    <p className="text-[#6B5B73]">Loading your progress...</p>
                </div>
            </div>
        )
    }

    if (!userData) {
        return null
    }

    const currentConfig = skipRoadmap
        ? freeAnalysisConfig
        : roadmapConfigs[selectedRoadmap as keyof typeof roadmapConfigs] || freeAnalysisConfig

    return (
        <div className="min-h-screen bg-[#F5F1ED] font-poppins">
            {/* Header */}
            <div className="bg-white border-b border-[#E5DDD5] sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-[#D4A574] rounded-lg flex items-center justify-center">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#3A3A3A]">Kuzan Dashboard</h1>
                                <p className="text-xs text-[#6B5B73]">
                                    {skipRoadmap ? "Free Analysis Mode" : `${currentConfig.name} Journey`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-xs font-medium text-[#6B5B73]">{userData.email}</p>
                            </div>
                            <Button
                                onClick={handleChangeRoadmap}
                                variant="outline"
                                size="sm"
                                className="border-[#E5DDD5] text-[#3A3A3A] bg-white hover:bg-[#FAF8F5] hover:border-[#D4A574]"
                            >
                                <Settings className="h-4 w-4 mr-2" />
                                Change Path
                            </Button>
                            <Button
                                onClick={handleSignOut}
                                variant="outline"
                                size="sm"
                                className="border-[#E5DDD5] text-[#3A3A3A] bg-white hover:bg-[#FAF8F5] hover:border-[#D4A574]"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-[#E5DDD5] bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#6B5B73]">{skipRoadmap ? "Skills Analyzed" : "Main Skills Completed"}</p>
                                    <p className="text-2xl font-bold text-[#3A3A3A]">
                                        {skipRoadmap ? "Mixed" : `${userData.stats.skillsCompleted}/${userData.stats.totalSkills}`}
                                    </p>
                                </div>
                                <Trophy className="h-8 w-8 text-[#D4A574]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#E5DDD5] bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#6B5B73]">Average Score</p>
                                    <p className="text-2xl font-bold text-[#3A3A3A]">{userData.stats.averageScore}%</p>
                                </div>
                                <BarChart3 className="h-8 w-8 text-[#7A8471]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#E5DDD5] bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#6B5B73]">Current Streak</p>
                                    <p className="text-2xl font-bold text-[#3A3A3A]">{userData.stats.currentStreak} days</p>
                                </div>
                                <Star className="h-8 w-8 text-[#D4A574]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#E5DDD5] bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#6B5B73]">Total Analyses</p>
                                    <p className="text-2xl font-bold text-[#3A3A3A]">{userData.stats.totalAnalyses}</p>
                                </div>
                                <Camera className="h-8 w-8 text-[#7A8471]" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Roadmap Progress or Free Analysis */}
                    <div className="lg:col-span-2">
                        {skipRoadmap ? (
                            // Free Analysis Mode
                            <Card className="border-[#E5DDD5] bg-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-[#3A3A3A]">
                                        <Target className="h-5 w-5 mr-2 text-[#D4A574]" />
                                        Free Analysis Mode
                                    </CardTitle>
                                    <p className="text-[#6B5B73] text-sm">
                                        Analyze any calisthenics skill without following a structured roadmap
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Camera className="h-10 w-10 text-[#D4A574]" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-[#3A3A3A] mb-2">Ready to Analyze</h3>
                                        <p className="text-[#6B5B73] mb-6 max-w-md mx-auto">
                                            Upload a photo of any calisthenics movement to get instant AI-powered feedback and form analysis.
                                        </p>
                                        <Button asChild className="bg-[#D4A574] hover:bg-[#C19660] text-white">
                                            <Link href="/analyze-form">
                                                <Camera className="h-4 w-4 mr-2" />
                                                Start Analysis
                                            </Link>
                                        </Button>
                                    </div>

                                    <div className="border-t border-[#E5DDD5] pt-6">
                                        <h4 className="font-semibold text-[#3A3A3A] mb-4">Want Structure?</h4>
                                        <p className="text-[#6B5B73] text-sm mb-4">
                                            Consider following a structured roadmap to guide your calisthenics journey with progressive skill
                                            development.
                                        </p>
                                        <Button
                                            onClick={handleChangeRoadmap}
                                            variant="outline"
                                            className="border-[#E5DDD5] text-[#3A3A3A] hover:bg-[#FAF8F5] bg-transparent"
                                        >
                                            <Target className="h-4 w-4 mr-2" />
                                            Choose a Roadmap
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            // Roadmap Progress Mode
                            <Card className="border-[#E5DDD5] bg-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-[#3A3A3A]">
                                        <Target className="h-5 w-5 mr-2 text-[#D4A574]" />
                                        {userData.roadmap.name} Roadmap
                                    </CardTitle>
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm text-[#6B5B73] mb-2">
                                            <span>Progress</span>
                                            <span>
                                                {userData.stats.skillsCompleted}/{userData.stats.totalSkills} main skills completed
                                            </span>
                                        </div>
                                        <Progress
                                            value={(userData.stats.skillsCompleted / userData.stats.totalSkills) * 100}
                                            className="h-2"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {userData.roadmap.skills.map((skill: any, index: number) => (
                                        <div key={skill.id} className="space-y-2">
                                            {/* Main Skill */}
                                            <div
                                                className={`skill-card-smooth p-4 rounded-xl border-2 transition-all duration-300 ease-in-out ${getStatusColor(skill.status)}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="text-2xl">{skill.icon}</div>
                                                        <div>
                                                            <h3 className="font-semibold">{skill.name}</h3>
                                                            <div className="flex items-center space-x-4 text-sm opacity-75">
                                                                <span>{skill.difficulty}</span>
                                                                <span>{skill.attempts} attempts</span>
                                                                {skill.score && <span>Best: {skill.score}%</span>}
                                                                {skill.subSkills.length > 0 && <span>{skill.subSkills.length} progressions</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        {skill.subSkills.length > 0 && (
                                                            <button
                                                                onClick={() => toggleSkillExpansion(skill.id)}
                                                                className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                                                            >
                                                                <ChevronRight
                                                                    className={`h-4 w-4 chevron-smooth ${expandedSkills[skill.id] ? "expanded" : "collapsed"
                                                                        }`}
                                                                />
                                                            </button>
                                                        )}
                                                        {getStatusIcon(skill.status)}
                                                        {skill.status === "current" && (
                                                            <Button asChild size="sm" className="bg-[#D4A574] hover:bg-[#C19660] text-white">
                                                                <Link href="/analyze-form">
                                                                    <Camera className="h-4 w-4 mr-1" />
                                                                    Analyze
                                                                </Link>
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sub-skills expansion */}
                                            {skill.subSkills.length > 0 && (
                                                <div
                                                    className={`skill-expansion-container ml-6 border-l-2 border-[#E5DDD5] pl-4 ${expandedSkills[skill.id] ? "expanding" : "collapsing"
                                                        }`}
                                                    style={{
                                                        maxHeight: expandedSkills[skill.id] ? "500px" : "0px",
                                                        opacity: expandedSkills[skill.id] ? 1 : 0,
                                                        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                                        paddingTop: expandedSkills[skill.id] ? "0.5rem" : "0",
                                                        paddingBottom: expandedSkills[skill.id] ? "0.5rem" : "0",
                                                        marginTop: expandedSkills[skill.id] ? "0.5rem" : "0",
                                                    }}
                                                >
                                                    <div className="space-y-3">
                                                        {skill.subSkills.map((subSkill: any, subIndex: number) => (
                                                            <div
                                                                key={subSkill.id}
                                                                className={`sub-skill-smooth cascade-item-${subIndex + 1} p-3 rounded-lg border transition-all duration-300 ease-out ${getStatusColor(subSkill.status)} ${expandedSkills[skill.id]
                                                                    ? "visible animate-cascade-emerge"
                                                                    : "animate-cascade-disappear"
                                                                    }`}
                                                                style={{
                                                                    animationDelay: expandedSkills[skill.id]
                                                                        ? `${subIndex * 100}ms`
                                                                        : `${(skill.subSkills.length - subIndex - 1) * 50}ms`,
                                                                    animationFillMode: "forwards",
                                                                }}
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center space-x-3">
                                                                        <span className="text-lg transform transition-transform duration-200 hover:scale-110">
                                                                            {subSkill.icon}
                                                                        </span>
                                                                        <div>
                                                                            <h4 className="text-sm font-medium">{subSkill.name}</h4>
                                                                            <div className="flex items-center space-x-3 text-xs opacity-75">
                                                                                <span>{subSkill.attempts} attempts</span>
                                                                                {subSkill.score && <span>Best: {subSkill.score}%</span>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        {getStatusIcon(subSkill.status)}
                                                                        {subSkill.status === "current" && (
                                                                            <Button
                                                                                asChild
                                                                                size="sm"
                                                                                className="bg-[#D4A574] hover:bg-[#C19660] text-white text-xs px-2 py-1 h-auto transform transition-all duration-200 hover:scale-105 hover:shadow-md"
                                                                            >
                                                                                <Link href="/analyze-form">
                                                                                    <Camera className="h-3 w-3 mr-1" />
                                                                                    Practice
                                                                                </Link>
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card className="border-[#E5DDD5] bg-white">
                            <CardHeader>
                                <CardTitle className="text-[#3A3A3A] text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full bg-[#D4A574] hover:bg-[#C19660] text-white justify-start">
                                    <Link href="/analyze-form">
                                        <Camera className="h-4 w-4 mr-2" />
                                        {skipRoadmap ? "Analyze Any Skill" : "Analyze Current Skill"}
                                    </Link>
                                </Button>
                                {!skipRoadmap && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full border-[#E5DDD5] text-[#3A3A3A] hover:bg-[#FAF8F5] justify-start bg-transparent"
                                    >
                                        <Link href="/analyze-form">
                                            <Target className="h-4 w-4 mr-2" />
                                            Free Form Analysis
                                        </Link>
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    className="w-full border-[#E5DDD5] text-[#3A3A3A] hover:bg-[#FAF8F5] justify-start bg-transparent"
                                >
                                    <Award className="h-4 w-4 mr-2" />
                                    View Achievements
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="border-[#E5DDD5] bg-white">
                            <CardHeader>
                                <CardTitle className="text-[#3A3A3A] text-lg flex items-center">
                                    <TrendingUp className="h-5 w-5 mr-2 text-[#7A8471]" />
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {userData.recentAnalyses.map((analysis: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-[#3A3A3A]">{analysis.skill}</p>
                                            <p className="text-xs text-[#6B5B73]">{analysis.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-[#D4A574]">{analysis.score}%</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Current Goal */}
                        <Card className={`border-[#E5DDD5] bg-gradient-to-br ${currentConfig.color} text-white`}>
                            <CardContent className="p-6">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">{currentConfig.currentGoalIcon}</div>
                                    <h3 className="font-bold mb-2">Current Focus</h3>
                                    <p className="text-sm opacity-90 mb-4">{currentConfig.currentGoal}</p>
                                    <Button asChild variant="secondary" size="sm" className="bg-white text-[#D4A574] hover:bg-gray-50">
                                        <Link href="/analyze-form">{skipRoadmap ? "Analyze Now" : "Practice Now"}</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
