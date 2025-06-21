import { useState, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Plus, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct, productsLoading } = useProductStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    image: "",
    additionalImages: [],
  });

  const [previewImage, setPreviewImage] = useState("");
  const [additionalPreviews, setAdditionalPreviews] = useState([]);
  const fileInputRef = useRef(null);
  const additionalFileInputRef = useRef(null);

  const productTypes = ["Shirts", "Pants", "Shoes", "Sports", "Gears"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAdditionalImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = [];
    const newImages = [];

    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        newImages.push(reader.result);

        if (newPreviews.length === files.length) {
          setAdditionalPreviews((prev) => [...prev, ...newPreviews]);
          setFormData((prev) => ({
            ...prev,
            additionalImages: [...prev.additionalImages, ...newImages],
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAdditionalImage = (index) => {
    setAdditionalPreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(formData.name, formData.type, formData.description, formData.image, formData.additionalImages);
    navigate("/");
    setFormData({
      name: "",
      type: "",
      description: "",
      image: "",
      additionalImages: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 pt-25 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="flex items-center gap-2">
              <Link to="/">
                <ArrowLeft className="text-white size-7" />
              </Link>
              <h2 className="text-2xl font-bold text-white">Add New Product</h2>
            </div>
            <p className="mt-1 text-indigo-100">
              Fill in the details below to add a new product
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            {/* Product Name */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Product Type */}
            <div className="mb-6">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                required
              >
                <option value="">Select a type</option>
                {productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter product description"
                required
              />
            </div>

            {/* Main Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="main-image"
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 ${
                    previewImage ? "border-transparent" : "border-gray-300"
                  } border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200`}
                >
                  {previewImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewImage("");
                          setFormData((prev) => ({ ...prev, image: "" }));
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors duration-200"
                      >
                        <X className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-10 w-10 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG (Max 5MB)
                      </p>
                    </div>
                  )}
                  <input
                    id="main-image"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleMainImageChange}
                    className="hidden"
                    accept="image/*"
                    required={!previewImage}
                  />
                </label>
              </div>
            </div>

            {/* Additional Images */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images
              </label>
              <p className="text-sm text-gray-500 mb-4">
                Upload up to 4 additional product images
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {additionalPreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative h-32 bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img
                      src={preview}
                      alt={`Additional preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors duration-200"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                ))}

                {additionalPreviews.length < 4 && (
                  <div
                    className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => additionalFileInputRef.current.click()}
                  >
                    <Plus className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Add more</p>
                    <input
                      type="file"
                      ref={additionalFileInputRef}
                      onChange={handleAdditionalImagesChange}
                      className="hidden"
                      accept="image/*"
                      multiple
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
              >
                {productsLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding Product...
                    </div>
                  ) : (
                    "Add Product"
                  )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
