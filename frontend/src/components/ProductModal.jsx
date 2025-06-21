import React, { useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Tag,
  FileText,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import { useProductStore } from "../stores/useProductStore";

const ProductModal = ({ product, isOpen, onClose }) => {
  const { user } = useAuthStore();
  const { enquireProduct, productsLoading } = useProductStore();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    } else {
      setEmail("");
    }
  }, [user]);

  if (!isOpen || !product) return null;

  const allImages = [product.image, ...product.additionalImages];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const getTypeColor = (type) => {
    const colors = {
      Shirts: "bg-blue-100 text-blue-800",
      Pants: "bg-green-100 text-green-800",
      Shoes: "bg-purple-100 text-purple-800",
      Sports: "bg-orange-100 text-orange-800",
      Gears: "bg-red-100 text-red-800",
      Suits: "bg-indigo-100 text-indigo-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={allImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {allImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-indigo-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Type Badge */}
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-gray-500" />
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                    product.type
                  )}`}
                >
                  {product.type}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Description
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Author Information */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Author
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">
                    {product.author.name}
                  </p>
                </div>
              </div>

              {/* Enquire */}
              <div
                className={`${
                  product?.author?._id === user?._id && "hidden"
                } flex items-center gap-2 mt-4`}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${
                    user && "hidden"
                  } flex-1 px-4 py-2 border border-gray-300 outline-indigo-500 rounded-lg transition-colors duration-200`}
                />
                <button
                  type="button"
                  onClick={() => enquireProduct(email, product._id)}
                  disabled={!email}
                  className={`${
                    !email
                      ? "bg-indigo-300"
                      : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                  } px-4 py-2 text-white font-medium rounded-lg shadow-md transition-colors duration-200 whitespace-nowrap`}
                >
                  {productsLoading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enquiring...
                    </div>
                  ) : (
                    "Enquire"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
