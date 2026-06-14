const navItems = [
  { label: "Beranda", path: "/" },
  { label: "Form Pajak", path: "/form-pajak" },
  { label: "Cara Penggunaan", path: "/", hash: "cara-penggunaan" },
  { label: "FAQ", path: "/", hash: "faq" },
];

export default function Footer({ onNavigate }) {
  function handleNavigate(event, item) {
    event.preventDefault();
    onNavigate(item.path, item.hash);
  }

  return (
    <footer className="border-t border-slate-200 bg-white/70 px-4 py-10 dark:border-white/10 dark:bg-black/40 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 className="text-base font-bold text-slate-950 dark:text-white">Kalkulator Pajak UMKM</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Aplikasi sederhana untuk membantu menghitung estimasi PPh Final UMKM.
          </p>
          <p className="mt-5 max-w-2xl text-xs leading-5 text-slate-500 dark:text-slate-500">
            Hasil perhitungan bersifat estimasi dan tidak menggantikan konsultasi atau pelaporan resmi.
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Navigasi</p>
          <div className="mt-3 flex flex-wrap gap-3 md:justify-end">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`${item.path}${item.hash ? `#${item.hash}` : ""}`}
                onClick={(event) => handleNavigate(event, item)}
                className="text-sm font-medium text-slate-500 hover:text-blue-800 dark:text-slate-400 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">
            © 2026 Kalkulator Pajak UMKM. Dibuat untuk kebutuhan pembelajaran.
          </p>
        </div>
      </div>
    </footer>
  );
}
