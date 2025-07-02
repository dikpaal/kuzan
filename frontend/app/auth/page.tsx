"use client"
import { useState } from "react"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false)

    const toggleMode = () => {
        setIsSignUp(!isSignUp)
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

                {/* Auth Card */}
                <Card className="border-[#E5DDD5] shadow-sm bg-white rounded-xl">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-[#3A3A3A] text-center">
                            {isSignUp ? "Create Account" : "Sign In"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Google Sign In Button */}
                        <Button
                            type="button"
                            onClick={async () => {
                                const { error } = await supabase.auth.signInWithOAuth({
                                    provider: "google",
                                    options: {
                                        redirectTo: `${window.location.origin}/analyze-form`,
                                    },
                                })
                                if (error) alert(error.message)
                            }}
                            className="w-full bg-white hover:bg-[#FAF8F5] text-[#3A3A3A] border border-[#E5DDD5] hover:border-[#D4A574] font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3"
                        >
                            <img src="/google-icon.svg" alt="Google" className="h-4 w-4" />
                            <span>{isSignUp ? "Sign up with Google" : "Sign in with Google"}</span>
                        </Button>

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
