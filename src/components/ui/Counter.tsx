'use client'
import { useMemo } from 'react';
import { OrderItem } from '@/types'
import styles from './Counter.module.css';
import { useStore } from '@/store';

interface Props {
	item: OrderItem
	currentValue: number;
}

const MAX_ITEMS = 10
const MIN_ITEMS = 1

export const Counter = ({ item, currentValue }: Props) => {
	const increaseQuantity = useStore(( state ) => state.increaseQuantity )
	const decreaseQuantity = useStore(( state ) => state.decreaseQuantity )
	const disableIncrease = useMemo(() => item.quantity === MAX_ITEMS, [ item ])
	const disableDecrease = useMemo(() => item.quantity === MIN_ITEMS, [ item ])
	return (
		<div className={ styles.content }>
			<button disabled={ disableDecrease } className={ styles.button } onClick={() => decreaseQuantity( item.id, item.spicyLevelNumber )}>
				<i className="fi fi-rr-minus-small"></i>
			</button>
			<span className={ styles.counter }>{ currentValue }</span>
			<button disabled={ disableIncrease } className={ styles.button } onClick={() => increaseQuantity( item.id, item.spicyLevelNumber )}>
				<i className="fi fi-rr-plus-small"></i>
			</button>
		</div>
	)
}