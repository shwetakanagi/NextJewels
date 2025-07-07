
// 'use client';

// import { useState, useEffect } from 'react';

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

//   useEffect(() => {
//     if (!token) return;

//     fetch('http://localhost:5000/api/admin/orders', {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((r) => r.json())
//       .then(setOrders)
//       .catch(() => alert('Failed to fetch orders.'));
//   }, [token]);

//   const updateStatus = async (id, status) => {
//     const res = await fetch(`http://localhost:5000/api/admin/orders/${id}/status`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ status }),
//     });

//     if (res.ok) {
//       const updatedOrder = await res.json();
//       setOrders((prev) => prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)));
//     } else {
//       alert('Failed to update status.');
//     }
//   };

//   const deleteOrder = async (id) => {
//     if (!confirm('Are you sure you want to delete this order?')) return;

//     const res = await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.ok) {
//       setOrders((prev) => prev.filter((o) => o._id !== id));
//       alert('Order deleted successfully.');
//     } else {
//       alert('Failed to delete order.');
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-rose-800 mb-4">Manage Orders</h2>

//       {orders.length === 0 && <p>No orders found.</p>}

//       {orders.map((o) => (
//         <div
//           key={o._id}
//           className="bg-white border border-rose-200 rounded p-4 mb-4 shadow-sm flex justify-between items-center"
//         >
//           <div>
//             <p className="text-gray-800">
//               <strong>User:</strong> {o.userId?.name} / {o.userId?.email}
//             </p>
//             <p className="text-gray-800">
//               <strong>Total:</strong> ${o.total}
//             </p>
//             <p className="text-gray-800 flex items-center">
//               <strong>Status:</strong>
//               <select
//                 value={o.status}
//                 onChange={(e) => updateStatus(o._id, e.target.value)}
//                 className="ml-3 px-2 py-1 border border-rose-300 rounded text-rose-700"
//               >
//                 {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//             </p>
//           </div>

//           <button
//             onClick={() => deleteOrder(o._id)}
//             className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:5000/api/admin/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => toast.error('Failed to fetch orders.'));
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error();

      const updatedOrder = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)));
      toast.success(`Order status updated to ${status}`);
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const deleteOrder = async (id) => {
    toast((t) => (
      <span>
        Are you sure?
        <div className="mt-2 flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const res = await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
                  method: 'DELETE',
                  headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error();

                setOrders((prev) => prev.filter((o) => o._id !== id));
                toast.success('Order deleted successfully.');
              } catch {
                toast.error('Failed to delete order.');
              }
            }}
          >
            Delete
          </button>
        </div>
      </span>
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-rose-800 mb-4">Manage Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((o) => (
        <div
          key={o._id}
          className="bg-white border border-rose-200 rounded p-4 mb-4 shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="text-gray-800">
              <strong>User:</strong> {o.userId?.name} / {o.userId?.email}
            </p>
            <p className="text-gray-800">
              <strong>Total:</strong> ${o.total}
            </p>
            <p className="text-gray-800 flex items-center">
              <strong>Status:</strong>
              <select
                value={o.status}
                onChange={(e) => updateStatus(o._id, e.target.value)}
                className="ml-3 px-2 py-1 border border-rose-300 rounded text-rose-700"
              >
                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </p>
          </div>

          <button
            onClick={() => deleteOrder(o._id)}
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
