import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tideon Prints — Shop',
  description: 'High-end 3D printed goods. Aquatics accessories, everyday carry, PC mods, and precision fidgets.',
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#F9F7F2', minHeight: '100vh' }}>
      {children}
    </div>
  )
}
