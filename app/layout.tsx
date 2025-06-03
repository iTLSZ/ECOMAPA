import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MAPA DE REDES',
  description: 'Mapa de Redes Interactivo - JAC Popayán',
  generator: '...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
