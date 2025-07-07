
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrders() {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/signin');

      const res = await fetch('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
    }

    fetchOrders();
  }, [router]);

  const handleDelete = async (orderId) => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/signin');

    if (!confirm('Are you sure you want to delete this order?')) return;

    const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      toast.success('Order deleted successfully!');
    } else {
      toast.error('Failed to delete order.');
    }
  };

  if (orders.length === 0)
    return <p className="p-6 mt-24 max-w-5xl mx-auto text-rose-600">No orders found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-24">
      <h1 className="text-3xl font-bold text-rose-700 mb-6">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded shadow p-4 relative">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>
            <div className="mt-2">
              <strong>Items:</strong>
              <ul className="list-disc ml-6">
                {order.items.map(({ product, quantity }) => (
                  <li key={product._id}>
                    {product.name} (x{quantity}) - ${product.price}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleDelete(order._id)}
              className="absolute top-4 right-4 bg-rose-600 text-white px-3 py-1 rounded hover:bg-rose-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
