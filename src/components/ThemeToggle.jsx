import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  function toggleTheme() {
    const nextTheme = !isDark;
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
    setIsDark(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 shrink-0 items-center rounded-full border border-slate-200 bg-slate-100 p-1 shadow-sm transition-all duration-500 ease-in-out hover:border-slate-300 dark:border-white/10 dark:bg-white/10 dark:shadow-none"
      aria-label="Ganti tema tampilan"
      aria-pressed={isDark}
    >
      <span
        aria-hidden="true"
        className={`absolute left-2 text-sm transition-opacity duration-300 ${isDark ? "opacity-35" : "opacity-100"}`}
      >
        ☀️
      </span>
      <span
        aria-hidden="true"
        className={`absolute right-2 text-sm transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-35"}`}
      >
        🌙
      </span>
      <span
        aria-hidden="true"
        className="h-8 w-8 rounded-full bg-white shadow-sm transition-transform duration-500 ease-in-out dark:translate-x-10 dark:bg-slate-950"
      />
    </button>
  );
}
