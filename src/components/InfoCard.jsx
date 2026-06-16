export default function InfoCard() {
  return (
    <section className="min-w-0 rounded-3xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-slate-700 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:shadow-none">
      <h2 className="mb-2 text-sm font-semibold text-blue-900 dark:text-white">Catatan Perhitungan</h2>
      <p>
        Catatan: Kalkulator ini hanya membantu memberikan estimasi perhitungan berdasarkan data yang
        dimasukkan. Pastikan kembali data Anda sebelum digunakan untuk keperluan pelaporan.
      </p>
      <div className="mt-4 grid gap-3 text-xs text-slate-600 sm:grid-cols-3 lg:grid-cols-1 dark:text-slate-400">
        <div className="rounded-xl border border-blue-100 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
          <span className="block font-semibold text-slate-800 dark:text-slate-200">Tarif</span>
          PPh Final UMKM 0,5%
        </div>
        <div className="rounded-xl border border-blue-100 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
          <span className="block font-semibold text-slate-800 dark:text-slate-200">PTKP OP</span>
          Rp500 juta per tahun
        </div>
        <div className="rounded-xl border border-blue-100 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
          <span className="block font-semibold text-slate-800 dark:text-slate-200">Batas Omzet</span>
          Rp4,8 miliar per tahun
        </div>
      </div>
    </section>
  );
}
