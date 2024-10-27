import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const producto = await prisma.producto.findUnique({
        where: { id: Number(id) },
      });
      if (producto) {
        res.status(200).json(producto);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar el producto', error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { codigo, nombre, descripcion, precio, stock } = req.body;
      
      const producto = await prisma.producto.update({
        where: { id: Number(id) },
        data: {
          codigo,
          nombre,
          descripcion,
          precio: parseFloat(precio),
          stock: parseInt(stock, 10),
        },
      });

      res.status(200).json(producto);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}