import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import  Header  from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { allCoupons, Coupon } from '@/data/coupons';
import { Globe, BadgeCheck, Minus, Plus, Heart, HandCoins } from 'lucide-react';

// Extended coupon data to include price options and a description
const getCouponData = (id: string | undefined): Coupon & { options: { amount: string; price: string; oldPrice?: string; }[]; description: string; } | undefined => {
    const coupon = allCoupons.find(c => c.id === id);
    if (!coupon) return undefined;

    // Dummy options and description based on the coupon name
    const options = [
        { amount: '100', price: '0.99', oldPrice: '1.05' },
        { amount: '210', price: '1.99', oldPrice: '2.10' },
        { amount: '530', price: '4.96', oldPrice: '5.25' },
        { amount: '1080', price: '9.92', oldPrice: '10.50' },
        { amount: '2200', price: '19.85', oldPrice: '21.00' },
    ];

    return {
        ...coupon,
        options,
        description: `${coupon.name} Gift Cards (Garena). Not applicable for Indonesia, India, Bangladesh, Thailand, Vietnam and South America regions.`,
    };
};

const CouponDetails = () => {
    const { id } = useParams<{ id: string }>();
    const coupon = getCouponData(id);

    const [selectedOption, setSelectedOption] = useState(coupon?.options[0]);
    const [quantity, setQuantity] = useState(1);
    const [saveForFuture, setSaveForFuture] = useState(false);

    if (!coupon) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white font-chakra">
                <Header />
                <p className="text-2xl">Coupon not found.</p>
            </div>
        );
    }

    const handleQuantityChange = (type: 'increment' | 'decrement') => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else {
            setQuantity(prev => (prev > 1 ? prev - 1 : 1));
        }
    };

    const handleBuyNow = () => {
        alert(`You are buying ${quantity} x ${coupon.name} for a total of $${(parseFloat(selectedOption?.price || '0') * quantity).toFixed(2)}. Checkout is in progress.`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white font-chakra p-6 pt-24">
            <Header />
            <main className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Coupon Image */}
                    <Card className="bg-white/5 border-white/10 rounded-lg overflow-hidden h-fit">
                        <CardContent className="p-4 bg-white/10">
                            <img
                                src={coupon.image}
                                alt={coupon.name}
                                className="w-full h-auto object-contain rounded-lg"
                            />
                        </CardContent>
                    </Card>

                    {/* Middle Column: Details and Options */}
                    <div className="md:col-span-2 lg:col-span-1 space-y-6">
                        <div className="flex items-center space-x-2">
                            <img src={coupon.image} alt={coupon.name} className="w-12 h-12 object-contain" />
                            <h1 className="text-2xl font-bold text-white">{coupon.name}</h1>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300 text-sm">
                            <span className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1">
                                <Globe className="w-3 h-3 text-white/70" />
                                {coupon.isGlobal ? 'Global' : 'Regional'}
                            </span>
                            <span className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1">
                                <BadgeCheck className="w-3 h-3 text-green-400" />
                                Instant Delivery
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">{coupon.description}</p>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="bg-white/10 rounded-full hover:bg-white/20">
                                <Heart className="w-5 h-5" />
                            </Button>
                            <span className="text-sm">Add to favorite</span>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white">Select an option</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {coupon.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`p-4 border rounded-lg text-left transition-all ${
                                            selectedOption?.amount === option.amount
                                                ? 'border-accent bg-accent/20'
                                                : 'border-white/10 hover:border-white/30 bg-white/5'
                                        }`}
                                        onClick={() => setSelectedOption(option)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{option.amount} Points</p>
                                            <div className="text-right">
                                                <p className="font-bold text-green-400">US$ {option.price}</p>
                                                {option.oldPrice && (
                                                    <p className="text-xs text-gray-400 line-through">US$ {option.oldPrice}</p>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="md:col-span-3 lg:col-span-1 space-y-6">
                        <Card className="bg-white/5 border-white/10 rounded-lg p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">Quantity</h3>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 bg-white/10 border-white/10"
                                        onClick={() => handleQuantityChange('decrement')}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-10 text-center font-bold text-xl">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 bg-white/10 border-white/10"
                                        onClick={() => handleQuantityChange('increment')}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">Total</h3>
                                <p className="text-2xl font-bold text-green-400">US$ {(parseFloat(selectedOption?.price || '0') * quantity).toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button className="w-full bg-accent hover:bg-accent/80 flex items-center gap-2" onClick={handleBuyNow}>
                                    <HandCoins className="h-5 w-5" /> Buy Now
                                </Button>
                                <Button variant="secondary" className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                                    <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-color.svg" alt="PayPal" className="h-5 w-5" />
                                    Buy with PayPal
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="save-future"
                                    checked={saveForFuture}
                                    onCheckedChange={(checked) => setSaveForFuture(checked as boolean)}
                                    className="border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                />
                                <label htmlFor="save-future" className="text-sm font-medium text-gray-400">
                                    Save for future purchase
                                </label>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CouponDetails;