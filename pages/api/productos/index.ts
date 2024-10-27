import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { codigo } = req.query;

    try {
      if (codigo) {
        const producto = await prisma.producto.findUnique({
          where: { codigo: String(codigo) },
        });
        if (producto) {
          res.status(200).json(producto);
        } else {
          res.status(404).json({ message: 'Producto no encontrado' });
        }
      } else {
        const productos = await prisma.producto.findMany();
        res.status(200).json(productos);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar productos', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { codigo, nombre, descripcion, precio, stock } = req.body;
      
      const producto = await prisma.producto.create({
        data: {
          codigo,
          nombre,
          descripcion,
          precio: parseFloat(precio),
          stock: parseInt(stock, 10),
        },
      });

      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, codigo, nombre, descripcion, precio, stock } = req.body;
      
      const producto = await prisma.producto.update({
        where: { id: parseInt(id, 10) },
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
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}