import { memo } from 'react';

interface DeliveryAddressCardProps {
  storeAddress: string;
  storeName: string;
  deliveryAddress: string;
}

export const DeliveryAddressCard = memo(function DeliveryAddressCard({
  storeAddress,
  storeName,
  deliveryAddress,
}: DeliveryAddressCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      {/* From */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-green-200" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            From
          </p>
          <p className="text-sm font-semibold text-gray-900 truncate">
            {storeName}
          </p>
          <p className="text-xs text-gray-500 truncate">{storeAddress}</p>
        </div>
      </div>

      {/* Connector */}
      <div className="ml-[5px] my-1 h-4 w-0.5 bg-gray-200 border-l border-dashed border-gray-300" />

      {/* To */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-blue-200" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Delivering to
          </p>
          <p className="text-sm font-semibold text-gray-900 truncate">
            {deliveryAddress}
          </p>
        </div>
      </div>
    </div>
  );
});
