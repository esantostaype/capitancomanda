import { ToastNotification } from "@/components";
import Image from "next/image";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <section className="auth">
      <div className="auth__logo">
        <Image src='/images/capitan-picante-dark.svg' width='228' height='40' alt="Restify" />
      </div>
      <section className="auth__content">
        <div className="auth__main-content">
          { children }
        </div>
      </section>
    </section>
    </>
  );
}