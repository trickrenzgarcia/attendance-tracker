'use client'

import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/providers/auth-provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Tabs from '@/components/Tabs'
import { TabsContent } from '@/components/ui/tabs'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Attendance Tracker App - Tiger\'s Mark Corporation',
  description: 'Generated by create next app',
  manifest: '/manifest.json',
  icons: { apple: '/icon.png',},
  themeColor: '#fff',
}

type Props = {
  children: React.ReactNode,
  employees: React.ReactNode,
  ojts: React.ReactNode,
  flexible: React.ReactNode
}

export default function RootLayout({ children, employees, ojts, flexible }: Props) {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <html lang="en">
      <body className={inter.className + " container"}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <AuthProvider>
            <Navbar />
            {pathname === '/' && (
              <Tabs>
                <TabsContent value='employees'>{employees}</TabsContent>
                <TabsContent value='ojts'>{ojts}</TabsContent>
                <TabsContent value='flexible'>{flexible}</TabsContent>
              </Tabs>
            )}
            {children}
            <Footer year='2023' corporation='Brojava'/>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
