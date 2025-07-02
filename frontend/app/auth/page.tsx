"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        rememberMe: false,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsLoading(false)
    }

    const toggleMode = () => {
        setIsSignUp(!isSignUp)
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            rememberMe: false,
        })
        setShowPassword(false)
        setShowConfirmPassword(false)
    }

    return (
        <div className="min-h-screen bg-[#F5F1ED] font-poppins flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-[#D4A574] rounded-lg flex items-center justify-center">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#3A3A3A]">Kuzan</h1>
                    </div>
                    <h2 className="text-xl font-semibold text-[#3A3A3A] mb-2">
                        {isSignUp ? "Create your account" : "Welcome back"}
                    </h2>
                    <p className="text-[#6B5B73] text-sm">
                        {isSignUp
                            ? "Start your calisthenics journey with AI-powered form analysis"
                            : "Sign in to continue your calisthenics journey"}
                    </p>
                </div>

                {/* Auth Toggle */}
                <div className="mb-6">
                    <div className="bg-white border border-[#E5DDD5] rounded-lg p-1 flex">
                        <button
                            onClick={() => isSignUp && toggleMode()}
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 ${!isSignUp
                                ? "bg-[#D4A574] text-white shadow-sm"
                                : "text-[#6B5B73] hover:text-[#3A3A3A] hover:bg-[#FAF8F5]"
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => !isSignUp && toggleMode()}
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 ${isSignUp
                                ? "bg-[#D4A574] text-white shadow-sm"
                                : "text-[#6B5B73] hover:text-[#3A3A3A] hover:bg-[#FAF8F5]"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Auth Form */}
                <Card className="border-[#E5DDD5] shadow-sm bg-white rounded-xl">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-[#3A3A3A] text-center">
                            {isSignUp ? "Create Account" : "Sign In"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Field - Only for Sign Up */}
                            {isSignUp && (
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-[#3A3A3A]">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7A8471]" />
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required={isSignUp}
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-[#E5DDD5] rounded-lg text-sm bg-white text-[#3A3A3A] placeholder-[#7A8471] hover:bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-[#3A3A3A]">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7A8471]" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-[#E5DDD5] rounded-lg text-sm bg-white text-[#3A3A3A] placeholder-[#7A8471] hover:bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-[#3A3A3A]">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7A8471]" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 border border-[#E5DDD5] rounded-lg text-sm bg-white text-[#3A3A3A] placeholder-[#7A8471] hover:bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200"
                                        placeholder={isSignUp ? "Create a password" : "Enter your password"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A8471] hover:text-[#D4A574] transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field - Only for Sign Up */}
                            {isSignUp && (
                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-[#3A3A3A]">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7A8471]" />
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            required={isSignUp}
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-12 py-3 border border-[#E5DDD5] rounded-lg text-sm bg-white text-[#3A3A3A] placeholder-[#7A8471] hover:bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200"
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A8471] hover:text-[#D4A574] transition-colors duration-200"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Remember Me & Forgot Password - Only for Sign In */}
                            {!isSignUp && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            checked={formData.rememberMe}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-[#D4A574] bg-white border-[#E5DDD5] rounded focus:ring-[#D4A574] focus:ring-2"
                                        />
                                        <label htmlFor="rememberMe" className="text-sm text-[#6B5B73]">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-[#D4A574] hover:text-[#C19660] font-medium transition-colors duration-200"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#D4A574] hover:bg-[#C19660] text-white disabled:opacity-50 border-0 font-semibold py-3 rounded-lg transition-all duration-200 mt-6"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                        {isSignUp ? "Creating Account..." : "Signing In..."}
                                    </div>
                                ) : (
                                    <>{isSignUp ? "Create Account" : "Sign In"}</>
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-[#E5DDD5]"></div>
                            <span className="px-4 text-xs text-[#7A8471] bg-white">or</span>
                            <div className="flex-1 border-t border-[#E5DDD5]"></div>
                        </div>

                        {/* Mode Switch Link */}
                        <div className="text-center">
                            <p className="text-sm text-[#6B5B73]">
                                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                                <button
                                    onClick={toggleMode}
                                    className="text-[#D4A574] hover:text-[#C19660] font-medium transition-colors duration-200"
                                >
                                    {isSignUp ? "Sign in" : "Sign up"}
                                </button>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-xs text-[#7A8471]">
                        {isSignUp ? (
                            <>
                                By creating an account, you agree to our{" "}
                                <Link href="/terms" className="text-[#D4A574] hover:text-[#C19660] transition-colors duration-200">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-[#D4A574] hover:text-[#C19660] transition-colors duration-200">
                                    Privacy Policy
                                </Link>
                            </>
                        ) : (
                            <>
                                Need help?{" "}
                                <Link href="/support" className="text-[#D4A574] hover:text-[#C19660] transition-colors duration-200">
                                    Contact Support
                                </Link>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}
