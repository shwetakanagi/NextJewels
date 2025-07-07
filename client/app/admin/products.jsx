
// 'use client';

// import { useState, useEffect } from 'react';

// export default function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     name: '',
//     price: '',
//     description: '',
//     category: '',
//     image: '',
//   });

//   const token =
//     typeof window !== 'undefined' ? localStorage.getItem('token') : '';

//   useEffect(() => {
//     fetch('http://localhost:5000/api/admin/products', {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((r) => r.json())
//       .then(setProducts);
//   }, []);

//   const add = async (e) => {
//     e.preventDefault();
//     const res = await fetch('http://localhost:5000/api/admin/products', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(form),
//     });
//     const p = await res.json();
//     setProducts([...products, p]);
//     setForm({ name: '', price: '', description: '', category: '', image: '' });
//   };

//   const remove = async (id) => {
//     await fetch(`http://localhost:5000/api/admin/products/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setProducts(products.filter((p) => p._id !== id));
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-rose-800 mb-4">Manage Products</h2>

//       <form onSubmit={add} className="grid grid-cols-3 gap-3 mb-6">
//         {Object.keys(form).map((k) => (
//           <input
//             key={k}
//             placeholder={k}
//             value={form[k]}
//             onChange={(e) => setForm({ ...form, [k]: e.target.value })}
//             className="border border-rose-300 px-3 py-2 rounded text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300"
//           />
//         ))}
//         <button
//           type="submit"
//           className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded font-semibold transition"
//         >
//           Add Product
//         </button>
//       </form>

//       <ul className="space-y-2">
//         {products.map((p) => (
//           <li
//             key={p._id}
//             className="flex justify-between items-center border border-rose-200 px-4 py-2 rounded bg-white shadow-sm text-gray-800"
//           >
//             <span>
//               {p.name} – <span className="text-rose-700 font-semibold">${p.price}</span>
//             </span>
//             <button
//               onClick={() => remove(p._id)}
//               className="text-red-600 hover:underline text-sm font-medium"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/products', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => toast.error('Failed to load products'));
  }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to add product');

      const p = await res.json();
      setProducts([...products, p]);
      setForm({ name: '', price: '', description: '', category: '', image: '' });
      toast.success('Product added successfully');
    } catch (err) {
      toast.error('Error adding product');
    }
  };

  const remove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to delete product');

      setProducts(products.filter((p) => p._id !== id));
      toast.success('Product deleted');
    } catch (err) {
      toast.error('Error deleting product');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-rose-800 mb-4">Manage Products</h2>

      <form onSubmit={add} className="grid grid-cols-3 gap-3 mb-6">
        {Object.keys(form).map((k) => (
          <input
            key={k}
            placeholder={k}
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            className="border border-rose-300 px-3 py-2 rounded text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        ))}
        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded font-semibold transition"
        >
          Add Product
        </button>
      </form>

      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p._id}
            className="flex justify-between items-center border border-rose-200 px-4 py-2 rounded bg-white shadow-sm text-gray-800"
          >
            <span>
              {p.name} – <span className="text-rose-700 font-semibold">${p.price}</span>
            </span>
            <button
              onClick={() => remove(p._id)}
              className="text-red-600 hover:underline text-sm font-medium"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
