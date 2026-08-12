import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, Outlet } from 'react-router';
import { FloatingCartButton } from '@/shared/components/FloatingCartButton';
import { useAuthStore } from '@/features/auth/store';
import { BottomNav } from '@/shared/components/BottomNav';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';

// ─── Route-level Code Splitting ──────────────────────────────────────────────
// Auth
const SplashScreen = lazy(() => import('@/features/auth/screens/SplashScreen').then(m => ({ default: m.SplashScreen })));
const OnboardingScreen = lazy(() => import('@/features/auth/screens/OnboardingScreen').then(m => ({ default: m.OnboardingScreen })));
const LoginScreen = lazy(() => import('@/features/auth/screens/LoginScreen').then(m => ({ default: m.LoginScreen })));
const OtpScreen = lazy(() => import('@/features/auth/screens/OtpVerifyScreen').then(m => ({ default: m.OtpVerifyScreen })));

// Catalog & Home
const HomeScreen = lazy(() => import('@/features/home/screens/HomeScreen').then(m => ({ default: m.HomeScreen })));
const CategoryListingScreen = lazy(() => import('@/features/catalog/screens/CategoryListingScreen').then(m => ({ default: m.CategoryListingScreen })));
const ProductDetailScreen = lazy(() => import('@/features/catalog/screens/ProductDetailScreen').then(m => ({ default: m.ProductDetailScreen })));

// Cart & Checkout
const CartScreen = lazy(() => import('@/features/cart/screens/CartScreen').then(m => ({ default: m.CartScreen })));
const CheckoutScreen = lazy(() => import('@/features/checkout/screens/CheckoutScreen').then(m => ({ default: m.CheckoutScreen })));
const PaymentScreen = lazy(() => import('@/features/payment/screens/PaymentScreen').then(m => ({ default: m.PaymentScreen })));
const OrderSuccessScreen = lazy(() => import('@/features/orders/screens/OrderSuccessScreen').then(m => ({ default: m.OrderSuccessScreen })));
const OrderTrackingScreen = lazy(() => import('@/features/tracking/screens/OrderTrackingScreen').then(m => ({ default: m.OrderTrackingScreen })));

// Profile & Orders (NEW FROM MODULE 5A)
const ProfileScreen = lazy(() => import('@/features/profile/screens/ProfileScreen').then(m => ({ default: m.ProfileScreen })));
const OrderHistoryScreen = lazy(() => import('@/features/profile/screens/OrderHistoryScreen').then(m => ({ default: m.OrderHistoryScreen })));

const LocationScreen = lazy(() => import('@/features/location/screens/LocationScreen').then(m => ({ default: m.LocationScreen })));

// ─── Fallbacks & Layouts ─────────────────────────────────────────────────────
function RouteLoader() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<RouteLoader />}>{children}</Suspense>;
}

// Redirect Component safely reading store inside context
function RootRedirect() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return <Navigate to={isAuthenticated ? "/home" : "/splash"} replace />;
}

// Layout wrapper for app routes
function MainLayout() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Outlet />
      <FloatingCartButton />
      <BottomNav />
    </Suspense>
  );
}
// Layout wrapper for transaction screens

function CleanLayout() {
  return(
    <Suspense fallback={<RouteLoader/>}>
      <Outlet/>
    </Suspense>
  )
}

// ─── Router Configuration ────────────────────────────────────────────────────
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  // Auth routes (Full-screen, no floating cart)
  {
    path: '/splash',
    element: (
      <SuspenseWrapper>
        <SplashScreen />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/onboarding',
    element: (
      <SuspenseWrapper>
        <OnboardingScreen />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/login',
    element: (
      <SuspenseWrapper>
        <LoginScreen />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/otp',
    element: (
      <SuspenseWrapper>
        <OtpScreen />
      </SuspenseWrapper>
    ),
  },

  // Main App routes (Inside MainLayout with Floating Cart)
  {
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        element: <HomeScreen />,
      },
      {
        path: '/category/:categoryId',
        element: <CategoryListingScreen />,
      },
      {
        path: '/product/:productId',
        element: <ProductDetailScreen />,
      },
      {
        path: '/cart',
        element: <CartScreen />,
      },
      { path: '/location', element: <LocationScreen /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <CleanLayout />,
        children:[
          {
            path: '/checkout',
            element: <CheckoutScreen />,
          },
          {
            path: '/payment',
            element: <PaymentScreen />,
          },
          {
            path: '/order-success',
            element: <OrderSuccessScreen />,
          },
          {
            path: '/track/:orderId',
            element: <OrderTrackingScreen />,
          },
        ]
      },
      {
        element: <MainLayout />,
        children:[
        // Added Profile & Orders routes
          {
            path: '/profile',
            element: <ProfileScreen />,
          },
          {
            path: '/orders',
            element: <OrderHistoryScreen />,
          },
        ]
      }

    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}