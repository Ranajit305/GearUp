import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Shirts', 'Pants', 'Shoes', 'Sports'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    additionalImages: {
        type: [String],
        default: []
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product