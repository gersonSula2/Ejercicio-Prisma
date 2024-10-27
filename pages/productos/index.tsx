import { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Link from 'next/link';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  precio: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await fetch('/api/productos');
    const data = await res.json();
    setProductos(data);
  };

  const buscarProducto = async () => {
    if (busqueda) {
      const res = await fetch(`/api/productos?codigo=${busqueda}`);
      if (res.ok) {
        const data = await res.json();
        setProductos(data ? [data] : []);
      } else {
        setProductos([]);
      }
    } else {
      fetchProductos();
    }
  };

  return (
    <Layout>
      <h1>Listado de Productos</h1>
      <Form className="mb-3">
        <Form.Group controlId="busqueda">
          <Form.Label>Buscar por código</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el código"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={buscarProducto} className="mt-2">
          Buscar
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>Q{producto.precio.toFixed(2)}</td>
              <td>{producto.stock}</td>
              <td>{new Date(producto.createdAt).toLocaleString()}</td>
              <td>{new Date(producto.updatedAt).toLocaleString()}</td>
              <td>
                <Link href={`/productos/${producto.id}`} passHref legacyBehavior>
                  <Button variant="info">Editar</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
}