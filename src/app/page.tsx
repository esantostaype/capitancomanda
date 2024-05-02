import { prisma } from "@/lib/prisma";

async function getCategories() {
  return await prisma.category.findMany()
}

export default async function Home() {
  const categories = await getCategories();
  return (
    <main>
      <h1>Home</h1>
      {
        categories.map( category => (
          <>
            <li key={ category.id }>{ category.name }</li>
          </>
        ) )
      }
    </main>
  );
}