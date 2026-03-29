'use client'

import { useEffect, useState } from 'react'

export default function StudioPage() {
  const [Studio, setStudio] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    import('next-sanity/studio').then((mod) => {
      const { NextStudio } = mod
      import('../../sanity.config').then((configMod) => {
        const config = configMod.default
        setStudio(() => () => <NextStudio config={config} />)
      })
    })
  }, [])

  if (!Studio) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Studio...</div>

  return <Studio />
}
