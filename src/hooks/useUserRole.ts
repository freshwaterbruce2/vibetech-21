import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

type AppRole = 'admin' | 'user';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<AppRole | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setRole(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          setRole('user');
          setIsAdmin(false);
        } else {
          const userRole = data?.role as AppRole;
          setRole(userRole);
          setIsAdmin(userRole === 'admin');
        }
      } catch (err) {
        console.error('Error fetching role:', err);
        setRole('user');
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  return { role, isAdmin, loading };
};
