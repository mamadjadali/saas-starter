import { Navigation } from "@/components/ui/Navigation"
import { ThemeProvider } from "next-themes"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <ThemeProvider  defaultTheme="system" disableTransitionOnChange attribute="class">
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">{children}</div>
      </ThemeProvider>
    </div>
  )
}
