export default function Layout({ children }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-black dark:text-white">
      <div>{children}</div>
    </main>
  );
}
