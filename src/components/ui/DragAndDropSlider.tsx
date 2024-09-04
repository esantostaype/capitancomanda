'use client'
import { useRef, useState, MouseEvent, useEffect } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
  children: React.ReactNode
}

export default function DragAndDropSlider({ children }: Props) {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return
    setIsDown(true)
    sliderRef.current.classList.add("cursor-grabbing")
    setStartX(e.pageX - (sliderRef.current.offsetLeft || 0))
    setScrollLeft(sliderRef.current.scrollLeft || 0)
  }

  const handleMouseLeave = () => {
    setIsDown(false)
    if (sliderRef.current) {
      sliderRef.current.classList.remove("cursor-grabbing")
    }
  }

  const handleMouseUp = () => {
    setIsDown(false)
    if (sliderRef.current) {
      sliderRef.current.classList.remove("cursor-grabbing")
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - (sliderRef.current.offsetLeft || 0)
    const walk = (x - startX) * 3
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const [ listRef ] = useAutoAnimate<HTMLDivElement>()

  useEffect(() => {
    if (sliderRef.current) {
      listRef(sliderRef.current)
    }
  }, [listRef])

  return (
    <div
      className="flex items-baseline gap-4 relative overflow-x-scroll overflow-y-hidden transition-all duration-200 will-change-transform select-none cursor-pointer mask-image w-1/2"
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      { children }
    </div>
  )
}
