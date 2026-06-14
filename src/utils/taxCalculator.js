export const BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const TARIF_PPH = 0.005;
export const PTKP_OMZET = 500_000_000;
export const BATAS_OMZET = 4_800_000_000;

export const JENIS_LABEL = {
  op: "Orang Pribadi (OP)",
  perseroan_perorangan: "Perseroan Perorangan",
  koperasi: "Koperasi",
  cv_firma: "CV / Firma (Masa Transisi)",
  pt_bumd: "PT / BUMD",
};

export const initialFormData = {
  jenisWP: "op",
  pakaiPTKP: true,
  metode: "bulanan",
  tahunPajak: "2026",
  nama: "",
  npwp: "",
  jenisUsaha: "",
  omzetBulanan: new Array(12).fill(0),
  omzetTahunan: 0,
  omzetPasangan: 0,
  omzetBadanLain: 0,
  tahunDaftar: "",
};

export function formatNPWPValue(value) {
  const digits = String(value || "").replace(/[^0-9]/g, "").slice(0, 16);

  if (digits.length <= 15) {
    let formatted = "";
    if (digits.length > 0) formatted += digits.substring(0, Math.min(2, digits.length));
    if (digits.length > 2) formatted += `.${digits.substring(2, Math.min(5, digits.length))}`;
    if (digits.length > 5) formatted += `.${digits.substring(5, Math.min(8, digits.length))}`;
    if (digits.length > 8) formatted += `.${digits.substring(8, Math.min(9, digits.length))}`;
    if (digits.length > 9) formatted += `-${digits.substring(9, Math.min(12, digits.length))}`;
    if (digits.length > 12) formatted += `.${digits.substring(12, Math.min(15, digits.length))}`;
    return formatted;
  }

  return [
    digits.substring(0, 4),
    digits.substring(4, 8),
    digits.substring(8, 12),
    digits.substring(12, 16),
  ]
    .filter(Boolean)
    .join(" ");
}

export function calculateTax(formData) {
  const pakaiPTKP = formData.jenisWP === "op";
  const omzetList =
    formData.metode === "bulanan"
      ? [...formData.omzetBulanan]
      : new Array(12).fill((Number(formData.omzetTahunan) || 0) / 12);

  const totalOmzetSendiri = omzetList.reduce((total, omzet) => total + omzet, 0);
  const totalOmzetGabungan =
    totalOmzetSendiri + Number(formData.omzetPasangan || 0) + Number(formData.omzetBadanLain || 0);
  const melebihiBatasGabungan = totalOmzetGabungan > BATAS_OMZET;
  const melebihiBatas = melebihiBatasGabungan;

  let koperasiWarning = "";
  if (formData.jenisWP === "koperasi" && formData.tahunDaftar) {
    const tahunPajakNum = parseInt(formData.tahunPajak, 10) || 2026;
    const tahunDaftarNum = parseInt(formData.tahunDaftar, 10);
    const tahunKeUmur = tahunPajakNum - tahunDaftarNum + 1;

    if (tahunKeUmur > 4) {
      koperasiWarning = `Koperasi telah melewati batas 4 Tahun Pajak (terdaftar ${formData.tahunDaftar}, Tahun Pajak ${formData.tahunPajak} = tahun ke-${tahunKeUmur}). Tidak dapat lagi menggunakan PPh Final dan wajib tarif umum PPh Badan.`;
    }
  }

  const results = [];
  let cumul = 0;

  for (let i = 0; i < 12; i += 1) {
    const omzet = omzetList[i];
    const cumulSebelum = cumul;
    cumul += omzet;

    let basis = 0;
    let status = "";

    if (pakaiPTKP) {
      if (cumul <= PTKP_OMZET) {
        basis = 0;
        status = "Bebas (PTKP)";
      } else {
        const atasSebelum = Math.max(0, cumulSebelum - PTKP_OMZET);
        const atasSekarang = cumul - PTKP_OMZET;
        basis = atasSekarang - atasSebelum;
        status = "Kena Pajak";
      }
    } else {
      basis = omzet;
      status = omzet > 0 ? "Kena Pajak" : "-";
    }

    const pph = basis * TARIF_PPH;
    results.push({ bulan: BULAN[i], omzet, cumul, basis, pph, status });
  }

  const totalPPh = results.reduce((total, item) => total + item.pph, 0);
  const totalBasis = results.reduce((total, item) => total + item.basis, 0);
  const rateEfektif = totalOmzetSendiri > 0 ? (totalPPh / totalOmzetSendiri) * 100 : 0;
  const adaGabungan = Number(formData.omzetPasangan || 0) + Number(formData.omzetBadanLain || 0) > 0;
  const isEligible = !melebihiBatas && !koperasiWarning && formData.jenisWP !== "pt_bumd";

  return {
    results,
    totalOmzetSendiri,
    totalOmzetGabungan,
    totalPPh,
    totalBasis,
    rateEfektif,
    adaGabungan,
    melebihiBatas,
    melebihiBatasGabungan,
    koperasiWarning,
    isEligible,
  };
}
