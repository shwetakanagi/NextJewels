
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast'; // ✅ import toast

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to sign in');
        return;
      }

      localStorage.setItem('token', data.token);
      const decoded = jwtDecode(data.token);
      const role = decoded.role;

      toast.success('Login successful ✅'); // ✅ toast

      setTimeout(() => {
        router.push(role === 'admin' ? '/admin' : '/dashboard');
      }, 1000); // slight delay to let toast appear
    } catch (err) {
      console.error('Sign-in error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  const roseGold = '#b76e79';
  const roseHover = '#a35c66';

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#fffaf9' }}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border"
        style={{ borderColor: roseGold }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: roseGold }}>
          Sign In
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-1"
          style={{ borderColor: roseGold }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-1"
          style={{ borderColor: roseGold }}
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded font-semibold transition"
          style={{
            backgroundColor: roseGold,
            color: 'white',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = roseHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = roseGold)}
        >
          Sign In
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <a href="/signup" style={{ color: roseGold }} className="underline hover:opacity-80">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
