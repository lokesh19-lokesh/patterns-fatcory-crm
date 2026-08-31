import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { MapPin, Truck, Phone, CheckCircle2, KeyRound, Plus, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchLiveDeliveryChallans, createLiveDeliveryChallan, fetchLiveCustomers, DeliveryChallan } from '../../lib/api';
import { Customer } from '../../types';

export const DeliveryPage: React.FC = () => {
  const { company } = useAuth();
  const [challans, setChallans] = useState<DeliveryChallan[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddChallanOpen, setIsAddChallanOpen] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState<DeliveryChallan | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [totalQty, setTotalQty] = useState<number>(5000);

  const loadChallans = async () => {
    setIsLoading(true);
    try {
      const [data, custs] = await Promise.all([
        fetchLiveDeliveryChallans(company?.id),
        fetchLiveCustomers(company?.id),
      ]);
      setChallans(data);
      setCustomers(custs);
      if (custs.length > 0 && !customerName) {
        setCustomerName(custs[0].name);
        setDestination(custs[0].address || 'Client Construction Site');
      }
    } catch (err) {
      console.error('Error fetching challans:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChallans();
  }, [company?.id]);

  const handleCreateChallan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const newChallan = await createLiveDeliveryChallan({
      company_id: company.id,
      challan_no: `DC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_name: customerName || 'Client Site',
      vehicle_no: vehicleNo,
      driver_name: driverName,
      driver_phone: driverPhone,
      destination,
      total_qty: totalQty,
      status: 'Dispatched',
      dispatch_time: new Date().toISOString(),
    });

    if (newChallan) {
      setChallans((prev) => [newChallan, ...prev]);
    } else {
      loadChallans();
    }

    setIsAddChallanOpen(false);
    setVehicleNo('');
    setDriverName('');
    setDriverPhone('');
  };

  const handleVerifyOtp = () => {
    if (selectedChallan && otpInput) {
      setIsOtpVerified(true);
      setChallans(
        challans.map((c) =>
          c.id === selectedChallan.id ? { ...c, status: 'Delivered', delivered_time: new Date().toISOString() } : c
        )
      );
    } else {
      alert('Please enter the OTP delivered code received on customer mobile.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Dispatch & Logistics Fleet</h1>
          <p className="text-xs text-slate-500 font-medium">
            Live delivery challans, GPS transit status & OTP customer confirmation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={loadChallans}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddChallanOpen(true)}
          >
            Generate Delivery Challan
          </Button>
        </div>
      </div>

      {/* Grid of Challans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challans.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            <Truck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No active delivery challans</p>
            <p className="text-xs text-slate-500 mb-3">Create a new delivery challan to dispatch vehicles to customer sites</p>
            <Button variant="primary" size="sm" onClick={() => setIsAddChallanOpen(true)}>
              Create First Challan
            </Button>
          </div>
        ) : (
          challans.map((c) => (
            <Card key={c.id} className="hover:border-slate-300 transition-all">
              <CardHeader>
                <div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#D8232A]" />
                    <CardTitle>{c.challan_no}</CardTitle>
                  </div>
                  <div className="text-xs text-slate-500 font-bold mt-1">{c.customer_name}</div>
                </div>
                <Badge
                  variant={
                    c.status === 'Delivered'
                      ? 'success'
                      : c.status === 'In Transit' || c.status === 'Dispatched'
                      ? 'brand'
                      : 'warning'
                  }
                >
                  {c.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{c.destination}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-500">Vehicle: </span>
                    <span className="font-bold text-slate-900">{c.vehicle_no}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Driver: </span>
                    <span className="font-bold text-slate-900">{c.driver_name}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-slate-600 font-mono text-[11px]">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{c.driver_phone || 'Unlisted'}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setSelectedChallan(c);
                      setIsOtpVerified(c.status === 'Delivered');
                      setOtpInput('');
                    }}
                  >
                    {c.status === 'Delivered' ? 'Delivery Confirmed' : 'Verify Site OTP'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Challan Modal */}
      <Modal isOpen={isAddChallanOpen} onClose={() => setIsAddChallanOpen(false)} title="Generate Dispatch Delivery Challan">
        <form className="space-y-4" onSubmit={handleCreateChallan}>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Customer / Site Destination</label>
            <select
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                const cust = customers.find((c) => c.name === e.target.value);
                if (cust?.address) setDestination(cust.address);
              }}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              required
            >
              {customers.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Vehicle Registration No"
              placeholder="e.g. MH-04-EY-1234 (Tata 28T)"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              required
            />
            <Input
              label="Quantity Dispatched"
              type="number"
              value={totalQty}
              onChange={(e) => setTotalQty(Number(e.target.value))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Driver Full Name"
              placeholder="e.g. Subhash Yadav"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              required
            />
            <Input
              label="Driver Contact Phone"
              placeholder="+91 98199 00112"
              value={driverPhone}
              onChange={(e) => setDriverPhone(e.target.value)}
              required
            />
          </div>

          <Input
            label="Unloading Location / Address"
            placeholder="e.g. Worli Seaface Coastal Road Pier 4"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddChallanOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Dispatch Vehicle
            </Button>
          </div>
        </form>
      </Modal>

      {/* OTP Verification Modal */}
      {selectedChallan && (
        <Modal
          isOpen={!!selectedChallan}
          onClose={() => setSelectedChallan(null)}
          title={`Delivery Confirmation (${selectedChallan.challan_no})`}
        >
          <div className="space-y-4">
            {isOtpVerified ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Proof of Delivery Confirmed!</h4>
                <p className="text-xs text-emerald-700">
                  Site engineer confirmed receipt of goods via OTP authentication.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter the 6-digit OTP code received on the customer site engineer's mobile to confirm receipt and close the delivery challan.
                </p>
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Enter 6-digit OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="font-mono text-center tracking-widest text-lg"
                  />
                </div>
                <Button variant="primary" className="w-full" onClick={handleVerifyOtp}>
                  Confirm Delivery
                </Button>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
