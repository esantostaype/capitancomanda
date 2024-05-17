export default function AdminLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {

  return (
    <>
    { children }
    { modal }
    </>
  );
}