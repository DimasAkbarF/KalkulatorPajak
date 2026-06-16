import { useState } from "react";

const faqs = [
  {
    question: "Apakah hasil perhitungan ini bersifat resmi?",
    answer:
      "Hasil perhitungan pada website ini bersifat estimasi berdasarkan data yang dimasukkan pengguna. Untuk pelaporan resmi, tetap sesuaikan dengan ketentuan perpajakan yang berlaku.",
  },
  {
    question: "Apakah data yang saya masukkan disimpan?",
    answer: "Tidak. Perhitungan dilakukan di browser dan tidak menggunakan login atau database.",
  },
  {
    question: "Apa itu PPh Final UMKM 0,5%?",
    answer:
      "PPh Final UMKM 0,5% adalah pajak penghasilan final yang dikenakan atas omzet tertentu sesuai ketentuan perpajakan yang berlaku.",
  },
  {
    question: "Apakah website ini bisa digunakan di HP?",
    answer: "Ya. Website dibuat responsive agar nyaman digunakan di desktop, tablet, dan mobile.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="border-t border-slate-200/70 bg-white px-4 py-20 dark:border-white/10 dark:bg-black sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Beberapa catatan umum sebelum menggunakan hasil perhitungan sebagai bahan estimasi.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white"
                >
                  <span>{item.question}</span>
                  <span className="text-lg leading-none text-slate-400">{isOpen ? "-" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
