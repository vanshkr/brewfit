import type { OrderTrackingData, RiderInfo, TrackingStep } from '../types';

export const MOCK_RIDER: RiderInfo = {
  id: 'rider-001',
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
  rating: 4.8,
  totalDeliveries: 1247,
  vehicleType: 'bike',
  vehicleNumber: 'KA 01 AB 1234',
};

export const generateTrackingSteps = (
  currentStatus: OrderTrackingData['status']
): TrackingStep[] => {
  const statusOrder: OrderTrackingData['status'][] = [
    'confirmed',
    'preparing',
    'ready',
    'picked_up',
    'on_the_way',
    'arriving',
    'delivered',
  ];

  const currentIndex = statusOrder.indexOf(currentStatus);

  const stepMeta: Record<
    OrderTrackingData['status'],
    { label: string; description: string }
  > = {
    confirmed: {
      label: 'Order Confirmed',
      description: 'Your order has been received by the store',
    },
    preparing: {
      label: 'Preparing',
      description: 'Your items are being freshly prepared',
    },
    ready: {
      label: 'Ready for Pickup',
      description: 'Your order is packed and waiting for rider',
    },
    picked_up: {
      label: 'Picked Up',
      description: 'Rider has collected your order',
    },
    on_the_way: {
      label: 'On the Way',
      description: 'Your order is en route to you',
    },
    arriving: {
      label: 'Arriving Soon',
      description: 'Rider is near your location',
    },
    delivered: {
      label: 'Delivered',
      description: 'Enjoy your order! 🎉',
    },
  };

  return statusOrder.map((status, index) => ({
    id: `step-${status}`,
    status,
    label: stepMeta[status].label,
    description: stepMeta[status].description,
    timestamp:
      index <= currentIndex
        ? new Date(Date.now() - (currentIndex - index) * 5 * 60000).toISOString()
        : null,
    isCompleted: index < currentIndex,
    isActive: index === currentIndex,
  }));
};

export const MOCK_TRACKING_DATA: OrderTrackingData = {
  orderId: 'order-12345',
  orderNumber: '#BF-2048',
  status: 'on_the_way',
  estimatedDeliveryTime: new Date(Date.now() + 12 * 60000).toISOString(),
  estimatedMinutes: 12,
  placedAt: new Date(Date.now() - 25 * 60000).toISOString(),
  steps: generateTrackingSteps('on_the_way'),
  rider: MOCK_RIDER,
  riderLocation: {
    latitude: 12.9352,
    longitude: 77.6245,
    heading: 45,
    speed: 25,
    updatedAt: new Date().toISOString(),
  },
  storeLocation: {
    latitude: 12.9279,
    longitude: 77.6271,
    name: 'BrewFit Koramangala',
    address: '4th Block, Koramangala, Bangalore',
  },
  deliveryLocation: {
    latitude: 12.9416,
    longitude: 77.6229,
    address: '123, HSR Layout, Sector 2, Bangalore',
  },
  items: [
    { id: '1', name: 'Protein Cold Brew', quantity: 2, size: 'Large' },
    { id: '2', name: 'Avocado Toast', quantity: 1, size: 'Regular' },
  ],
  canCancel: false,
  supportPhone: '+91 1800 123 4567',
};

// Simulate status progression for demo
export const TRACKING_STATUS_SEQUENCE: OrderTrackingData['status'][] = [
  'confirmed',
  'preparing',
  'ready',
  'picked_up',
  'on_the_way',
  'arriving',
  'delivered',
];

// Rider location waypoints for simulation
export const RIDER_WAYPOINTS: { latitude: number; longitude: number }[] = [
  { latitude: 12.9279, longitude: 77.6271 }, // Store
  { latitude: 12.9295, longitude: 77.6260 },
  { latitude: 12.9315, longitude: 77.6250 },
  { latitude: 12.9335, longitude: 77.6245 },
  { latitude: 12.9352, longitude: 77.6240 },
  { latitude: 12.9370, longitude: 77.6235 },
  { latitude: 12.9390, longitude: 77.6230 },
  { latitude: 12.9405, longitude: 77.6229 },
  { latitude: 12.9416, longitude: 77.6229 }, // Delivery
];
