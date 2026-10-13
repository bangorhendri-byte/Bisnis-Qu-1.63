import React from 'react';
import { 
  Plus, 
  Sparkles,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { MenuModuleConfig, ServiceQueue, WorkshopProfile, UserSession, SubscriptionState } from '../../types';
import { IconRenderer } from '../common/IconRenderer';
import { SafeArea } from '../common/SafeArea';
import { AppLogo } from '../common/AppLogo';
import { getBusinessPreset } from '../../data/businessPresets';

interface HomeDashboardProps {
  modules: MenuModuleConfig[];
  onSelectModule: (module: MenuModuleConfig) => void;
  queues: ServiceQueue[];
  onOpenNewQueue: () => void;
  onOpenNotifications?: () => void;
  unreadNotifsCount?: number;
  onSelectQueueItem: (queue: ServiceQueue) => void;
  onQuickSearchPlat?: (query: string) => void;
  profile?: WorkshopProfile;
  userSession?: UserSession | null;
  onLogout?: () => void;
  subscription?: SubscriptionState;
  onOpenSubscription?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  modules,
  onSelectModule,
  queues,
  onOpenNewQueue,
  onSelectQueueItem,
  profile,
  subscription,
  onOpenSubscription
}) => {
  const preset = getBusinessPreset(profile?.selectedPreset);
  const labels = preset.labels;

  // Workshop quick stats
  const waitingCount = queues.filter((q) => q.status === 'menunggu').length;
  const inProgressCount = queues.filter((q) => q.status === 'proses').length;
  const completedCount = queues.filter((q) => q.status === 'selesai').length;

  // Nama Toko Dinamis dari State/Database Profil Toko
  const shopName = profile?.workshopName || 'Bengkel Motor Berkah Jaya';

  return (
    <div className="flex-1 bg-slate-50 pb-6">
      {/* SafeArea Wrapper untuk Komponen Teratas Header Beranda */}
      <SafeArea topOnly className="bg-[#008952]">
        {/* 1. TOP HEADER: Clean Green Background with Dynamic Shop Profile & Trial Badge */}
        <div className="bg-[#008952] text-white px-5 pt-3 pb-8 relative overflow-hidden rounded-b-[28px] shadow-md">
          {/* Subtle decorative background watermarks */}
          <div className="absolute -right-6 -bottom-8 opacity-15 pointer-events-none transform rotate-12">
            <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-6h2v6zm0-8h-2V7h2v3z" />
            </svg>
          </div>
          <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            {/* Logo 'BQ' / 'UQ' & Nama Toko Dinamis (Halo, [Nama_Toko_Sesuai_Setting]) */}
            <div className="flex items-center gap-3 min-w-0">
              <AppLogo
                profile={profile}
                name={shopName}
                variant="BQ"
                shape="circle"
                size="md"
                inverted={true}
              />
              <div className="min-w-0">
                <span className="text-[10px] font-medium text-emerald-100 uppercase tracking-wider block">
                  UsahaQu 1.61 • BengkelQu
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight truncate">
                  Halo, {shopName} 👋
                </h2>
                <p className="text-[11px] text-emerald-100/90 font-medium truncate">
                  {profile?.ownerName ? `Owner: ${profile.ownerName}` : 'Pusat Operasional Bengkel'}
                </p>
              </div>
            </div>

            {/* Badge "Trial: 10 Hari" di dalam Header Hijau */}
            <button
              type="button"
              onClick={onOpenSubscription}
              title="Lihat status paket langganan & trial"
              className="shrink-0 px-3 py-1.5 bg-emerald-800/90 hover:bg-emerald-700/90 active:scale-95 rounded-full text-[10px] font-bold text-emerald-100 border border-emerald-400/40 flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
            >
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>
                {subscription?.isTrialActive 
                  ? `Trial: ${subscription.trialDaysRemaining} Hari` 
                  : subscription?.isSubscribed 
                  ? subscription.planName.split(' ')[0] 
                  : 'Trial: 10 Hari'}
              </span>
            </button>
          </div>
        </div>
      </SafeArea>

      {/* 2. SUMMARY WORKSHOP CARD (Floating overlap) */}
      <div className="px-4 -mt-4 relative z-20">
        <div className="bg-white rounded-2xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-slate-100">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#008952]" />
                Omset Hari Ini (Kas & QRIS)
              </span>
              <div className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Rp 2.450.000
              </div>
            </div>
            <button
              onClick={onOpenNewQueue}
              className="bg-[#008952] hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>+ Antrian</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-3 text-center">
            <div className="bg-amber-50/70 rounded-xl p-2 border border-amber-100/60">
              <span className="text-[10px] font-semibold text-amber-700 block">Menunggu</span>
              <span className="text-base font-extrabold text-amber-800">{waitingCount} Unit</span>
            </div>
            <div className="bg-blue-50/70 rounded-xl p-2 border border-blue-100/60">
              <span className="text-[10px] font-semibold text-blue-700 block">Dikerjakan</span>
              <span className="text-base font-extrabold text-blue-800">{inProgressCount} Unit</span>
            </div>
            <div className="bg-emerald-50/70 rounded-xl p-2 border border-emerald-100/60">
              <span className="text-[10px] font-semibold text-[#008952] block">Selesai</span>
              <span className="text-base font-extrabold text-emerald-800">{completedCount} Unit</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MENU UTAMA (Hanya Menampilkan Ikon dan Nama) */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Menu Utama Bengkel
            </h3>
            <p className="text-[11px] text-slate-500">Pilih menu untuk membuka modul</p>
          </div>
          <span className="text-[10px] font-bold text-[#008952] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            {modules.length} Menu
          </span>
        </div>

        {/* Grid 3 Kolom: Hanya Menampilkan Ikon Hijau dan Nama */}
        <div className="grid grid-cols-3 gap-2.5">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className="bg-white rounded-2xl p-3 shadow-xs hover:shadow-md border border-slate-100 hover:border-emerald-200 transition-all duration-200 group active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer"
            >
              {/* Ikon Hijau Kotak Bersudut Tumpul */}
              <div className="w-13 h-13 rounded-2xl bg-[#008952] text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform mb-2">
                <IconRenderer name={mod.iconName} className="w-6 h-6 text-white stroke-[2.2]" />
              </div>

              {/* Nama Menu Saja */}
              <span className="font-bold text-slate-800 text-xs tracking-tight group-hover:text-[#008952] transition-colors leading-tight">
                {mod.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. LIVE ANTRIAN & PROGRES WORKSHOP PREVIEW */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              {labels.flowStep2} Saat Ini
            </h3>
          </div>
          <button
            onClick={() => onSelectModule(modules[0])}
            className="text-[11px] font-bold text-[#008952] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            Lihat Semua {labels.serviceModule} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {queues.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectQueueItem(item)}
              className="bg-white rounded-xl p-3 shadow-xs border border-slate-100 hover:border-emerald-200 cursor-pointer transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#008952] text-white">
                    {item.queueNumber}
                  </span>
                  <span className="font-bold text-xs text-slate-800">{item.plateNumber}</span>
                  <span className="text-[11px] text-slate-500 truncate max-w-[120px]">
                    ({item.vehicleModel})
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    item.status === 'proses'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : item.status === 'selesai'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-2 text-[11px] text-slate-600 line-clamp-1">
                Keterangan: <span className="font-medium text-slate-800">{item.complaint}</span>
              </div>

              {/* Progress bar */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      item.status === 'selesai'
                        ? 'bg-emerald-500'
                        : item.status === 'proses'
                        ? 'bg-blue-500'
                        : 'bg-amber-400'
                    }`}
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-slate-500">
                  {item.progressPercent}%
                </span>
                <span className="text-[10px] font-medium text-slate-400 ml-1">
                  {labels.operatorOrStaff}: {item.mechanicName.split(' ')[1] || item.mechanicName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
