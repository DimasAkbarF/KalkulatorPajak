import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TaxFormPage from "./pages/TaxFormPage";

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
      {page === "form" ? <TaxFormPage onNavigate={navigate} /> : <HomePage onNavigate={navigate} />}
      <Footer onNavigate={navigate} />
    </Layout>
  );
}
