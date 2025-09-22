'use client';

import * as React from 'react';
import { DollarSign, Gift, Star, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from './ui/separator';

export function MonetizationSettings() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <h2 className="text-2xl font-headline font-semibold">Monetization</h2>
                <p className="text-muted-foreground mt-2">
                    Configure subscriptions, donations, and other ways for your fans to support you.
                </p>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-primary" />
                            Subscriptions
                        </CardTitle>
                        <CardDescription>
                            Allow viewers to subscribe to your channel for exclusive perks.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <Label htmlFor="subscriptions-enabled" className="flex flex-col space-y-1">
                                <span>Enable Subscriptions</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Turn on monthly paid subscriptions for your channel.
                                </span>
                            </Label>
                            <Switch id="subscriptions-enabled" defaultChecked />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tier1-price">Tier 1 Price (USD)</Label>
                            <Input id="tier1-price" type="number" defaultValue="4.99" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tier2-price">Tier 2 Price (USD)</Label>
                            <Input id="tier2-price" type="number" defaultValue="9.99" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tier3-price">Tier 3 Price (USD)</Label>
                            <Input id="tier3-price" type="number" defaultValue="24.99" />
                        </div>
                    </CardContent>

                    <Separator className="my-6"/>

                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Gift className="h-5 w-5 text-primary" />
                            Donations
                        </CardTitle>
                        <CardDescription>
                            Receive one-time tips from your viewers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <Label htmlFor="donations-enabled" className="flex flex-col space-y-1">
                                <span>Enable Donations</span>
                                 <span className="font-normal leading-snug text-muted-foreground">
                                    Allow viewers to send you donations directly.
                                </span>
                            </Label>
                            <Switch id="donations-enabled" defaultChecked />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="donation-link">Donation Service Link</Label>
                            <Input id="donation-link" placeholder="https://your-donation-service.com/yourname" />
                        </div>
                    </CardContent>
                     <Separator className="my-6"/>

                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            Payout Method
                        </CardTitle>
                        <CardDescription>
                            Configure how you receive your earnings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4 rounded-lg border p-4">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                        <div className="flex-1">
                            <p className="font-medium">Stripe Account</p>
                            <p className="text-sm text-muted-foreground">Connected as streamer@email.com</p>
                        </div>
                        <Button variant="outline">Manage</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
