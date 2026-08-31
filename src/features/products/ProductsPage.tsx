import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../lib/utils';
import { Plus, Search, Barcode, Trash2, Package, RefreshCw } from 'lucide-react';
import { Product } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { fetchLiveProducts, createLiveProduct, deleteLiveProduct } from '../../lib/api';

export const ProductsPage: React.FC = () => {
  const { company } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Form fields for new product
  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Concrete');
  const [brand, setBrand] = useState('');
  const [unit, setUnit] = useState<'MT' | 'Bags' | 'CuM' | 'SqFt' | 'Pieces' | 'Kgs' | 'Liters'>('CuM');
  const [hsnCode, setHsnCode] = useState('38245010');
  const [gstRate, setGstRate] = useState(18);
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [currentStock, setCurrentStock] = useState<number>(0);
  const [minimumStock, setMinimumStock] = useState<number>(10);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLiveProducts(company?.id);
      setProducts(data);
    } catch (err) {
      console.error('Error fetching live products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [company?.id]);

  const categories = ['All', 'Steel', 'Concrete', 'Cement', 'Aggregates', 'Bricks & Blocks', 'Chemicals'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.hsn_code.includes(searchTerm);
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const newProd = await createLiveProduct({
      company_id: company.id,
      sku,
      barcode: barcode || Math.floor(1000000000000 + Math.random() * 9000000000000).toString(),
      name,
      category,
      brand: brand || company.name,
      unit,
      hsn_code: hsnCode,
      gst_rate: gstRate,
      purchase_price: purchasePrice,
      selling_price: sellingPrice,
      opening_stock: currentStock,
      current_stock: currentStock,
      minimum_stock: minimumStock,
    });

    if (newProd) {
      setProducts((prev) => [newProd, ...prev]);
    } else {
      // Optimistic local add
      loadProducts();
    }

    setIsAddProductOpen(false);
    setSku('');
    setName('');
    setBrand('');
    setPurchasePrice(0);
    setSellingPrice(0);
    setCurrentStock(0);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    await deleteLiveProduct(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Product & Price Master</h1>
          <p className="text-xs text-slate-500 font-medium">
            Live catalog of products, SKU barcodes, GST rates, unit pricing & stock status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={loadProducts}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddProductOpen(true)}
          >
            Add New Product
          </Button>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === c
                  ? 'bg-[#D8232A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search SKU, name, HSN code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-[#D8232A] focus:bg-white"
          />
        </div>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Product & SKU</th>
                <th className="p-3.5">Category & Brand</th>
                <th className="p-3.5">HSN & GST</th>
                <th className="p-3.5 text-right">Purchase Price</th>
                <th className="p-3.5 text-right">Selling Price</th>
                <th className="p-3.5 text-center">Live Stock</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Package className="w-8 h-8 text-slate-300" />
                      <p className="text-sm font-bold text-slate-700">No products found</p>
                      <p className="text-xs text-slate-500">
                        {searchTerm ? 'Try adjusting your search filters' : 'Add your first inventory product to get started'}
                      </p>
                      {!searchTerm && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="mt-2 text-xs"
                          onClick={() => setIsAddProductOpen(true)}
                        >
                          Add First Product
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLowStock = p.current_stock <= p.minimum_stock;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D8232A] flex items-center justify-center font-bold text-xs shrink-0">
                            {p.name[0]}
                          </div>
                          <div>
                            <div>{p.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                              <span>SKU: {p.sku}</span>
                              {p.barcode && (
                                <span className="flex items-center gap-0.5">
                                  <Barcode className="w-3 h-3 inline" /> {p.barcode}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800">{p.category}</div>
                        <div className="text-[10px] text-slate-500">{p.brand}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-mono text-slate-800">{p.hsn_code}</div>
                        <div className="text-[10px] font-bold text-emerald-700">{p.gst_rate}% GST</div>
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-600">
                        {formatCurrency(p.purchase_price)} / {p.unit}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(p.selling_price)} / {p.unit}
                      </td>
                      <td className="p-3.5 text-center">
                        <Badge variant={isLowStock ? 'danger' : 'success'}>
                          {p.current_stock} {p.unit}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      <Modal isOpen={isAddProductOpen} onClose={() => setIsAddProductOpen(false)} title="Register New Inventory Product">
        <form className="space-y-4" onSubmit={handleAddProduct}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="SKU Code"
              placeholder="e.g. TMT-16MM-550D"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
            <Input
              label="Barcode (Optional)"
              placeholder="8901234567894"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </div>

          <Input
            label="Product Full Name"
            placeholder="e.g. Ready Mix Concrete M25 Grade"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value="Concrete">Concrete</option>
                <option value="Steel">Steel</option>
                <option value="Cement">Cement</option>
                <option value="Aggregates">Aggregates</option>
                <option value="Bricks & Blocks">Bricks & Blocks</option>
                <option value="Chemicals">Chemicals</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Unit of Measure</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value="CuM">CuM (Cubic Meter)</option>
                <option value="MT">MT (Metric Ton)</option>
                <option value="Bags">Bags</option>
                <option value="SqFt">SqFt</option>
                <option value="Pieces">Pieces</option>
                <option value="Kgs">Kgs</option>
                <option value="Liters">Liters</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Brand / Producer"
              placeholder="e.g. UltraTech"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <Input
              label="HSN Code"
              placeholder="38245010"
              value={hsnCode}
              onChange={(e) => setHsnCode(e.target.value)}
              required
            />
            <Input
              label="GST Rate (%)"
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(Number(e.target.value))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Purchase Unit Cost (₹)"
              type="number"
              placeholder="3200"
              value={purchasePrice || ''}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              required
            />
            <Input
              label="Selling Price (₹)"
              type="number"
              placeholder="4100"
              value={sellingPrice || ''}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Current / Opening Stock"
              type="number"
              placeholder="100"
              value={currentStock || ''}
              onChange={(e) => setCurrentStock(Number(e.target.value))}
              required
            />
            <Input
              label="Minimum Alert Stock"
              type="number"
              placeholder="20"
              value={minimumStock || ''}
              onChange={(e) => setMinimumStock(Number(e.target.value))}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddProductOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Product
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
