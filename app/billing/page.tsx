// app/billing/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Polar } from '@polar-sh/sdk';

const polar = new Polar({
  apiKey: process.env.POLAR_API_KEY,
});

async function handleCheckout(email: string) {
    const checkoutSession = await polar.checkout.create({
        tier: 'your_tier_id', // Replace with your tier ID
        customer_email: email,
    });

    if (checkoutSession.url) {
        redirect(checkoutSession.url);
    }
}


async function handleBillingPortal(email: string) {
    const portalSession = await polar.portal.create({
        customer_email: email,
    });

    if (portalSession.url) {
        redirect(portalSession.url);
    }
}

export default function BillingPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Billing</h1>
      <div className="space-y-4 max-w-sm">
        <p>Manage your subscription and billing details.</p>
        <div className="flex flex-col space-y-4">
            <form action={() => handleCheckout(session.user.email)}>
                <Button type="submit">Upgrade to Pro</Button>
            </form>
            <form action={() => handleBillingPortal(session.user.email)}>
                <Button variant="outline" type="submit">
                    Manage Billing
                </Button>
            </form>
        </div>
      </div>
    </div>
  );
}
