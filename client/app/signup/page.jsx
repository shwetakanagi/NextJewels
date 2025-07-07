
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SignUp() {
//   const router = useRouter();
//   const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('http://localhost:5000/api/auth/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.message);
//     } else {
//       router.push('/signin');
//     }
//   };

//   const roseGold = '#b76e79';
//   const roseHover = '#a35c66';

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#fffaf9' }}>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border"
//         style={{ borderColor: roseGold }}
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: roseGold }}>
//           Sign Up
//         </h2>

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-1"
//           style={{ borderColor: roseGold }}
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-1"
//           style={{ borderColor: roseGold }}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-1"
//           style={{ borderColor: roseGold }}
//           required
//         />

//         <select
//           value={form.role}
//           onChange={(e) => setForm({ ...form, role: e.target.value })}
//           className="w-full mb-4 p-3 border rounded text-gray-600"
//           style={{ borderColor: roseGold }}
//         >
//           <option value="customer">Customer</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button
//           type="submit"
//           className="w-full py-3 rounded font-semibold transition"
//           style={{
//             backgroundColor: roseGold,
//             color: 'white',
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = roseHover)}
//           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = roseGold)}
//         >
//           Create Account
//         </button>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{' '}
//           <a href="/signin" style={{ color: roseGold }} className="underline hover:opacity-80">
//             Sign In
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      toast.success('Registration successful! Please sign in.');
      router.push('/signin');
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
          Sign Up
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-1"
          style={{ borderColor: roseGold }}
          required
        />

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

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full mb-4 p-3 border rounded text-gray-600"
          style={{ borderColor: roseGold }}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

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
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/signin" style={{ color: roseGold }} className="underline hover:opacity-80">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
