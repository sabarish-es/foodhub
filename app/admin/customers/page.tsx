'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setCustomers(await response.json());
      }
    } catch (error) {
      console.error('Failed to fetch customers', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((c: any) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Customers</h1>
          <p className="text-sm md:text-base text-gray-500">Manage your customers</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Search Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or phone..."
              className="pl-10 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Customer List</CardTitle>
          <CardDescription className="text-sm">{filteredCustomers.length} customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Customer</th>
                  <th className="hidden md:table-cell text-left py-3 px-2 md:px-4 font-semibold">Phone</th>
                  <th className="hidden lg:table-cell text-left py-3 px-2 md:px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Orders</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Spent</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">No customers found</td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer: any) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 md:px-4 font-medium">{customer.name}</td>
                      <td className="hidden md:table-cell py-3 px-2 md:px-4">{customer.phone || '-'}</td>
                      <td className="hidden lg:table-cell py-3 px-2 md:px-4 truncate">{customer.email || '-'}</td>
                      <td className="py-3 px-2 md:px-4">{customer.total_orders || 0}</td>
                      <td className="py-3 px-2 md:px-4 font-semibold">₹{customer.total_spent || 0}</td>
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
