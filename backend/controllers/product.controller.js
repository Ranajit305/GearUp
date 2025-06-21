import Product from "../models/product.model.js"
import cloudinary from "../utils/cloudinary.js";
import validator from 'validator'
import nodemailer from 'nodemailer'

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({}).populate({path: 'author', select: 'name'});
        res.status(200).json({success: true, products});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const addProduct = async (req, res) => {
    try {
        const user = req.user;
        const { name, type, description, image, additionalImages = [] } = req.body;

        if (!name || !type || !description) {
          return res.status(400).json({success: false, message: 'Fields Missing'});
        }

        if (!image) {
            return res.status(400).json({ success: false, message: 'Cover image is missing' });
        }
        if (additionalImages.length > 4) {
          return res.status(400).json({ success: false, message: 'You can upload a maximum of 4 additional images.' });
        }

        const coverUpload = await cloudinary.uploader.upload(image, { folder: 'products' });
        const additionalImageUploads = await Promise.all(
            additionalImages.map((img) =>
            cloudinary.uploader.upload(img, { folder: 'products' })
        )
        );
        const additionalImageUrls = additionalImageUploads.map((res) => res.secure_url);

        const newProduct = new Product({
            name,
            type,
            description,
            image: coverUpload.secure_url,
            additionalImages: additionalImageUrls,
            author: user._id
        });
        await newProduct.save();
        const product = await Product.findById(newProduct._id).populate({path: 'author', select: 'name'});
        res.status(200).json({ success: true, product, message: 'New Product Created' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const enquireProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid Email'});
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"GearUp" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: `Enquiry About "${product.name}"`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <h2 style="color: #4f46e5; font-size: 24px; margin-bottom: 16px;">🎉 Thank You for Your Enquiry!</h2>

        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            We're thrilled you're interested in our product! Below are the details you requested:
        </p>

        <div style="background: #f9fafb; padding: 20px; border-left: 4px solid #6366f1; border-radius: 8px; margin: 24px 0;">
            <h3 style="margin-top: 0; color: #111827; font-size: 20px;">🛍️ ${product.name}</h3>
            <p style="margin: 8px 0; font-size: 15px;"><strong>Category:</strong> ${product.type}</p>
            <p style="margin: 8px 0; font-size: 15px;"><strong>Description:</strong> ${product.description}</p>
        </div>

        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Our team will get in touch with you shortly. If you have any questions, feel free to reply to this message.
        </p>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">

        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            📩 This is an automated message from <strong>Dresser</strong>. Please do not reply directly.
        </p>
        </div>
      `,
    };

    // 5. Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Enquiry email sent successfully' });
    // res.json({email, product});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};