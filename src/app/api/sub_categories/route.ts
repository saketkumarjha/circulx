import pool from '@/lib/dbPostgres';
import { NextResponse } from 'next/server';

interface SubCategory {
    sub_category_id: number;
    category_id: number;
    sub_category_name: string;
    created_at?: string;
}

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM sub_categories');
        const subCategories: SubCategory[] = result.rows;

        return NextResponse.json(subCategories, { status: 200 });
    } catch (error) {
        console.error('Error fetching sub_categories:', error);
        return NextResponse.json({ error: 'Error fetching sub_categories' }, { status: 500 });
    }
}
