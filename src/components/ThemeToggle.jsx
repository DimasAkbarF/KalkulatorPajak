import { useEffect, useState } from "react";

function SunIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 4V2M12 22v-2M4.93 4.93 3.51 3.51M20.49 20.49l-1.42-1.42M4 12H2M22 12h-2M4.93 19.07l-1.42 1.42M20.49 3.51l-1.42 1.42"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MoonIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M20 15.31A8.5 8.5 0 0 1 8.69 4a7 7 0 1 0 11.31 11.31Z" fill="currentColor" />
    </svg>
  );
}

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

    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 shadow-sm transition-all duration-500 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/10 dark:focus:ring-white/10"
    >
      <span className="absolute inset-1 rounded-full bg-white shadow-sm transition-all duration-500 ease-in-out dark:bg-slate-950" />

      <SunIcon
        className={`relative z-10 h-[18px] w-[18px] text-amber-500 transition-all duration-500 ease-in-out ${
          isDark ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />

      <MoonIcon
        className={`absolute z-10 h-[18px] w-[18px] text-slate-100 transition-all duration-500 ease-in-out ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
