import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { formatDateTime } from '../../lib/utils';
import { Warehouse, Plus, Boxes, RefreshCw } from 'lucide-react';
import { InventoryMovement, Product } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { fetchLiveProducts } from '../../lib/api';
import { supabase } from '../../lib/supabase';

export const InventoryPage: React.FC = () => {
  const { company } = useAuth();
  const [activeTab, setActiveTab] = useState('ledger');
  const [isRecordMovementOpen, setIsRecordMovementOpen] = useState(false);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [selectedProductId, setSelectedProductId] = useState('');
  const [movementType, setMovementType] = useState<'Stock In' | 'Stock Out' | 'Transfer' | 'Adjustment' | 'Damage' | 'Return'>('Stock In');
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState('MT');
  const [referenceNo, setReferenceNo] = useState('');
  const [notes, setNotes] = useState('');

  const warehouses = [
    { id: 'wh_1', name: 'Mumbai Central Stockyard', code: 'MUM-WH1', location: 'MIDC Andheri', occupancy: 78, manager: 'Plant Head' },
    { id: 'wh_2', name: 'Pune Aggregates Quarry Depot', code: 'PUN-WH2', location: 'Chakan Zone', occupancy: 42, manager: 'Yard Head' },
    { id: 'wh_3', name: 'Taloja RMC Batching Yard', code: 'TAL-WH3', location: 'Taloja MIDC Phase 2', occupancy: 65, manager: 'Dispatch Incharge' },
  ];

  const loadData = async () => {
    setIsLoading(true);
    try {
      const prods = await fetchLiveProducts(company?.id);
      setProducts(prods);

      let query = supabase.from('inventory_transactions').select('*, products(name)');
      if (company?.id) query = query.eq('company_id', company.id);
      const { data, error } = await query.order('created_at', { ascending: false });

      if (data && !error) {
        const mapped: InventoryMovement[] = data.map((d: any) => ({
          id: d.id,
          company_id: d.company_id,
          warehouse_id: d.warehouse_id || 'wh_1',
          product_id: d.product_id,
          product_name: d.products?.name || d.product_name || 'Raw Material',
          type: d.type,
          quantity: Number(d.quantity),
          unit: d.unit,
          reference_no: d.reference_no,
          notes: d.notes,
          created_by: 'Staff',
          created_at: d.created_at,
        }));
        setMovements(mapped);
      }
    } catch (e) {
      console.error('Error loading live inventory:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [company?.id]);

  const handleRecordMovement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const matchedProd = products.find((p) => p.id === selectedProductId) || products[0];
    const newTx = {
      company_id: company.id,
      warehouse_id: warehouses[0].id,
      product_id: matchedProd?.id,
      type: movementType,
      quantity,
      unit: unit || matchedProd?.unit || 'MT',
      reference_no: referenceNo || `TX-${Date.now().toString().slice(-6)}`,
      notes,
    };

    try {
      const { data, error } = await supabase.from('inventory_transactions').insert([newTx]).select().single();
      if (!error && data) {
        setMovements((prev) => [
          {
            id: data.id,
            company_id: company.id,
            warehouse_id: warehouses[0].id,
            product_id: matchedProd?.id || '',
            product_name: matchedProd?.name || 'Raw Material',
            type: movementType,
            quantity,
            unit: newTx.unit,
            reference_no: newTx.reference_no,
            notes,
            created_by: 'Staff',
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error('Inventory movement insert notice:', err);
    }

    setIsRecordMovementOpen(false);
    setQuantity(0);
    setNotes('');
    setReferenceNo('');
  };

  const tabs = [
    { id: 'ledger', label: 'Stock Movement Ledger', icon: <Boxes className="w-4 h-4" /> },
    { id: 'warehouses', label: 'Storage Yards & Warehouses', count: warehouses.length, icon: <Warehouse className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Stock & Raw Materials Ledger</h1>
          <p className="text-xs text-slate-500 font-medium">
            Live material receipts, warehouse yard transfers, dispatch stock-outs & balance adjustments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={loadData}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsRecordMovementOpen(true)}
          >
            Record Stock Movement
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'ledger' && (
        <Card>
          <CardHeader>
            <CardTitle>Live Material Transaction Log</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Product / Material</th>
                  <th className="p-3.5">Action Type</th>
                  <th className="p-3.5 text-right">Quantity</th>
                  <th className="p-3.5">Reference No</th>
                  <th className="p-3.5">Notes & Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {movements.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-400">
                      No stock movements recorded yet. Record your first inward or outward transaction.
                    </td>
                  </tr>
                ) : (
                  movements.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono text-[11px] text-slate-500">
                        {formatDateTime(m.created_at)}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">{m.product_name}</td>
                      <td className="p-3.5">
                        <Badge
                          variant={
                            m.type === 'Stock In'
                              ? 'success'
                              : m.type === 'Stock Out'
                              ? 'danger'
                              : 'brand'
                          }
                        >
                          {m.type}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                        {m.type === 'Stock In' ? '+' : m.type === 'Stock Out' ? '-' : ''}
                        {m.quantity} {m.unit}
                      </td>
                      <td className="p-3.5 font-mono font-semibold text-slate-700">{m.reference_no}</td>
                      <td className="p-3.5 text-slate-600 max-w-xs truncate">{m.notes}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'warehouses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {warehouses.map((wh) => (
            <Card key={wh.id} className="hover:border-slate-300 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Warehouse className="w-4 h-4 text-[#D8232A]" />
                  <CardTitle>{wh.name}</CardTitle>
                </div>
                <Badge variant="brand">{wh.code}</Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-800">{wh.location}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Yard Head:</span>
                  <span className="font-semibold text-slate-800">{wh.manager}</span>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Storage Capacity Utilized:</span>
                    <span className="font-bold text-[#D8232A]">{wh.occupancy}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-[#D8232A] h-2 rounded-full" style={{ width: `${wh.occupancy}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Record Movement */}
      <Modal isOpen={isRecordMovementOpen} onClose={() => setIsRecordMovementOpen(false)} title="Record Material Stock Movement">
        <form className="space-y-4" onSubmit={handleRecordMovement}>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Product / Raw Material</label>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                const p = products.find((prod) => prod.id === e.target.value);
                if (p) setUnit(p.unit);
              }}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              required
            >
              <option value="">-- Choose Material --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.sku})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Movement Type</label>
              <select
                value={movementType}
                onChange={(e) => setMovementType(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value="Stock In">🟢 Stock In (Receipt / GRN)</option>
                <option value="Stock Out">🔴 Stock Out (Dispatch / Sale)</option>
                <option value="Transfer">🔵 Transfer to Another Plant</option>
                <option value="Adjustment">🟡 Stock Audit Adjustment</option>
                <option value="Damage">⚫ Wastage / Damage</option>
              </select>
            </div>

            <Input
              label="Quantity"
              type="number"
              placeholder="e.g. 50"
              value={quantity || ''}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>

          <Input
            label="Reference No / Challan No"
            placeholder="e.g. GRN-9912 or DC-4401"
            value={referenceNo}
            onChange={(e) => setReferenceNo(e.target.value)}
          />

          <Input
            label="Notes & Purpose"
            placeholder="e.g. Dispatched to Site A via Truck MH-04-1234"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsRecordMovementOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Log Transaction
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
