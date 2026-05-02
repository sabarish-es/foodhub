'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setEmployees(await response.json());
      }
    } catch (error) {
      console.error('Failed to fetch employees', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter((e: any) =>
    `${e.first_name} ${e.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Employees</h1>
          <p className="text-sm md:text-base text-gray-500">Manage your staff members</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Search Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or role..."
              className="pl-10 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Employee List</CardTitle>
          <CardDescription className="text-sm">{filteredEmployees.length} employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Employee</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Role</th>
                  <th className="hidden md:table-cell text-left py-3 px-2 md:px-4 font-semibold">Phone</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-2 md:px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">No employees found</td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee: any) => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 md:px-4 font-medium">{employee.first_name} {employee.last_name}</td>
                      <td className="py-3 px-2 md:px-4 text-gray-600">{employee.role}</td>
                      <td className="hidden md:table-cell py-3 px-2 md:px-4">{employee.phone || '-'}</td>
                      <td className="py-3 px-2 md:px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {employee.status || 'active'}
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
