import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/dbPostgres';

interface Seller {
    seller_id: number;
    user_id: number;
    seller_name: string;
    rating_value: number;
    review_count: number;
    contact_no: string;
    location: string;
    created_at?: string;
}

export async function GET(req: NextRequest) {
    try {
        const result = await pool.query('SELECT seller_id, user_id, seller_name, rating_value, review_count, contact_no, location, created_at FROM sellers');
        const sellers: Seller[] = result.rows;

        return NextResponse.json(sellers, { status: 200 });
    } catch (error) {
        console.error('Error fetching sellers:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

