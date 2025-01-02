import { Badge } from "@/components/ui/badge"

interface Product {
  name: string
  icon: string
  submittedBy: string
  dateTime: string
  piece: string
  amount: string
  status: 'delivered' | 'pending' | 'rejected'
}

const recentProducts: Product[] = [
  {
    name: 'Aluminium Sheets',
    icon: '/audi.jpeg',
    submittedBy: 'ABD Industry Pvt Ltd',
    dateTime: '12.09.2019 - 12:53 PM',
    piece: '423',
    amount: '$34,295',
    status: 'delivered',
  },
  {
    name: 'Wires',
    icon: '/cart.png',
    submittedBy: 'Pawar Factory Pvt Ltd',
    dateTime: '12.09.2019 - 12:53 PM',
    piece: '423',
    amount: '$34,295',
    status: 'pending',
  },
  {
    name: 'Apple Watch',
    icon: '/login.png',
    submittedBy: '6096 Maryplane Landing',
    dateTime: '12.09.2019 - 12:53 PM',
    piece: '423',
    amount: '$34,295',
    status: 'rejected',
  },
]

const statusStyles = {
  delivered: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800',
}

export function RecentProductsTable() {
  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 font-semibold">Recently Added Products</div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Submitted By</th>
              <th className="px-4 py-3">Date - Time</th>
              <th className="px-4 py-3">Piece</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentProducts.map((product, index) => (
              <tr
                key={index}
                className="border-t bg-white hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.icon}
                      alt={product.name}
                      className="h-10 w-10 rounded-md"
                    />
                    {product.name}
                  </div>
                </td>
                <td className="px-4 py-3">{product.submittedBy}</td>
                <td className="px-4 py-3">{product.dateTime}</td>
                <td className="px-4 py-3">{product.piece}</td>
                <td className="px-4 py-3">{product.amount}</td>
                <td className="px-4 py-3">
                  <Badge className={statusStyles[product.status]}>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

