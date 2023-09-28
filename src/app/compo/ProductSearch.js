import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdown, setDropdown] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isAddChecked, setIsAddChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        if (searchQuery.trim() === '') {
          setDropdown([]);
        } else {
          const response = await fetch(`/api/search?query=${searchQuery}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setDropdown(data.products);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchQuery]);

  const handlePurchaseAddStock = (index, operation, action, slug, value, qunti) => {
    const updatedDropdown = [...dropdown];
    const inputValueAsNumber = parseInt(inputValue, 10);

    if (isNaN(inputValueAsNumber)) {
      return;
    }

    if (operation === 'purchase') {
      if (inputValueAsNumber > updatedDropdown[index].quntity) {
        toast.error('Not enough products in stock for purchase.');
        return;
      }

      updatedDropdown[index].quntity -= inputValueAsNumber;

      if (updatedDropdown[index].quntity === 0) {
        toast.error('Product is now out of stock.');
      }else {
        toast.success(`Purchased ${inputValueAsNumber} product(s) successfully.`);
      }
    } else if (operation === 'addStock') {
      const confirmAddStock = window.confirm(`Are you sure you want to add ${inputValueAsNumber} stock?`);
      if (confirmAddStock) {
        updatedDropdown[index].quntity += inputValueAsNumber;
      } else {
        return; // Don't add stock if user cancels the confirmation
      }
    }

    setDropdown(updatedDropdown);
    setInputValue('');

    // Make an API request to update the server
    fetch('/api/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, slug, value, qunti }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Handle success, if needed
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        toast.error('Error updating data. Please try again later.');
        // Revert the local update in case of an error
        setDropdown([...dropdown]);
      });
  };

  const toggleAddStockCheckbox = () => {
    setIsAddChecked(!isAddChecked);
  };

  const filterItems = (item) => {
    const searchTerm = searchQuery.toLowerCase();
    const categoryMatches =
      selectedCategory === 'All' || item.slug.toLowerCase().includes(selectedCategory.toLowerCase());
    const searchMatches =
      item.slug.toLowerCase().includes(searchTerm) || item.price.toString().includes(searchTerm);

    return categoryMatches && searchMatches;
  };

  return (
    <>
      <div className="flex">
        <select
          className="border rounded-l px-2 py-1"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Category1">Fertilizer</option>
          <option value="Category2">Fertilizer 2</option>
        </select>

        <input
          type="text"
          className="border rounded-r px-2 py-1 flex-grow"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent">
          {/* Your loading spinner SVG */}
          <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="32" stroke-width="8" stroke="#695b50" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
  <animateTransform attributeName="transform" type="rotate" dur="0.6711409395973155s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
</circle>
<circle cx="50" cy="50" r="23" stroke-width="8" stroke="#9e8978" stroke-dasharray="36.12831551628262 36.12831551628262" stroke-dashoffset="36.12831551628262" fill="none" stroke-linecap="round">
  <animateTransform attributeName="transform" type="rotate" dur="0.6711409395973155s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
</circle>
</svg>
        </div>
      )}

      {searchQuery.trim() !== '' && (
        <div>
          {dropdown.filter(filterItems).map((item, index) => (
            <div key={item._id} className="border p-4 mt-4 flex items-center">
              <div className="flex-grow">
                <div className="mb-2 text-xl font-semibold">{item.slug}</div>
                <div className="text-gray-600">Price: ₹{item.price}</div>
                <div>
                  <h1 className="text-lg">
                    Quantity: <span className={item.quntity <= 0 ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>{item.quntity <= 0 ? '( Out Of Stock! )' : item.quntity}</span>
                  </h1>
                </div>
              </div>

              <div className="mr-40">
                <img src={item.photo} alt={item.slug} className="h-30 w-30 mx-auto" />
              </div>

              <div className="block">
                <div className="items-center">
                  <div className="mr-4"></div>
                  <div>
                    <label htmlFor={`purchase-stock-${index}`} className="block mb-1 text-bold">
                      Purchase/Add Stock:
                    </label>
                    <input
                      id={`purchase-stock-${index}`}
                      type="number"
                      value={inputValue}
                      placeholder='QTY'
                      onChange={(e) => setInputValue(e.target.value)}
                      className="border rounded px-2 py-1 w-16 text-center"
                    />
                    {isAddChecked ? (
                      <button
                        className="mt-2 ml-2 px-2 py-1 border rounded bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                        onClick={() => handlePurchaseAddStock(index, 'addStock', 'add', item.slug, inputValue, item.quntity)}
                      >
                        Add Stock
                      </button>
                    ) : (
                      <button
                        className="mt-2 ml-2 px-2 py-1 border rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                        onClick={() => handlePurchaseAddStock(index, 'purchase', 'sub', item.slug, inputValue, item.quntity)}
                      >
                        Purchase-
                      </button>
                    )}
                  </div>

                  <div className="border p-4 mt-4 bg-gray-100">
                    <label>
                      <input
                        type="checkbox"
                        checked={isAddChecked}
                        onChange={toggleAddStockCheckbox}
                      />
                      Add New Stock?
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchBar;
