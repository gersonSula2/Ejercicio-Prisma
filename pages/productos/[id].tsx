import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert } from 'react-bootstrap';
import Layout from '../../components/Layout';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  precio: number;
  stock: number;
}

export default function EditarProducto() {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchProducto();
    }
  }, [id]);

  const fetchProducto = async () => {
    try {
      const res = await fetch(`/api/productos/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProducto(data);
      } else {
        setError('No se pudo cargar el producto');
      }
    } catch (error) {
      setError('Error al cargar el producto');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProducto(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!producto) return;

    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...producto,
          precio: parseFloat(producto.precio.toString()),
          stock: parseInt(producto.stock.toString(), 10),
        }),
      });
      if (res.ok) {
        router.push('/productos');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Error al actualizar el producto');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  if (!producto) {
    return <Layout><p>Cargando...</p></Layout>;
  }

  return (
    <Layout>
      <h1>Editar Producto</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="codigo">
          <Form.Label>Código</Form.Label>
          <Form.Control
            type="text"
            name="codigo"
            value={producto.codigo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            name="descripcion"
            value={producto.descripcion || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="precio">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Actualizar Producto
        </Button>
      </Form>
    </Layout>
  );
}