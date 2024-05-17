import { AdminSidebar, ToastNotification } from "@/components";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <section className="admin">
      <AdminSidebar/>
      <section className="admin__wrapper">
        { children }
      </section>
    </section>
    <ToastNotification/>
    </>
  );
}