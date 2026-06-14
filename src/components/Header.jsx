import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Beranda", path: "/" },
  { label: "Form Pajak", path: "/form-pajak" },
  { label: "FAQ", path: "/", hash: "faq" },
];

export default function Header({ currentPage, onNavigate }) {
  function handleNavigate(event, item) {
    event.preventDefault();
    onNavigate(item.path, item.hash);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl transition-colors duration-500 ease-in-out dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" onClick={(event) => handleNavigate(event, navItems[0])} className="flex min-w-0 items-center gap-3">
          <img
            src="/assets/untirta-logo.png"
            alt="Logo UNTIRTA"
            className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-slate-900 dark:text-white">
              Kalkulator Pajak UMKM
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">PPh Final 0,5%</div>
          </div>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/70 p-1 shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none md:flex">
          {navItems.map((item) => {
            const active =
              (currentPage === "home" && item.path === "/" && !item.hash) ||
              (currentPage === "form" && item.path === "/form-pajak");

            return (
              <a
                key={item.label}
                href={`${item.path}${item.hash ? `#${item.hash}` : ""}`}
                onClick={(event) => handleNavigate(event, item)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-300 ${
                  active
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-500 hover:text-blue-800 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
