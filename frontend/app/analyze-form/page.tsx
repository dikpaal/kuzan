"use client"

import type React from "react"
import { useEffect } from "react"

import { useState } from "react"
import { Camera, ChevronDown, ChevronRight, Zap, Target, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

interface AnalysisResult {
    processedImage: string
    analysis: string
    skillLevel: string
}

interface Skill {
    id: string
    name: string
    category: string
}

const skillCategories = {
    planche: {
        name: "Planche",
        skills: [
            { id: "planche_lean", name: "Planche lean" },
            { id: "tuck_planche", name: "Tuck planche" },
            { id: "advanced_tuck_planche", name: "Advanced tuck planche" },
            { id: "straddle_planche", name: "Straddle planche" },
            { id: "full_planche", name: "Full planche" },
        ],
    },
    frontLever: {
        name: "Front-lever",
        skills: [
            { id: "tuck_front_lever", name: "Tuck front-lever" },
            { id: "advanced_tuck_front_lever", name: "Advanced tuck front-lever" },
            { id: "straddle_front_lever", name: "Straddle front-lever" },
            { id: "full_front_lever", name: "Full front-lever" },
        ],
    },
    backLever: {
        name: "Back-lever",
        skills: [
            { id: "tuck_back_lever", name: "Tuck back-lever" },
            { id: "advanced_tuck_back_lever", name: "Advanced tuck back-lever" },
            { id: "straddle_back_lever", name: "Straddle back-lever" },
            { id: "full_back_lever", name: "Full back-lever" },
        ],
    },
}

// Futuristic Loading Component
const FuturisticLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-[#E5DDD5]/30"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#D4A574] border-r-[#D4A574]/50 animate-spin"></div>
                <div className="absolute inset-3 rounded-full border border-[#7A8471]/40 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#D4A574] rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>

            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#D4A574] rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 bg-[#7A8471] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-[#D4A574] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>

            <div className="text-center">
                <div className="text-[#6B5B73] text-sm font-medium">
                    Analyzing your form<span className="animate-pulse">...</span>
                </div>
                <div className="text-xs text-[#7A8471] font-medium mt-1">AI Processing</div>
            </div>
        </div>
    )
}

