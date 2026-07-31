import React from 'react';
import Badge from '../common/Badge';

const OrderStatusBadge = ({ status }) => {
  const statusMap = {
    Pending: 'warning',
    Confirmed: 'info',
    Packed: 'info',
    Shipped: 'primary',
    Delivered: 'success',
    Cancelled: 'danger',
    Refunded: 'secondary',
  };

  return <Badge variant={statusMap[status] || 'secondary'}>{status}</Badge>;
};

export default OrderStatusBadge;
