import { memo, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { cn } from '../utils/cn';
import { useCartStore } from '@/features/cart/store';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  activeIcon: string;
  route: string;
  badge?: number;
}

export const BottomNav = memo(function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemCount = useCartStore((s) => s.items.length);

  const navItems: NavItem[] = useMemo(
    () => [
      {
        id: 'home',
        label: 'Home',
        icon: '🏠',
        activeIcon: '🏡',
        route: '/home',
      },
      {
        id: 'orders',
        label: 'Orders',
        icon: '📋',
        activeIcon: '📝',
        route: '/orders',
      },
      {
        id: 'cart',
        label: 'Cart',
        icon: '🛒',
        activeIcon: '🛒',
        route: '/cart',
        badge: cartItemCount,
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: '👤',
        activeIcon: '👤',
        route: '/profile',
      },
    ],
    [cartItemCount]
  );

  // Hide on certain routes
  const hiddenRoutes = ['/login', '/otp', '/onboarding', '/splash', '/checkout', '/payment', '/cart'];
  const shouldHide = hiddenRoutes.some((r) => location.pathname.startsWith(r));

  if (shouldHide) return null;

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 w-full',
        'bg-white/90 backdrop-blur-md',
        'border-t border-gray-200',
        'px-6 pb-[env(safe-area-inset-bottom,8px)] pt-2',
        'z-40'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = location.pathname === item.route ||
            (item.route === '/home' && location.pathname === '/');

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className={cn(
                'flex flex-col items-center gap-0.5 py-1 px-4',
                'rounded-xl transition-all duration-200',
                'active:scale-90',
                isActive ? 'text-emerald-600' : 'text-gray-400'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <span className="text-xl">
                  {isActive ? item.activeIcon : item.icon}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={cn(
                      'absolute -top-1.5 -right-2.5',
                      'min-w-[18px] h-[18px] px-1',
                      'flex items-center justify-center',
                      'bg-emerald-600 text-white text-[10px] font-bold',
                      'rounded-full'
                    )}
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium',
                  isActive ? 'text-emerald-600' : 'text-gray-400'
                )}
              >
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
});
