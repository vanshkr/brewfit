import { memo, useMemo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { cn } from '../../../shared/utils/cn';
import { useProfileQuery } from '../hooks/useProfileQuery';
import { useProfileStore } from '../store/useProfileStore';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileStats } from '../components/ProfileStats';
import { ProfileMenu } from '../components/ProfileMenu';
import { EditProfileModal } from '../components/EditProfileModal';
import { SettingsPanel } from '../components/SettingsPanel';
import { SkeletonProfile } from '../components/SkeletonProfile';
import type { ProfileMenuItem } from '../types';

type ProfileTab = 'overview' | 'settings';

export const ProfileScreen = memo(function ProfileScreen() {
  const { data: profile, isLoading, isError } = useProfileQuery();
  const setEditing = useProfileStore((s) => s.setEditing);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');

  const handleLogout = useCallback(() => {
    // Clear all persisted state
    localStorage.removeItem('brewfit-auth');
    localStorage.removeItem('brewfit-profile');
    localStorage.removeItem('brewfit-cart');
    navigate('/login');
  }, [navigate]);

  const menuItems: ProfileMenuItem[] = useMemo(
    () => [
      {
        id: 'orders',
        icon: '📋',
        label: 'Order History',
        description: 'View past orders & reorder',
        route: '/orders',
        badge: profile?.stats.totalOrders.toString(),
      },
      {
        id: 'addresses',
        icon: '📍',
        label: 'Saved Addresses',
        description: 'Manage delivery addresses',
        route: '/addresses',
      },
      {
        id: 'payments',
        icon: '💳',
        label: 'Payment Methods',
        description: 'Cards, UPI & wallets',
        route: '/payments',
      },
      {
        id: 'dietary',
        icon: '🥗',
        label: 'Dietary Preferences',
        description: 'Customize your menu',
        route: '/preferences',
      },
      {
        id: 'help',
        icon: '💬',
        label: 'Help & Support',
        description: 'FAQs, chat, report issues',
        route: '/help',
      },
      {
        id: 'about',
        icon: 'ℹ️',
        label: 'About BrewFit',
        description: 'Version 1.0.0',
        route: '/about',
      },
      {
        id: 'logout',
        icon: '🚪',
        label: 'Logout',
        description: 'Sign out of your account',
        action: handleLogout,
        chevron: false,
      },
    ],
    [profile, handleLogout]
  );

  if (isLoading) return <SkeletonProfile />;

  if (isError || !profile) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-4">
        <span className="text-4xl mb-4">😕</span>
        <p className="text-gray-600 text-center">Failed to load profile. Please try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 overflow-y-auto flex-1 h-full w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
          <button
            onClick={() => setEditing(true)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium',
              'bg-emerald-50 text-emerald-700',
              'hover:bg-emerald-100 active:scale-95',
              'transition-all duration-150'
            )}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Profile header */}
      <ProfileHeader profile={profile} onEditPhoto={() => setEditing(true)} />

      {/* Stats */}
      <ProfileStats stats={profile.stats} />

      {/* Tab switcher */}
      <div className="flex gap-1 mx-4 mt-6 mb-4 p-1 bg-gray-100 rounded-xl">
        {(['overview', 'settings'] as ProfileTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab === 'overview' ? 'Overview' : 'Settings'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'overview' ? (
        <ProfileMenu items={menuItems} />
      ) : (
        <SettingsPanel />
      )}

      {/* Edit modal */}
      <EditProfileModal />
    </div>
  );
});
