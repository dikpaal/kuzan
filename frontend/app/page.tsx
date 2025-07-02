"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Camera, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

export default function CalisthenicsAnalyzer() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [result, setResult] = useState<AnalysisResult | null>(null)
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

    const handleFileSelect = (file: File) => {
        setSelectedFile(file)
        setResult(null)

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

        const formData = new FormData()
        formData.append("file", selectedFile)
        formData.append("skill_id", selectedSkill.id)

        try {
            const response = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data: AnalysisResult = await response.json()
            setResult(data)
        } catch (error) {
            console.error("Error analyzing skill:", error)
            // Optionally, set an error state here to display to the user
        } finally {
            setIsProcessing(false)
        }
    }

    const resetAnalysis = () => {
        setSelectedFile(null)
        setPreviewUrl(null)
        setResult(null)
        setIsProcessing(false)
        setSelectedSkill(null)
    }

    return (
        <div className="min-h-screen bg-[#F5F1ED] py-12 px-4 font-poppins">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Image src="/kuzan-logo.png" alt="Kuzan Logo" width={48} height={48} className="w-12 h-12" />
                        <h1 className="text-4xl font-bold text-[#3A3A3A] tracking-tight">Kuzan</h1>
                    </div>
                    <p className="text-[#6B5B73] max-w-lg mx-auto text-lg font-medium">
                        Upload a photo of your movement and get feedback on your form
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {/* Upload Section */}
                    <Card className="border-[#E5DDD5] shadow-sm bg-white rounded-xl">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold text-[#3A3A3A] mb-4">Upload Photo</h2>

                            {/* Skill Selection Dropdown */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-[#3A3A3A] mb-2">Select Skill</label>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full flex items-center justify-between px-4 py-3 border border-[#E5DDD5] rounded-lg text-sm bg-white text-[#3A3A3A] hover:bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200 font-medium"
                                    >
                                        {selectedSkill ? selectedSkill.name : "Choose a skill"}
                                        <ChevronDown
                                            className={`h-4 w-4 text-[#7A8471] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-[#E5DDD5] rounded-lg shadow-lg">
                                            <div className="py-1">
                                                {/* Planche Category */}
                                                <div>
                                                    <button
                                                        onClick={() => toggleCategory("planche")}
                                                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#3A3A3A] hover:bg-[#FAF8F5] font-semibold transition-colors duration-150"
                                                    >
                                                        <span>{skillCategories.planche.name}</span>
                                                        <ChevronRight
                                                            className={`h-4 w-4 text-[#7A8471] transition-transform duration-200 ${expandedCategory === "planche" ? "rotate-90" : ""}`}
                                                        />
                                                    </button>
                                                    {expandedCategory === "planche" && (
                                                        <div className="bg-[#FAF8F5]">
                                                            {skillCategories.planche.skills.map((skill) => (
                                                                <button
                                                                    key={skill.id}
                                                                    onClick={() => handleSkillSelect(skill.id, skill.name, "planche")}
                                                                    className="w-full text-left px-6 py-2.5 text-sm text-[#6B5B73] hover:bg-[#F0EBE3] hover:text-[#D4A574] transition-colors duration-150 font-medium"
                                                                >
                                                                    {skill.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="border-t border-[#E5DDD5] my-1"></div>

                                                {/* Front-lever Category */}
                                                <div>
                                                    <button
                                                        onClick={() => toggleCategory("frontLever")}
                                                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#3A3A3A] hover:bg-[#FAF8F5] font-semibold transition-colors duration-150"
                                                    >
                                                        <span>{skillCategories.frontLever.name}</span>
                                                        <ChevronRight
                                                            className={`h-4 w-4 text-[#7A8471] transition-transform duration-200 ${expandedCategory === "frontLever" ? "rotate-90" : ""}`}
                                                        />
                                                    </button>
                                                    {expandedCategory === "frontLever" && (
                                                        <div className="bg-[#FAF8F5]">
                                                            {skillCategories.frontLever.skills.map((skill) => (
                                                                <button
                                                                    key={skill.id}
                                                                    onClick={() => handleSkillSelect(skill.id, skill.name, "front-lever")}
                                                                    className="w-full text-left px-6 py-2.5 text-sm text-[#6B5B73] hover:bg-[#F0EBE3] hover:text-[#D4A574] transition-colors duration-150 font-medium"
                                                                >
                                                                    {skill.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="border-t border-[#E5DDD5] my-1"></div>

                                                {/* Back-lever Category */}
                                                <div>
                                                    <button
                                                        onClick={() => toggleCategory("backLever")}
                                                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#3A3A3A] hover:bg-[#FAF8F5] font-semibold transition-colors duration-150"
                                                    >
                                                        <span>{skillCategories.backLever.name}</span>
                                                        <ChevronRight
                                                            className={`h-4 w-4 text-[#7A8471] transition-transform duration-200 ${expandedCategory === "backLever" ? "rotate-90" : ""}`}
                                                        />
                                                    </button>
                                                    {expandedCategory === "backLever" && (
                                                        <div className="bg-[#FAF8F5]">
                                                            {skillCategories.backLever.skills.map((skill) => (
                                                                <button
                                                                    key={skill.id}
                                                                    onClick={() => handleSkillSelect(skill.id, skill.name, "back-lever")}
                                                                    className="w-full text-left px-6 py-2.5 text-sm text-[#6B5B73] hover:bg-[#F0EBE3] hover:text-[#D4A574] transition-colors duration-150 font-medium"
                                                                >
                                                                    {skill.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {!previewUrl ? (
                                <div className="border-2 border-dashed border-[#E5DDD5] rounded-xl p-8 text-center hover:border-[#D4A574] transition-colors duration-200">
                                    <Camera className="h-10 w-10 text-[#7A8471] mx-auto mb-4" />
                                    <p className="text-[#6B5B73] mb-4 font-medium">Choose a photo</p>
                                    <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="file-upload" />
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="border-[#E5DDD5] text-[#3A3A3A] bg-white hover:bg-[#FAF8F5] hover:border-[#D4A574] font-medium px-6 py-2 rounded-lg transition-all duration-200"
                                    >
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            Browse Files
                                        </label>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="rounded-xl overflow-hidden bg-[#FAF8F5]">
                                        <Image
                                            src={previewUrl || "/placeholder.svg"}
                                            alt="Preview"
                                            width={300}
                                            height={200}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={analyzeSkill}
                                            disabled={isProcessing || !selectedSkill}
                                            size="sm"
                                            className="flex-1 bg-[#D4A574] hover:bg-[#C19660] text-white disabled:opacity-50 border-0 font-semibold py-2.5 rounded-lg transition-all duration-200"
                                        >
                                            {isProcessing ? "Analyzing..." : "Analyze Form"}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={resetAnalysis}
                                            className="border-[#E5DDD5] text-[#3A3A3A] bg-white hover:bg-[#FAF8F5] font-medium px-4 rounded-lg transition-all duration-200"
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Results Section */}
                    <Card className="border-[#E5DDD5] shadow-sm bg-white rounded-xl">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold text-[#3A3A3A] mb-4">Analysis Results</h2>

                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-48 space-y-4">
                                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#E5DDD5] border-t-[#D4A574]"></div>
                                    <p className="text-[#6B5B73] text-sm font-medium">Analyzing your form...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-3 border-b border-[#E5DDD5]">
                                        <span className="text-sm text-[#6B5B73] font-medium">Skill:</span>
                                        <span className="text-sm font-semibold text-[#3A3A3A]">{selectedSkill?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 pb-3 border-b border-[#E5DDD5]">
                                        <span className="text-sm text-[#6B5B73] font-medium">Level:</span>
                                        <span className="text-sm font-semibold text-[#D4A574]">{result.skillLevel}</span>
                                    </div>

                                    <div className="rounded-xl overflow-hidden bg-[#FAF8F5]">
                                        <Image
                                            src={`data:image/jpeg;base64,${result.processedImage}`}
                                            alt="Analysis result"
                                            width={300}
                                            height={128}
                                            className="w-full h-32 object-cover"
                                        />
                                    </div>

                                    <div className="prose prose-sm max-w-none">
                                        <ReactMarkdown
                                            components={{
                                                h2: ({ children }) => (
                                                    <h3 className="text-base font-semibold text-[#3A3A3A] mb-3 mt-4">{children}</h3>
                                                ),
                                                p: ({ children }) => <p className="text-sm text-[#6B5B73] mb-3 leading-relaxed">{children}</p>,
                                                strong: ({ children }) => <strong className="font-semibold text-[#3A3A3A]">{children}</strong>,
                                                ul: ({ children }) => (
                                                    <ul className="text-sm text-[#6B5B73] space-y-1.5 mb-4 ml-4">{children}</ul>
                                                ),
                                                ol: ({ children }) => (
                                                    <ol className="text-sm text-[#6B5B73] space-y-1.5 mb-4 ml-4">{children}</ol>
                                                ),
                                                li: ({ children }) => <li className="text-[#6B5B73] leading-relaxed">{children}</li>,
                                            }}
                                        >
                                            {result.analysis}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-48 text-center space-y-4">
                                    <Upload className="h-10 w-10 text-[#7A8471]" />
                                    <p className="text-[#6B5B73] text-sm font-medium max-w-xs">
                                        {!selectedSkill
                                            ? "Select a skill and upload a photo to get started"
                                            : "Upload a photo to analyze your form"}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
