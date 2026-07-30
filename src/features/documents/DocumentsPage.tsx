import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FolderLock, FileText, Upload, ShieldCheck, Download, Trash } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const documents = [
    { id: 1, name: 'Company GST Registration Certificate.pdf', category: 'Compliance', size: '2.4 MB', date: '2024-01-15' },
    { id: 2, name: 'L&T Master Material Supply Contract 2024.pdf', category: 'Customer Agreements', size: '8.1 MB', date: '2024-02-10' },
    { id: 3, name: 'Tata Steel Authorized Dealer License.pdf', category: 'Supplier Licenses', size: '4.5 MB', date: '2024-03-01' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Document Management Vault</h1>
          <p className="text-xs text-slate-400">Secure encrypted storage for GST, PAN, customer contracts, PO bills & employee files</p>
        </div>
        <Button variant="primary" size="sm" icon={<Upload className="w-4 h-4" />}>
          Upload Document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vault Encrypted Repository</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
              <tr>
                <th className="p-3">File Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">File Size</th>
                <th className="p-3">Upload Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {documents.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-slate-100 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{d.name}</span>
                  </td>
                  <td className="p-3"><Badge variant="info">{d.category}</Badge></td>
                  <td className="p-3 font-mono text-slate-400">{d.size}</td>
                  <td className="p-3 font-mono text-slate-400">{d.date}</td>
                  <td className="p-3 text-center">
                    <button className="p-1.5 text-sky-400 hover:bg-slate-800 rounded">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
