import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatDateTime } from '../../lib/utils';
import { ShieldCheck, MapPin, Camera, Clock, CheckCircle2 } from 'lucide-react';
import { AttendanceRecord } from '../../types';

export const AttendancePage: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  const [records, setRecords] = useState<AttendanceRecord[]>([
    {
      id: 'att_1',
      employee_id: 'emp_1',
      employee_name: 'Suresh Patil (Logistics Head)',
      date: '2024-07-30',
      check_in_time: '2024-07-30T08:55:00Z',
      check_in_lat: 19.1176,
      check_in_lng: 72.8878,
      status: 'Present',
      overtime_hours: 1.5,
    },
    {
      id: 'att_2',
      employee_id: 'emp_2',
      employee_name: 'Rajesh Malhotra (Sales Executive)',
      date: '2024-07-30',
      check_in_time: '2024-07-30T09:20:00Z',
      check_in_lat: 19.0176,
      check_in_lng: 72.8178,
      status: 'Late',
      overtime_hours: 0,
    },
  ]);

  const handlePunch = () => {
    setIsCheckedIn(!isCheckedIn);
    alert(isCheckedIn ? 'Checked Out Successfully! GPS location & time recorded.' : 'Checked In Successfully with Geofenced GPS Verification!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Geofenced GPS Attendance Terminal</h1>
          <p className="text-xs text-slate-400">Site engineer & plant worker check-in with GPS location verification</p>
        </div>
      </div>

      {/* Geofence Terminal Widget */}
      <Card className="bg-slate-900 border-sky-500/30">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" /> Geofence Verified Zone: Plant HQ Mumbai
            </div>
            <h3 className="text-xl font-extrabold text-slate-100">Biometric & GPS Mobile Punch</h3>
            <p className="text-xs text-slate-400">Current GPS Stamp: 19.1176 N, 72.8878 E (Accuracy: ±2 meters)</p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant={isCheckedIn ? 'danger' : 'primary'}
              size="lg"
              onClick={handlePunch}
              icon={<Camera className="w-5 h-5" />}
            >
              {isCheckedIn ? 'Punch Out (Check Out)' : 'Punch In with Selfie'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Log */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Site Attendance Roster</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
              <tr>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Check-In Time</th>
                <th className="p-3">GPS Location</th>
                <th className="p-3 text-center">Overtime</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-slate-100">{r.employee_name}</td>
                  <td className="p-3 font-mono text-sky-400">{formatDateTime(r.check_in_time)}</td>
                  <td className="p-3 font-mono text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {r.check_in_lat}, {r.check_in_lng}
                  </td>
                  <td className="p-3 text-center font-bold text-amber-400">{r.overtime_hours} hrs</td>
                  <td className="p-3 text-center">
                    <Badge variant={r.status === 'Present' ? 'success' : 'warning'}>{r.status}</Badge>
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
