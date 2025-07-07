
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/signin');

    fetch('http://localhost:5000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => {
        console.error('Failed to load profile:', err);
        router.push('/signin');
      });
  }, [router]);

  if (!user)
    return (
      <p className="mt-24 p-6 max-w-5xl mx-auto text-rose-500 text-center">
        Loading profile...
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white shadow-md border border-rose-100 rounded-lg">
      <h1 className="text-3xl font-bold text-rose-600 mb-6">Your Profile</h1>
      <div className="space-y-4 text-gray-800">
        <p>
          <span className="font-semibold text-rose-500">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold text-rose-500">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold text-rose-500">Role:</span> {user.role}
        </p>
        <p>
          <span className="font-semibold text-rose-500">Joined:</span>{' '}
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
        </p>
      </div>
       <button
        onClick={() => router.push('/edit-profile')}
        className="mt-6 px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition"
      >
        Edit Profile
      </button>
    </div>
  );
}
