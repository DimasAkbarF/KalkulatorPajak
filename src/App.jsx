import { lazy, Suspense, useEffect, useState } from "react";
import Header from "./components/Header";
import LazyOnVisible from "./components/LazyOnVisible";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const Footer = lazy(() => import("./components/Footer"));
const TaxFormPage = lazy(() => import("./pages/TaxFormPage"));

function getPageFromPath() {
  return window.location.pathname === "/form-pajak" ? "form" : "home";
}

export default function App() {
  const [page, setPage] = useState(getPageFromPath);

  function scrollToHash(hash) {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function navigate(path, hash = "") {
    const target = `${path}${hash ? `#${hash}` : ""}`;

    if (window.location.pathname + window.location.hash !== target) {
      window.history.pushState({}, "", target);
    }

    setPage(getPageFromPath());
    scrollToHash(hash);
  }

  useEffect(() => {
    function handlePopState() {
      setPage(getPageFromPath());
      scrollToHash(window.location.hash.replace("#", ""));
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <Layout>
      <Header currentPage={page} onNavigate={navigate} />
      {page === "form" ? (
        <Suspense
          fallback={
            <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
                Memuat form penghitungan pajak...
              </div>
            </section>
          }
        >
          <TaxFormPage onNavigate={navigate} />
        </Suspense>
      ) : (
        <HomePage onNavigate={navigate} />
      )}
      <LazyOnVisible minHeight={180} rootMargin="200px">
        <Suspense fallback={null}>
          <Footer onNavigate={navigate} />
        </Suspense>
      </LazyOnVisible>
    </Layout>
  );
}
