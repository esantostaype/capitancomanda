import Image from 'next/image';
import { OrderItem } from "@/components";
import { prisma } from "@/lib/prisma";

import styles from './OrderSidebar.module.css';

async function getCategories() {
  return await prisma.category.findMany()
}

export const OrderSidebar = async() => {

  const categories = await getCategories();

  return (
    <>
      <aside className={ styles.content }>
        <div className={ styles.logo }>
          <Image src="/images/logo.svg" width="64" height="64" alt="Capitán Comanda" />
        </div>
        <nav className={ styles.nav }>
          <ul className={ styles.nav__list }>
            { categories.map( category => (
                <OrderItem key={ category.id } category={ category }/>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}