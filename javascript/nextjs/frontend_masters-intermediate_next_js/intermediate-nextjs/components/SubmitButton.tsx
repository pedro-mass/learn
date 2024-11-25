'use client'

import { Button } from '@nextui-org/react'
import { ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton({
  label,
  ...btnProps
}: ComponentProps<typeof Button> & {
  label: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button {...btnProps} type="submit" isLoading={pending}>
      {label}
    </Button>
  )
}
