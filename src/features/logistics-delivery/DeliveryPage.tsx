import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatDateTime } from '../../lib/utils';
import { MapPin, Truck, Phone, CheckCircle2, ShieldCheck, KeyRound, Camera, FileCheck, RefreshCw, Send } from 'lucide-react';
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
          <h1 className="text-2xl font-bold text-slate-100">Dispatch & Live GPS Delivery Tracking</h1>
          <p className="text-xs text-slate-400">Driver telemetry, OTP verification, customer digital signature & site photo proof</p>
        </div>
      </div>

      {/* Delivery Challans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {challans.map((dc) => (
          <Card key={dc.id} className="hover:border-slate-700 transition-all">
            <CardHeader>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sky-400 font-bold">{dc.challan_number}</span>
                  <Badge variant={dc.status === 'Delivered' ? 'success' : 'warning'}>{dc.status}</Badge>
                </div>
                <CardTitle className="mt-1">{dc.customer_name}</CardTitle>
                <div className="flex items-center gap-1 text-xs text-amber-400 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {dc.delivery_address}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              {/* Driver & Vehicle Box */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5"><Truck className="w-4 h-4 text-sky-400" /> Vehicle:</span>
                  <span className="font-bold text-slate-200">{dc.vehicle_number}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-400" /> Driver:</span>
                  <span className="font-semibold text-slate-200">{dc.driver_name} ({dc.driver_phone})</span>
                </div>
              </div>

              {/* GPS Telemetry Simulation */}
              <div className="p-3 bg-sky-950/20 rounded-xl border border-sky-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                  <div>
                    <div className="font-bold text-sky-300">Live Driver Telemetry</div>
                    <div className="text-[10px] text-slate-400 font-mono">Lat: {dc.driver_lat}, Lng: {dc.driver_lng}</div>
                  </div>
                </div>
                <Button
                  variant={dc.status === 'Delivered' ? 'outline' : 'amber'}
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
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
              <div><span className="text-slate-400">Customer:</span> <strong className="text-slate-200">{selectedChallan.customer_name}</strong></div>
              <div><span className="text-slate-400">Site Location:</span> <strong className="text-amber-400">{selectedChallan.delivery_address}</strong></div>
            </div>

            {!isOtpVerified ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase">
                  Enter 6-Digit OTP Received by Site Engineer
                </label>
                <div className="flex gap-2">
                  <Input
                    icon={<KeyRound className="w-4 h-4" />}
                    placeholder="Enter OTP (Demo Code: 882109)"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                  />
                  <Button variant="amber" onClick={handleVerifyOtp}>
                    Verify OTP
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-center p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-300">Delivery Verified & Signed</h4>
                <p className="text-xs text-slate-400">Customer E-Signature & GPS Stamp recorded successfully.</p>
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
