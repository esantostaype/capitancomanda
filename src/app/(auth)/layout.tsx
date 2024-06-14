import { ToastNotification } from "@/components";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <section className="auth">
      <section className="auth__image"></section>
      <section className="auth__content">
        <div className="auth__main-content">
          { children }
        </div>
      </section>
    </section>
    </>
  );
}