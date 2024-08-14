'use client'
import { useMemo } from 'react'
import styles from './Counter.module.css'
import { useOrderStore } from '@/store/order-store'
import { IconButton } from '@/components'
import { Color, IconButtonShape, Size, Variant } from '@/interfaces'

interface Props {
	item: any
	currentValue: number
}

const MAX_ITEMS = 10
const MIN_ITEMS = 1

export const Counter = ({ item, currentValue }: Props) => {
	const increaseQuantity = useOrderStore(( state ) => state.increaseQuantity )
	const decreaseQuantity = useOrderStore(( state ) => state.decreaseQuantity )
	const disableIncrease = useMemo(() => item.quantity === MAX_ITEMS, [ item ])
	const disableDecrease = useMemo(() => item.quantity === MIN_ITEMS, [ item ])
	return (
		<div className={ styles.content }>
			<IconButton
				disabled={ disableDecrease }
				color={ Color.ACCENT }
				iconName='minus-small'
				variant={ Variant.GHOST } 
				onClick={() => decreaseQuantity( item.id )}
			/>
			<span className={ styles.counter }>{ currentValue }</span>			
			<IconButton
				disabled={ disableIncrease }
				color={ Color.ACCENT }
				iconName='plus-small'
				variant={ Variant.GHOST } 
				onClick={() => increaseQuantity( item.id )}
			/>
		</div>
	)
}