import { useMemo, useState } from "react";
import InfoCard from "../components/InfoCard";
import ResultCard from "../components/ResultCard";
import TaxForm from "../components/TaxForm";
import { calculateTax, formatNPWPValue, initialFormData } from "../utils/taxCalculator";

export default function TaxFormPage({ onNavigate }) {
  const [formData, setFormDataRaw] = useState(initialFormData);
  const [result, setResult] = useState({ data: null, error: "" });

  const setFormData = (updater) => {
    setFormDataRaw((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      return {
        ...next,
        npwp: formatNPWPValue(next.npwp),
      };
    });
  };

  const normalizedFormData = useMemo(
    () => ({
      ...formData,
      nama: formData.nama.trim() || "Wajib Pajak",
      jenisUsaha: formData.jenisUsaha.trim(),
    }),
    [formData],
  );

  function handleCalculate(event) {
    event.preventDefault();

    if (formData.jenisWP === "pt_bumd") {
      setResult({
        data: null,
        error: "PT / BUMD tidak dapat menggunakan PPh Final UMKM 0,5% berdasarkan PP No.20 Tahun 2026.",
      });
      return;
    }

    if (formData.metode === "tahunan" && !formData.omzetTahunan) {
      setResult({ data: null, error: "Masukkan total omzet terlebih dahulu." });
      return;
    }

    const totalOmzet =
      formData.metode === "bulanan"
        ? formData.omzetBulanan.reduce((total, omzet) => total + omzet, 0)
        : formData.omzetTahunan;

    if (totalOmzet === 0) {
      setResult({ data: null, error: "Omzet tidak boleh nol. Silakan isi data omzet terlebih dahulu." });
      return;
    }

    setResult({ data: calculateTax(normalizedFormData), error: "" });
    window.setTimeout(() => {
      document.getElementById("hasil-pajak")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function handleReset() {
    setFormDataRaw(initialFormData);
    setResult({ data: null, error: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="animate-fade-up min-h-[calc(100svh-72px)] px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[calc(100vh-76px)] lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => onNavigate("/")}
          className="mb-8 inline-flex items-center text-sm font-medium text-slate-600 transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:text-blue-800 active:scale-[0.98] dark:text-slate-400 dark:hover:text-white"
        >
          ← Kembali ke Beranda
        </button>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-800 dark:text-blue-200">
            Form Pajak
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Form Penghitungan Pajak
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Masukkan data omzet usaha Anda untuk melihat estimasi PPh Final secara otomatis.
          </p>
        </div>

        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <TaxForm
            formData={formData}
            setFormData={setFormData}
            result={result}
            onCalculate={handleCalculate}
            onReset={handleReset}
          />
          <aside id="hasil-pajak" className="min-w-0 space-y-6">
            <ResultCard formData={normalizedFormData} result={result} onPrint={() => window.print()} />
            <InfoCard />
          </aside>
        </div>
      </div>
    </section>
  );
}
