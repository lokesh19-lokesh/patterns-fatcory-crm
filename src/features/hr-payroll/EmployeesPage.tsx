import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../lib/utils';
import { Plus } from 'lucide-react';
import { Employee } from '../../types';

export const EmployeesPage: React.FC = () => {
  const [isAddEmpOpen, setIsAddEmpOpen] = useState(false);

  const [employees] = useState<Employee[]>([
    {
      id: 'emp_1',
      company_id: 'comp_77283',
      emp_code: 'EMP-101',
      full_name: 'Suresh Patil',
      email: 'suresh.p@apexmaterials.com',
      phone: '+91 97777 55443',
      department: 'Logistics',
      designation: 'Plant Logistics Head',
      basic_salary: 45000,
      allowances: 15000,
      joining_date: '2022-04-15',
      pan: 'ABCDE1234F',
      aadhaar: '1234 5678 9012',
      bank_account: '50200012349900',
      status: 'Active',
    },
    {
      id: 'emp_2',
      company_id: 'comp_77283',
      emp_code: 'EMP-102',
      full_name: 'Rajesh Malhotra',
      email: 'sales@apexmaterials.com',
      phone: '+91 98999 22334',
      department: 'Sales',
      designation: 'Senior Sales Executive',
      basic_salary: 55000,
      allowances: 20000,
      joining_date: '2023-01-10',
      pan: 'PQRS12345T',
      aadhaar: '9876 5432 1098',
      bank_account: '0004050998877',
      status: 'Active',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Employee Master & HR Directory</h1>
          <p className="text-xs text-slate-500 font-medium">Employee profiles, statutory details, departments and basic salary breakdown</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddEmpOpen(true)}>
          Register Employee
        </Button>
      </div>

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Emp Code & Name</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Designation</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5 text-right">Basic Salary</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">
                    <div>{e.full_name}</div>
                    <div className="text-[10px] font-mono text-[#D8232A] font-bold">{e.emp_code}</div>
                  </td>
                  <td className="p-3.5"><Badge variant="info">{e.department}</Badge></td>
                  <td className="p-3.5 font-semibold text-slate-800">{e.designation}</td>
                  <td className="p-3.5">
                    <div className="font-medium text-slate-800">{e.email}</div>
                    <div className="text-[10px] text-slate-500">{e.phone}</div>
                  </td>
                  <td className="p-3.5 text-right font-black text-slate-950">{formatCurrency(e.basic_salary)}</td>
                  <td className="p-3.5 text-center"><Badge variant="success">{e.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal Add Employee */}
      <Modal isOpen={isAddEmpOpen} onClose={() => setIsAddEmpOpen(false)} title="Register Staff Profile">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddEmpOpen(false); }}>
          <Input label="Full Name" placeholder="Rahul Sharma" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Emp Code" placeholder="EMP-103" required />
            <Input label="Department" placeholder="Logistics / Sales / HR" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Designation" placeholder="Site Engineer" required />
            <Input label="Basic Monthly Salary (₹)" type="number" placeholder="45000" required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddEmpOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Employee</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
