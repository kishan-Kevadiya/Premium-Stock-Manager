'use client'
import React, { useEffect, useState } from 'react';
import Header from './Header2';

function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/product');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let rjson = await response.json();
        setProducts(rjson.products);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white">
        <Header />
      </div>
      <div className="ml-20 mr-20 mt-10 mb-10">
        <h1 className="text-2xl font-semibold mb-2">Display Current Stock</h1>
        {loading ? (
          // Display the loader in the center of the screen
          <div className="flex justify-center mt-24 h-screen ">
          <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<g transform="rotate(0 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(30 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(60 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(90 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(120 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(150 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(180 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(210 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(240 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(270 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(300 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(330 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
  </rect>
</g>
</svg>
          </div>
        ) : (
          // Display the table once data is loaded
          <div className="bg-white p-4 shadow-md rounded-lg overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="border-b border-gray-300 py-2 text-left">Product Name</th>
                  <th className="border-b border-gray-300 py-2 text-left">Product Quantity</th>
                  <th className="border-b border-gray-300 py-2 text-left">Price</th>
                  <th className="border-b border-gray-300 py-2 text-left">Demo</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr className="justify-between items-center" key={index}>
                    <td className="border-b border-gray-300 py-2">{product.slug}</td>
                    <td className="border-b border-gray-300 py-2">
                      {product.quntity <= 0 ? (
                        <h3 className="text-red-700 font-bold-number">(Out of Stock)</h3>
                      ) : (
                        <span className="text-green-700 font-bold-number">{product.quntity}</span>
                      )}
                    </td>
                    <td className="border-b border-gray-300 py-2 w-40 md:w-60">₹ {product.price}</td>
                    <td className="m-0 p-0 py-2 border-b border-t border-gray-300">
                      <img
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
                        src={product.photo}
                        alt=""
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default DisplayProducts;
