'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Truck, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { useCartStore, useLocaleStore } from '@/lib/store';
import { formatPrice } from '@/lib/i18n';

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
    const { items, totalPrice, totalPV, clearCart } = useCartStore();
    const { locale } = useLocaleStore();
    const [step, setStep] = useState<Step>('shipping');
    const [isComplete, setIsComplete] = useState(false);

    const [shipping, setShipping] = useState({
        fullName: '', email: '', phone: '', line1: '', line2: '', city: '', state: '', postalCode: '', country: 'MY',
    });

    const [payment, setPayment] = useState({
        method: 'card' as 'card' | 'fpx' | 'ewallet',
        cardNumber: '', expiry: '', cvc: '', cardName: '',
    });

    const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
        { key: 'shipping', label: 'Shipping', icon: <Truck size={18} /> },
        { key: 'payment', label: 'Payment', icon: <CreditCard size={18} /> },
        { key: 'review', label: 'Review', icon: <CheckCircle2 size={18} /> },
    ];

    const stepIndex = steps.findIndex(s => s.key === step);

    const handlePlaceOrder = () => {
        setIsComplete(true);
        clearCart();
    };

    if (items.length === 0 && !isComplete) {
        return (
            <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 24 }}>🛒</div>
                <h1 style={{ fontSize: 28, marginBottom: 12 }}>Your Cart is Empty</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 32 }}>
                    Add some products before checking out.
                </p>
                <Link href="/shop" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                    <ArrowLeft size={16} /> Continue Shopping
                </Link>
            </div>
        );
    }

    if (isComplete) {
        return (
            <div className="container" style={{ padding: '120px 24px', textAlign: 'center', maxWidth: 560 }}>
                <div className="animate-fade-in-up" style={{
                    width: 80, height: 80, borderRadius: '50%', background: 'var(--color-success-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                }}>
                    <CheckCircle2 size={40} style={{ color: 'var(--color-success)' }} />
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Order Confirmed! 🎉</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 8, fontSize: 15, lineHeight: 1.6 }}>
                    Thank you for your order! Your order <strong>#ORD-2025-{Math.floor(Math.random() * 900 + 100)}</strong> has been placed successfully.
                </p>
                <p style={{ color: 'var(--color-text-tertiary)', marginBottom: 32, fontSize: 14 }}>
                    A confirmation email has been sent. You can track your order in your dashboard.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <Link href="/shop" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                        Continue Shopping
                    </Link>
                    <Link href="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                        View Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '80vh' }}>
            <div className="container" style={{ padding: '32px 24px 80px', maxWidth: 960 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
                    <Link href="/shop" style={{ color: 'var(--color-text-secondary)', display: 'flex' }}>
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 style={{ fontSize: 24, fontWeight: 700 }}>Checkout</h1>
                </div>

                {/* Steps Progress */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 0, marginBottom: 48,
                }}>
                    {steps.map((s, i) => (
                        <div key={s.key} style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                onClick={() => i <= stepIndex && setStep(s.key)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '10px 20px', borderRadius: 'var(--radius-full)',
                                    background: step === s.key ? 'var(--color-primary)' : i < stepIndex ? 'var(--color-success-bg)' : '#F3F4F6',
                                    color: step === s.key ? 'white' : i < stepIndex ? 'var(--color-success)' : 'var(--color-text-tertiary)',
                                    fontWeight: 600, fontSize: 13, cursor: i <= stepIndex ? 'pointer' : 'default',
                                    transition: 'all var(--transition-base)',
                                }}
                            >
                                {s.icon}
                                <span className="hide-mobile">{s.label}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <ChevronRight size={16} style={{ margin: '0 8px', color: 'var(--color-text-tertiary)' }} />
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>
                    {/* Main Content */}
                    <div className="card" style={{ padding: 32 }}>
                        {/* SHIPPING */}
                        {step === 'shipping' && (
                            <div className="animate-fade-in-up">
                                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Shipping Address</h2>
                                <div style={{ display: 'grid', gap: 16 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label className="input-label">Full Name *</label>
                                            <input className="input" placeholder="Aishah Rahman" value={shipping.fullName}
                                                onChange={e => setShipping({ ...shipping, fullName: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="input-label">Email *</label>
                                            <input className="input" type="email" placeholder="email@example.com" value={shipping.email}
                                                onChange={e => setShipping({ ...shipping, email: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="input-label">Phone *</label>
                                        <input className="input" placeholder="+60 12-345 6789" value={shipping.phone}
                                            onChange={e => setShipping({ ...shipping, phone: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="input-label">Address Line 1 *</label>
                                        <input className="input" placeholder="123 Jalan Bangsar" value={shipping.line1}
                                            onChange={e => setShipping({ ...shipping, line1: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="input-label">Address Line 2</label>
                                        <input className="input" placeholder="Apartment, unit, etc." value={shipping.line2}
                                            onChange={e => setShipping({ ...shipping, line2: e.target.value })} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label className="input-label">City *</label>
                                            <input className="input" placeholder="Kuala Lumpur" value={shipping.city}
                                                onChange={e => setShipping({ ...shipping, city: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="input-label">State *</label>
                                            <input className="input" placeholder="WP KL" value={shipping.state}
                                                onChange={e => setShipping({ ...shipping, state: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="input-label">Postal Code *</label>
                                            <input className="input" placeholder="59100" value={shipping.postalCode}
                                                onChange={e => setShipping({ ...shipping, postalCode: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 32 }}
                                    onClick={() => setStep('payment')}>
                                    Continue to Payment <ChevronRight size={16} />
                                </button>
                            </div>
                        )}

                        {/* PAYMENT */}
                        {step === 'payment' && (
                            <div className="animate-fade-in-up">
                                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Payment Method</h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                                    {[
                                        { key: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex' },
                                        { key: 'fpx', label: 'Online Banking (FPX)', desc: 'Direct bank transfer' },
                                        { key: 'ewallet', label: 'E-Wallet', desc: 'GrabPay, Touch \'n Go, Boost' },
                                    ].map(opt => (
                                        <div
                                            key={opt.key}
                                            onClick={() => setPayment({ ...payment, method: opt.key as 'card' | 'fpx' | 'ewallet' })}
                                            style={{
                                                padding: '16px 20px', borderRadius: 'var(--radius-md)',
                                                border: payment.method === opt.key ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                                                background: payment.method === opt.key ? 'var(--color-primary-50)' : 'white',
                                                cursor: 'pointer', transition: 'all var(--transition-base)',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{
                                                    width: 18, height: 18, borderRadius: '50%',
                                                    border: payment.method === opt.key ? '5px solid var(--color-primary)' : '2px solid var(--color-border)',
                                                    transition: 'all var(--transition-base)',
                                                }} />
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</div>
                                                    <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{opt.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {payment.method === 'card' && (
                                    <div style={{ display: 'grid', gap: 16 }}>
                                        <div>
                                            <label className="input-label">Card Number</label>
                                            <input className="input" placeholder="4242 4242 4242 4242" value={payment.cardNumber}
                                                onChange={e => setPayment({ ...payment, cardNumber: e.target.value })} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                            <div>
                                                <label className="input-label">Expiry</label>
                                                <input className="input" placeholder="MM/YY" value={payment.expiry}
                                                    onChange={e => setPayment({ ...payment, expiry: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="input-label">CVC</label>
                                                <input className="input" placeholder="123" value={payment.cvc}
                                                    onChange={e => setPayment({ ...payment, cvc: e.target.value })} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="input-label">Name on Card</label>
                                            <input className="input" placeholder="AISHAH RAHMAN" value={payment.cardName}
                                                onChange={e => setPayment({ ...payment, cardName: e.target.value })} />
                                        </div>
                                    </div>
                                )}

                                <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 32 }}
                                    onClick={() => setStep('review')}>
                                    Review Order <ChevronRight size={16} />
                                </button>
                            </div>
                        )}

                        {/* REVIEW */}
                        {step === 'review' && (
                            <div className="animate-fade-in-up">
                                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Order Review</h2>

                                {/* Items */}
                                <div style={{ marginBottom: 24 }}>
                                    {items.map(item => (
                                        <div key={item.product.id} style={{
                                            display: 'flex', gap: 16, padding: '16px 0',
                                            borderBottom: '1px solid var(--color-border-light)',
                                        }}>
                                            <img src={item.product.images[0]} alt={item.product.name}
                                                style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', objectFit: 'cover', background: '#F8F7F4' }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.product.name}</div>
                                                <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Qty: {item.quantity}</div>
                                            </div>
                                            <div style={{ fontWeight: 600 }}>{formatPrice(item.product.price * item.quantity)}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Shipping Info */}
                                <div style={{
                                    padding: 16, borderRadius: 'var(--radius-md)', background: '#F9FAFB', marginBottom: 16,
                                }}>
                                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Shipping To</div>
                                    <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                                        {shipping.fullName || 'Name'}<br />
                                        {shipping.line1 || 'Address'}{shipping.line2 ? `, ${shipping.line2}` : ''}<br />
                                        {shipping.city || 'City'}, {shipping.state || 'State'} {shipping.postalCode || 'Postcode'}
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div style={{
                                    padding: 16, borderRadius: 'var(--radius-md)', background: '#F9FAFB', marginBottom: 24,
                                }}>
                                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Payment Method</div>
                                    <div style={{ fontSize: 14, fontWeight: 500 }}>
                                        {payment.method === 'card' ? `Credit Card ending in ${payment.cardNumber.slice(-4) || '****'}` :
                                            payment.method === 'fpx' ? 'Online Banking (FPX)' : 'E-Wallet'}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--color-success-bg)' }}>
                                    <ShieldCheck size={18} style={{ color: 'var(--color-success)' }} />
                                    <span style={{ fontSize: 13, fontWeight: 500, color: '#065F46' }}>Your payment information is secure and encrypted</span>
                                </div>

                                <button className="btn btn-primary btn-lg" style={{ width: '100%' }}
                                    onClick={handlePlaceOrder}>
                                    Place Order — {formatPrice(totalPrice())}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="card" style={{ padding: 24, position: 'sticky', top: 100 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                            {items.map(item => (
                                <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>{item.product.name} × {item.quantity}</span>
                                    <span style={{ fontWeight: 600 }}>{formatPrice(item.product.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: 16, display: 'grid', gap: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                                <span>{formatPrice(totalPrice())}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Shipping</span>
                                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Free</span>
                            </div>
                        </div>

                        <div style={{
                            borderTop: '2px solid var(--color-text-primary)', paddingTop: 16, marginTop: 16,
                            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                        }}>
                            <span style={{ fontWeight: 700, fontSize: 15 }}>Total</span>
                            <span style={{ fontWeight: 800, fontSize: 22 }}>{formatPrice(totalPrice())}</span>
                        </div>

                        <div style={{
                            marginTop: 16, padding: '10px 14px', borderRadius: 'var(--radius-md)',
                            background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                            <span style={{ fontSize: 16 }}>⭐</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#92400E' }}>
                                You&apos;ll earn +{totalPV()} PV from this order!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
