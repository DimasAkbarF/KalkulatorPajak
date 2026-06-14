export default function Layout({ children }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_30%),linear-gradient(to_bottom,#020617,#000000)] dark:text-white">
      <div>{children}</div>
    </main>
  );
}
