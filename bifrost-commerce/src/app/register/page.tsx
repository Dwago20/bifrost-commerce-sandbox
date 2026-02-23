'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Sparkles, Gift, TrendingUp, Users } from 'lucide-react';

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', password: '', confirmPassword: '', referralCode: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const update = (field: string, value: string) => setForm({ ...form, [field]: value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            window.location.href = '/dashboard';
        }, 1500);
    };

    const benefits = [
        { icon: <Gift size={20} />, title: 'Welcome Bonus', desc: 'Get 50 PV when you join' },
        { icon: <TrendingUp size={20} />, title: 'Earn PV Points', desc: 'On every purchase you make' },
        { icon: <Users size={20} />, title: 'Build a Team', desc: 'Earn from referrals & team' },
    ];

    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            background: 'linear-gradient(135deg, #F8F7F4 0%, var(--color-primary-50) 50%, #F0FDF4 100%)',
        }}>
            {/* Left: Benefits */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: 48, position: 'relative', overflow: 'hidden',
            }}>
                <div className="animate-fade-in-up" style={{ position: 'relative', zIndex: 1, maxWidth: 420 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
                        <Image src="/logo.png" alt="CommerceFlow Logo" width={48} height={48} style={{ borderRadius: 14 }} />
                        <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-primary)' }}>
                            CommerceFlow
                        </span>
                    </div>

                    <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
                        Start your wellness journey today
                    </h1>
                    <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 40 }}>
                        Join thousands of members earning rewards on every purchase.
                    </p>

                    <div style={{ display: 'grid', gap: 20 }}>
                        {benefits.map((b, i) => (
                            <div key={i} className="animate-fade-in-up" style={{
                                display: 'flex', gap: 16, padding: '16px 20px', borderRadius: 'var(--radius-md)',
                                background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)',
                                animationDelay: `${300 + i * 100}ms`, animationFillMode: 'backwards',
                            }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    background: 'var(--color-primary-50)', color: 'var(--color-primary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    {b.icon}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 15 }}>{b.title}</div>
                                    <div style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>{b.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48,
            }}>
                <div className="animate-fade-in-up card" style={{
                    width: '100%', maxWidth: 440, padding: 40,
                    animationDelay: '200ms', animationFillMode: 'backwards',
                }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Create Account</h2>
                    <p style={{ fontSize: 14, color: 'var(--color-text-tertiary)', marginBottom: 28 }}>
                        Fill in your details to get started
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
                        <div>
                            <label className="input-label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                                <input className="input" placeholder="Aishah Rahman" value={form.name}
                                    onChange={e => update('name', e.target.value)} style={{ paddingLeft: 40 }} />
                            </div>
                        </div>

                        <div>
                            <label className="input-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                                <input className="input" type="email" placeholder="you@example.com" value={form.email}
                                    onChange={e => update('email', e.target.value)} style={{ paddingLeft: 40 }} />
                            </div>
                        </div>

                        <div>
                            <label className="input-label">Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                                <input className="input" placeholder="+60 12-345 6789" value={form.phone}
                                    onChange={e => update('phone', e.target.value)} style={{ paddingLeft: 40 }} />
                            </div>
                        </div>

                        <div>
                            <label className="input-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                                <input className="input" type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a strong password" value={form.password}
                                    onChange={e => update('password', e.target.value)}
                                    style={{ paddingLeft: 40, paddingRight: 44 }} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                                        color: 'var(--color-text-tertiary)',
                                    }}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="input-label">Referral Code <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400 }}>(optional)</span></label>
                            <input className="input" placeholder="e.g. AISHAH2024" value={form.referralCode}
                                onChange={e => update('referralCode', e.target.value)} />
                        </div>

                        <label style={{
                            display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', fontSize: 13,
                            color: 'var(--color-text-secondary)', lineHeight: 1.5,
                        }}>
                            <input type="checkbox" checked={agreeTerms}
                                onChange={e => setAgreeTerms(e.target.checked)}
                                style={{ marginTop: 3, accentColor: 'var(--color-primary)' }} />
                            <span>I agree to the <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Privacy Policy</a></span>
                        </label>

                        <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading || !agreeTerms}
                            style={{ width: '100%', opacity: isLoading || !agreeTerms ? 0.7 : 1, marginTop: 8 }}>
                            {isLoading ? 'Creating account…' : (<>Create Account <ArrowRight size={16} /></>)}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--color-text-tertiary)' }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
