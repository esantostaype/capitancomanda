'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GoogleRedirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/status", {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error al obtener el perfil de usuario');
        }

        const data = await response.json();
        // Maneja la respuesta y guarda el token en el almacenamiento local o en el contexto
        console.log(data);
        router.push('/admin'); // Redirigir a la página deseada después del login
      } catch (error) {
        console.error('Error al obtener el perfil de usuario', error);
      }
    };

    fetchUser();
  }, [router]);

  return <div>Redireccionando...</div>;
};

export default GoogleRedirect;
