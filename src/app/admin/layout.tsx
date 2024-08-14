import { AdminSidebar } from '@/components'

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <section className="flex">
      <AdminSidebar/>
      <section className="flex flex-1 flex-col h-screen">
        { children }
      </section>
    </section>
    </>
  );
}