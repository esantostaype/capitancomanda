import type { Metadata } from 'next'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import { Providers } from './providers'
import { ToastNotification } from '@/components'
import './globals.css'

export const metadata: Metadata = {
  title: 'Restify',
  description: 'Restify es una innovadora aplicación de gestión de restaurantes diseñada para simplificar y optimizar cada aspecto de la administración de tu negocio. Con una interfaz intuitiva y herramientas potentes, Restify te ayuda a gestionar reservas, inventarios, personal y mucho más desde un solo lugar. Ideal para restauranteros modernos, Restify transforma la gestión diaria en una experiencia fluida y eficiente, permitiéndote concentrarte en lo que realmente importa: ofrecer una experiencia gastronómica excepcional a tus clientes. Simplifica, mejora y disfruta de una gestión sin complicaciones con Restify.',
  themeColor: '#4285f4'
}

export default function RootLayout({  children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={ true } className="bg-background text-foreground">
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