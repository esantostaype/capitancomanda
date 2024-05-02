import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Comanda Capitán',
  description: '"Comanda Capitán" es una aplicación web que agiliza el proceso de toma de órdenes en la cevichería restaurante "Capitán Picante". Los clientes simplemente comunican su pedido al personal de servicio, quien utiliza la app para enviar la orden directamente a la cocina, garantizando una experiencia culinaria más eficiente y sin errores.'
};

export default function RootLayout({  children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <main className="app">
          { children }
        </main>
      </body>
    </html>
  );
}