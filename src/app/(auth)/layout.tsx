import { ToastNotification } from "@/components";
import Image from "next/image";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <section className="auth">
      <div className="left-8 top-8 absolute">
        <Image src='/images/logo-restify.svg' width='40' height='40' alt="Restify" />
      </div>
      <section className="min-h-screen w-full flex items-center justify-center">
        <div className="flex-1 p-6 max-w-md">
          { children }
        </div>
      </section>
    </section>
    </>
  );
}