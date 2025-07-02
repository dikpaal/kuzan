"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Camera, Activity, ChevronDown, ChevronRight } from "lucide-react"
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
        <div className="min-h-screen bg-stone-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Activity className="h-6 w-6 text-stone-600" />
                        <h1 className="text-2xl font-medium text-stone-800">Kuzan</h1>
                    </div>
                    <p className="text-stone-600 max-w-lg mx-auto">
                        Upload a photo of your movement and get feedback on your form
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {/* Upload Section */}
                    <Card className="border-stone-200 shadow-sm">
                        <CardContent className="p-6">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">Upload Photo</h2>

                            {/* Skill Selection Dropdown */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-stone-700 mb-2">Select Skill</label>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full flex items-center justify-between px-3 py-2 border border-stone-300 rounded-md text-sm bg-white text-stone-700 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                                    >
                                        {selectedSkill ? selectedSkill.name : "Choose a skill"}
                                        <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-stone-300 rounded-md shadow-lg">
                                            <div className="py-1">
                                                {/* Planche Category */}
                                                <div>
                                                    <button
                                                        onClick={() => toggleCategory("planche")}
                                                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                                                    >
                                                        <span>{skillCategories.planche.name}</span>
                                                        <ChevronRight
                                                            className={`h-4 w-4 transition-transform ${expandedCategory === "planche" ? "rotate-90" : ""}`}
                                                        />
                                                    </button>
                                                    {expandedCategory === "planche" && (
                                                        <div className="bg-stone-25">
                                                            {skillCategories.planche.skills.map((skill) => (
                                                                <button
                                                                    key={skill.id}
                                                                    onClick={() => handleSkillSelect(skill.id, skill.name, "planche")}
                                                                    className="w-full text-left px-6 py-2 text-sm text-stone-600 hover:bg-stone-100"
                                                                >
                                                                    {skill.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="border-t border-stone-200 my-1"></div>

                                                {/* Front-lever Category */}
                                                <div>
                                                    <button
                                                        onClick={() => toggleCategory("frontLever")}
                                                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                                                    >
                                                        <span>{skillCategories.frontLever.name}</span>
                                                        <ChevronRight
                                                            className={`h-4 w-4 transition-transform ${expandedCategory === "frontLever" ? "rotate-90" : ""}`}
                                                        />
                                                    </button>
                                                    {expandedCategory === "frontLever" && (
                                                        <div className="bg-stone-25">
                                                            {skillCategories.frontLever.skills.map((skill) => (
                                                                <button
                                                                    key={skill.id}
                                                                    onClick={() => handleSkillSelect(skill.id, skill.name, "front-lever")}
                                                                    className="w-full text-left px-6 py-2 text-sm text-stone-600 hover:bg-stone-100"
                                                                >
                                                                    {skill.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="border-t border-stone-200 my-1"></div>

                                                {/* Back-lever Category */}
                                                <div>
                                                    <button
                                                        onClick={() => toggleCategory("backLever")}
                                                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                                                    >
                                                        <span>{skillCategories.backLever.name}</span>
                                                        <ChevronRight
                                                            className={`h-4 w-4 transition-transform ${expandedCategory === "backLever" ? "rotate-90" : ""}`}
                                                        />
                                                    </button>
                                                    {expandedCategory === "backLever" && (
                                                        <div className="bg-stone-25">
                                                            {skillCategories.backLever.skills.map((skill) => (
                                                                <button
                                                                    key={skill.id}
                                                                    onClick={() => handleSkillSelect(skill.id, skill.name, "back-lever")}
                                                                    className="w-full text-left px-6 py-2 text-sm text-stone-600 hover:bg-stone-100"
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
                                <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-stone-400 transition-colors">
                                    <Camera className="h-8 w-8 text-stone-400 mx-auto mb-3" />
                                    <p className="text-stone-600 mb-3">Choose a photo</p>
                                    <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="file-upload" />
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="border-stone-300 text-stone-700 bg-transparent"
                                    >
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            Browse
                                        </label>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="rounded-lg overflow-hidden bg-stone-100">
                                        <Image
                                            src={previewUrl || "/placeholder.svg"}
                                            alt="Preview"
                                            width={300}
                                            height={200}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={analyzeSkill}
                                            disabled={isProcessing || !selectedSkill}
                                            size="sm"
                                            className="flex-1 bg-stone-700 hover:bg-stone-800 disabled:opacity-50"
                                        >
                                            {isProcessing ? "Analyzing..." : "Analyze"}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={resetAnalysis}
                                            className="border-stone-300 text-stone-700 bg-transparent"
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Results Section */}
                    <Card className="border-stone-200 shadow-sm">
                        <CardContent className="p-6">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">Analysis</h2>

                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center h-48 space-y-3">
                                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-stone-300 border-t-stone-600"></div>
                                    <p className="text-stone-600 text-sm">Analyzing your form...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                                        <span className="text-sm text-stone-600">Skill:</span>
                                        <span className="text-sm font-medium text-stone-800">{selectedSkill?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                                        <span className="text-sm text-stone-600">Level:</span>
                                        <span className="text-sm font-medium text-stone-800">{result.skillLevel}</span>
                                    </div>

                                    <div className="rounded-lg overflow-hidden bg-stone-100">
                                        <Image
                                            src={`data:image/jpeg;base64,${result.processedImage}`}
                                            alt="Analysis result"
                                            width={300}
                                            height={128}
                                            className="w-full h-32 object-cover"
                                        />
                                    </div>

                                    <div className="prose prose-sm prose-stone max-w-none">
                                        <ReactMarkdown
                                            components={{
                                                h2: ({ children }) => <h3 className="text-base font-medium text-stone-800 mb-2">{children}</h3>,
                                                p: ({ children }) => <p className="text-sm text-stone-700 mb-2">{children}</p>,
                                                strong: ({ children }) => <strong className="font-medium text-stone-800">{children}</strong>,
                                                ul: ({ children }) => <ul className="text-sm text-stone-700 space-y-1 mb-3">{children}</ul>,
                                                ol: ({ children }) => <ol className="text-sm text-stone-700 space-y-1 mb-3">{children}</ol>,
                                                li: ({ children }) => <li className="text-stone-700">{children}</li>,
                                            }}
                                        >
                                            {result.analysis}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-48 text-center space-y-3">
                                    <Upload className="h-8 w-8 text-stone-400" />
                                    <p className="text-stone-600 text-sm">
                                        {!selectedSkill ? "Select a skill and upload a photo" : "Upload a photo to get started"}
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
