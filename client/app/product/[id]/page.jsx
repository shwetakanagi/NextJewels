
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';

// export default function ProductDetail() {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const router = useRouter();
//   const params = useParams();
//   const productId = params.id;

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/signin');
//       return;
//     }

//     if (!productId) return;

//     fetch(`http://localhost:5000/api/products/${productId}`)
//       .then(res => {
//         if (!res.ok) throw new Error('Product not found');
//         return res.json();
//       })
//       .then(data => {
//         setProduct(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, [productId, router]);

//   async function addToCart() {
//     const token = localStorage.getItem('token');
//     if (!token) return router.push('/signin');

//     try {
//       const res = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ productId: product._id }),
//       });

//       if (res.ok) {
//         setMessage('Added to cart!');
//       } else {
//         const err = await res.json();
//         setMessage(err.message || 'Error');
//       }
//     } catch {
//       setMessage('Network error');
//     }
//   }

//   if (loading) return <p className="p-6 text-center text-rose-500">Loading product...</p>;
//   if (!product) return <p className="p-6 text-center text-red-500">Product not found.</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6 mt-24">
//       <button
//         onClick={() => router.back()}
//         className="mb-6 px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition"
//       >
//         ← Back
//       </button>

//       <div className="flex flex-col md:flex-row gap-10">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full md:w-1/2 rounded-lg object-cover"
//         />

//         <div className="md:w-1/2">
//           <h1 className="text-4xl font-bold text-rose-700 mb-4">{product.name}</h1>
//           <p className="text-rose-500 text-2xl font-semibold mb-2">${product.price}</p>
//           <p className="text-gray-700 mb-6">{product.description}</p>
//           <p className="italic text-gray-500 mb-6">Category: {product.category}</p>

//           <button
//             onClick={addToCart}
//             className="px-6 py-3 bg-rose-600 text-white rounded hover:bg-rose-700 transition font-semibold"
//           >
//             Add to Cart
//           </button>

//           {message && (
//             <p className="mt-4 text-green-600 font-semibold">{message}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }

    if (!productId) return;

    fetch(`http://localhost:5000/api/products/${productId}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [productId, router]);

  async function addToCart() {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/signin');

    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (res.ok) {
        toast.success('Item added to cart!');
      } else {
        const err = await res.json();
        toast.error(err.message || 'Error adding to cart');
      }
    } catch {
      toast.error('Network error');
    }
  }

  if (loading) return <p className="p-6 text-center text-rose-500">Loading product...</p>;
  if (!product) return <p className="p-6 text-center text-red-500">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-24 bg-white rounded-2xl shadow-xl border border-rose-200">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-2xl object-cover border-4 border-rose-100 shadow-lg"
        />

        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-rose-700 mb-4">{product.name}</h1>
            <p className="text-rose-500 text-3xl font-semibold mb-3">${product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <p className="italic text-gray-500 mb-6">Category: {product.category}</p>
          </div>

          <button
            onClick={addToCart}
            className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition font-semibold shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
