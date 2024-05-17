import { fetchData } from "@/utils";

export default async function OrderPage() {
  const categories = await fetchData({ url: `/categories` })  
  return (
    <>
      <h1 className="category__title">Selecciona una Categoría</h1>
    </>
  );
}