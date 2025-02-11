import pool from '@/lib/dbPostgres';
import { NextResponse } from 'next/server';

interface Category {
    category_id: number;
    category_name: string;
    created_at?: string;
}

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM categories');
        const categories: Category[] = result.rows;

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
    }
}
