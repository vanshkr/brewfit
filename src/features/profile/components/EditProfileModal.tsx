import { memo, useState, useCallback, useEffect } from 'react';
import { cn } from '../../../shared/utils/cn';
import { useProfileStore } from '../store/useProfileStore';
import { useUpdateProfile } from '../hooks/useProfileQuery';
import type { EditProfileForm } from '../types';

export const EditProfileModal = memo(function EditProfileModal() {
  const profile = useProfileStore((s) => s.profile);
  const isEditing = useProfileStore((s) => s.isEditing);
  const setEditing = useProfileStore((s) => s.setEditing);
  const updateMutation = useUpdateProfile();

  const [form, setForm] = useState<EditProfileForm>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EditProfileForm, string>>>({});

  useEffect(() => {
    if (profile && isEditing) {
      setForm({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || '',
      });
      setErrors({});
    }
  }, [profile, isEditing]);

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof EditProfileForm, string>> = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(() => {
    if (!validate()) return;
    updateMutation.mutate(form);
  }, [form, validate, updateMutation]);

  const handleChange = useCallback((field: keyof EditProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  if (!isEditing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Edit profile"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setEditing(false)}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full',
          'bg-white rounded-t-3xl p-6',
          'animate-slide-up max-h-[85vh] overflow-y-auto'
        )}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        <h2 className="text-lg font-bold text-gray-900 mb-6">Edit Profile</h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={cn(
                'w-full px-4 py-3 rounded-xl border bg-gray-50',
                'text-sm text-gray-900 placeholder-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
              )}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={cn(
                'w-full px-4 py-3 rounded-xl border bg-gray-50',
                'text-sm text-gray-900 placeholder-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
              )}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={cn(
                'w-full px-4 py-3 rounded-xl border bg-gray-50',
                'text-sm text-gray-900 placeholder-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
              )}
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className={cn(
                'w-full px-4 py-3 rounded-xl border bg-gray-50',
                'text-sm text-gray-900',
                'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                'border-gray-200'
              )}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className={cn(
                'w-full px-4 py-3 rounded-xl border bg-gray-50',
                'text-sm text-gray-900',
                'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                'border-gray-200'
              )}
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setEditing(false)}
            className={cn(
              'flex-1 py-3 rounded-xl',
              'border border-gray-200 text-gray-700 font-medium text-sm',
              'hover:bg-gray-50 active:scale-[0.97]',
              'transition-all duration-150'
            )}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={updateMutation.isPending}
            className={cn(
              'flex-1 py-3 rounded-xl',
              'bg-emerald-600 text-white font-medium text-sm',
              'hover:bg-emerald-700 active:scale-[0.97]',
              'transition-all duration-150',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
});
