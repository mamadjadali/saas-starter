import { ThemeProvider } from "next-themes"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <ThemeProvider  defaultTheme="system" disableTransitionOnChange attribute="class">
      <div className="justify-center items-center h-screen">{children}</div>
      </ThemeProvider>
    </div>
  )
}
