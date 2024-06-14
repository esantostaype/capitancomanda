import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers';
import { ToastNotification } from '@/components';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Comanda Capitán',
  description: '"Comanda Capitán" es una aplicación web que agiliza el proceso de toma de órdenes en la cevichería restaurante "Capitán Picante". Los clientes simplemente comunican su pedido al personal de servicio, quien utiliza la app para enviar la orden directamente a la cocina, garantizando una experiencia culinaria más eficiente y sin errores.'
};

export default function RootLayout({  children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body className={ inter.className } suppressHydrationWarning={ true }>
        <main className="app">
          <Providers>
          { children }
          </Providers>
          <ToastNotification/>
        </main>
      </body>
      {/* <svg className="pattern">
        <pattern id="pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="translate(-0.5,-0.5)">
          <circle cx="0.5" cy="0.5" r="0.5" fill="#fff"></circle>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"></rect>
      </svg> */}
    </html>
  );
}