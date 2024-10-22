"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import ComingSoon from '../../components/ui/ComingSoon';

export default function BarcodePage() {

  const { data: session, status } = useSession(); // Use useSession to get session status
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push("/login") 
    }
  }, [status, router]);

    if (status === 'authenticated') {
        return (
            <div>
                <ComingSoon />
            </div>
        );
    }
    return null;
}
