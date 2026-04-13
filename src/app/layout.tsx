import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://islamic-front-routers-accomplish.trycloudflare.com'),
  title: 'Tideon — Industrial 3D Manufacturing',
  description:
    'Precision industrial 3D printing for aerospace, medical, and engineering applications. Sub-0.1mm accuracy, 47+ material grades, ISO 9001:2015 certified.',
  keywords: '3D printing, industrial manufacturing, FDM, SLA, SLS, rapid prototyping, additive manufacturing',
  openGraph: {
    title: 'Tideon — Industrial 3D Manufacturing',
    description: 'Precision industrial 3D printing for aerospace, medical, and engineering applications.',
    images: [
      {
        url: 'https://islamic-front-routers-accomplish.trycloudflare.com/tideon-logo.png',
        width: 1200,
        height: 630,
        alt: 'Tideon Industrial 3D Manufacturing',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tideon — Industrial 3D Manufacturing',
    description: 'Precision industrial 3D printing for aerospace, medical, and engineering applications.',
    images: ['https://islamic-front-routers-accomplish.trycloudflare.com/tideon-logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <div className="bottom-blur-overlay" />
        </ThemeProvider>
      </body>
    </html>
  )
}
