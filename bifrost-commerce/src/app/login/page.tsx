'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            window.location.href = '/dashboard';
        }, 1500);
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            background: 'linear-gradient(135deg, #F8F7F4 0%, var(--color-primary-50) 50%, #F0FDF4 100%)',
        }}>
            {/* Left: Visual */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: 48, position: 'relative', overflow: 'hidden',
            }}>
                <div className="animate-fade-in-up" style={{
                    position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 460,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
                        <Image src="/logo.png" alt="CommerceFlow Logo" width={48} height={48} style={{ borderRadius: 14 }} />
                        <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-primary)' }}>
                            CommerceFlow
                        </span>
                    </div>
                    <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: 'var(--color-text-primary)' }}>
                        Welcome back
                    </h1>
                    <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                        Your wellness journey continues here. Track PV, manage orders, and unlock exclusive rewards.
                    </p>
                </div>

                {/* Background decoration */}
                <div style={{
                    position: 'absolute', width: 400, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)',
                    top: '20%', left: '10%',
                }} />
                <div style={{
                    position: 'absolute', width: 300, height: 300, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
                    bottom: '10%', right: '15%',
                }} />
            </div>

            {/* Right: Form */}
            <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48,
            }}>
                <div className="animate-fade-in-up card" style={{
                    width: '100%', maxWidth: 420, padding: 40,
                    animationDelay: '200ms', animationFillMode: 'backwards',
                }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Sign In</h2>
                    <p style={{ fontSize: 14, color: 'var(--color-text-tertiary)', marginBottom: 32 }}>
                        Enter your credentials to access your account
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
                        <div>
                            <label className="input-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{
                                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                                    color: 'var(--color-text-tertiary)',
                                }} />
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    style={{ paddingLeft: 40 }}
                                />
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label className="input-label">Password</label>
                                <a href="#" style={{ fontSize: 12, color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                                    Forgot password?
                                </a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{
                                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                                    color: 'var(--color-text-tertiary)',
                                }} />
                                <input
                                    className="input"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    style={{ paddingLeft: 40, paddingRight: 44 }}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                                        color: 'var(--color-text-tertiary)',
                                    }}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={isLoading}
                            style={{ width: '100%', opacity: isLoading ? 0.7 : 1 }}
                        >
                            {isLoading ? 'Signing in…' : (<>Sign In <ArrowRight size={16} /></>)}
                        </button>
                    </form>

                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0',
                    }}>
                        <div style={{ flex: 1, height: 1, background: 'var(--color-border-light)' }} />
                        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>or continue with</span>
                        <div style={{ flex: 1, height: 1, background: 'var(--color-border-light)' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <button className="btn btn-secondary" style={{ gap: 8 }}>
                            <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>
                            Google
                        </button>
                        <button className="btn btn-secondary" style={{ gap: 8 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                            Apple
                        </button>
                    </div>

                    <p style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: 'var(--color-text-tertiary)' }}>
                        Don&apos;t have an account?{' '}
                        <Link href="/register" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                            Sign up free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
