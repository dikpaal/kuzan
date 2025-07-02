import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import HashCleanupWrapper from "./HashCleanupWrapper"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
})

export const metadata: Metadata = {
    title: "Kuzan - Calisthenics Form Analyzer",
    description: "AI-powered calisthenics form analysis and training recommendations for beginners",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${poppins.variable} font-poppins`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <HashCleanupWrapper>
                        {children}
                    </HashCleanupWrapper>
                </ThemeProvider>
            </body>
        </html>
    )
}
