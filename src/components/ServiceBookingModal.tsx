import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  CheckCircle,
  Wrench,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Division } from '../types';

export const ServiceBookingModal: React.FC = () => {
  const {
    activeBookingService,
    setActiveBookingService,
    selectedDivision,
    formatPrice,
    addServiceBooking,
    setIsCartOpen,
  } = useStore();

  // Form states
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('Morning (10:00 AM – 1:00 PM)');
  const [division, setDivision] = useState<Division>(selectedDivision);
  const [district, setDistrict] = useState(
    selectedDivision === 'Dhaka' ? 'Dhaka City' : selectedDivision
  );
  const [address, setAddress] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!activeBookingService) return null;

  const timeSlots = [
    'Morning (10:00 AM – 1:00 PM)',
    'Afternoon (2:00 PM – 5:00 PM)',
    'Evening (6:00 PM – 8:30 PM)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!clientPhone.trim() || clientPhone.trim().length < 10) {
      setErrorMsg('Please provide a valid Bangladeshi phone number (e.g. 01712-345678).');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Please enter your road/house/shop address.');
      return;
    }

    addServiceBooking({
      service: activeBookingService,
      date: preferredDate,
      timeSlot,
      division,
      district,
      address,
      clientName,
      clientPhone,
      clientNotes,
      technicianTier: activeBookingService.technicianTier,
      fee: activeBookingService.price,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveBookingService(null);
      setIsCartOpen(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setActiveBookingService(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="bg-[#101828] text-white p-6 sm:p-7 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Atelier Setting Visit Booking
              </div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1">
                {activeBookingService.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Estimated duration: {activeBookingService.duration} · Assigned: {activeBookingService.technicianTier}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveBookingService(null)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-serif-luxury text-2xl font-bold text-slate-900">
              Setting Visit Reserved!
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              We have added this technician appointment to your bag. Complete your booking with guest checkout to finalize your dispatch slot.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    Preferred Visit Date
                  </span>
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    Arrival Window
                  </span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Details */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 mb-3">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>Service Location (Doorstep Address)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Division</label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value as Division)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                  >
                    {[
                      'Dhaka',
                      'Chattogram',
                      'Sylhet',
                      'Rajshahi',
                      'Khulna',
                      'Barishal',
                      'Rangpur',
                      'Mymensingh',
                    ].map((div) => (
                      <option key={div} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Area / District</label>
                  <input
                    type="text"
                    placeholder="e.g. Dhanmondi, Banani, Agrabad"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Street Address / House / Floor / Shop Details
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. House 14, Road 7, Flat 4B, Dhanmondi (Near Lake)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                />
              </div>
            </div>

            {/* Client Contact */}
            <div className="pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      Client Contact Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tanvir Ahmed"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      Contact Mobile Number
                    </span>
                  </label>
                  <input
                    type="tel"
                    placeholder="01711-XXXXXX"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-[11px] text-slate-500 mb-1">
                  Specific Hardware Notes or Requirements (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Migrating 120GB WhatsApp data, need screen protector installed"
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Price Breakdown & Submit */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Service Flat Rate</span>
                <span className="text-xl font-bold text-slate-900 tabular-nums">
                  {formatPrice(activeBookingService.price)}
                </span>
                <span className="text-[11px] text-emerald-700 block font-medium">
                  Includes all transit & engineer tooling
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Confirm & Add Visit to Bag</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
