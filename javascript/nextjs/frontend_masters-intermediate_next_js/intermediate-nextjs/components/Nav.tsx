'use client'
import { createNewEvent } from '@/actions/events'
import { Input } from '@nextui-org/react'
import { Button, Tooltip } from '@nextui-org/react'
import { CirclePlus } from 'lucide-react'
import { useTransition } from 'react'

const Nav = () => {
  const [isPending, startTransition] = useTransition()

  return (
    <nav className="h-[65px] border-b border-default-50 flex items-center px-6 gap-4">
      <Tooltip content="New Event">
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          isLoading={isPending}
          onClick={handleClick}
        >
          <CirclePlus />
        </Button>
      </Tooltip>
      <div className="w-1/2">
        <Input size="sm" variant="faded" placeholder="search" />
      </div>
    </nav>
  )

  function handleClick() {
    startTransition(() => {
      createNewEvent()
    })
  }
}

export default Nav
