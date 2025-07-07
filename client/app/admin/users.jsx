
// 'use client';

// import { useState, useEffect } from 'react';

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

//   useEffect(() => {
//     fetch('http://localhost:5000/api/admin/users', {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((r) => r.json())
//       .then(setUsers);
//   }, []);

//   const add = async (e) => {
//     e.preventDefault();
//     const res = await fetch('http://localhost:5000/api/admin/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(form),
//     });
//     const u = await res.json();
//     setUsers([...users, u]);
//     setForm({ name: '', email: '', password: '', role: 'customer' });
//   };

//   const remove = async (id) => {
//     await fetch(`http://localhost:5000/api/admin/users/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setUsers(users.filter((u) => u._id !== id));
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-rose-800 mb-4">Manage Users</h2>

//       <form onSubmit={add} className="grid grid-cols-4 gap-2 mb-6">
//         {['name', 'email', 'password'].map((k) => (
//           <input
//             key={k}
//             type={k === 'password' ? 'password' : 'text'}
//             placeholder={k}
//             value={form[k]}
//             onChange={(e) => setForm({ ...form, [k]: e.target.value })}
//             className="border border-rose-300 px-3 py-2 rounded text-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
//           />
//         ))}
//         <select
//           value={form.role}
//           onChange={(e) => setForm({ ...form, role: e.target.value })}
//           className="border border-rose-300 px-3 py-2 rounded text-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
//         >
//           <option value="customer">Customer</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button
//           type="submit"
//           className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded font-semibold transition"
//         >
//           Add User
//         </button>
//       </form>

//       <ul className="space-y-2">
//         {users.map((u) => (
//           <li
//             key={u._id}
//             className="flex justify-between items-center border border-rose-200 rounded px-4 py-2 bg-white text-gray-800 shadow-sm"
//           >
//             <span>
//               {u.name} ({u.email}) – <span className="capitalize">{u.role}</span>
//             </span>
//             <button
//               onClick={() => remove(u._id)}
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

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setUsers)
      .catch(() => toast.error('Failed to fetch users.'));
  }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('User creation failed');
      const u = await res.json();
      setUsers([...users, u]);
      setForm({ name: '', email: '', password: '', role: 'customer' });
      toast.success('User added successfully!');
    } catch (err) {
      toast.error('Failed to add user.');
    }
  };

  const remove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Deletion failed');
      setUsers(users.filter((u) => u._id !== id));
      toast.success('User deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete user.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-rose-800 mb-4">Manage Users</h2>

      <form onSubmit={add} className="grid grid-cols-4 gap-2 mb-6">
        {['name', 'email', 'password'].map((k) => (
          <input
            key={k}
            type={k === 'password' ? 'password' : 'text'}
            placeholder={k}
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            className="border border-rose-300 px-3 py-2 rounded text-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        ))}
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border border-rose-300 px-3 py-2 rounded text-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded font-semibold transition"
        >
          Add User
        </button>
      </form>

      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u._id}
            className="flex justify-between items-center border border-rose-200 rounded px-4 py-2 bg-white text-gray-800 shadow-sm"
          >
            <span>
              {u.name} ({u.email}) – <span className="capitalize">{u.role}</span>
            </span>
            <button
              onClick={() => remove(u._id)}
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
