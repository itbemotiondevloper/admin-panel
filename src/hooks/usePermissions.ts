'use client';

import { useAuth } from './useAuth';

export function usePermissions() {
  const { profile } = useAuth();

  const hasPermission = (permission?: string): boolean => {
    if (!permission) return true;
    if (!profile) return false;
    // Account must be Active
    if (profile.status !== 'Active') return false;
    const permissions: string[] = profile.permissions || [];
    return permissions.includes('*') || permissions.includes(permission);
  };

  const hasAnyPermission = (permissionsToCheck: string[]): boolean => {
    if (!profile) return false;
    if (profile.status !== 'Active') return false;
    const permissions: string[] = profile.permissions || [];
    if (permissions.includes('*')) return true;
    return permissionsToCheck.some((p) => permissions.includes(p));
  };

  return {
    hasPermission,
    hasAnyPermission,
    permissions: profile?.permissions || [],
    role: profile?.role || '',
    status: profile?.status || '',
  };
}
