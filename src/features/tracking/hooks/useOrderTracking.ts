import { useEffect, useRef, useCallback } from 'react';
import { useTrackingStore } from '../store/useTrackingStore';
import {
  MOCK_TRACKING_DATA,
  TRACKING_STATUS_SEQUENCE,
  RIDER_WAYPOINTS,
} from '../data/mock-tracking';
import type { OrderTrackingStatus, RiderLocation } from '../types';

interface UseOrderTrackingOptions {
  orderId: string;
  simulateUpdates?: boolean;
}

/**
 * Hook that manages real-time order tracking.
 * In production, this connects to a WebSocket server.
 * For now, it simulates live updates for demo purposes.
 */
export function useOrderTracking({
  orderId,
  simulateUpdates = true,
}: UseOrderTrackingOptions) {
  const {
    activeOrder,
    isLoading,
    error,
    isConnected,
    setActiveOrder,
    updateStatus,
    updateRiderLocation,
    updateETA,
    setLoading,
    setConnected,
    setError,
    clearTracking,
  } = useTrackingStore();

  const statusIndexRef = useRef(4); // Start at 'on_the_way'
  const waypointIndexRef = useRef(4);
  const statusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const locationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize tracking data
  const initializeTracking = useCallback(() => {
    setLoading(true);

    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setActiveOrder({ ...MOCK_TRACKING_DATA, orderId });
      setConnected(true);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [orderId, setActiveOrder, setConnected, setLoading]);

  // Simulate status progression
  const startStatusSimulation = useCallback(() => {
    if (!simulateUpdates) return;

    statusIntervalRef.current = setInterval(() => {
      const nextIndex = statusIndexRef.current + 1;

      if (nextIndex >= TRACKING_STATUS_SEQUENCE.length) {
        // Order delivered — stop all simulations
        if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
        if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
        updateStatus('delivered');
        updateETA(0);
        return;
      }

      statusIndexRef.current = nextIndex;
      const nextStatus: OrderTrackingStatus = TRACKING_STATUS_SEQUENCE[nextIndex];
      updateStatus(nextStatus);

      // Update ETA based on remaining steps
      const remainingSteps = TRACKING_STATUS_SEQUENCE.length - 1 - nextIndex;
      updateETA(remainingSteps * 4);
    }, 15000); // Status changes every 15 seconds for demo
  }, [simulateUpdates, updateStatus, updateETA]);

  // Simulate rider movement
  const startLocationSimulation = useCallback(() => {
    if (!simulateUpdates) return;

    locationIntervalRef.current = setInterval(() => {
      const nextWaypoint = waypointIndexRef.current + 1;

      if (nextWaypoint >= RIDER_WAYPOINTS.length) {
        if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
        return;
      }

      waypointIndexRef.current = nextWaypoint;
      const point = RIDER_WAYPOINTS[nextWaypoint];

      const prevPoint = RIDER_WAYPOINTS[nextWaypoint - 1];
      const heading =
        Math.atan2(
          point.longitude - prevPoint.longitude,
          point.latitude - prevPoint.latitude
        ) *
        (180 / Math.PI);

      const location: RiderLocation = {
        latitude: point.latitude,
        longitude: point.longitude,
        heading: heading >= 0 ? heading : heading + 360,
        speed: 20 + Math.random() * 15,
        updatedAt: new Date().toISOString(),
      };

      updateRiderLocation(location);
    }, 3000); // Location updates every 3 seconds
  }, [simulateUpdates, updateRiderLocation]);

  // Connect and start tracking
  useEffect(() => {
    const cleanup = initializeTracking();

    return () => {
      cleanup();
      clearTracking();
    };
  }, [initializeTracking, clearTracking]);

  // Start simulations after data loads
  useEffect(() => {
    if (!activeOrder || !isConnected) return;

    startStatusSimulation();
    startLocationSimulation();

    return () => {
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
      if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
    };
  }, [isConnected, activeOrder?.orderId, startStatusSimulation, startLocationSimulation]);

  // Cancel order
  const cancelOrder = useCallback(() => {
    if (!activeOrder?.canCancel) return;
    setError('Order cancellation requested. Refund will be processed in 24 hours.');
    clearTracking();
  }, [activeOrder, setError, clearTracking]);

  // Contact support
  const contactSupport = useCallback(() => {
    if (activeOrder?.supportPhone) {
      window.open(`tel:${activeOrder.supportPhone}`, '_self');
    }
  }, [activeOrder]);

  // Call rider
  const callRider = useCallback(() => {
    if (activeOrder?.rider?.phone) {
      window.open(`tel:${activeOrder.rider.phone}`, '_self');
    }
  }, [activeOrder]);

  return {
    order: activeOrder,
    isLoading,
    error,
    isConnected,
    cancelOrder,
    contactSupport,
    callRider,
  };
}
