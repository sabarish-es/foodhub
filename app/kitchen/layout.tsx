'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
}
