"use client"
import { useState, useEffect, useRef } from "react"
import {
    Camera,
    Zap,
    Target,
    BarChart3,
    CheckCircle,
    ArrowRight,
    Play,
    Star,
    Users,
    TrendingUp,
    Shield,
    Clock,
    Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

// Custom hook for intersection observer
const useInView = (threshold = 0.1) => {
    const [isInView, setIsInView] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                }
            },
            { threshold },
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [threshold])

    return [ref, isInView] as const
}

export default function LandingPage() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [heroRef, heroInView] = useInView(0.1)
    const [featuresRef, featuresInView] = useInView(0.1)
    const [howItWorksRef, howItWorksInView] = useInView(0.1)
    const [benefitsRef, benefitsInView] = useInView(0.1)
    const [testimonialsRef, testimonialsInView] = useInView(0.1)

    const features = [
        {
            icon: <Camera className="h-6 w-6" />,
            title: "Photo Analysis",
            description: "Upload a photo of your calisthenics movement and get instant AI-powered form analysis.",
        },
        {
            icon: <Target className="h-6 w-6" />,
            title: "Skill-Specific Feedback",
            description: "Get targeted feedback for specific skills like planche, front lever, and back lever.",
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "Progress Tracking",
            description: "Track your improvement over time with detailed analytics and progress reports.",
        },
        {
            icon: <Award className="h-6 w-6" />,
            title: "Skill Level Assessment",
            description: "Understand your current skill level and get personalized recommendations for improvement.",
        },
    ]

    const benefits = [
        {
            icon: <Clock className="h-5 w-5" />,
            title: "Save Time",
            description: "Get instant feedback instead of waiting for a coach",
        },
        {
            icon: <Shield className="h-5 w-5" />,
            title: "Prevent Injuries",
            description: "Identify form issues before they become problems",
        },
        {
            icon: <TrendingUp className="h-5 w-5" />,
            title: "Faster Progress",
            description: "Accelerate your calisthenics journey with AI guidance",
        },
    ]

    const testimonials = [
        {
            name: "Alex Chen",
            role: "Calisthenics Enthusiast",
            content:
                "Kuzan helped me perfect my planche form in just 2 months. The AI feedback is incredibly detailed and accurate.",
            rating: 5,
        },
        {
            name: "Sarah Johnson",
            role: "Fitness Coach",
            content:
                "I use Kuzan with all my clients. It's like having an expert coach available 24/7. The progress tracking is amazing.",
            rating: 5,
        },
        {
            name: "Mike Rodriguez",
            role: "Beginner",
            content:
                "As a complete beginner, Kuzan made calisthenics accessible. The skill-specific feedback helped me avoid common mistakes.",
            rating: 5,
        },
    ]

    // Smooth scroll function
    const smoothScroll = (elementId: string) => {
        const element = document.getElementById(elementId)
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F1ED] font-poppins">
            {/* Navigation */}
            <nav className="bg-white/95 backdrop-blur-sm border-b border-[#E5DDD5] sticky top-0 z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-2 animate-fade-in">
                            <div className="w-8 h-8 bg-[#D4A574] rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-[#3A3A3A]">Kuzan</h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <button
                                onClick={() => smoothScroll("features")}
                                className="text-[#6B5B73] hover:text-[#3A3A3A] transition-colors duration-200 relative group"
                            >
                                Features
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4A574] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => smoothScroll("how-it-works")}
                                className="text-[#6B5B73] hover:text-[#3A3A3A] transition-colors duration-200 relative group"
                            >
                                How it Works
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4A574] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => smoothScroll("testimonials")}
                                className="text-[#6B5B73] hover:text-[#3A3A3A] transition-colors duration-200 relative group"
                            >
                                Testimonials
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4A574] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => smoothScroll("pricing")}
                                className="text-[#6B5B73] hover:text-[#3A3A3A] transition-colors duration-200 relative group"
                            >
                                Pricing
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4A574] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/auth"
                                className="text-[#6B5B73] hover:text-[#3A3A3A] font-medium transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                            <Button
                                asChild
                                className="bg-[#D4A574] hover:bg-[#C19660] text-white border-0 font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                            >
                                <Link href="/auth">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-20 lg:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div ref={heroRef} className="grid lg:grid-cols-2 gap-12 items-center">
                        <div
                            className={`space-y-8 transition-all duration-1000 ${heroInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                        >
                            <div className="space-y-4">
                                <div className="inline-flex items-center space-x-2 bg-[#FAF8F5] px-4 py-2 rounded-full animate-bounce-subtle">
                                    <Zap className="h-4 w-4 text-[#D4A574]" />
                                    <span className="text-sm font-medium text-[#6B5B73]">AI-Powered Form Analysis</span>
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-bold text-[#3A3A3A] leading-tight">
                                    Perfect Your <span className="text-[#D4A574] animate-gradient">Calisthenics</span> Form with AI
                                </h1>
                                <p className="text-xl text-[#6B5B73] leading-relaxed">
                                    Upload a photo of your movement and get instant, detailed feedback from our AI coach. Master planche,
                                    front lever, back lever, and more with personalized guidance.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-[#D4A574] hover:bg-[#C19660] text-white border-0 font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl group"
                                >
                                    <Link href="/auth" className="flex items-center">
                                        Start Analyzing
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-[#E5DDD5] text-[#3A3A3A] bg-white hover:bg-[#FAF8F5] hover:border-[#D4A574] font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 group"
                                    onClick={() => setIsVideoPlaying(true)}
                                >
                                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                    Watch Demo
                                </Button>
                            </div>
                            <div className="flex items-center space-x-8 text-sm text-[#6B5B73]">
                                <div className="flex items-center space-x-2 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                                    <Users className="h-4 w-4" />
                                    <span>10,000+ users</span>
                                </div>
                                <div className="flex items-center space-x-2 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
                                    <Star className="h-4 w-4 fill-[#D4A574] text-[#D4A574]" />
                                    <span>4.9/5 rating</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`relative transition-all duration-1000 delay-300 animate-float ${heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                        >
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5DDD5] transform hover:scale-105 transition-transform duration-300">
                                <div className="aspect-video bg-[#FAF8F5] rounded-xl flex items-center justify-center mb-6 relative overflow-hidden animate-gentle-rotate">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-[#D4A574] rounded-full flex items-center justify-center mx-auto animate-float-reverse">
                                            <Camera className="h-8 w-8 text-white" />
                                        </div>
                                        <p className="text-[#6B5B73] font-medium">Upload your photo here</p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
                                </div>
                                <div className="space-y-3">
                                    <div
                                        className="flex items-center space-x-3 animate-fade-in-up animate-drift-left-right"
                                        style={{ animationDelay: "1s" }}
                                    >
                                        <CheckCircle className="h-5 w-5 text-[#D4A574]" />
                                        <span className="text-[#3A3A3A] font-medium">Form analysis complete</span>
                                    </div>
                                    <div
                                        className="flex items-center space-x-3 animate-fade-in-up animate-drift-right-left"
                                        style={{ animationDelay: "1.2s" }}
                                    >
                                        <CheckCircle className="h-5 w-5 text-[#D4A574]" />
                                        <span className="text-[#3A3A3A] font-medium">Skill level: Intermediate</span>
                                    </div>
                                    <div
                                        className="flex items-center space-x-3 animate-fade-in-up animate-drift-left-right"
                                        style={{ animationDelay: "1.4s" }}
                                    >
                                        <CheckCircle className="h-5 w-5 text-[#D4A574]" />
                                        <span className="text-[#3A3A3A] font-medium">3 improvement suggestions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={featuresRef}
                        className={`text-center mb-16 transition-all duration-1000 ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#3A3A3A] mb-4">
                            Everything You Need to Master Calisthenics
                        </h2>
                        <p className="text-xl text-[#6B5B73] max-w-3xl mx-auto">
                            Our AI-powered platform provides comprehensive analysis and guidance for all skill levels
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className={`border-[#E5DDD5] shadow-sm bg-white rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    } ${index % 2 === 0 ? "animate-float" : "animate-float-reverse"}`}
                                style={{
                                    transitionDelay: `${index * 0.1}s`,
                                    animationDelay: `${index * 0.5}s`,
                                }}
                            >
                                <CardContent className="p-6 text-center">
                                    <div
                                        className={`w-12 h-12 bg-[#FAF8F5] rounded-lg flex items-center justify-center mx-auto mb-4 text-[#D4A574] transform hover:scale-110 transition-transform duration-200 ${index % 3 === 0 ? "animate-gentle-rotate" : ""}`}
                                    >
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#3A3A3A] mb-2">{feature.title}</h3>
                                    <p className="text-[#6B5B73] text-sm leading-relaxed">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={howItWorksRef}
                        className={`text-center mb-16 transition-all duration-1000 ${howItWorksInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#3A3A3A] mb-4">How It Works</h2>
                        <p className="text-xl text-[#6B5B73] max-w-3xl mx-auto">
                            Get professional-level feedback in three simple steps
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Select Your Skill",
                                description: "Choose the calisthenics skill you want to analyze from our comprehensive library",
                            },
                            {
                                step: "2",
                                title: "Upload Your Photo",
                                description: "Take a photo of yourself performing the movement and upload it to our platform",
                            },
                            {
                                step: "3",
                                title: "Get AI Feedback",
                                description: "Receive detailed analysis, form corrections, and personalized improvement suggestions",
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className={`text-center transition-all duration-1000 ${howItWorksInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                                style={{ transitionDelay: `${index * 0.2}s` }}
                            >
                                <div
                                    className={`w-16 h-16 bg-[#D4A574] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold transform hover:scale-110 transition-transform duration-200 ${index === 0 ? "animate-float" : index === 1 ? "animate-diagonal-float" : "animate-float-reverse"
                                        }`}
                                >
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-semibold text-[#3A3A3A] mb-4">{step.title}</h3>
                                <p className="text-[#6B5B73] leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div ref={benefitsRef} className="grid lg:grid-cols-2 gap-12 items-center">
                        <div
                            className={`space-y-8 transition-all duration-1000 ${benefitsInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                        >
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-[#3A3A3A] mb-4">Why Choose Kuzan?</h2>
                                <p className="text-xl text-[#6B5B73] leading-relaxed">
                                    Transform your calisthenics training with AI-powered insights that help you progress faster and safer.
                                </p>
                            </div>
                            <div className="space-y-6">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start space-x-4 transition-all duration-700 ${benefitsInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
                                            }`}
                                        style={{ transitionDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="w-10 h-10 bg-[#FAF8F5] rounded-lg flex items-center justify-center text-[#D4A574] flex-shrink-0 transform hover:scale-110 transition-transform duration-200">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#3A3A3A] mb-1">{benefit.title}</h3>
                                            <p className="text-[#6B5B73]">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            className={`bg-[#FAF8F5] rounded-2xl p-8 transition-all duration-1000 delay-300 animate-drift-right-left ${benefitsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                        >
                            <div className="aspect-square bg-white rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300 animate-gentle-rotate">
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 bg-[#D4A574] rounded-full flex items-center justify-center mx-auto animate-float">
                                        <BarChart3 className="h-10 w-10 text-white" />
                                    </div>
                                    <p className="text-[#6B5B73] font-medium">Progress Analytics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={testimonialsRef}
                        className={`text-center mb-16 transition-all duration-1000 ${testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#3A3A3A] mb-4">What Our Users Say</h2>
                        <p className="text-xl text-[#6B5B73] max-w-3xl mx-auto">
                            Join thousands of athletes who have improved their calisthenics with Kuzan
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card
                                key={index}
                                className={`border-[#E5DDD5] shadow-sm bg-white rounded-xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ${testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    } ${index % 2 === 0 ? "animate-float" : "animate-float-reverse"}`}
                                style={{
                                    transitionDelay: `${index * 0.1}s`,
                                    animationDelay: `${index * 1}s`,
                                }}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-4 w-4 fill-[#D4A574] text-[#D4A574] animate-twinkle"
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[#6B5B73] mb-6 leading-relaxed">"{testimonial.content}"</p>
                                    <div>
                                        <p className="font-semibold text-[#3A3A3A]">{testimonial.name}</p>
                                        <p className="text-sm text-[#7A8471]">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#D4A574] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574] to-[#C19660] animate-gradient-x"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-fade-in-up">
                        Ready to Perfect Your Form?
                    </h2>
                    <p
                        className="text-xl text-white/90 mb-8 leading-relaxed animate-fade-in-up"
                        style={{ animationDelay: "0.2s" }}
                    >
                        Join thousands of athletes who are already improving their calisthenics with AI-powered feedback.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-white hover:bg-gray-50 text-[#D4A574] border-0 font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl group animate-fade-in-up"
                        style={{ animationDelay: "0.4s" }}
                    >
                        <Link href="/auth" className="flex items-center">
                            Start Your Free Trial
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    </Button>
                    <p className="text-white/80 text-sm mt-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                        No credit card required • 7-day free trial
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#3A3A3A] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="space-y-4 animate-fade-in-up">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-[#D4A574] rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                                    <Zap className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold">Kuzan</h3>
                            </div>
                            <p className="text-gray-400">AI-powered calisthenics form analysis for athletes of all levels.</p>
                        </div>
                        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <div className="space-y-2 text-gray-400">
                                <button onClick={() => smoothScroll("features")} className="block hover:text-white transition-colors">
                                    Features
                                </button>
                                <Link href="#pricing" className="block hover:text-white transition-colors">
                                    Pricing
                                </Link>
                                <Link href="/" className="block hover:text-white transition-colors">
                                    Analyzer
                                </Link>
                            </div>
                        </div>
                        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <div className="space-y-2 text-gray-400">
                                <Link href="/about" className="block hover:text-white transition-colors">
                                    About
                                </Link>
                                <Link href="/contact" className="block hover:text-white transition-colors">
                                    Contact
                                </Link>
                                <Link href="/blog" className="block hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </div>
                        </div>
                        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <div className="space-y-2 text-gray-400">
                                <Link href="/help" className="block hover:text-white transition-colors">
                                    Help Center
                                </Link>
                                <Link href="/privacy" className="block hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="block hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 animate-fade-in-up"
                        style={{ animationDelay: "0.4s" }}
                    >
                        <p>&copy; 2024 Kuzan. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