export default function CalisthenicsAnalyzer() {

    useEffect(() => {
        // Remove URL fragment after OAuth redirect
        if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname)
        }
    }, [])


    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [result, setResult] = useState<AnalysisResult | null>(null)
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
    const [showResults, setShowResults] = useState(false)

    const handleFileSelect = (file: File) => {
        setSelectedFile(file)
        setResult(null)
        setShowResults(false)

        const reader = new FileReader()
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0])
        }
    }

    const handleSkillSelect = (skillId: string, skillName: string, category: string) => {
        setSelectedSkill({
            id: skillId,
            name: skillName,
            category: category,
        })
        setIsDropdownOpen(false)
        setExpandedCategory(null)
    }

    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category)
    }

    const analyzeSkill = async () => {
        if (!selectedFile || !selectedSkill) return

        setIsProcessing(true)
        setShowResults(false)

        const formData = new FormData()
        formData.append("file", selectedFile)
        formData.append("skill_id", selectedSkill.id)

        try {
            const response = await fetch("http://localhost:8000/analyze-form", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data: AnalysisResult = await response.json()
            setResult(data)
            setTimeout(() => setShowResults(true), 100)
        } catch (error) {
            console.error("Error analyzing skill:", error)
        } finally {
            setIsProcessing(false)
        }
    }

    const resetAnalysis = () => {
        setSelectedFile(null)
        setPreviewUrl(null)
        setResult(null)
        setShowResults(false)
    }

    return (
        <div className="min-h-screen bg-[#F5F1ED] font-poppins">
            {/* Header */}
            <div className="bg-white border-b border-[#E5DDD5] sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h1 className="text-xl font-bold text-[#3A3A3A]">Kuzan Form Analyzer</h1>
                                <p className="text-xs text-[#6B5B73]">AI-Powered Calisthenics Analysis</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1 text-xs text-[#7A8471] bg-[#FAF8F5] px-3 py-1.5 rounded-full">
                                <Zap className="h-3 w-3" />
                                <span>AI Powered</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4 text-sm">
                        <div
                            className={`flex items-center space-x-2 transition-all duration-500 ease-out ${selectedSkill ? "text-[#D4A574]" : "text-[#6B5B73]"}`}
                        >
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500 ease-out transform ${selectedSkill
                                    ? "bg-[#D4A574] text-white scale-110 shadow-lg shadow-[#D4A574]/30"
                                    : "bg-[#E5DDD5] text-[#6B5B73] scale-100"
                                    }`}
                            >
                                1
                            </div>
                            <span className="font-medium transition-all duration-300">Select Skill</span>
                        </div>
                        <div
                            className={`w-8 h-px transition-all duration-700 ease-out ${selectedSkill ? "bg-[#D4A574] shadow-sm" : "bg-[#E5DDD5]"}`}
                        ></div>
                        <div
                            className={`flex items-center space-x-2 transition-all duration-500 ease-out ${previewUrl ? "text-[#D4A574]" : "text-[#6B5B73]"}`}
                        >
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500 ease-out transform ${previewUrl
                                    ? "bg-[#D4A574] text-white scale-110 shadow-lg shadow-[#D4A574]/30"
                                    : "bg-[#E5DDD5] text-[#6B5B73] scale-100"
                                    }`}
                            >
                                2
                            </div>
                            <span className="font-medium transition-all duration-300">Upload Photo</span>
                        </div>
                        <div
                            className={`w-8 h-px transition-all duration-700 ease-out ${previewUrl ? "bg-[#D4A574] shadow-sm" : "bg-[#E5DDD5]"}`}
                        ></div>
                        <div
                            className={`flex items-center space-x-2 transition-all duration-500 ease-out ${result ? "text-[#D4A574]" : "text-[#6B5B73]"}`}
                        >
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500 ease-out transform ${result
                                    ? "bg-[#D4A574] text-white scale-110 shadow-lg shadow-[#D4A574]/30"
                                    : isProcessing
                                        ? "bg-[#D4A574]/20 text-[#D4A574] scale-105 animate-pulse"
                                        : "bg-[#E5DDD5] text-[#6B5B73] scale-100"
                                    }`}
                            >
                                3
                            </div>
                            <span className={`font-medium transition-all duration-300 ${isProcessing ? "animate-pulse" : ""}`}>
                                Get Analysis
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Input */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Skill Selection */}
                        <Card className="border-[#E5DDD5] shadow-sm bg-white rounded-xl">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold text-[#3A3A3A] flex items-center">
                                    <Target className="h-5 w-5 mr-2 text-[#D4A574]" />
                                    Select Skill
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full flex items-center justify-between px-4 py-3 border border-[#E5DDD5] rounded-lg text-sm bg-white text-[#3A3A3A] hover:bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200 font-medium"
                                    >
                                        {selectedSkill ? selectedSkill.name : "Choose a skill to analyze"}
                                        <ChevronDown
                                            className={`h-4 w-4 text-[#7A8471] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-[#E5DDD5] rounded-lg shadow-lg">
                                            <div className="py-1">
                                                {Object.entries(skillCategories).map(([categoryKey, category]) => (
                                                    <div key={categoryKey}>
                                                        <button
                                                            onClick={() => toggleCategory(categoryKey)}
                                                            className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#3A3A3A] hover:bg-[#FAF8F5] font-semibold transition-colors duration-150"
                                                        >
                                                            <span>{category.name}</span>
                                                            <ChevronRight
                                                                className={`h-4 w-4 text-[#7A8471] transition-transform duration-200 ${expandedCategory === categoryKey ? "rotate-90" : ""}`}
                                                            />
                                                        </button>
                                                        {expandedCategory === categoryKey && (
                                                            <div className="bg-[#FAF8F5]">
                                                                {category.skills.map((skill) => (
                                                                    <button
                                                                        key={skill.id}
                                                                        onClick={() => handleSkillSelect(skill.id, skill.name, categoryKey)}
                                                                        className="w-full text-left px-6 py-2.5 text-sm text-[#6B5B73] hover:bg-[#F0EBE3] hover:text-[#D4A574] transition-colors duration-150 font-medium"
                                                                    >
                                                                        {skill.name}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {categoryKey !== "backLever" && <div className="border-t border-[#E5DDD5] my-1"></div>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Photo Upload */}
                        <Card className="border-[#E5DDD5] shadow-sm bg-white rounded-xl">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold text-[#3A3A3A] flex items-center">
                                    <Camera className="h-5 w-5 mr-2 text-[#D4A574]" />
                                    Upload Photo
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {!previewUrl ? (
                                    <div className="border-2 border-dashed border-[#E5DDD5] rounded-xl p-8 text-center hover:border-[#D4A574] transition-colors duration-200">
                                        <Camera className="h-12 w-12 text-[#7A8471] mx-auto mb-4" />
                                        <p className="text-[#6B5B73] mb-4 font-medium">Drop your photo here or click to browse</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileInput}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="border-[#E5DDD5] text-[#3A3A3A] bg-white hover:bg-[#FAF8F5] hover:border-[#D4A574] font-medium px-6 py-2 rounded-lg transition-all duration-200"
                                        >
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                Choose File
                                            </label>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="rounded-xl overflow-hidden bg-[#FAF8F5] relative">
                                            <Image
                                                src={previewUrl || "/placeholder.svg"}
                                                alt="Preview"
                                                width={300}
                                                height={200}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-2 right-2">
                                                {!isProcessing && (
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={resetAnalysis}
                                                        className="bg-white/90 hover:bg-white text-[#3A3A3A] text-xs px-2 py-1 h-auto"
                                                    >
                                                        Change
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            onClick={analyzeSkill}
                                            disabled={isProcessing || !selectedSkill}
                                            size="lg"
                                            className="w-full bg-[#D4A574] hover:bg-[#C19660] text-white disabled:opacity-50 border-0 font-semibold py-3 rounded-lg transition-all duration-200"
                                        >
                                            {isProcessing ? (
                                                <div className="flex items-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                                    Analyzing...
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <Zap className="h-4 w-4 mr-2" />
                                                    Analyze Form
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Results */}
                    <div className="lg:col-span-2">
                        <Card className="border-[#E5DDD5] shadow-sm bg-white rounded-xl h-full">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold text-[#3A3A3A] flex items-center">
                                    <BarChart3 className="h-5 w-5 mr-2 text-[#D4A574]" />
                                    Analysis Results
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-full">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center justify-center h-96">
                                        <FuturisticLoader />
                                    </div>
                                ) : result ? (
                                    <div
                                        className={`space-y-6 transition-all duration-1000 ease-out transform ${showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                            }`}
                                    >
                                        {/* Results Header */}
                                        <div
                                            className={`transition-all duration-700 ease-out transform ${showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                                }`}
                                            style={{ transitionDelay: "100ms" }}
                                        >
                                            <div className="grid grid-cols-2 gap-4 p-4 bg-[#FAF8F5] rounded-lg">
                                                <div>
                                                    <span className="text-sm text-[#6B5B73] font-medium">Analyzed Skill</span>
                                                    <p className="text-lg font-semibold text-[#3A3A3A]">{selectedSkill?.name}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-[#6B5B73] font-medium">Skill Level</span>
                                                    <p className="text-lg font-semibold text-[#D4A574]">{result.skillLevel}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Processed Image */}
                                        <div
                                            className={`transition-all duration-700 ease-out transform ${showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                                }`}
                                            style={{ transitionDelay: "300ms" }}
                                        >
                                            <div className="rounded-xl overflow-hidden bg-[#FAF8F5]">
                                                <Image
                                                    src={`data:image/jpeg;base64,${result.processedImage}`}
                                                    alt="Analysis result"
                                                    width={600}
                                                    height={300}
                                                    className="w-full h-auto object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Analysis Text */}
                                        <div
                                            className={`transition-all duration-700 ease-out transform ${showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                                }`}
                                            style={{ transitionDelay: "500ms" }}
                                        >
                                            <div className="prose prose-sm max-w-none">
                                                <ReactMarkdown
                                                    components={{
                                                        h2: ({ children }) => (
                                                            <h3 className="text-lg font-semibold text-[#3A3A3A] mb-3 mt-6 first:mt-0">{children}</h3>
                                                        ),
                                                        p: ({ children }) => <p className="text-[#6B5B73] mb-4 leading-relaxed">{children}</p>,
                                                        strong: ({ children }) => (
                                                            <strong className="font-semibold text-[#3A3A3A]">{children}</strong>
                                                        ),
                                                        ul: ({ children }) => <ul className="text-[#6B5B73] space-y-2 mb-4 ml-4">{children}</ul>,
                                                        ol: ({ children }) => <ol className="text-[#6B5B73] space-y-2 mb-4 ml-4">{children}</ol>,
                                                        li: ({ children }) => <li className="text-[#6B5B73] leading-relaxed">{children}</li>,
                                                    }}
                                                >
                                                    {result.analysis}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-96 text-center space-y-6">
                                        <div className="w-24 h-24 bg-[#FAF8F5] rounded-full flex items-center justify-center">
                                            <BarChart3 className="h-12 w-12 text-[#7A8471]" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#3A3A3A] mb-2">Ready to Analyze</h3>
                                            <p className="text-[#6B5B73] max-w-md">
                                                {!selectedSkill
                                                    ? "Select a calisthenics skill and upload a photo to get started with AI-powered form analysis."
                                                    : "Upload a photo of your movement to receive detailed feedback and recommendations."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
