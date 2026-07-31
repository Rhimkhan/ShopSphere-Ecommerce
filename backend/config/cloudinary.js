const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || '1234567890',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'secret',
});

const uploadImageToCloudinary = async (fileBuffer, mimeType = 'image/jpeg') => {
  try {
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name') {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'shopsphere_products' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        uploadStream.end(fileBuffer);
      });
    } else {
      // Fallback: Convert buffer to base64 Data URI
      const base64 = fileBuffer.toString('base64');
      return `data:${mimeType};base64,${base64}`;
    }
  } catch (error) {
    console.error('Image Upload Error:', error);
    // Return placeholder data URL fallback
    return `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80`;
  }
};

module.exports = { cloudinary, uploadImageToCloudinary };
