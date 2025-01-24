'use server'

import { NextResponse } from "next/server";
import { connectDB } from '@/lib/db'
import Subscriber from "@/models/Subscriber";

export async function POST(req: Request) {
    const { email } = await req.json();
    console.log('email:', email);
    if (!email || typeof email !== 'string') {
        return NextResponse.json({ message: 'Invalid email address' }, { status: 403 });
    }

    try {
        await connectDB();
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json({ message: 'Email is already subscribed' }, { status: 400 });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });
    } catch (error) {
        console.error('Mongodb error:', error);
        return NextResponse.json({ message: 'Subscription failed' }, { status: 500 });
    }
}