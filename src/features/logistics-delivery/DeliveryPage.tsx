import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { MapPin, Truck, Phone, CheckCircle2, KeyRound } from 'lucide-react';
import { DeliveryChallan } from '../../types';

export const DeliveryPage: React.FC = () => {
  const [selectedChallan, setSelectedChallan] = useState<DeliveryChallan | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [challans, setChallans] = useState<DeliveryChallan[]>([
    {
      id: 'dc_1',
      company_id: 'comp_77283',
      challan_number: 'DC-2024-9921',
      sales_order_id: 'so_1',
      customer_name: 'Larsen & Toubro Ltd',
      delivery_address: 'Coastal Road Project Site 4, Worli, Mumbai',
      vehicle_number: 'MH-04-EY-1234 (Tata Prima 28T Tipper)',
      driver_name: 'Subhash Yadav',
      driver_phone: '+91 98199 00112',
      dispatch_time: '2024-07-30T09:15:00Z',
      delivered_time: '2024-07-30T10:45:00Z',
      driver_lat: 19.0176,
      driver_lng: 72.8178,
      otp_code: '492810',
      status: 'Delivered',
    },
    {
      id: 'dc_2',
      company_id: 'comp_77283',
      challan_number: 'DC-2024-9922',
      sales_order_id: 'so_2',
      customer_name: 'Shapoorji Pallonji Real Estate',
      delivery_address: 'Vicinia Site, Chandivali, Powai',
      vehicle_number: 'MH-12-PQ-5678 (Ashok Leyland Transit Mixer)',
      driver_name: 'Ramesh Kadam',
      driver_phone: '+91 98222 33445',
      dispatch_time: '2024-07-30T11:00:00Z',
      driver_lat: 19.1176,
      driver_lng: 72.8878,
      otp_code: '882109',
      status: 'In Transit',
    },
  ]);

  const handleVerifyOtp = () => {
    if (selectedChallan && otpInput === selectedChallan.otp_code) {
      setIsOtpVerified(true);
      setChallans(
        challans.map((c) =>
          c.id === selectedChallan.id ? { ...c, status: 'Delivered', delivered_time: new Date().toISOString() } : c
        )
      );
    } else {
      alert('Invalid OTP code! Please verify code sent to site engineer.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Dispatch & Live GPS Delivery Tracking</h1>
          <p className="text-xs text-slate-500 font-medium">Driver telemetry, OTP verification, customer digital signature & site photo proof</p>
        </div>
      </div>

      {/* Delivery Challans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {challans.map((dc) => (
          <Card key={dc.id} className="hover:border-slate-300 hover:shadow-md transition-all">
            <CardHeader>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#D8232A] font-bold">{dc.challan_number}</span>
                  <Badge variant={dc.status === 'Delivered' ? 'success' : 'warning'}>{dc.status}</Badge>
                </div>
                <CardTitle className="mt-1">{dc.customer_name}</CardTitle>
                <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {dc.delivery_address}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              {/* Driver & Vehicle Box */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5"><Truck className="w-4 h-4 text-[#D8232A]" /> Vehicle:</span>
                  <span className="font-bold text-slate-900">{dc.vehicle_number}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-600" /> Driver:</span>
                  <span className="font-semibold text-slate-800">{dc.driver_name} ({dc.driver_phone})</span>
                </div>
              </div>

              {/* GPS Telemetry Simulation */}
              <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D8232A] animate-ping" />
                  <div>
                    <div className="font-bold text-slate-900">Live Driver Telemetry</div>
                    <div className="text-[10px] text-slate-500 font-mono">Lat: {dc.driver_lat}, Lng: {dc.driver_lng}</div>
                  </div>
                </div>
                <Button
                  variant={dc.status === 'Delivered' ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => {
                    setSelectedChallan(dc);
                    setOtpInput('');
                    setIsOtpVerified(dc.status === 'Delivered');
                  }}
                >
                  {dc.status === 'Delivered' ? 'View POD Signature' : 'Verify Delivery OTP'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal OTP & POD Verification */}
      {selectedChallan && (
        <Modal
          isOpen={!!selectedChallan}
          onClose={() => setSelectedChallan(null)}
          title={`Proof of Delivery (POD) - ${selectedChallan.challan_number}`}
        >
          <div className="space-y-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div><span className="text-slate-500 font-medium">Customer:</span> <strong className="text-slate-900">{selectedChallan.customer_name}</strong></div>
              <div><span className="text-slate-500 font-medium">Site Location:</span> <strong className="text-amber-700">{selectedChallan.delivery_address}</strong></div>
            </div>

            {!isOtpVerified ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Enter 6-Digit OTP Received by Site Engineer
                </label>
                <div className="flex gap-2">
                  <Input
                    icon={<KeyRound className="w-4 h-4" />}
                    placeholder="Enter OTP (Demo Code: 882109)"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                  />
                  <Button variant="primary" onClick={handleVerifyOtp}>
                    Verify OTP
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-center p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-800 font-heading">Delivery Verified & Signed</h4>
                <p className="text-xs text-slate-600">Customer E-Signature & GPS Stamp recorded successfully.</p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setSelectedChallan(null)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
