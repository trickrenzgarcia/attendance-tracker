'use client'

import { Button } from "@/components/ui/button"

type Props = {
  error: Error,
  reset: () => void
}

export default function Error({ error, reset}: Props){
  return (
  <div>
    <h1 className="text-3xl">{error.message}</h1>
    <Button onClick={reset}>Try Again</Button>
  </div>)
}