export type OrderTrackingStatus =
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'on_the_way'
  | 'arriving'
  | 'delivered';

export interface TrackingStep {
  id: string;
  status: OrderTrackingStatus;
  label: string;
  description: string;
  timestamp: string | null;
  isCompleted: boolean;
  isActive: boolean;
}

export interface RiderInfo {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  totalDeliveries: number;
  vehicleType: 'bike' | 'scooter' | 'bicycle';
  vehicleNumber: string;
}

export interface RiderLocation {
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  updatedAt: string;
}

export interface OrderTrackingData {
  orderId: string;
  orderNumber: string;
  status: OrderTrackingStatus;
  estimatedDeliveryTime: string;
  estimatedMinutes: number;
  placedAt: string;
  steps: TrackingStep[];
  rider: RiderInfo | null;
  riderLocation: RiderLocation | null;
  storeLocation: {
    latitude: number;
    longitude: number;
    name: string;
    address: string;
  };
  deliveryLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  items: TrackingOrderItem[];
  canCancel: boolean;
  supportPhone: string;
}

export interface TrackingOrderItem {
  id: string;
  name: string;
  quantity: number;
  size: string;
}

export interface TrackingEvent {
  type: 'status_update' | 'rider_location' | 'eta_update' | 'rider_assigned';
  payload: unknown;
  timestamp: string;
}
