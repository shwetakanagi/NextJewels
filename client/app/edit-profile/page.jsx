// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function EditProfilePage() {
//   const [form, setForm] = useState({ name: '', email: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return router.push('/signin');

//     fetch('http://localhost:5000/api/users/me', {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => setForm({ name: data.name, email: data.email }))
//       .catch(() => router.push('/signin'));
//   }, [router]);

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     const token = localStorage.getItem('token');
//     const res = await fetch('http://localhost:5000/api/users/me', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       alert('Profile updated successfully!');
//       router.push('/profile'); // Redirect back to profile page
//     } else {
//       const errData = await res.json();
//       setError(errData.message || 'Failed to update profile.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-24 p-6 bg-white shadow-md border border-rose-100 rounded-lg">
//       <h1 className="text-3xl font-bold text-rose-600 mb-6">Edit Profile</h1>

//       <form onSubmit={handleSubmit} className="space-y-6 text-gray-800 max-w-md">
//         <div>
//           <label className="block font-semibold text-rose-500 mb-1" htmlFor="name">
//             Name
//           </label>
//           <input
//             id="name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-rose-300 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold text-rose-500 mb-1" htmlFor="email">
//             Email
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-rose-300 rounded"
//             required
//           />
//         </div>

//         {error && <p className="text-red-600">{error}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition disabled:opacity-50"
//         >
//           {loading ? 'Saving...' : 'Save Changes'}
//         </button>
//       </form>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/signin');

    fetch('http://localhost:5000/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setForm({ name: data.name, email: data.email }))
      .catch(() => router.push('/signin'));
  }, [router]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/users/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success('Profile updated successfully!');
      router.push('/profile');
    } else {
      const errData = await res.json();
      setError(errData.message || 'Failed to update profile.');
      toast.error(errData.message || 'Failed to update profile.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white shadow-md border border-rose-100 rounded-lg">
      <h1 className="text-3xl font-bold text-rose-600 mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6 text-gray-800 max-w-md">
        <div>
          <label className="block font-semibold text-rose-500 mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-rose-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-rose-500 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-rose-300 rounded"
            required
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
