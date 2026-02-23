'use client';

import Link from 'next/link';
import { ArrowRight, Star, Gift, Globe, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import { useLocaleStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const { locale } = useLocaleStore();
  const featured = PRODUCTS.filter((p) => p.tags.includes('bestseller')).slice(0, 4);

  const benefits = [
    { icon: <Gift size={24} />, key: 'rewards' },
    { icon: <TrendingUp size={24} />, key: 'tiers' },
    { icon: <Globe size={24} />, key: 'multilingual' },
    { icon: <Shield size={24} />, key: 'quality' },
  ];

  const stats = [
    { value: '50K+', label: 'Active Members' },
    { value: '4', label: 'Markets' },
    { value: '98%', label: 'Satisfaction' },
    { value: '1M+', label: 'PV Distributed' },
  ];

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #FAFAFA 0%, var(--color-primary-50) 50%, #FDF2F8 100%)',
        overflow: 'hidden',
      }}>
        {/* Background decorations */}
        <div style={{
          position: 'absolute', top: '10%', right: '5%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,60,225,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '10%',
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}>
            {/* Left: Text */}
            <div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                <span className="badge badge-primary" style={{ marginBottom: 20, fontSize: 13, padding: '6px 14px' }}>
                  ✨ Multi-Market Platform
                </span>
              </div>

              <h1 className="animate-fade-in-up" style={{
                animationDelay: '100ms',
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: 24,
              }}>
                {t('home.hero_title', locale)}{' '}
                <span className="text-gradient">{t('home.hero_highlight', locale)}</span>
              </h1>

              <p className="animate-fade-in-up" style={{
                animationDelay: '200ms',
                fontSize: 18,
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
                maxWidth: 480,
                marginBottom: 36,
              }}>
                {t('home.hero_subtitle', locale)}
              </p>

              <div className="animate-fade-in-up" style={{
                animationDelay: '300ms',
                display: 'flex', gap: 12, flexWrap: 'wrap',
              }}>
                <Link href="/shop" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
                  {t('home.shop_now', locale)}
                  <ArrowRight size={18} />
                </Link>
                <Link href="/register" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>
                  {t('home.become_member', locale)}
                </Link>
              </div>

              {/* Social Proof */}
              <div className="animate-fade-in-up" style={{
                animationDelay: '400ms',
                display: 'flex', alignItems: 'center', gap: 12, marginTop: 40,
              }}>
                <div style={{ display: 'flex' }}>
                  {['😊', '🤩', '😍', '🥰'].map((emoji, i) => (
                    <div key={i} style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'white', border: '2px solid white',
                      marginLeft: i > 0 ? -10 : 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                      boxShadow: 'var(--shadow-sm)',
                    }}>
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" stroke="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>
                    Loved by 50,000+ members
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Visual — Autoplay Video */}
            <div className="hide-mobile" style={{ position: 'relative' }}>
              <div className="animate-fade-in-up" style={{
                animationDelay: '300ms',
                width: '100%', maxWidth: 460,
                aspectRatio: '1',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                >
                  <source src="https://cdn.coverr.co/videos/coverr-a-woman-applying-cream-on-her-face-3285/1080p.mp4" type="video/mp4" />
                </video>

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(108,60,225,0.15) 0%, transparent 40%)',
                  pointerEvents: 'none',
                }} />

                {/* Floating cards */}
                <div className="animate-float" style={{
                  position: 'absolute', top: 20, right: 20,
                  background: 'rgba(255,255,255,0.95)', borderRadius: 'var(--radius-md)',
                  padding: '10px 14px', boxShadow: 'var(--shadow-lg)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span className="pv-badge" style={{ fontSize: 12 }}>+45 PV</span>
                </div>

                <div className="animate-float" style={{
                  animationDelay: '1s',
                  position: 'absolute', bottom: 30, left: 20,
                  background: 'rgba(255,255,255,0.95)', borderRadius: 'var(--radius-md)',
                  padding: '10px 14px', boxShadow: 'var(--shadow-lg)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 13, fontWeight: 600,
                }}>
                  🥇 Gold Tier
                </div>

                <div className="animate-float" style={{
                  animationDelay: '2s',
                  position: 'absolute', top: '50%', right: 20,
                  background: 'rgba(255,255,255,0.95)', borderRadius: 'var(--radius-md)',
                  padding: '8px 12px', boxShadow: 'var(--shadow-lg)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 12,
                }}>
                  <Globe size={14} style={{ color: 'var(--color-primary)' }} />
                  3 Languages
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section style={{
        background: 'white',
        borderBottom: '1px solid var(--color-border-light)',
        padding: '32px 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 32,
            textAlign: 'center',
          }}>
            {stats.map((stat, i) => (
              <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
              {t('home.featured', locale)}
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>
              {t('home.featured_subtitle', locale)}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}>
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/shop" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>
              {t('nav.all', locale)}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== WHY COMMERCEFLOW ==================== */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
              {t('home.why_title', locale)}
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>
              {t('home.why_subtitle', locale)}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {benefits.map((benefit, i) => (
              <div
                key={benefit.key}
                className="card animate-fade-in-up"
                style={{
                  animationDelay: `${i * 100}ms`,
                  padding: 32,
                  textAlign: 'center',
                  border: '1px solid var(--color-border-light)',
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-primary-50)',
                  color: 'var(--color-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, fontFamily: 'var(--font-sans)' }}>
                  {t(`home.benefit_${benefit.key}`, locale)}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {t(`home.benefit_${benefit.key}_desc`, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
              How It Works
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>
              Start earning rewards in 3 simple steps
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 40,
            maxWidth: 900,
            margin: '0 auto',
          }}>
            {[
              { step: '01', icon: <Users size={28} />, title: 'Join as Member', desc: 'Sign up for free and get your personal referral code. Welcome bonus PV included!' },
              { step: '02', icon: <Zap size={28} />, title: 'Shop & Earn PV', desc: 'Every purchase earns Point Value (PV). Watch your tier progress grow automatically.' },
              { step: '03', icon: <Gift size={28} />, title: 'Unlock Rewards', desc: 'Redeem PV for exclusive rewards, discounts, free products, and cashback.' },
            ].map((item, i) => (
              <div key={i} className="animate-fade-in-up" style={{
                animationDelay: `${i * 150}ms`,
                textAlign: 'center',
                position: 'relative',
              }}>
                <div style={{
                  fontSize: 48, fontWeight: 800, color: '#1E293B',
                  fontFamily: 'var(--font-serif)',
                  marginBottom: 16,
                }}>
                  {item.step}
                </div>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                  color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-sans)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
        padding: '80px 0',
        textAlign: 'center',
        color: 'white',
      }}>
        <div className="container">
          <h2 className="animate-fade-in-up" style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>
            {t('home.cta_title', locale)}
          </h2>
          <p className="animate-fade-in-up" style={{
            animationDelay: '100ms',
            fontSize: 18, opacity: 0.9, maxWidth: 500, margin: '0 auto 32px',
          }}>
            {t('home.cta_subtitle', locale)}
          </p>
          <Link
            href="/register"
            className="animate-fade-in-up btn btn-lg"
            style={{
              animationDelay: '200ms',
              textDecoration: 'none',
              background: 'white',
              color: 'var(--color-primary)',
              fontWeight: 700,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            {t('home.cta_button', locale)}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
