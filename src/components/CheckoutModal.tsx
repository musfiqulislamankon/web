import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  AlertCircle,
  MapPin,
  Calendar,
  Wrench,
  ArrowRight,
  Package,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Division, Order } from '../types';
import { DIVISIONS_INFO } from '../data/catalog';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    serviceBookings,
    selectedDivision,
    formatPrice,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    placeOrder,
  } = useStore();

  // Checkout Form State (Guest checkout - no account needed)
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [division, setDivision] = useState<Division>(selectedDivision);
  const [district, setDistrict] = useState(
    selectedDivision === 'Dhaka' ? 'Dhaka City' : selectedDivision
  );
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [mfsNumber, setMfsNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isCheckoutModalOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name for delivery.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      setErrorMsg('Please provide a valid Bangladeshi mobile number (e.g., 01712-345678).');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Please enter your delivery street/house address.');
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !mfsNumber.trim()) {
      setErrorMsg(`Please enter your ${paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} account number.`);
      return;
    }

    const order = placeOrder(
      {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
        division,
        district,
        address,
        deliveryNotes,
      },
      paymentMethod
    );

    setConfirmedOrder(order);
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#101828] text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              Nexara Atelier Express Checkout
            </div>
            <h2 className="font-serif-luxury text-2xl font-bold text-white mt-0.5">
              {confirmedOrder ? 'Order Confirmed & Scheduled' : 'Guest Checkout (No Account Required)'}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {confirmedOrder ? (
          /* Confirmation Receipt State */
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase font-mono text-slate-500 font-semibold">
                Receipt Reference: {confirmedOrder.id}
              </span>
              <h3 className="font-serif-luxury text-3xl font-bold text-slate-900">
                Thank you, {confirmedOrder.customer.name}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your order has been recorded. Our Dhanmondi Atelier dispatch team is preparing your package and scheduling any technician visits.
              </p>
            </div>

            {/* Order Details Summary Box */}
            <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Date</span>
                  <span className="font-semibold text-slate-800">{confirmedOrder.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Status</span>
                  <span className="font-semibold text-emerald-700">{confirmedOrder.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Payment</span>
                  <span className="font-semibold text-slate-800 uppercase">
                    {confirmedOrder.paymentMethod}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Estimated Arrival</span>
                  <span className="font-semibold text-slate-800">
                    {confirmedOrder.estimatedArrival}
                  </span>
                </div>
              </div>

              {/* Items in this order */}
              <div>
                <span className="text-slate-500 font-semibold block mb-2 uppercase text-[10px] tracking-wider">
                  Itemized Manifest
                </span>
                <div className="space-y-2">
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-800">
                      <div>
                        <span className="font-medium">{item.product.name}</span>
                        <span className="text-slate-500 text-[11px] ml-1.5">
                          ({item.selectedColor.name} {item.selectedStorage ? `· ${item.selectedStorage}` : ''}) x{item.quantity}
                        </span>
                        {item.includeSetupVisit && (
                          <span className="block text-[11px] text-amber-800 font-medium">
                            + Includes Certified Doorstep Setting Visit
                          </span>
                        )}
                      </div>
                      <span className="font-mono font-semibold">
                        {formatPrice(item.unitPrice * item.quantity + (item.includeSetupVisit ? item.setupFee : 0))}
                      </span>
                    </div>
                  ))}

                  {confirmedOrder.serviceBookings.map((b, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-800">
                      <div>
                        <span className="font-medium">{b.service.title}</span>
                        <span className="text-slate-500 text-[11px] block">
                          Slot: {b.date} ({b.timeSlot})
                        </span>
                      </div>
                      <span className="font-mono font-semibold">{formatPrice(b.fee)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Total Amount:</span>
                <span className="text-base font-mono tabular-nums">{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>

            {/* Delivery Dispatch Timeline Simulation */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1.5">
              <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>Next Step: Courier & Technician Dispatch</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                A verification SMS and WhatsApp link will be dispatched to <strong>{confirmedOrder.customer.phone}</strong>. If you requested a technician visit, the engineer will contact you 30 minutes before arrival.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-slate-800 transition-colors"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Section 1: Customer Contact & Address */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>1. Customer & Delivery Address</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Asif Mahmud"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">
                    Mobile Phone (for delivery SMS & call) *
                  </label>
                  <input
                    type="tel"
                    placeholder="01712-345678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Division *</label>
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
                  <label className="block text-[11px] text-slate-600 mb-1">City / District *</label>
                  <input
                    type="text"
                    placeholder="e.g. Dhaka, Chattogram"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="for invoice PDF"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-[11px] text-slate-600 mb-1">
                  Complete Street Address / Apartment / Office / Landmark *
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. House 42, Road 11, Block D, Banani (Opposite Coffee Shop)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before coming; leave at reception if unavailable"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Section 2: Payment Method */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                <CreditCard className="w-4 h-4 text-amber-700" />
                <span>2. Payment Terms</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Cash on Delivery */}
                <label
                  className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900">
                      <Banknote className="w-4 h-4 text-emerald-700" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pay cash upon unboxing and inspect your device at your doorstep.
                    </p>
                  </div>
                </label>

                {/* bKash */}
                <label
                  className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="mt-0.5 text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-[#D12053]">
                      <QrCode className="w-4 h-4 text-[#D12053]" />
                      <span>bKash Instant Merchant</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Direct MFS payment via bKash personal or merchant wallet.
                    </p>
                  </div>
                </label>

                {/* Nagad */}
                <label
                  className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="nagad"
                    checked={paymentMethod === 'nagad'}
                    onChange={() => setPaymentMethod('nagad')}
                    className="mt-0.5 text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-[#F26522]">
                      <QrCode className="w-4 h-4 text-[#F26522]" />
                      <span>Nagad Wallet</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Fast 0% fee payment from any Bangladesh Post Nagad account.
                    </p>
                  </div>
                </label>

                {/* Card */}
                <label
                  className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-0.5 text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900">
                      <CreditCard className="w-4 h-4 text-blue-700" />
                      <span>Visa / Mastercard / Amex</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      3D-Secure encrypted Bangladesh banking gateway.
                    </p>
                  </div>
                </label>
              </div>

              {/* MFS Account Input if bKash or Nagad */}
              {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
                  <div className="font-semibold text-slate-800">
                    {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Number Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Account Number (e.g. 018...)"
                      value={mfsNumber}
                      onChange={(e) => setMfsNumber(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded bg-white text-xs font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Transaction TrxID (or leave blank for gateway pop)"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded bg-white text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary & Final Total */}
            <div className="p-4 bg-[#FAF9F6] rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal ({cart.length + serviceBookings.length} items):</span>
                <span className="font-mono">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Courier Dispatch to {division}:</span>
                <span className="font-mono">
                  {deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between text-sm font-bold text-slate-900">
                <span>Final Payable Amount:</span>
                <span className="text-xl font-mono tabular-nums">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Place Order ({formatPrice(cartTotal)})</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
