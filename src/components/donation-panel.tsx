'use client';

import * as React from 'react';
import { Gift, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';

const tipAmounts = [1, 5, 10, 20, 50];

export function DonationPanel() {
    const [customAmount, setCustomAmount] = React.useState('');
    const [selectedTip, setSelectedTip] = React.useState<number | null>(5);

    const handleTipSelect = (amount: number) => {
        setSelectedTip(amount);
        setCustomAmount('');
    }

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9.]/g, '');
        setCustomAmount(value);
        setSelectedTip(null);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Gift className="h-6 w-6 text-primary" />
                    Support the Stream
                </CardTitle>
                <CardDescription>Enjoying the content? Show your support!</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="tip">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="tip">
                            <Zap className="mr-2 h-4 w-4" /> Tip Jar
                        </TabsTrigger>
                        <TabsTrigger value="subscribe">
                            <Star className="mr-2 h-4 w-4" /> Subscribe
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tip" className="mt-4 space-y-4">
                        <p className="text-sm text-muted-foreground">Send a one-time tip to the creator.</p>
                        <div className="grid grid-cols-3 gap-2">
                            {tipAmounts.map(amount => (
                                <Button 
                                    key={amount} 
                                    variant={selectedTip === amount ? 'default' : 'outline'}
                                    onClick={() => handleTipSelect(amount)}
                                >
                                    ${amount}
                                </Button>
                            ))}
                             <Input 
                                type="text"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                placeholder="Custom"
                                className="col-span-3 text-center"
                            />
                        </div>
                        <Button className="w-full">
                            Send Tip of ${selectedTip || customAmount || 0}
                        </Button>
                    </TabsContent>
                    <TabsContent value="subscribe" className="mt-4 space-y-4">
                         <p className="text-sm text-muted-foreground">Subscribe for exclusive perks and to support the channel monthly.</p>
                         <div className="space-y-4">
                            <Button variant="outline" className="w-full justify-between h-auto py-3">
                                <div>
                                    <p className="font-semibold">Tier 1</p>
                                    <p className="text-xs text-muted-foreground">Basic Perks</p>
                                </div>
                                <span className="font-bold">$4.99/mo</span>
                            </Button>
                             <Button variant="default" className="w-full justify-between h-auto py-3">
                                <div>
                                    <p className="font-semibold">Tier 2</p>
                                    <p className="text-xs">Extra Emotes & Badge</p>
                                </div>
                                <span className="font-bold">$9.99/mo</span>
                            </Button>
                             <Button variant="outline" className="w-full justify-between h-auto py-3">
                                <div>
                                    <p className="font-semibold">Tier 3</p>
                                    <p className="text-xs text-muted-foreground">VIP Access</p>
                                </div>
                                <span className="font-bold">$24.99/mo</span>
                            </Button>
                         </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
