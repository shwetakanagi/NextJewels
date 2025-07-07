
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function CartPage() {
//   const [cart, setCart] = useState({ items: [] });
//   const [showPayment, setShowPayment] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const roseGold = '#b76e79';
//   const roseHover = '#a65f6b';

//   useEffect(() => {
//     async function fetchCart() {
//       const token = localStorage.getItem('token');
//       if (!token) return router.push('/signin');

//       const res = await fetch('http://localhost:5000/api/cart', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();
//       setCart(data);
//       setLoading(false);
//     }

//     fetchCart();
//   }, [router]);

//   const updateQuantity = async (productId, delta) => {
//     const token = localStorage.getItem('token');
//     const res = await fetch('http://localhost:5000/api/cart', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ productId, delta }),
//     });

//     const data = await res.json();
//     setCart(data);
//   };

//   const deleteItem = async (productId) => {
//     const token = localStorage.getItem('token');
//     const res = await fetch(`http://localhost:5000/api/cart/${productId}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     setCart(data);
//   };

//   const total = cart.items.reduce((sum, item) => {
//     if (!item.product) return sum;
//     return sum + item.product.price * item.quantity;
//   }, 0);

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     const res = await fetch('http://localhost:5000/api/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         items: cart.items.map(({ product, quantity }) => ({
//           product: {
//             _id: product._id,
//             name: product.name,
//             price: product.price,
//           },
//           quantity,
//         })),
//       }),
//     });

//     if (res.ok) {
//       alert('Payment successful! Order placed.');
//       router.push('/orders');
//     } else {
//       alert('Order failed.');
//     }
//   };

//   if (loading) return <p className="text-center mt-24 text-rose-500">Loading cart...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-24">
//       <h1 className="text-3xl font-bold mb-6" style={{ color: roseGold }}>
//         Your Cart
//       </h1>

//       {cart.items.length === 0 ? (
//         <p>No items in cart.</p>
//       ) : (
//         <>
//           <ul className="space-y-4">
//             {cart.items.map(({ product, quantity }) => (
//               <li
//                 key={product._id}
//                 className="flex justify-between items-center border-b pb-2"
//               >
//                 <div className="flex items-center gap-3">
//                   <span>{product.name}</span>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => updateQuantity(product._id, -1)}
//                       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       -
//                     </button>
//                     <span>{quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(product._id, 1)}
//                       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <span style={{ color: roseGold }}>
//                     ${(product.price * quantity).toFixed(2)}
//                   </span>
//                   <button
//                     onClick={() => deleteItem(product._id)}
//                     className="text-sm text-red-500 hover:underline"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <div className="mt-6 text-xl font-semibold" style={{ color: roseGold }}>
//             Total: ${total.toFixed(2)}
//           </div>

//           {!showPayment ? (
//             <button
//               onClick={() => setShowPayment(true)}
//               className="mt-6 text-white py-2 px-4 rounded transition"
//               style={{
//                 backgroundColor: roseGold,
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = roseHover)}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = roseGold)}
//             >
//               Proceed to Payment
//             </button>
//           ) : (
//             <form
//               onSubmit={handlePaymentSubmit}
//               className="mt-6 space-y-4 bg-gray-50 p-6 rounded shadow"
//             >
//               <h2 className="text-2xl font-semibold mb-4" style={{ color: roseGold }}>
//                 Dummy Payment
//               </h2>

//               <div>
//                 <label className="block mb-1">Card Number</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="1234 5678 9012 3456"
//                   className="w-full border px-3 py-2 rounded"
//                 />
//               </div>

//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <label className="block mb-1">Expiry</label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="MM/YY"
//                     className="w-full border px-3 py-2 rounded"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block mb-1">CVV</label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="123"
//                     className="w-full border px-3 py-2 rounded"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block mb-1">Name on Card</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="John Doe"
//                   className="w-full border px-3 py-2 rounded"
//                 />
//               </div>

//           <button
//             type="submit"
//             className="px-4 py-2 text-white rounded transition"
//             style={{
//               backgroundColor: roseGold,
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = roseHover)}
//             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = roseGold)}
//           >
//             Pay ${total.toFixed(2)} (Dummy)
//           </button>
//         </form>
//       )}
//     </>
//   )}
// </div>
// );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const roseGold = '#b76e79';
  const roseHover = '#a65f6b';

  useEffect(() => {
    async function fetchCart() {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/signin');

      const res = await fetch('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setCart(data);
      setLoading(false);
    }

    fetchCart();
  }, [router]);

  const updateQuantity = async (productId, delta) => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, delta }),
    });

    const data = await res.json();
    setCart(data);
  };

  const deleteItem = async (productId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setCart(data);
    toast.success('Item removed from cart');
  };

  const total = cart.items.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cart.items.map(({ product, quantity }) => ({
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
          },
          quantity,
        })),
      }),
    });

    if (res.ok) {
      toast.success('Payment successful! Order placed.');
      router.push('/orders');
    } else {
      toast.error('Order failed. Try again.');
    }
  };

  if (loading) return <p className="text-center mt-24 text-rose-500">Loading cart...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24">
      <h1 className="text-3xl font-bold mb-6" style={{ color: roseGold }}>
        Your Cart
      </h1>

      {cart.items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.items.map(({ product, quantity }) => (
              <li
                key={product._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <span>{product.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product._id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product._id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span style={{ color: roseGold }}>
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => deleteItem(product._id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-xl font-semibold" style={{ color: roseGold }}>
            Total: ${total.toFixed(2)}
          </div>

          {!showPayment ? (
            <button
              onClick={() => setShowPayment(true)}
              className="mt-6 text-white py-2 px-4 rounded transition"
              style={{
                backgroundColor: roseGold,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = roseHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = roseGold)}
            >
              Proceed to Payment
            </button>
          ) : (
            <form
              onSubmit={handlePaymentSubmit}
              className="mt-6 space-y-4 bg-gray-50 p-6 rounded shadow"
            >
              <h2 className="text-2xl font-semibold mb-4" style={{ color: roseGold }}>
                Dummy Payment
              </h2>

              <div>
                <label className="block mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  placeholder="1234 5678 9012 3456"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1">Expiry</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">CVV</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Name on Card</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-white rounded transition"
                style={{
                  backgroundColor: roseGold,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = roseHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = roseGold)
                }
              >
                Pay ${total.toFixed(2)} (Dummy)
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
