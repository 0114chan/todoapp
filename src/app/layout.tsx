// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Do it - Todo App',
    description: 'A simple todo application',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <main className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <a href="/" className="inline-block">
                        <div className="flex items-center gap-2">
                            <div className="text-violet-600 font-bold text-2xl">do it;</div>
                        </div>
                    </a>
                </header>
                {children}
            </div>
        </main>
        </body>
        </html>
    )
}