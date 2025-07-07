// 'use client';

// import { useEffect, useState } from 'react';

// export default function Home() {
//   const [productsByCategory, setProductsByCategory] = useState({});

//   useEffect(() => {
//     fetch('http://localhost:5000/api/products')
//       .then(res => res.json())
//       .then(data => {
//         const grouped = data.reduce((acc, product) => {
//           if (!acc[product.category]) acc[product.category] = [];
//           acc[product.category].push(product);
//           return acc;
//         }, {});
//         setProductsByCategory(grouped);
//       })
//       .catch(console.error);
//   }, []);

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="fixed w-full bg-white shadow-md z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="text-2xl font-bold text-yellow-700">ModernJewels</div>
//           <ul className="hidden md:flex space-x-8 items-center">
//             <li>
//               <a href="#collections" className="hover:text-yellow-600 transition font-medium">
//                 Collections
//               </a>
//             </li>
//             <li>
//               <a href="#about" className="hover:text-yellow-600 transition font-medium">
//                 About
//               </a>
//             </li>
//             <li>
//               <a href="#contact" className="hover:text-yellow-600 transition font-medium">
//                 Contact
//               </a>
//             </li>

//             {/* Sign In & Sign Up Buttons */}
//             <li>
//               <a
//                 href="/signin"
//                 className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-md hover:bg-yellow-600 hover:text-white transition font-semibold"
//               >
//                 Sign In
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/signup"
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition font-semibold"
//               >
//                 Sign Up
//               </a>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       {/* <section className="pt-24 bg-yellow-50 text-center px-6 py-20">
//         <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-900 max-w-4xl mx-auto leading-tight">
//           Discover Your Perfect <span className="text-yellow-600">Modern Jewellery</span>
//         </h1>
//         <p className="mt-6 text-lg max-w-xl mx-auto text-gray-700">
//           Handcrafted elegance designed to elevate your style and celebrate your moments.
//         </p>
//         <a
//           href="#collections"
//           className="inline-block mt-8 bg-yellow-600 text-white px-8 py-3 rounded shadow hover:bg-yellow-700 transition"
//         >
//           Shop Collections
//         </a>
//       </section> */}

// <section
//   className="pt-24 px-6 py-40 bg-center bg-cover bg-no-repeat text-center relative"
//   style={{
//     backgroundImage: `url("https://img.freepik.com/free-photo/top-view-engagement-rings-with-copy-space_23-2148483464.jpg")`, // ← Replace with your actual image URL
//   }}
// >
//   <div className="absolute inset-0 bg-white bg-opacity-40 z-0" />
//   <div className="relative z-10">
//     <h1 className="text-5xl md:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
//       Discover Your Perfect <span className="text-yellow-300">Modern Jewellery</span>
//     </h1>
//     <p className="mt-6 text-lg max-w-xl mx-auto text-white/90">
//       Handcrafted elegance designed to elevate your style and celebrate your moments.
//     </p>
//     <a
//       href="#collections"
//       className="inline-block mt-8 bg-yellow-600 text-white px-8 py-3 rounded shadow hover:bg-yellow-700 transition"
//     >
//       Shop Collections
//     </a>
//   </div>
// </section>







//       {/* Products Collections */}
//       <section id="collections" className="py-16 px-6 bg-gray-50">
//         {Object.entries(productsByCategory).map(([category, products]) => (
//           <div key={category} className="max-w-7xl mx-auto mb-16">
//             <h2 className="text-3xl font-semibold text-yellow-900 mb-8 text-center">{category}</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//               {products.map(product => (
//                 <div
//                   key={product._id}
//                   className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-72 object-cover rounded-t-lg"
//                     loading="lazy"
//                   />
//                   <div className="p-5 text-center">
//                     <h3 className="text-lg font-semibold">{product.name}</h3>
//                     <p className="text-yellow-700 font-bold mt-1">${product.price}</p>
//                     <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 px-6 max-w-4xl mx-auto text-center">
//         <h2 className="text-4xl font-semibold mb-6 text-yellow-900">About ModernJewels</h2>
//         <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
//           At ModernJewels, we craft exquisite jewellery pieces blending timeless elegance with
//           contemporary design. Each piece is handcrafted with passion and precision, ensuring you
//           shine at every occasion.
//         </p>
//       </section>

