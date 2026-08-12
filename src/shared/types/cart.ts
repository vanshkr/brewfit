export type DeliveryMode = 'delivery' | 'pickup';


export interface LocationInfo {
  id: string;
  label: string;
  address: string;
  lat?: number;
  lng?: number;
}