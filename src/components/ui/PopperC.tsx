'use client'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import Grow from '@mui/material/Grow'
import { useState, useEffect, useCallback } from 'react'
import { IconButton } from '@/components'
import { Size } from '@/interfaces'

interface PopperProps {
  children: React.ReactNode
  position?: any
  transformOrigin?: any
}

export const PopperC = ({ children, position, transformOrigin }: PopperProps) => {
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null)
  const [ open, setOpen ] = useState(false)
  const [ placement, setPlacement ] = useState<PopperPlacementType>()

  const handleClick = ( newPlacement: PopperPlacementType ) => ( event: React.MouseEvent<HTMLButtonElement> ) => {
    setAnchorEl( event.currentTarget )
    setOpen(( prev) => placement !== newPlacement || !prev )
    setPlacement( newPlacement )
  }
  
  const handleClose = useCallback(() => {
    setOpen(false)
    setAnchorEl(null)
  }, [])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (anchorEl && !anchorEl.contains(event.target as Node)) {
      handleClose()
    }
  }, [anchorEl, handleClose])

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose()
    }
  }, [handleClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    } else {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [open, handleClickOutside, handleEscapeKey])

  const canBeOpen = open && Boolean(anchorEl)
  const id = canBeOpen ? 'transition-popper' : undefined

  return (
    <>
      <IconButton
        iconName="menu-dots-vertical"
        size={ Size.SM }
        onClick={ handleClick( position ? position : 'bottom-start') }
        active={ open }
      />
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Grow { ...TransitionProps } style={{ transformOrigin: transformOrigin ? transformOrigin : 'top left' }} timeout={ 300 }>
            <div className="rounded-md px-4 py-3 bg-gray50">
              { children }
            </div>
          </Grow>
        )}
      </Popper>
    </>
  )
}
