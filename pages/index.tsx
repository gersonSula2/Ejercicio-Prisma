import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function Home() {
  return (
    <Layout>
      <h1>Practica con ORM Prisma y NextJS </h1>
      <p>Orientado a una gestión de productos.</p>
      <Link href="/productos" passHref legacyBehavior>
        <Button variant="primary">Ver Productos</Button>
      </Link>
    </Layout>
  );
}