import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/analyze-form"

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // TODO: Database Integration
            // Check if user has completed roadmap selection
            // const { data: userRoadmap } = await supabase
            //   .from('user_roadmaps')
            //   .select('id')
            //   .eq('user_id', user.id)
            //   .single()

            // For now, redirect new users to roadmap selection
            // In production, check if userRoadmap exists
            const redirectPath = next === "/analyze-form" ? "/roadmap-selection" : next

            return NextResponse.redirect(`${origin}${redirectPath}`)
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth?error=Could not authenticate user`)
}
