const steps = [
  "Buka halaman Form Pajak melalui tombol Mulai Hitung Pajak.",
  "Pilih masa pajak sesuai bulan yang ingin dihitung.",
  "Masukkan omzet bulan berjalan sesuai data usaha.",
  "Periksa total omzet kumulatif.",
  "Sistem akan menghitung omzet kena pajak dan PPh Final secara otomatis.",
  "Cek hasil pada bagian ringkasan.",
];

export default function UsageGuide() {
  return (
    <section
      id="cara-penggunaan"
      className="border-t border-slate-200/70 bg-slate-50 px-4 py-20 dark:border-white/10 dark:bg-[#020617] sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Cara Menggunakan Kalkulator Pajak
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Ikuti langkah singkat berikut agar data yang dimasukkan lebih rapi dan hasil perhitungan mudah
            dipahami.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-800 dark:bg-blue-400/10 dark:text-blue-200">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
