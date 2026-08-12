import { memo } from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import type { UserProfile } from '../types';

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditPhoto?: () => void;
}

export const ProfileHeader = memo(function ProfileHeader({
  profile,
  onEditPhoto,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center pt-6 pb-4">
      <ProfileAvatar
        name={profile.name}
        avatar={profile.avatar}
        size="xl"
        editable
        onEdit={onEditPhoto}
      />

      <h1 className="mt-4 text-xl font-bold text-gray-900">{profile.name}</h1>
      <p className="text-sm text-gray-500 mt-0.5">{profile.email}</p>
      <p className="text-sm text-gray-500">{profile.phone}</p>

      {/* Member badge */}
      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full">
        <span className="text-xs">⭐</span>
        <span className="text-xs font-semibold text-emerald-700">
          {profile.stats.rewardsPoints.toLocaleString()} Points
        </span>
        <span className="text-xs text-emerald-600">• Member since {profile.stats.memberSince}</span>
      </div>
    </div>
  );
});
