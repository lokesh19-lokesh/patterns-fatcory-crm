import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../lib/utils';
import { Plus, RefreshCw, Users, UserCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchLiveEmployees, createLiveEmployee, EmployeeRecord } from '../../lib/api';

export const EmployeesPage: React.FC = () => {
  const { company } = useAuth();
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddEmpOpen, setIsAddEmpOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Production');
  const [designation, setDesignation] = useState('Plant Engineer');
  const [salary, setSalary] = useState<number>(35000);

  const loadEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLiveEmployees(company?.id);
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [company?.id]);

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const newEmp = await createLiveEmployee({
      company_id: company.id,
      full_name: fullName,
      email,
      phone,
      department,
      designation,
      salary,
      status: 'Active',
      joining_date: new Date().toISOString().split('T')[0],
    });

    if (newEmp) {
      setEmployees((prev) => [newEmp, ...prev]);
    } else {
      loadEmployees();
    }

    setIsAddEmpOpen(false);
    setFullName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Employee Master & HR Directory</h1>
          <p className="text-xs text-slate-500 font-medium">Employee profiles, statutory details, departments and monthly salary breakdown</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={loadEmployees}
          >
            Refresh
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddEmpOpen(true)}>
            Register Employee
          </Button>
        </div>
      </div>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Staff Directory</CardTitle>
            <Badge variant="brand">{employees.length} Employees</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Employee Name & Contact</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Designation</th>
                <th className="p-3.5 text-right">Monthly Gross Salary</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-400">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-bold text-slate-700">No staff members enrolled yet</p>
                    <p className="text-xs text-slate-500 mb-2">Register salaried employees to track HR & payroll</p>
                    <Button variant="primary" size="sm" onClick={() => setIsAddEmpOpen(true)}>
                      Add First Employee
                    </Button>
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {emp.full_name[0]}
                        </div>
                        <div>
                          <div>{emp.full_name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">
                            {emp.phone} {emp.email && `• ${emp.email}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">{emp.department}</td>
                    <td className="p-3.5 text-slate-600 font-medium">{emp.designation}</td>
                    <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                      {formatCurrency(emp.salary)} / mo
                    </td>
                    <td className="p-3.5 text-center">
                      <Badge variant={emp.status === 'Active' ? 'success' : 'warning'}>
                        {emp.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Employee Modal */}
      <Modal isOpen={isAddEmpOpen} onClose={() => setIsAddEmpOpen(false)} title="Register Staff Member">
        <form className="space-y-4" onSubmit={handleAddEmployee}>
          <Input
            label="Full Legal Name"
            placeholder="e.g. Suresh Patil"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Contact Phone"
              placeholder="+91 97777 55443"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="suresh.p@plant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value="Production">Production & Kiln</option>
                <option value="Logistics">Logistics & Dispatch</option>
                <option value="Sales">Sales & Marketing</option>
                <option value="Quality">Quality Control</option>
                <option value="Maintenance">Plant Maintenance</option>
                <option value="Finance">Finance & Accounts</option>
              </select>
            </div>
            <Input
              label="Designation / Role Title"
              placeholder="Plant Logistics Head"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </div>

          <Input
            label="Monthly Basic Salary (₹)"
            type="number"
            value={salary || ''}
            onChange={(e) => setSalary(Number(e.target.value))}
            required
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddEmpOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Employee
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