//       {/* Contact Section */}
//       <section
//         id="contact"
//         className="bg-yellow-600 text-white py-16 px-6 text-center max-w-4xl mx-auto rounded-lg shadow-lg mb-20"
//       >
//         <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
//         <p className="mb-6">
//           Questions? Reach out to us anytime at{' '}
//           <a href="mailto:hello@modernjewels.com" className="underline">
//             hello@modernjewels.com
//           </a>
//         </p>
//         <a
//           href="mailto:hello@modernjewels.com"
//           className="inline-block bg-white text-yellow-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
//         >
//           Email Us
//         </a>
//       </section>

//       {/* Footer */}
//       {/* Footer */}
// <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 px-6">
//   <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
//     {/* Brand */}
//     <div>
//       <h3 className="text-2xl font-bold text-yellow-500 mb-4">ModernJewels</h3>
//       <p className="text-gray-400 text-sm">
//         Explore timeless beauty with our curated collections of fine jewellery — where modern
//         design meets traditional craftsmanship.
//       </p>
//     </div>

//     {/* Quick Links */}
//     <div>
//       <h4 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h4>
//       <ul className="space-y-2 text-sm text-gray-400">
//         <li><a href="#collections" className="hover:text-white transition">Collections</a></li>
//         <li><a href="#about" className="hover:text-white transition">About</a></li>
//         <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
//         <li><a href="/signin" className="hover:text-white transition">Sign In</a></li>
//         <li><a href="/signup" className="hover:text-white transition">Sign Up</a></li>
//       </ul>
//     </div>

//     {/* Social Media */}
//     <div>
//       <h4 className="text-lg font-semibold text-yellow-400 mb-4">Follow Us</h4>
//       <div className="flex space-x-4 text-gray-400">
//         <a href="#" aria-label="Facebook" className="hover:text-white transition">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M22 12a10 10 0 10-11.63 9.88v-7h-2v-2.88h2V9.64c0-2 1.2-3.11 3.03-3.11.88 0 1.79.16 1.79.16v2h-1.01c-1 0-1.31.62-1.31 1.26v1.51h2.25L15.38 15h-2v7A10 10 0 0022 12z" />
//           </svg>
//         </a>
//         <a href="#" aria-label="Instagram" className="hover:text-white transition">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M7 2C4.79 2 3 3.79 3 6v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4H7zm10 2a2 2 0 012 2v2h-2V6h-2V4h2zM7 4h10v2h-2v2h-6V6H7V4zm5 4a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
//           </svg>
//         </a>
//         <a href="#" aria-label="Twitter" className="hover:text-white transition">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.2 9.2 0 01-2.88 1.1 4.52 4.52 0 00-7.69 4.13A12.9 12.9 0 013 2.1a4.5 4.5 0 001.39 6.04 4.49 4.49 0 01-2.05-.57v.06a4.5 4.5 0 003.63 4.41 4.52 4.52 0 01-2.04.08 4.5 4.5 0 004.21 3.13 9.06 9.06 0 01-5.6 1.93A9.22 9.22 0 012 19.54a12.87 12.87 0 006.95 2.03c8.34 0 12.9-6.91 12.9-12.9l-.01-.59A9.18 9.18 0 0023 3z" />
//           </svg>
//         </a>
//       </div>
//     </div>
//   </div>

//   <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
//     &copy; {new Date().getFullYear()} ModernJewels. All rights reserved.
//   </div>
// </footer>

