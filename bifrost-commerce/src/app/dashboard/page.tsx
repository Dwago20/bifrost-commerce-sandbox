'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    BarChart3, ShoppingBag, Star, Gift, Users, TrendingUp,
    ChevronRight, Package, Clock, CheckCircle2, Truck, Award,
    Bell, Settings, LogOut, Copy, ExternalLink,
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/i18n';
import { MOCK_MEMBER, MOCK_ORDERS, MOCK_PV_TRANSACTIONS, MOCK_REWARDS, MOCK_NOTIFICATIONS, TIER_THRESHOLDS } from '@/lib/data';

type DashTab = 'overview' | 'orders' | 'pv' | 'rewards' | 'team';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<DashTab>('overview');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const member = MOCK_MEMBER;
    const currentTier = TIER_THRESHOLDS.find(t => member.currentPV >= t.minPV && member.currentPV <= t.maxPV);
    const nextTier = TIER_THRESHOLDS.find(t => t.minPV > member.currentPV);
    const progressPercent = currentTier ? Math.min(100, ((member.currentPV - currentTier.minPV) / (currentTier.maxPV - currentTier.minPV)) * 100) : 0;

    const tierGradients: Record<string, string> = {
        bronze: 'linear-gradient(135deg, #CD7F32 0%, #8B5E3C 50%, #A0522D 100%)',
        silver: 'linear-gradient(135deg, #A8A9AD 0%, #71797E 50%, #C0C0C0 100%)',
        gold: 'linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)',
        platinum: 'linear-gradient(135deg, #E5E4E2 0%, #8E9196 50%, #B0B3B8 100%)',
    };
    const tierTextColors: Record<string, string> = {
        bronze: '#FFFFFF',
        silver: '#FFFFFF',
        gold: '#3D2B00',
        platinum: '#1A1A2E',
    };

    const [copied, setCopied] = useState(false);
    const copyReferral = () => {
        navigator.clipboard.writeText(member.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tabs: { key: DashTab; label: string; icon: React.ReactNode }[] = [
        { key: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
        { key: 'orders', label: 'Orders', icon: <ShoppingBag size={16} /> },
        { key: 'pv', label: 'PV History', icon: <TrendingUp size={16} /> },
        { key: 'rewards', label: 'Rewards', icon: <Gift size={16} /> },
        { key: 'team', label: 'Team', icon: <Users size={16} /> },
    ];

    const statusColors: Record<string, { bg: string; color: string }> = {
        delivered: { bg: '#D1FAE5', color: '#065F46' },
        shipped: { bg: '#DBEAFE', color: '#1E40AF' },
        processing: { bg: '#FEF3C7', color: '#92400E' },
        pending: { bg: '#F3F4F6', color: '#6B7280' },
        cancelled: { bg: '#FEE2E2', color: '#991B1B' },
    };

    const statusIcons: Record<string, React.ReactNode> = {
        delivered: <CheckCircle2 size={14} />,
        shipped: <Truck size={14} />,
        processing: <Clock size={14} />,
        pending: <Package size={14} />,
    };

    const tierColor = tierTextColors[member.tier] || '#FFFFFF';

    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
            <div className="container" style={{ padding: '32px 24px 80px' }}>
                {/* Header */}
                <div className="animate-fade-in-up" style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32,
                }}>
                    <div>
                        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
                            Welcome back, {member.name.split(' ')[0]} 👋
                        </h1>
                        <p style={{ fontSize: 14, color: 'var(--color-text-tertiary)' }}>
                            Here&apos;s what&apos;s happening with your account today
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => { setShowNotifications(!showNotifications); setShowSettings(false); }}
                                className="btn btn-secondary btn-icon"
                                style={{ position: 'relative' }}
                            >
                                <Bell size={18} />
                                {MOCK_NOTIFICATIONS.filter(n => !n.isRead).length > 0 && (
                                    <span style={{
                                        position: 'absolute', top: -2, right: -2, width: 18, height: 18,
                                        borderRadius: '50%', background: '#EF4444', color: 'white',
                                        fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {MOCK_NOTIFICATIONS.filter(n => !n.isRead).length}
                                    </span>
                                )}
                            </button>
                            {showNotifications && (
                                <div style={{
                                    position: 'absolute', top: '110%', right: 0, width: 320,
                                    background: 'white', borderRadius: 'var(--radius-lg)',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)', zIndex: 50,
                                    border: '1px solid var(--color-border-light)',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border-light)', fontWeight: 700, fontSize: 14 }}>
                                        Notifications
                                    </div>
                                    {MOCK_NOTIFICATIONS.slice(0, 4).map(n => (
                                        <div key={n.id} style={{
                                            padding: '12px 16px', borderBottom: '1px solid var(--color-border-light)',
                                            background: n.isRead ? 'transparent' : '#F0F4FF',
                                            cursor: 'pointer',
                                        }}>
                                            <div style={{ fontWeight: 600, fontSize: 13 }}>{n.title}</div>
                                            <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', margin: '4px 0 0' }}>{n.message}</p>
                                        </div>
                                    ))}
                                    <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                                        <button onClick={() => { setShowNotifications(false); setActiveTab('overview'); }}
                                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                                            View All
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => { setShowSettings(!showSettings); setShowNotifications(false); }}
                                className="btn btn-secondary btn-icon"
                            >
                                <Settings size={18} />
                            </button>
                            {showSettings && (
                                <div style={{
                                    position: 'absolute', top: '110%', right: 0, width: 200,
                                    background: 'white', borderRadius: 'var(--radius-lg)',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)', zIndex: 50,
                                    border: '1px solid var(--color-border-light)',
                                    overflow: 'hidden',
                                }}>
                                    {[
                                        { label: 'Edit Profile', icon: <ExternalLink size={14} /> },
                                        { label: 'Account Settings', icon: <Settings size={14} /> },
                                        { label: 'Log Out', icon: <LogOut size={14} /> },
                                    ].map((item, i) => (
                                        <button key={i} style={{
                                            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                                            padding: '12px 16px', background: 'none', border: 'none',
                                            fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                                            color: item.label === 'Log Out' ? '#EF4444' : 'var(--color-text)',
                                            borderBottom: i < 2 ? '1px solid var(--color-border-light)' : 'none',
                                        }}>
                                            {item.icon} {item.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tier Card */}
                <div className="animate-fade-in-up card" style={{
                    padding: 28, marginBottom: 28,
                    background: tierGradients[member.tier] || tierGradients.bronze,
                    color: tierColor, animationDelay: '100ms', animationFillMode: 'backwards',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <span style={{ fontSize: 28 }}>{currentTier?.icon}</span>
                                <span style={{ fontSize: 22, fontWeight: 800, textTransform: 'capitalize' }}>{member.tier} Member</span>
                            </div>
                            <p style={{ fontSize: 14, opacity: 0.85 }}>
                                {nextTier ? `${nextTier.minPV - member.currentPV} PV to ${nextTier.tier} tier` : 'You\'ve reached the highest tier!'}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 36, fontWeight: 800 }}>{member.currentPV}</div>
                            <div style={{ fontSize: 12, opacity: 0.8 }}>Current PV</div>
                        </div>
                    </div>
                    {nextTier && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.8, marginBottom: 6 }}>
                                <span>{currentTier?.tier}</span>
                                <span>{nextTier.tier}</span>
                            </div>
                            <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.2)' }}>
                                <div style={{ height: '100%', borderRadius: 4, background: 'white', width: `${progressPercent}%`, transition: 'width 1s ease' }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="animate-fade-in-up" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28,
                    animationDelay: '200ms', animationFillMode: 'backwards',
                }}>
                    {[
                        { label: 'Lifetime PV', value: member.lifetimePV.toLocaleString(), icon: <Star size={18} />, color: '#F59E0B' },
                        { label: 'Total Orders', value: MOCK_ORDERS.length.toString(), icon: <ShoppingBag size={18} />, color: 'var(--color-primary)' },
                        { label: 'Team Size', value: member.teamSize.toString(), icon: <Users size={18} />, color: '#10B981' },
                        { label: 'Rewards Available', value: MOCK_REWARDS.filter(r => member.currentPV >= r.pvRequired).length.toString(), icon: <Gift size={18} />, color: '#EC4899' },
                    ].map((stat, i) => (
                        <div key={i} className="card" style={{ padding: 20, textAlign: 'center' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 12, background: `${stat.color}15`, color: stat.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
                            }}>
                                {stat.icon}
                            </div>
                            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{stat.value}</div>
                            <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Referral Banner */}
                <div className="animate-fade-in-up card" style={{
                    padding: '20px 24px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                    animationDelay: '300ms', animationFillMode: 'backwards',
                }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#92400E', marginBottom: 4 }}>Your Referral Code</div>
                        <div style={{ fontSize: 13, color: '#92400E', opacity: 0.7 }}>Share and earn bonus PV for every signup!</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <code style={{
                            padding: '10px 16px', borderRadius: 'var(--radius-md)',
                            background: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 15,
                            color: '#92400E', letterSpacing: '0.05em',
                        }}>
                            {member.referralCode}
                        </code>
                        <button onClick={copyReferral} className="btn btn-secondary btn-icon" style={{ height: 42 }}>
                            {copied ? <CheckCircle2 size={16} color="#10B981" /> : <Copy size={16} />}
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex', gap: 4, marginBottom: 28, padding: 4, borderRadius: 'var(--radius-md)',
                    background: '#F3F4F6', width: 'fit-content',
                }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                                border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                background: activeTab === tab.key ? 'white' : 'transparent',
                                color: activeTab === tab.key ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                                boxShadow: activeTab === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                transition: 'all var(--transition-base)',
                            }}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="animate-fade-in-up">
                    {/* OVERVIEW */}
                    {activeTab === 'overview' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            {/* Recent Orders */}
                            <div className="card" style={{ padding: 24 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recent Orders</h3>
                                    <button onClick={() => setActiveTab('orders')} style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        color: 'var(--color-primary)', fontSize: 13, fontWeight: 600,
                                        display: 'flex', alignItems: 'center', gap: 4,
                                    }}>
                                        View all <ChevronRight size={14} />
                                    </button>
                                </div>
                                {MOCK_ORDERS.slice(0, 3).map(order => (
                                    <div key={order.id} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '12px 0', borderBottom: '1px solid var(--color-border-light)',
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 14 }}>{order.id}</div>
                                            <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{formatDate(order.createdAt)}</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{
                                                padding: '4px 10px', borderRadius: 'var(--radius-full)',
                                                fontSize: 11, fontWeight: 600,
                                                background: statusColors[order.status]?.bg,
                                                color: statusColors[order.status]?.color,
                                                display: 'flex', alignItems: 'center', gap: 4,
                                            }}>
                                                {statusIcons[order.status]} {order.status}
                                            </span>
                                            <span style={{ fontWeight: 700, fontSize: 14 }}>{formatPrice(order.totalPrice)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Notifications */}
                            <div className="card" style={{ padding: 24 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Notifications</h3>
                                {MOCK_NOTIFICATIONS.map(n => (
                                    <div key={n.id} style={{
                                        padding: '12px 0', borderBottom: '1px solid var(--color-border-light)',
                                        opacity: n.isRead ? 0.6 : 1,
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                            <span style={{ fontWeight: 600, fontSize: 13 }}>{n.title}</span>
                                            {!n.isRead && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)' }} />}
                                        </div>
                                        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', margin: 0 }}>{n.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ORDERS */}
                    {activeTab === 'orders' && (
                        <div className="card" style={{ padding: 24 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Order History</h3>
                            {MOCK_ORDERS.map(order => (
                                <div key={order.id} className="card" style={{
                                    padding: 20, marginBottom: 16, border: '1px solid var(--color-border-light)',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 15 }}>{order.id}</div>
                                            <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{formatDate(order.createdAt)}</div>
                                        </div>
                                        <span style={{
                                            padding: '6px 14px', borderRadius: 'var(--radius-full)',
                                            fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
                                            background: statusColors[order.status]?.bg,
                                            color: statusColors[order.status]?.color,
                                            display: 'flex', alignItems: 'center', gap: 6,
                                        }}>
                                            {statusIcons[order.status]} {order.status}
                                        </span>
                                    </div>
                                    {order.items.map((item, i) => (
                                        <div key={i} style={{
                                            display: 'flex', gap: 12, padding: '8px 0',
                                            borderTop: i > 0 ? '1px solid var(--color-border-light)' : 'none',
                                        }}>
                                            <img src={item.product.images[0]} alt={item.product.name}
                                                style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', background: '#F8F7F4' }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, fontSize: 13 }}>{item.product.name}</div>
                                                <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Qty: {item.quantity}</div>
                                            </div>
                                            <div style={{ fontWeight: 600, fontSize: 14 }}>{formatPrice(item.product.price * item.quantity)}</div>
                                        </div>
                                    ))}
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--color-border-light)',
                                    }}>
                                        <span className="pv-badge" style={{ fontSize: 12 }}>+{order.totalPV} PV Earned</span>
                                        <span style={{ fontWeight: 800, fontSize: 16 }}>{formatPrice(order.totalPrice)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PV HISTORY */}
                    {activeTab === 'pv' && (
                        <div className="card" style={{ padding: 24 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>PV Transaction History</h3>
                            <div style={{ display: 'grid', gap: 0 }}>
                                {MOCK_PV_TRANSACTIONS.map(tx => {
                                    const typeColors: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
                                        purchase: { bg: '#DBEAFE', color: '#1E40AF', icon: <ShoppingBag size={14} /> },
                                        bonus: { bg: '#FEF3C7', color: '#92400E', icon: <Award size={14} /> },
                                        team: { bg: '#D1FAE5', color: '#065F46', icon: <Users size={14} /> },
                                        adjustment: { bg: '#F3F4F6', color: '#6B7280', icon: <Settings size={14} /> },
                                    };
                                    const tc = typeColors[tx.type];
                                    return (
                                        <div key={tx.id} style={{
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            padding: '14px 0', borderBottom: '1px solid var(--color-border-light)',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{
                                                    width: 36, height: 36, borderRadius: 10,
                                                    background: tc.bg, color: tc.color,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    {tc.icon}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{tx.description}</div>
                                                    <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{formatDate(tx.createdAt)}</div>
                                                </div>
                                            </div>
                                            <span style={{
                                                fontWeight: 700, fontSize: 15,
                                                color: tx.amount > 0 ? '#065F46' : '#991B1B',
                                            }}>
                                                +{tx.amount} PV
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* REWARDS */}
                    {activeTab === 'rewards' && (
                        <div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Available Rewards</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                                {MOCK_REWARDS.map(reward => {
                                    const canRedeem = member.currentPV >= reward.pvRequired;
                                    return (
                                        <div key={reward.id} className="card" style={{
                                            padding: 24, opacity: canRedeem ? 1 : 0.6,
                                            border: canRedeem ? '2px solid var(--color-primary)' : '1px solid var(--color-border-light)',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                                <Gift size={20} style={{ color: canRedeem ? 'var(--color-primary)' : 'var(--color-text-tertiary)' }} />
                                                <span style={{ fontWeight: 700, fontSize: 15 }}>{reward.name}</span>
                                            </div>
                                            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                                                {reward.description}
                                            </p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span className="pv-badge" style={{ fontSize: 12 }}>{reward.pvRequired} PV Required</span>
                                                <button className={`btn ${canRedeem ? 'btn-primary' : 'btn-secondary'}`}
                                                    disabled={!canRedeem} style={{ fontSize: 12, padding: '6px 14px' }}>
                                                    {canRedeem ? 'Redeem' : 'Locked'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* TEAM */}
                    {activeTab === 'team' && (
                        <div className="card" style={{ padding: 24 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Your Team</h3>
                            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
                                You have {member.teamSize} members in your downline.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
                                {[
                                    { label: 'Active Members', value: '8', color: '#10B981' },
                                    { label: 'This Month Sales', value: formatPrice(4560), color: 'var(--color-primary)' },
                                    { label: 'Team PV', value: '1,250', color: '#F59E0B' },
                                ].map((stat, i) => (
                                    <div key={i} style={{
                                        padding: 20, borderRadius: 'var(--radius-md)', background: '#F9FAFB', textAlign: 'center',
                                    }}>
                                        <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                                        <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Sample team members */}
                            {['Sarah Lee', 'Ahmad Bin Ali', 'Mei Chen', 'Priya Kumar', 'Nurul Iman'].map((name, i) => (
                                <div key={i} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '14px 0', borderBottom: '1px solid var(--color-border-light)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{
                                            width: 36, height: 36, borderRadius: '50%',
                                            background: `hsl(${i * 60}, 60%, 90%)`, display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700,
                                            color: `hsl(${i * 60}, 60%, 40%)`,
                                        }}>
                                            {name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
                                            <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                                                Joined {['Oct', 'Sep', 'Aug', 'Jul', 'Jun'][i]} 2025
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: i < 3 ? '#10B981' : '#F59E0B' }}>
                                        {i < 3 ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
