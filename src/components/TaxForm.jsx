import { BATAS_OMZET, BULAN, JENIS_LABEL, PTKP_OMZET, TARIF_PPH } from "../utils/taxCalculator";
import { formatCurrency, formatNumberInput, parseCurrency } from "../utils/formatCurrency";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/10";
const labelClass = "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

function CurrencyInput({ value, onChange, placeholder = "0" }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
        Rp
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={value ? value.toLocaleString("id-ID") : ""}
        onChange={(event) => onChange(parseCurrency(event.target.value))}
        placeholder={placeholder}
        className={`${inputClass} pl-10`}
      />
    </div>
  );
}

function RadioCard({ name, value, checked, onChange, children }) {
  return (
    <label
      className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-transform duration-300 ease-out hover:-translate-y-0.5 ${
        checked
          ? "border-blue-700 bg-blue-50 text-blue-900 dark:border-blue-400/40 dark:bg-blue-400/10 dark:text-blue-100"
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-white/20"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

export default function TaxForm({ formData, setFormData, result, onCalculate, onReset }) {
  const totalBulanan = formData.omzetBulanan.reduce((total, omzet) => total + omzet, 0);
  const omzetSendiri = formData.metode === "bulanan" ? totalBulanan : formData.omzetTahunan;
  const omzetGabungan = omzetSendiri + formData.omzetPasangan + formData.omzetBadanLain;
  const progress = Math.min(100, (omzetGabungan / BATAS_OMZET) * 100);
  const usePTKP = formData.jenisWP === "op";
  const tahunanBasis = usePTKP ? Math.max(0, formData.omzetTahunan - PTKP_OMZET) : formData.omzetTahunan;
  const tahunanPPh = tahunanBasis * TARIF_PPH;
  const showGabungan = ["op", "perseroan_perorangan"].includes(formData.jenisWP);
  const showKoperasi = formData.jenisWP === "koperasi";

  function updateField(name, value) {
    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === "jenisWP" ? { pakaiPTKP: value === "op" } : {}),
    }));
  }

  function updateMonth(index, value) {
    setFormData((current) => {
      const nextMonths = [...current.omzetBulanan];
      nextMonths[index] = value;
      return { ...current, omzetBulanan: nextMonths };
    });
  }

  return (
    <form
      onSubmit={onCalculate}
      className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none sm:p-6"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Data Penghitungan Pajak</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Isi profil dan omzet untuk melihat estimasi PPh Final.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nama" className={labelClass}>
            Nama Usaha / WP
          </label>
          <input
            id="nama"
            type="text"
            value={formData.nama}
            onChange={(event) => updateField("nama", event.target.value)}
            placeholder="Contoh: Toko Maju Jaya"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="npwp" className={labelClass}>
            NPWP / NIK
          </label>
          <input
            id="npwp"
            type="text"
            value={formData.npwp}
            onChange={(event) => updateField("npwp", event.target.value)}
            placeholder="16 digit NIK atau format NPWP"
            maxLength={21}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="tahunPajak" className={labelClass}>
            Tahun Pajak
          </label>
          <input
            id="tahunPajak"
            type="text"
            inputMode="numeric"
            value={formData.tahunPajak}
            onChange={(event) => updateField("tahunPajak", event.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
            placeholder="Contoh: 2026"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="jenisUsaha" className={labelClass}>
            Jenis Usaha
          </label>
          <input
            id="jenisUsaha"
            type="text"
            value={formData.jenisUsaha}
            onChange={(event) => updateField("jenisUsaha", event.target.value)}
            placeholder="Contoh: Perdagangan, Jasa, Kuliner"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <span className={labelClass}>Jenis Wajib Pajak</span>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {Object.entries(JENIS_LABEL).map(([value, label]) => (
            <RadioCard
              key={value}
              name="jenisWP"
              value={value}
              checked={formData.jenisWP === value}
              onChange={() => updateField("jenisWP", value)}
            >
              {label}
            </RadioCard>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
        {formData.jenisWP === "op" && "Orang Pribadi mendapat PTKP omzet Rp500 juta per tahun secara otomatis."}
        {formData.jenisWP === "perseroan_perorangan" &&
          "Perseroan Perorangan tidak mendapat PTKP, sehingga seluruh omzet menjadi basis pajak."}
        {formData.jenisWP === "koperasi" &&
          "Koperasi dapat menggunakan PPh Final selama 4 Tahun Pajak sejak terdaftar."}
        {formData.jenisWP === "cv_firma" &&
          "CV / Firma dihitung sebagai informasi masa transisi sesuai logic lama aplikasi."}
        {formData.jenisWP === "pt_bumd" && "PT / BUMD tidak eligible menggunakan PPh Final UMKM 0,5%."}
      </div>

      {showGabungan && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Validasi Anti Pecah Usaha</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Omzet terkait dijumlahkan untuk mengecek batas Rp4,8 miliar.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Omzet Pasangan</label>
              <CurrencyInput value={formData.omzetPasangan} onChange={(value) => updateField("omzetPasangan", value)} />
            </div>
            <div>
              <label className={labelClass}>Omzet Badan Terkait Lainnya</label>
              <CurrencyInput value={formData.omzetBadanLain} onChange={(value) => updateField("omzetBadanLain", value)} />
            </div>
          </div>
        </div>
      )}

      {showKoperasi && (
        <div className="mt-5">
          <label htmlFor="tahunDaftar" className={labelClass}>
            Tahun Koperasi Terdaftar
          </label>
          <input
            id="tahunDaftar"
            type="text"
            inputMode="numeric"
            value={formData.tahunDaftar}
            onChange={(event) => updateField("tahunDaftar", event.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
            placeholder="Contoh: 2023"
            className={inputClass}
          />
        </div>
      )}

      <div className="mt-5 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200">
        Perhatian: pekerjaan bebas tertentu tidak dapat dikenai PPh Final 0,5% dan wajib menggunakan tarif umum.
      </div>

      <div className="mt-5">
        <span className={labelClass}>Mode Input Omzet</span>
        <div className="grid gap-3 sm:grid-cols-2">
          <RadioCard
            name="metode"
            value="bulanan"
            checked={formData.metode === "bulanan"}
            onChange={() => updateField("metode", "bulanan")}
          >
            Input Per Bulan
          </RadioCard>
          <RadioCard
            name="metode"
            value="tahunan"
            checked={formData.metode === "tahunan"}
            onChange={() => updateField("metode", "tahunan")}
          >
            Total Setahun
          </RadioCard>
        </div>
      </div>

      {formData.metode === "bulanan" ? (
        <div className="mt-6 min-w-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Masa Pajak</th>
                  <th className="px-4 py-3 font-semibold">Omzet Bulan Ini</th>
                  <th className="px-4 py-3 font-semibold">Total Omzet Kumulatif</th>
                  <th className="px-4 py-3 font-semibold">Omzet Kena Pajak</th>
                  <th className="px-4 py-3 font-semibold">PPh Terutang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                {BULAN.map((bulan, index) => {
                  const previewData = {
                    ...formData,
                    omzetBulanan: formData.omzetBulanan.map((item, itemIndex) =>
                      itemIndex === index ? formData.omzetBulanan[index] : item,
                    ),
                  };
                  let cumul = 0;
                  for (let i = 0; i <= index; i += 1) cumul += previewData.omzetBulanan[i];
                  const cumulSebelum = cumul - previewData.omzetBulanan[index];
                  const basis = usePTKP
                    ? cumul > PTKP_OMZET
                      ? cumul - PTKP_OMZET - Math.max(0, cumulSebelum - PTKP_OMZET)
                      : 0
                    : previewData.omzetBulanan[index];
                  const pph = basis * TARIF_PPH;

                  return (
                    <tr key={bulan} className="bg-white dark:bg-transparent">
                      <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{bulan}</td>
                      <td className="px-4 py-3">
                        <CurrencyInput value={formData.omzetBulanan[index]} onChange={(value) => updateMonth(index, value)} />
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{formatCurrency(cumul).replace(",00", "")}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{formatCurrency(basis).replace(",00", "")}</td>
                      <td className="px-4 py-3 font-semibold text-blue-900 dark:text-blue-200">{formatCurrency(pph).replace(",00", "")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-6 min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <label className={labelClass}>Total Omzet Bruto Setahun</label>
          <CurrencyInput value={formData.omzetTahunan} onChange={(value) => updateField("omzetTahunan", value)} />
          {formData.omzetTahunan > 0 && (
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl bg-white p-4 dark:bg-white/[0.04]">
                <span className="block text-xs text-slate-500 dark:text-slate-400">Omzet Bruto</span>
                <strong className="text-slate-800 dark:text-slate-100">{formatNumberInput(formData.omzetTahunan)}</strong>
              </div>
              <div className="rounded-xl bg-white p-4 dark:bg-white/[0.04]">
                <span className="block text-xs text-slate-500 dark:text-slate-400">Basis Kena Pajak</span>
                <strong className="text-slate-800 dark:text-slate-100">{formatCurrency(tahunanBasis).replace(",00", "")}</strong>
              </div>
              <div className="rounded-xl bg-white p-4 dark:bg-white/[0.04]">
                <span className="block text-xs text-slate-500 dark:text-slate-400">PPh Final</span>
                <strong className="text-blue-900 dark:text-blue-200">{formatCurrency(tahunanPPh).replace(",00", "")}</strong>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Omzet Gabungan vs Batas Rp4,8 Miliar</span>
          <span>{Number.isFinite(progress) ? progress.toFixed(1) : "0.0"}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <div
            className={`h-full rounded-full ${progress > 80 ? "bg-rose-500" : "bg-blue-700"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{formatCurrency(omzetGabungan).replace(",00", "")}</span>
          <span>Batas {formatCurrency(BATAS_OMZET).replace(",00", "")}</span>
        </div>
      </div>

      {result?.error && (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200">
          {result.error}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="rounded-xl bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:bg-blue-900 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-100 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-white/20"
        >
          Hitung Pajak
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08]"
        >
          Reset Form
        </button>
      </div>
    </form>
  );
}
