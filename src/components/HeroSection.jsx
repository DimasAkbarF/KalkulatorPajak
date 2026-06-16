const stats = [
  { value: "0,5%", label: "Tarif PPh Final UMKM" },
  { value: "Rp 500 Jt", label: "Batas Omzet Tidak Kena Pajak" },
  { value: "Rp 4,8 M", label: "Batas Omzet Tahunan" },
];

export default function HeroSection({ onStart }) {
  return (
    <section
      id="beranda"
      className="relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden border-b border-slate-200/70 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.10),transparent_34%),linear-gradient(to_bottom,#f8fafc,#f1f5f9)] px-4 py-20 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_35%),linear-gradient(to_bottom,#020617,#000000)] sm:px-6 sm:py-24 lg:min-h-[calc(100vh-76px)] lg:px-8 lg:py-28"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center text-center">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-800 shadow-sm dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200 dark:shadow-none">
          PPh Final UMKM • Estimasi Perhitungan • Siap Digunakan
        </div>

        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
          Kalkulator Pajak UMKM Final
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
          Hitung estimasi PPh Final UMKM 0,5% secara mudah, cepat, dan rapi berdasarkan data omzet
          yang Anda masukkan.
        </p>

        <div className="mx-auto mt-10 grid w-full max-w-md grid-cols-2 gap-4 sm:max-w-3xl sm:grid-cols-3 lg:max-w-4xl">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className={`rounded-3xl border border-slate-200 bg-white/85 p-4 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none sm:p-5 ${
                index === 2 ? "col-span-2 mx-auto w-full max-w-[220px] sm:col-span-1 sm:max-w-none" : ""
              }`}
            >
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</div>
              <div className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center justify-center rounded-xl bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-white/20"
          >
            Mulai Hitung Pajak
          </button>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
            Gratis digunakan • Tanpa login • Data tidak tersimpan
          </p>
        </div>
      </div>
    </section>
  );
}