//     </>
//   );
// }
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc, product) => {
          if (!acc[product.category]) acc[product.category] = [];
          acc[product.category].push(product);
          return acc;
        }, {});
        setProductsByCategory(grouped);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-rose-700">ModernJewels</div>
          <ul className="hidden md:flex space-x-8 items-center">
            {["collections", "about", "contact"].map(link => (
              <li key={link}>
                <a href={`#${link}`} className="hover:text-rose-600 transition font-medium capitalize">
                  {link}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/signin"
                className="px-4 py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-600 hover:text-white transition font-semibold"
              >
                Sign In
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-700 transition font-semibold"
              >
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="pt-24 px-6 py-40 bg-center bg-cover bg-no-repeat text-center relative"
        style={{
          backgroundImage: `url("https://img.freepik.com/premium-photo/gold-jewelry-accessories-marble_1195984-3790.jpg?semt=ais_hybrid&w=740")`,
        }}
      >
        <div className="absolute inset-0 bg-gray-300 bg-opacity-40 z-0" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-700 max-w-4xl mx-auto leading-tight">
            Discover Your Perfect <span className="text-rose-400">Modern Jewellery</span>
          </h1>
          <p className="mt-6 text-lg max-w-xl mx-auto text-grey/90">
            Handcrafted elegance designed to elevate your style and celebrate your moments.
          </p>
          <a
            href="#collections"
            className="inline-block mt-8 bg-rose-600 text-white px-8 py-3 rounded shadow hover:bg-rose-700 transition"
          >
            Shop Collections
          </a>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="py-16 px-6 bg-rose-50">
        {Object.entries(productsByCategory).map(([category, products]) => (
          <div key={category} className="max-w-7xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-rose-900 mb-8 text-center capitalize">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {products.map(product => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover rounded-t-lg"
                    loading="lazy"
                  />
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-semibold text-rose-800">{product.name}</h3>
                    <p className="text-rose-600 font-bold mt-1">${product.price}</p>
                    <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-6 text-rose-800">About ModernJewels</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          At ModernJewels, we create beautiful, high-quality jewelry that combines classic style with 
          a modern touch. Every piece is carefully handmade to help you look and feel your best for any occasion.
        </p>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="bg-rose-600 text-white py-16 px-6 text-center max-w-4xl mx-auto rounded-lg shadow-lg mb-20"
      >
        <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-6">
          Questions? Reach out to us anytime at{' '}
          <a href="mailto:hello@modernjewels.com" className="underline hover:text-rose-200">
            hello@modernjewels.com
          </a>
        </p>
        <a
          href="mailto:hello@modernjewels.com"
          className="inline-block bg-white text-rose-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Email Us
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-rose-500 mb-4">ModernJewels</h3>
            <p className="text-gray-400 text-sm">
              Timeless craftsmanship meets modern design.
              Jewellery made to shine, made for you.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-rose-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#collections" className="hover:text-white transition">Collections</a></li>
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="/signin" className="hover:text-white transition">Sign In</a></li>
              <li><a href="/signup" className="hover:text-white transition">Sign Up</a></li>
            </ul>
          </div>
          <div>
              <h4 className="text-lg font-semibold text-rose-400 mb-4">Follow Us</h4>
              <div className="flex space-x-4 text-gray-400">
                <a href="#" aria-label="Facebook" className="hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12a10 10 0 10-11.63 9.88v-7h-2v-2.88h2V9.64c0-2 1.2-3.11 3.03-3.11.88 0 1.79.16 1.79.16v2h-1.01c-1 0-1.31.62-1.31 1.26v1.51h2.25L15.38 15h-2v7A10 10 0 0022 12z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 2C4.79 2 3 3.79 3 6v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4H7zm10 2a2 2 0 012 2v2h-2V6h-2V4h2zM7 4h10v2h-2v2h-6V6H7V4zm5 4a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                </a>
                  <a href="#" aria-label="Twitter" className="hover:text-white transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.2 9.2 0 01-2.88 1.1 4.52 4.52 0 00-7.69 4.13A12.9 12.9 0 013 2.1a4.5 4.5 0 001.39 6.04 4.49 4.49 0 01-2.05-.57v.06a4.5 4.5 0 003.63 4.41 4.52 4.52 0 01-2.04.08 4.5 4.5 0 004.21 3.13 9.06 9.06 0 01-5.6 1.93A9.22 9.22 0 012 19.54a12.87 12.87 0 006.95 2.03c8.34 0 12.9-6.91 12.9-12.9l-.01-.59A9.18 9.18 0 0023 3z" />
                    </svg>
                  </a>
                </div>
              </div>

        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} ModernJewels. All rights reserved.
        </div>
      </footer>
    </>
  );
}

