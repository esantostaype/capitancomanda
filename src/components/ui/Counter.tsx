'use client'
import { useMemo } from 'react'
import styles from './Counter.module.css'
import { useOrderStore } from '@/store/order-store'
import { Button } from '@/components'

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
			<Button
				disabled={ disableDecrease }
				mode='primary'
				iconName='minus-small'
				size='small'
				ghost 
				onClick={() => decreaseQuantity( item.id )}
			/>
			<span className={ styles.counter }>{ currentValue }</span>			
			<Button
				disabled={ disableIncrease }
				mode='primary'
				iconName='plus-small'
				size='small'
				ghost 
				onClick={() => increaseQuantity( item.id )}
			/>
		</div>
	)
}