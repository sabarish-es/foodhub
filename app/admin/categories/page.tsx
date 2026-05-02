'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, Plus } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setCategories(await response.json());
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (response.ok) {
        setNewCategory('');
        fetchCategories();
      }
    } catch (error) {
      console.error('Failed to add category', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Categories</h1>
        <p className="text-sm md:text-base text-gray-500">Manage your menu categories</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              placeholder="Category name (e.g., Starters, Main Course)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="text-sm"
            />
            <Button
              onClick={handleAddCategory}
              className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Categories List</CardTitle>
          <CardDescription className="text-sm">{categories.length} categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Category Name</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Items</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">No categories found</td>
                  </tr>
                ) : (
                  categories.map((cat: any) => (
                    <tr key={cat.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 md:px-4 font-medium">{cat.name}</td>
                      <td className="py-3 px-2 md:px-4">0</td>
                      <td className="py-3 px-2 md:px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${cat.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {cat.status || 'active'}
                        </span>
                      </td>
                      <td className="py-3 px-2 md:px-4 flex gap-1 md:gap-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
