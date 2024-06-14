export default function CategoriesLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {

  return (
    <>
    { children }
    { modal }
    </>
  );
}