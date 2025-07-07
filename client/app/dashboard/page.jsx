
'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

export default function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.email) setUserEmail(decoded.email);
        fetchCartCount(token);
      } catch {
        setUserEmail('');
      }
    }

    window.addEventListener('cartUpdate', handleCartUpdate);
    return () => window.removeEventListener('cartUpdate', handleCartUpdate);
  }, []);

  const fetchCartCount = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const count = data.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error('Failed to fetch cart count:', err);
    }
  };

  const handleCartUpdate = () => {
    const token = localStorage.getItem('token');
    if (token) fetchCartCount(token);
  };

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest('.user-dropdown')) setShowDropdown(false);
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  const roseGold = '#b76e79';
  const roseHover = '#a65f6b';

  return (
    <>
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold" style={{ color: roseGold }}>
            ModernJewels
          </div>
          <div className="flex items-center space-x-6">
            {/* Dropdown */}
            <div className="relative user-dropdown">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="font-semibold"
                style={{ color: roseGold }}
              >
                Welcome, {userEmail} ▼
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-rose-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <span
                className="px-4 py-2 border rounded-md font-semibold transition"
                style={{
                  borderColor: roseGold,
                  color: roseGold,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = roseGold;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = roseGold;
                }}
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10" style={{ color: roseGold }}>
          Your Jewellery Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="font-bold mt-1" style={{ color: roseGold }}>
                    ${product.price}
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
                  <p className="mt-2 text-gray-500 text-xs italic">
                    Category: {product.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
