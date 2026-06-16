import { BATAS_OMZET, JENIS_LABEL } from "../utils/taxCalculator";
import { formatCurrency, formatCurrencyShort } from "../utils/formatCurrency";

function SummaryItem({ label, value, detail, emphasize }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-2 text-xl font-bold ${emphasize ? "text-blue-900 dark:text-blue-200" : "text-slate-900 dark:text-white"}`}>
        {value}
      </p>
      {detail && <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{detail}</p>}
    </div>
  );
}

export default function ResultCard({ formData, result, onPrint }) {
  if (!result?.data) {
    return (
      <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Hasil Perhitungan</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Hasil akan muncul setelah data pajak dan omzet dihitung.
        </p>
      </section>
    );
  }

  const data = result.data;
  const progress = Math.min(100, (data.totalOmzetGabungan / BATAS_OMZET) * 100);
  const subtitle = `${formData.nama || "Wajib Pajak"} - ${JENIS_LABEL[formData.jenisWP]} - Tahun Pajak ${
    formData.tahunPajak
  }${formData.npwp ? ` - NPWP/NIK: ${formData.npwp}` : ""}`;

  return (
    <section className="min-w-0 space-y-5">
      <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Hasil Perhitungan Pajak</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>

        <div
          className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${
            data.isEligible
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200"
              : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200"
          }`}
        >
          {data.isEligible
            ? "Eligible PPh Final 0,5% berdasarkan data yang dimasukkan."
            : "Tidak eligible PPh Final 0,5%. Lihat catatan peringatan di bawah."}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SummaryItem
            label="Total Omzet"
            value={formatCurrencyShort(data.totalOmzetSendiri)}
            detail={formatCurrency(data.totalOmzetSendiri).replace(",00", "")}
            emphasize
          />
          {data.adaGabungan && (
            <SummaryItem
              label="Total Omzet Gabungan"
              value={formatCurrencyShort(data.totalOmzetGabungan)}
              detail="Termasuk omzet pasangan atau badan terkait"
            />
          )}
          <SummaryItem
            label="PPh Terutang"
            value={data.melebihiBatas ? "-" : formatCurrencyShort(data.totalPPh)}
            detail={data.melebihiBatas ? "Tidak eligible karena melebihi batas" : `Tarif efektif ${data.rateEfektif.toFixed(3)}%`}
            emphasize
          />
          <SummaryItem
            label="Omzet Kena Pajak"
            value={data.melebihiBatas ? "-" : formatCurrencyShort(data.totalBasis)}
            detail={formData.jenisWP === "op" ? "Omzet di atas PTKP Rp500 juta" : "Seluruh omzet tanpa PTKP"}
          />
          <SummaryItem
            label="Rata-rata PPh / Bulan"
            value={data.melebihiBatas ? "-" : formatCurrencyShort(data.totalPPh / 12)}
            detail="Estimasi angsuran bulanan"
          />
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Pemanfaatan Omzet vs Batas Rp4,8 Miliar</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div
              className={`h-full rounded-full ${progress > 80 ? "bg-rose-500" : "bg-blue-700"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {(data.melebihiBatasGabungan || data.koperasiWarning || formData.jenisWP === "cv_firma") && (
          <div className="mt-5 space-y-3 text-sm leading-6">
            {data.melebihiBatasGabungan && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200">
                Omzet gabungan melebihi Rp4,8 miliar. Total omzet gabungan:{" "}
                <strong>{formatCurrency(data.totalOmzetGabungan).replace(",00", "")}</strong>.
              </div>
            )}
            {data.koperasiWarning && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200">
                {data.koperasiWarning}
              </div>
            )}
            {formData.jenisWP === "cv_firma" && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
                CV / Firma hanya dihitung sebagai informasi masa transisi sesuai data dan logic lama aplikasi.
              </div>
            )}
          </div>
        )}

        <div className="mt-6 min-w-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Periode</th>
                  <th className="px-4 py-3 font-semibold">Omzet Bruto</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Basis Kena Pajak</th>
                  <th className="px-4 py-3 font-semibold">Tarif</th>
                  <th className="px-4 py-3 font-semibold">PPh Final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                {data.results
                  .filter((item) => item.omzet > 0)
                  .map((item) => (
                    <tr key={item.bulan} className="bg-white dark:bg-transparent">
                      <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{item.bulan}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{formatCurrency(item.omzet).replace(",00", "")}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status === "Kena Pajak"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200"
                              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{formatCurrency(item.basis).replace(",00", "")}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.basis > 0 ? "0,5%" : "-"}</td>
                      <td className="px-4 py-3 font-semibold text-blue-900 dark:text-blue-200">
                        {data.melebihiBatas ? "-" : formatCurrency(item.pph).replace(",00", "")}
                      </td>
                    </tr>
                  ))}
                <tr className="bg-slate-50 font-semibold text-slate-900 dark:bg-white/[0.04] dark:text-slate-100">
                  <td className="px-4 py-3">TOTAL</td>
                  <td className="px-4 py-3">{formatCurrency(data.totalOmzetSendiri).replace(",00", "")}</td>
                  <td className="px-4 py-3" />
                  <td className="px-4 py-3">{formatCurrency(data.totalBasis).replace(",00", "")}</td>
                  <td className="px-4 py-3">0,5%</td>
                  <td className="px-4 py-3">{data.melebihiBatas ? "Tidak Eligible" : formatCurrency(data.totalPPh).replace(",00", "")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="no-print mt-6">
          <button
            type="button"
            onClick={onPrint}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08]"
          >
            Cetak / PDF
          </button>
        </div>
      </div>
    </section>
  );
}
