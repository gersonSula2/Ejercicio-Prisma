import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function CrearProducto() {
  const [producto, setProducto] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...producto,
          precio: parseFloat(producto.precio),
          stock: parseInt(producto.stock, 10),
        }),
      });
      if (res.ok) {
        router.push('/productos');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Error al crear el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <Layout>
      <h1>Crear Nuevo Producto</h1>
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
            value={producto.descripcion}
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
          Crear Producto
        </Button>
      </Form>
    </Layout>
  );
}