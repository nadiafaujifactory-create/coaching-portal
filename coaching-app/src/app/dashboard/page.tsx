'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
      } else {
        setUserEmail(user.email ?? null);
        setLoading(false);
      }
    }
    loadUser();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading portal session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 sm:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white rounded-xl">
            <Image
              src="/logo.png"
              alt="Fauji Factory Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">FAUJI FACTORY</h1>
            <p className="text-xs text-red-500 font-semibold tracking-wider uppercase">Management Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 hidden sm:inline">
            {userEmail}
          </span>
          <button
            onClick={handleSignOut}
            className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-3.5 rounded-lg border border-slate-700 transition"
          >
            Sign Out
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Admissions
          </h2>
          <p className="text-2xl font-bold text-white mt-2">Active</p>
          <p className="text-xs text-slate-500 mt-1">Student intake & enrollment</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Attendance
          </h2>
          <p className="text-2xl font-bold text-white mt-2">Daily Log</p>
          <p className="text-xs text-slate-500 mt-1">Cohort presence tracking</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Academic Performance
          </h2>
          <p className="text-2xl font-bold text-white mt-2">Evaluations</p>
          <p className="text-xs text-slate-500 mt-1">Mock test results & metrics</p>
        </div>
      </section>
    </main>
  );
}