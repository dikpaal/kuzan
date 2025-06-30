"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Camera, Activity } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

interface AnalysisResult {
    processedImage: string
    analysis: string
    skillLevel: string
}

export default function CalisthenicsAnalyzer() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [result, setResult] = useState<AnalysisResult | null>(null)

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

    const analyzeSkill = async () => {
        if (!selectedFile) return

        setIsProcessing(true)

        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2500))

        // Dummy response data
        const dummyResult: AnalysisResult = {
            processedImage: "/placeholder.svg?height=300&width=300",
            analysis: `## Form Analysis

**Overall**: Good foundation, room for improvement

**Strengths**
- Proper grip width
- Core engaged well
- Good starting position

**Areas to work on**
- Pull shoulder blades down first
- Get chin over the bar
- Control the descent (3-4 seconds)

**Next steps**
1. Practice dead hangs (30-60 seconds)
2. Focus on negative pull-ups
3. Work on scapular pulls

Keep practicing consistently - you're on the right track!`,
            skillLevel: "Beginner+",
        }

        setResult(dummyResult)
        setIsProcessing(false)
    }

    const resetAnalysis = () => {
        setSelectedFile(null)
        setPreviewUrl(null)
        setResult(null)
        setIsProcessing(false)
    }

    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Activity className="h-6 w-6 text-stone-600" />
                        <h1 className="text-2xl font-medium text-stone-800">Form Check</h1>
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
                                            disabled={isProcessing}
                                            size="sm"
                                            className="flex-1 bg-stone-700 hover:bg-stone-800"
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
                                        <span className="text-sm text-stone-600">Level:</span>
                                        <span className="text-sm font-medium text-stone-800">{result.skillLevel}</span>
                                    </div>

                                    <div className="rounded-lg overflow-hidden bg-stone-100">
                                        <Image
                                            src={result.processedImage || "/placeholder.svg"}
                                            alt="Analysis result"
                                            width={300}
                                            height={200}
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
                                    <p className="text-stone-600 text-sm">Upload a photo to get started</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}