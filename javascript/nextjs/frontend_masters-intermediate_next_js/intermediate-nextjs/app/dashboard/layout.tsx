'use client'
import Shell from '@/components/Shell'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

export default function Layout(props: ComponentProps<typeof Contents>) {
  return (
    <Shell>
      <Contents {...props} />
    </Shell>
  )
}

function Contents({
  children,
  rsvps,
  events,
}: {
  children: React.ReactNode
  rsvps: React.ReactNode
  events: React.ReactNode
}) {
  const path = usePathname()

  if (path !== '/dashboard') {
    return <div>{children}</div>
  }

  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 border-r border-default-50">{rsvps}</div>
      <div className="w-1/2 flex flex-col">
        <div className="border-b border-default-50 w-full h-1/2">{events}</div>
        <div className="w-full h-1/2">{children}</div>
      </div>
    </div>
  )
}
