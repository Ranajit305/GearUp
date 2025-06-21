import React from 'react'
import { Eye } from 'lucide-react';

const ProductCard = ({ product, onView }) => {
    const getTypeColor = (type) => {
      const colors = {
        'Shirts': 'bg-blue-100 text-blue-800',
        'Pants': 'bg-green-100 text-green-800',
        'Shoes': 'bg-purple-100 text-purple-800',
        'Sports': 'bg-orange-100 text-orange-800',
        'Gears': 'bg-red-100 text-red-800',
        'Suits': 'bg-indigo-100 text-indigo-800'
      };
      return colors[type] || 'bg-gray-100 text-gray-800';
    };
  
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(product.type)}`}>
              {product.type}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          <button
            onClick={() => onView(product)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    );
  };

export default ProductCard