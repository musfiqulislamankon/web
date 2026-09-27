import React from 'react';
import { X, Truck, ShieldCheck, Wrench, RefreshCw, CreditCard } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HowToOrderModal: React.FC = () => {
  const { isHowToOrderModalOpen, setIsHowToOrderModalOpen } = useStore();

  if (!isHowToOrderModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsHowToOrderModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        <div className="p-6 bg-[#101828] text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              Customer Guidance
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Ordering & Delivery Protocol
            </h3>
          </div>
          <button
            onClick={() => setIsHowToOrderModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-slate-700 leading-relaxed">
          {/* Section 1: Guest Checkout */}
          <div className="space-y-1.5">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-xs flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-700" />
              1. Guest Checkout & Payment Flexibility
            </h4>
            <p>
              Nexara does not require account passwords or registration. You can place an order directly as a guest with your phone number and address. We support <strong>Cash on Delivery (COD)</strong> across all 8 divisions of Bangladesh, as well as <strong>bKash</strong>, <strong>Nagad</strong>, and <strong>Visa / Mastercard</strong>.
            </p>
          </div>

          {/* Section 2: Delivery Across Bangladesh */}
          <div className="space-y-1.5 pt-4 border-t border-slate-100">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-xs flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-700" />
              2. Delivery Timelines by Region
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Dhaka Division:</strong> Next-day doorstep delivery (within 24 hours for orders placed before 2:00 PM). Flat ৳80 or Free above ৳100,000.</li>
              <li><strong>Chattogram, Sylhet, Mymensingh:</strong> 48 hours express temperature-controlled transit. Flat ৳140–৳150.</li>
              <li><strong>Rajshahi, Khulna, Barishal, Rangpur:</strong> 48 to 72 hours insured courier handoff with recipient PIN verification. Flat ৳150–৳160.</li>
            </ul>
          </div>

          {/* Section 3: Technician Visits */}
          <div className="space-y-1.5 pt-4 border-t border-slate-100">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-xs flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-700" />
              3. White-Glove Setting Visits
            </h4>
            <p>
              When you book a setting service or add one to your device purchase, an atelier technician arrives in official attire with certified tooling. They conduct cable-to-cable data transfer without cloud upload, test biometric sensors, configure network profiles, and format POS receipts.
            </p>
          </div>

          {/* Section 4: Warranty & Replacement */}
          <div className="space-y-1.5 pt-4 border-t border-slate-100">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              4. Official Warranty & Unboxing Inspection
            </h4>
            <p>
              All handhelds and hardware carry genuine BTRC registration certificates and an official 2-year Bangladesh warranty. You are welcome to unbox and verify your phone’s IMEI and physical condition in the presence of the courier before paying.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
