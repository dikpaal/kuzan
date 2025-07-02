"use client"

import { useEffect } from "react"

export default function HashCleanupWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname)
        }
    }, [])

    return <>{children} </>
}