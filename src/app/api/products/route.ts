import pool from '@/lib/dbPostgres';
import { NextResponse } from 'next/server';

interface Product {
    product_id: number;
    title: string;
    model?: string;
    description?: string;
    category_id?: number;
    sub_category_id?: number;
    units?: string;
    weight?: number;
    dimensions?: object;
    image_link?: string;
    stock: number;
    price: number;
    discount?: number;
    SKU: string;
    seller_id?: number;
    created_at?: string;
    rating?: number;
    seller_name: string;
    location: string;
    category_name: string;
    sub_category_name: string
}

export async function GET() {
    try {
        const client = await pool.connect();
        const result = await client.query(`
            SELECT 
                p.*, 
                s.seller_name,
                s.location,
                c.category_name,
                sc.sub_category_name
            FROM products p 
            LEFT JOIN sellers s ON p.seller_id = s.seller_id
            LEFT JOIN categories c ON p.category_id = c.category_id
            LEFT JOIN sub_categories sc ON p.sub_category_id = sc.sub_category_id
        `);
        
        const products: Product[] = result.rows;

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}
