import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'

// Import the Client Component you just created
import CalisthenicsAnalyzer from "@/components/local/CalisthenicsAnalyzer"

// This is a pure Server Component. It has no "use client" directive.
export default async function AnalyzeFormPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // If no user is logged in, the middleware will redirect them.
    // This is a final safeguard.
    if (!user) {
        return redirect('/auth')
    }

    // This is a Server Action that will be passed to the client component.
    const signOut = async () => {
        "use server"
        const supabase = await createClient()
        await supabase.auth.signOut()
        return redirect('/auth')
    }

    // Render the client component, passing the server-side data as props.
    return <CalisthenicsAnalyzer user={user} onSignOut={signOut} />
}