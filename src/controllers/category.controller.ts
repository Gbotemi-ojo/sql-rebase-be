import type { Request, Response } from 'express';
import { categoryService } from '../services/category.service';

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    await categoryService.create({ name });
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await categoryService.remove(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};


// You can add an update controller function here as well if needed

export const categoryController = { getAllCategories, createCategory, deleteCategory };
