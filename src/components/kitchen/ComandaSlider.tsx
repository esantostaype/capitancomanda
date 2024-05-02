'use client'
import { useRef, useState, MouseEvent } from 'react';
import { Comanda } from './Comanda';
import styles from './ComandaSlider.module.css';
import { OrderWithProducts } from '@/types';

type Props = {
  orders: OrderWithProducts[]
}

export default function ComandaSlider({ orders }: Props) {
  const sliderRef = useRef<HTMLUListElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLUListElement>) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    sliderRef.current.classList.add( styles.active );
    setStartX(e.pageX - (sliderRef.current.offsetLeft || 0));
    setScrollLeft(sliderRef.current.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    if (sliderRef.current) {
      sliderRef.current.classList.remove( styles.active );
    }
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (sliderRef.current) {
      sliderRef.current.classList.remove( styles.active );
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLUListElement>) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 3;
    sliderRef.current.scrollLeft = scrollLeft - walk;
    console.log(walk);
  };

  console.log( 'Cliente Orders: ', orders )

  return (
    <ul
      className={ styles.comandaSlider }
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {
        orders.map(( order ) => (
          <Comanda key={ order.id } order={ order } className='received' />
        ))
      }
    </ul>
  );
};