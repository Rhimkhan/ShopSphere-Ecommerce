const PDFDocument = require('pdfkit');

const generateInvoicePDF = (order, stream) => {
  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(stream);

  // Header
  doc
    .fillColor('#4F46E5')
    .fontSize(26)
    .text('ShopSphere Inc.', 50, 45)
    .fillColor('#6B7280')
    .fontSize(10)
    .text('100 Tech Blvd, Suite 400', 50, 75)
    .text('San Francisco, CA 94107', 50, 90)
    .text('support@shopsphere.com | www.shopsphere.com', 50, 105);

  doc
    .fillColor('#111827')
    .fontSize(20)
    .text('INVOICE', 400, 45, { align: 'right' })
    .fillColor('#6B7280')
    .fontSize(10)
    .text(`Invoice #: ${order._id.toString().slice(-8).toUpperCase()}`, 400, 75, { align: 'right' })
    .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 400, 90, { align: 'right' })
    .text(`Payment: ${order.paymentMethod.toUpperCase()}`, 400, 105, { align: 'right' });

  doc.moveTo(50, 130).lineTo(550, 130).strokeColor('#E5E7EB').stroke();

  // Customer details
  doc
    .fillColor('#111827')
    .fontSize(12)
    .text('Billed To:', 50, 145)
    .fontSize(10)
    .fillColor('#4B5563')
    .text(order.shippingAddress?.fullName || 'Customer', 50, 162)
    .text(order.shippingAddress?.streetAddress || '', 50, 177)
    .text(`${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} ${order.shippingAddress?.postalCode || ''}`, 50, 192)
    .text(`Phone: ${order.shippingAddress?.phone || 'N/A'}`, 50, 207);

  // Table Headers
  const tableTop = 240;
  doc
    .fillColor('#111827')
    .fontSize(10)
    .text('Item Description', 50, tableTop)
    .text('Qty', 300, tableTop, { width: 50, align: 'center' })
    .text('Price', 360, tableTop, { width: 80, align: 'right' })
    .text('Total', 450, tableTop, { width: 100, align: 'right' });

  doc.moveTo(50, tableTop + 18).lineTo(550, tableTop + 18).strokeColor('#D1D5DB').stroke();

  let position = tableTop + 30;

  order.products.forEach((item) => {
    const title = item.name || (item.product && item.product.name) || 'Product Item';
    const price = item.price || 0;
    const qty = item.quantity || 1;
    const lineTotal = price * qty;

    doc
      .fillColor('#374151')
      .fontSize(10)
      .text(title, 50, position, { width: 240 })
      .text(qty.toString(), 300, position, { width: 50, align: 'center' })
      .text(`$${price.toFixed(2)}`, 360, position, { width: 80, align: 'right' })
      .text(`$${lineTotal.toFixed(2)}`, 450, position, { width: 100, align: 'right' });

    position += 24;
  });

  doc.moveTo(50, position + 5).lineTo(550, position + 5).strokeColor('#E5E7EB').stroke();

  // Summary Totals
  position += 15;
  doc
    .fillColor('#4B5563')
    .fontSize(10)
    .text('Subtotal:', 350, position, { width: 100, align: 'right' })
    .text(`$${(order.itemsPrice || order.totalPrice).toFixed(2)}`, 460, position, { width: 90, align: 'right' });

  position += 18;
  doc
    .text('Tax (8%):', 350, position, { width: 100, align: 'right' })
    .text(`$${(order.taxPrice || 0).toFixed(2)}`, 460, position, { width: 90, align: 'right' });

  position += 18;
  doc
    .text('Shipping:', 350, position, { width: 100, align: 'right' })
    .text(`$${(order.shippingPrice || 0).toFixed(2)}`, 460, position, { width: 90, align: 'right' });

  if (order.discountPrice > 0) {
    position += 18;
    doc
      .text('Discount:', 350, position, { width: 100, align: 'right' })
      .text(`-$${order.discountPrice.toFixed(2)}`, 460, position, { width: 90, align: 'right' });
  }

  position += 22;
  doc.moveTo(350, position - 5).lineTo(550, position - 5).strokeColor('#4F46E5').stroke();
  doc
    .fillColor('#4F46E5')
    .fontSize(12)
    .text('Grand Total:', 350, position, { width: 100, align: 'right' })
    .text(`$${order.totalPrice.toFixed(2)}`, 460, position, { width: 90, align: 'right' });

  // Footer
  doc
    .fillColor('#9CA3AF')
    .fontSize(9)
    .text('Thank you for shopping with ShopSphere! For inquiries, contact support@shopsphere.com', 50, 700, { align: 'center', width: 500 });

  doc.end();
};

module.exports = generateInvoicePDF;
