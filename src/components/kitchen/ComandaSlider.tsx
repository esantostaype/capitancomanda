'use client'
import { useRef, useState, MouseEvent, useEffect } from 'react';
import { Comanda } from './Comanda';
import styles from './ComandaSlider.module.css';
import { OrderStatus, OrderWithProducts } from '@/interfaces';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
  orders: OrderWithProducts[]
}

export default function ComandaSlider({ orders }: Props) {
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLUListElement>) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    sliderRef.current.classList.add(styles.active);
    setStartX(e.pageX - (sliderRef.current.offsetLeft || 0));
    setScrollLeft(sliderRef.current.scrollLeft || 0);
  }

  const handleMouseLeave = () => {
    setIsDown(false);
    if (sliderRef.current) {
      sliderRef.current.classList.remove(styles.active);
    }
  }

  const handleMouseUp = () => {
    setIsDown(false);
    if (sliderRef.current) {
      sliderRef.current.classList.remove(styles.active);
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLUListElement>) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 3;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }

  const [listRef] = useAutoAnimate<HTMLUListElement>();

  useEffect(() => {
    if (sliderRef.current) {
      listRef(sliderRef.current);
    }
  }, [listRef]);

  return (
    <ul
      className={styles.comandaSlider}
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {
        orders.map((order) => (
          <Comanda key={order.id} order={order} status={ OrderStatus.IN_PREPARATION } textButton='Preparar' className='received' />
        ))
      }
    </ul>
  );
}
