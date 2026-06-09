import Link from "next/link";
import { brands } from "@/lib/data";
import styles from "@/styles/top-brands.module.scss";

const gradients: Record<string, string> = {
  Nike:   "linear-gradient(135deg,#f97316,#dc2626)",
  Adidas: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  Yonex:  "linear-gradient(135deg,#ef4444,#be123c)",
  Wilson: "linear-gradient(135deg,#dc2626,#991b1b)",
  DSP:    "linear-gradient(135deg,#22c55e,#15803d)",
  SG:     "linear-gradient(135deg,#a855f7,#7c3aed)",
  Puma:   "linear-gradient(135deg,#6b7280,#374151)",
  Reebok: "linear-gradient(135deg,#06b6d4,#2563eb)",
};

export default function TopBrands() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titleWrap}>
          <div className={styles.titleWrap__eyebrow}>Trusted By Athletes</div>
          <h2 className={styles.titleWrap__title}>Top <span className="gradient-text">Brands</span></h2>
          <p className={styles.titleWrap__sub}>Official dealer of world-class sports brands</p>
        </div>
        <div className={styles.grid}>
          {brands.map(b => (
            <Link key={b.id} href={"/products?brand=" + b.name.toLowerCase()} className={styles.card}>
              <div className={styles.card__inner}>
                <div className={styles.card__icon} style={{ background: gradients[b.name] || "linear-gradient(135deg,#555,#333)" }}>
                  {b.name.slice(0, 2)}
                </div>
                <div className={styles.card__name}>{b.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
