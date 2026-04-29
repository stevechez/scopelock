'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader2, Zap, ShieldCheck, Trophy } from 'lucide-react';
import { getSubscriptionCheckoutURL } from '@/app/actions';

interface PricingProps {
    onCheckout: (variantId: string) => Promise<void>;
    isLoading: boolean;
}

export function Pricing({ onCheckout, isLoading }: PricingProps) {
    const [isYearly, setIsYearly] = useState(false);
    const [loadingTier, setLoadingTier] = useState<string | null>(null);

    const handleCheckout = async (tierName: string, variantId: string) => {
        setLoadingTier(tierName);
        try {
            const url = await getSubscriptionCheckoutURL(variantId);
            if (url) {
                window.location.href = url;
            }
        } catch (err) {
            console.error(err);
            setLoadingTier(null);
        }
    };

    const tiers = [
        {
            name: 'Comm Vault',
            id: 'tier-1',
            price: isYearly ? '24' : '29',
            description: 'For builders who just need to stop the admin bleed.',
            features: [
                'BidForge™ Estimator',
                'Full AI Script Library',
                'Mobile Access',
                'Secure Client Comms',
            ],
            notIncluded: ['Custom Website', 'Change Order Management'],
            buttonText: 'Start Free Trial',
            variantId: '1467148',
            featured: false,
        },
        {
            name: 'Platform Access',
            id: 'tier-2',
            price: isYearly ? '39' : '49',
            description: 'The full Project OS. Designed to command your job site.',
            features: [
                'Site Engine Hosting',
                'Comm Vault Included',
                'ScopeLock™ Change Orders',
                'PayRail™ SMS Payments',
                'CrewLens™ Daily Logs',
            ],
            buttonText: 'Get the Full Suite',
            variantId: '1538468',
            featured: true,
            badge: 'Most Popular',
        },
        {
            name: 'Blueprint Pro +',
            id: 'tier-3',
            price: '99',
            description: 'Advanced lead auditing and automated site verdicts.',
            features: [
                'SiteVerdict Integration',
                'Automated Lead Audits',
                'Advanced Analytics',
                'Priority Steve-Support',
            ],
            buttonText: 'Join the Waitlist',
            variantId: 'coming-soon',
            featured: false,
            comingSoon: true,
        },
    ];

    return (
        <section id="pricing" className="py-24 md:py-32 bg-white dark:bg-slate-950 px-6 relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* HEADER */}
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter uppercase italic"
                    >
                        Scale on your terms.
                    </motion.h2>
                    
                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className={`text-sm font-bold ${!isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
                        <button 
                            onClick={() => setIsYearly(!isYearly)}
                            className="w-14 h-7 bg-slate-200 dark:bg-slate-800 rounded-full p-1 relative transition-colors"
                        >
                            <motion.div 
                                animate={{ x: isYearly ? 28 : 0 }}
                                className="w-5 h-5 bg-amber-500 rounded-full shadow-sm"
                            />
                        </button>
                        <span className={`text-sm font-bold ${isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                            Yearly <span className="text-emerald-500 text-[10px] ml-1 uppercase">Save 20%</span>
                        </span>
                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`relative p-8 rounded-[2.5rem] flex flex-col transition-all duration-300 ${
                                tier.featured 
                                ? 'bg-slate-900 dark:bg-slate-900 border-2 border-amber-500 shadow-[0_20px_50px_rgba(245,158,11,0.2)] md:-translate-y-4 z-20' 
                                : 'bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 z-10'
                            } ${tier.comingSoon ? 'opacity-60' : ''}`}
                        >
                            {tier.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl">
                                    {tier.badge}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-xl font-black mb-2 ${tier.featured ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                    {tier.name}
                                </h3>
                                <p className={`text-sm font-medium leading-relaxed ${tier.featured ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {tier.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-5xl font-black tracking-tighter ${tier.featured ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                        ${tier.price}
                                    </span>
                                    <span className={`font-bold text-sm ${tier.featured ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
                                </div>
                                {isYearly && !tier.comingSoon && (
                                    <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1">Billed annually</p>
                                )}
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {tier.features.map((feature, i) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.featured ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                                            <Check className={`w-3 h-3 ${tier.featured ? 'text-amber-500' : 'text-emerald-500'}`} />
                                        </div>
                                        <span className={`text-sm font-medium ${tier.featured ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                                {tier.notIncluded?.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 opacity-40">
                                        <X className="w-4 h-4 text-slate-400 shrink-0" />
                                        <span className="text-sm font-medium text-slate-500">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => !tier.comingSoon && handleCheckout(tier.id, tier.variantId)}
                                disabled={loadingTier !== null || tier.comingSoon}
                                className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                    tier.featured
                                    ? 'bg-amber-500 text-slate-900 hover:bg-amber-400 hover:scale-[1.02] active:scale-95 shadow-lg shadow-amber-500/20'
                                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                                } ${tier.comingSoon ? 'cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400' : ''}`}
                            >
                                {loadingTier === tier.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    tier.buttonText
                                )}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* TRUST BAR */}
                <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 border-t border-slate-100 dark:border-white/5 pt-12">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-amber-500" />
                        <div className="flex flex-col">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Founder Guarantee</span>
                            <span className="text-[10px] font-medium text-slate-500">Direct support from Steve</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6 text-amber-500" />
                        <div className="flex flex-col">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Instant Provisioning</span>
                            <span className="text-[10px] font-medium text-slate-500">Live in under 48 hours</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-amber-500" />
                        <div className="flex flex-col">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Built for the 1%</span>
                            <span className="text-[10px] font-medium text-slate-500">Custom home builder grade</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}