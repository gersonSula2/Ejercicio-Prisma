import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Producto {
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
  stockBodega: number;
  createdAt: string;
  updatedAt: string;
}

export default function Producto() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('/api/producto');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data: Producto[] = await response.json();
        setProductos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return { type: 'div', props: { children: 'Cargando...' } };
  }
  
  if (error) {
    return { type: 'div', props: { children: `Error: ${error}` } };
  }
  
  return {
    type: 'div',
    props: {
      children: [
        { type: 'h1', props: { children: 'Lista de Productos' } },
        { 
          type: Link,
          props: { 
            href: '/producto/create',
            children: { type: 'a', props: { children: 'Crear Nuevo Producto' } }
          }
        },
        {
          type: 'ul',
          props: {
            children: productos.map((producto) => ({
              type: 'li',
              key: producto.id,
              props: {
                children: `${producto.codigo} - ${producto.descripcion} - $${producto.precio.toFixed(2)} - 
                  Stock: ${producto.stockBodega} - 
                  Creado: ${new Date(producto.createdAt).toLocaleString()} - 
                  Actualizado: ${new Date(producto.updatedAt).toLocaleString()}`
              }
            }))
          }
        }
      ]
    }
  };
}