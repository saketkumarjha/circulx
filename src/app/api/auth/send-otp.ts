import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, phone } = await req.json()

    // Here you would implement your OTP sending logic
    // For this example, we'll just simulate sending an OTP

    console.log(`Simulating OTP sent to ${email || phone}`)

    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}