import { connectDB } from '@/lib/prod_db';
import { NextResponse } from 'next/server';
import { Category, categorySchema } from '@/app/api/categories/route';
import { SubCategory, subCategorySchema } from '../sub_categories/route';
import mongoose from 'mongoose';

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
  updated_at?: string;
  seller_name: string;
  location: string;
  category_name: string;
  sub_category_name: string;
}

const productSchema = new mongoose.Schema<Product>({
  product_id: { type: Number, required: true },
  title: { type: String, required: true },
  model: { type: String },
  description: { type: String },
  category_id: { type: Number },
  sub_category_id: { type: Number },
  units: { type: String },
  weight: { type: Number },
  dimensions: {
    width: { type: Number },
    height: { type: Number },
    length: { type: Number }
  },
  image_link: { type: String },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  SKU: { type: String },
  seller_id: { type: Number },
  created_at: { type: String },
  updated_at: { type: String },
  rating: { type: Number },
  seller_name: { type: String },
  location: { type: String },
  category_name: { type: String },
  sub_category_name: { type: String }
});

const ProductModel = mongoose.models.Product || mongoose.model<Product>('Product', productSchema);

export async function GET() {
  try {
    await connectDB();
    const products = await ProductModel.aggregate([
      {
        $lookup: {
          from: "sellers",
          localField: "seller_id",
          foreignField: "seller_id",
          as: "seller"
        }
      },
      {
        $lookup: {
          from: "categories",        // Collection name for categories
          localField: "category_id",
          foreignField: "category_id",
          as: "category"
        }
      },
      {
        $lookup: {
          from: "subcategories",    // Collection name for sub-categories
          localField: "sub_category_id",
          foreignField: "sub_category_id",
          as: "sub_category"
        }
      },
      {
        $addFields: {
          seller_name: { $arrayElemAt: ["$seller.seller_name", 0] },
          location: { $arrayElemAt: ["$seller.location", 0] },
          category_name: { $arrayElemAt: ["$category.category_name", 0] },
          sub_category_name: { $arrayElemAt: ["$sub_category.sub_category_name", 0] }
        }
      },
      {
        $project: {
          category: 0,              // Remove the temporary category array
          sub_category: 0           // Remove the temporary sub_category array
        }
      }
    ]);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    await connectDB();
    const productData = await request.json();
    const newProduct = new ProductModel(productData);
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error posting product:', error);
    return NextResponse.json({ error: 'Error posting product' }, { status: 500 });
  }
}
