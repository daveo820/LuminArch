import { NextRequest, NextResponse } from 'next/server';
import { getStripe, formatAmountForStripe } from '@/lib/stripe';
import { getProductById } from '@/data/products';

// Force dynamic to prevent build-time evaluation
export const dynamic = 'force-dynamic';

interface CartItem {
  productId: string;
  variantSku: string;
  quantity: number;
  size: string;
  color: string;
}

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json() as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Build line items for Stripe
    const lineItems = items.map((item) => {
      const product = getProductById(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: `${item.color} / ${item.size}`,
            images: product.images.slice(0, 1), // Stripe allows max 8 images
          },
          unit_amount: formatAmountForStripe(product.price),
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 899,
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1599,
              currency: 'usd',
            },
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free Shipping (Orders over $100)',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      metadata: {
        items: JSON.stringify(items.map(item => ({
          productId: item.productId,
          sku: item.variantSku,
          quantity: item.quantity,
        }))),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
