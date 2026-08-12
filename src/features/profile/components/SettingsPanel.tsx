import { memo, useCallback } from 'react';
import { cn } from '../../../shared/utils/cn';
import { useProfileStore } from '../store/useProfileStore';
import { useUpdatePreferences } from '../hooks/useProfileQuery';
import type { DietaryPreference } from '../types';

export const SettingsPanel = memo(function SettingsPanel() {
  const profile = useProfileStore((s) => s.profile);
  const updatePrefsMutation = useUpdatePreferences();

  const toggleNotification = useCallback(
    (key: 'notifications' | 'emailUpdates' | 'smsAlerts') => {
      if (!profile) return;
      updatePrefsMutation.mutate({ [key]: !profile.preferences[key] });
    },
    [profile, updatePrefsMutation]
  );

  const toggleDietary = useCallback(
    (pref: DietaryPreference) => {
      if (!profile) return;
      const current = profile.preferences.dietaryPreferences;
      const updated = current.includes(pref)
        ? current.filter((p) => p !== pref)
        : [...current, pref];
      updatePrefsMutation.mutate({ dietaryPreferences: updated });
    },
    [profile, updatePrefsMutation]
  );

  if (!profile) return null;

  const { preferences } = profile;

  const dietaryOptions: { value: DietaryPreference; label: string; emoji: string }[] = [
    { value: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
    { value: 'vegan', label: 'Vegan', emoji: '🌱' },
    { value: 'gluten-free', label: 'Gluten Free', emoji: '🌾' },
    { value: 'dairy-free', label: 'Dairy Free', emoji: '🥛' },
    { value: 'high-protein', label: 'High Protein', emoji: '💪' },
    { value: 'low-calorie', label: 'Low Calorie', emoji: '🔥' },
    { value: 'sugar-free', label: 'Sugar Free', emoji: '🚫' },
    { value: 'nut-free', label: 'Nut Free', emoji: '🥜' },
  ];

  return (
    <div className="px-4 space-y-6">
      {/* Notifications */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Notifications</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          <ToggleRow
            label="Push Notifications"
            description="Order updates & promotions"
            enabled={preferences.notifications}
            onToggle={() => toggleNotification('notifications')}
          />
          <ToggleRow
            label="Email Updates"
            description="Weekly offers & new items"
            enabled={preferences.emailUpdates}
            onToggle={() => toggleNotification('emailUpdates')}
          />
          <ToggleRow
            label="SMS Alerts"
            description="Delivery status via SMS"
            enabled={preferences.smsAlerts}
            onToggle={() => toggleNotification('smsAlerts')}
          />
        </div>
      </section>

      {/* Dietary Preferences */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Dietary Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((option) => {
            const isActive = preferences.dietaryPreferences.includes(option.value);
            return (
              <button
                key={option.value}
                onClick={() => toggleDietary(option.value)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium',
                  'border transition-all duration-150 active:scale-95',
                  isActive
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                )}
                aria-pressed={isActive}
              >
                <span>{option.emoji}</span>
                {option.label}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
});

// Toggle Row sub-component
const ToggleRow = memo(function ToggleRow({
  label,
  description,
  enabled,
  onToggle,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        aria-label={`${label} ${enabled ? 'enabled' : 'disabled'}`}
        onClick={onToggle}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors duration-200',
          enabled ? 'bg-emerald-500' : 'bg-gray-300'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow',
            'transition-transform duration-200',
            enabled ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
});
