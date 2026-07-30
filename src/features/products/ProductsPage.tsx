import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../lib/utils';
import { Package, Plus, Search, Barcode, QrCode, AlertTriangle, FileSpreadsheet, Tag, DollarSign } from 'lucide-react';
import { Product } from '../../types';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 'prod_1',
      company_id: 'comp_77283',
      sku: 'TMT-12MM-550D',
      barcode: '8901234567890',
      name: 'TMT Steel Thermo-Mechanically Treated Bars (12mm Fe550D)',
      category: 'Steel',
      brand: 'Tata Tiscon',
      unit: 'MT',
      hsn_code: '72142090',
      gst_rate: 18,
      purchase_price: 54000,
      selling_price: 63000,
      opening_stock: 100,
      current_stock: 18,
      minimum_stock: 25,
      created_at: '2024-01-15',
    },
    {
      id: 'prod_2',
      company_id: 'comp_77283',
      sku: 'RMC-M30-STD',
      barcode: '8901234567891',
      name: 'Ready Mix Concrete M30 Grade (High Workability)',
      category: 'Concrete',
      brand: 'Apex RMC',
      unit: 'CuM',
      hsn_code: '38245010',
      gst_rate: 18,
      purchase_price: 3600,
      selling_price: 4500,
      opening_stock: 500,
      current_stock: 850,
      minimum_stock: 100,
      created_at: '2024-01-20',
    },
    {
      id: 'prod_3',
      company_id: 'comp_77283',
      name: 'UltraTech OPC 53 Grade Ordinary Portland Cement (50kg Bag)',
      sku: 'CEM-OPC-53',
      barcode: '8901234567892',
      category: 'Cement',
      brand: 'UltraTech',
      unit: 'Bags',
      hsn_code: '25232910',
      gst_rate: 28,
      purchase_price: 330,
      selling_price: 390,
      opening_stock: 1000,
      current_stock: 120,
      minimum_stock: 200,
      created_at: '2024-02-01',
    },
    {
      id: 'prod_4',
      company_id: 'comp_77283',
      sku: 'SAND-RIVER-FINE',
      barcode: '8901234567893',
      name: 'Washed River Sand (Zone II Fine Aggregate)',
      category: 'Aggregates',
      brand: 'Natural Aggregate',
      unit: 'CuM',
      hsn_code: '25051000',
      gst_rate: 5,
      purchase_price: 1400,
      selling_price: 1800,
      opening_stock: 300,
      current_stock: 450,
      minimum_stock: 80,
      created_at: '2024-02-10',
    },
  ]);

  const categories = ['All', 'Steel', 'Concrete', 'Cement', 'Aggregates', 'Bricks & Blocks'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.hsn_code.includes(searchTerm);
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Construction Product Master Catalog</h1>
          <p className="text-xs text-slate-400">SKU inventory master, HSN codes, GST tax brackets, barcodes & price lists</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Barcode className="w-4 h-4" />}>
            Scan Barcode
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddProductOpen(true)}>
            Add New Product
          </Button>
        </div>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="w-full sm:w-80">
          <Input
            icon={<Search className="w-4 h-4" />}
            placeholder="Search SKU, Product Name, HSN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
              <tr>
                <th className="p-3">SKU & Product Name</th>
                <th className="p-3">Category / Brand</th>
                <th className="p-3">HSN Code</th>
                <th className="p-3 text-center">GST %</th>
                <th className="p-3 text-right">Purchase Price</th>
                <th className="p-3 text-right">Selling Price</th>
                <th className="p-3 text-center">Current Stock</th>
                <th className="p-3 text-center">Stock Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p) => {
                const isLowStock = p.current_stock <= p.minimum_stock;
                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-slate-100">
                      <div>{p.name}</div>
                      <div className="text-[10px] font-mono text-sky-400">SKU: {p.sku}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-200">{p.category}</div>
                      <div className="text-[10px] text-slate-400">{p.brand}</div>
                    </td>
                    <td className="p-3 font-mono">{p.hsn_code}</td>
                    <td className="p-3 text-center font-bold text-slate-200">{p.gst_rate}%</td>
                    <td className="p-3 text-right font-medium text-slate-300">{formatCurrency(p.purchase_price)} / {p.unit}</td>
                    <td className="p-3 text-right font-bold text-emerald-400">{formatCurrency(p.selling_price)} / {p.unit}</td>
                    <td className="p-3 text-center font-extrabold text-slate-100">
                      {p.current_stock} <span className="text-[10px] text-slate-400 font-normal">{p.unit}</span>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant={isLowStock ? 'danger' : 'success'}>
                        {isLowStock ? 'Low Stock' : 'Optimal'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal Add Product */}
      <Modal isOpen={isAddProductOpen} onClose={() => setIsAddProductOpen(false)} title="Add Product to Master Catalog">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddProductOpen(false); }}>
          <Input label="Product Name" placeholder="e.g. TMT Steel Bars 16mm" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="SKU Code" placeholder="TMT-16MM-550D" required />
            <Input label="HSN Code" placeholder="72142090" required />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Category</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100">
                <option value="Steel">Steel</option>
                <option value="Concrete">Concrete</option>
                <option value="Cement">Cement</option>
                <option value="Aggregates">Aggregates</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Unit</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100">
                <option value="MT">MT (Tons)</option>
                <option value="Bags">Bags</option>
                <option value="CuM">CuM</option>
                <option value="SqFt">SqFt</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">GST Rate %</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100">
                <option value="18">18% GST</option>
                <option value="28">28% GST</option>
                <option value="5">5% GST</option>
                <option value="0">0% Exempt</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Purchase Cost Price (₹)" type="number" placeholder="54000" required />
            <Input label="Selling Price (₹)" type="number" placeholder="63000" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Opening Stock Qty" type="number" placeholder="100" required />
            <Input label="Minimum Safety Alert Qty" type="number" placeholder="25" required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddProductOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Product Master</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
