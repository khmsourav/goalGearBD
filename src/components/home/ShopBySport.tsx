import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import styles from "@/styles/shop-sport.module.scss";

const gradients: Record<string, string> = {
  cricket:    "linear-gradient(135deg,#22c55e,#15803d)",
  football:   "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  badminton:  "linear-gradient(135deg,#f59e0b,#ea580c)",
  tennis:     "linear-gradient(135deg,#84cc16,#16a34a)",
  gym:        "linear-gradient(135deg,#ef4444,#be123c)",
  volleyball: "linear-gradient(135deg,#a855f7,#7c3aed)",
  basketball: "linear-gradient(135deg,#f97316,#dc2626)",
  swimming:   "linear-gradient(135deg,#06b6d4,#2563eb)",
};

export default function ShopBySport() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.titleGroup__eyebrow}>Categories</div>
            <h2 className={styles.titleGroup__title}>
              Shop By <span className="gradient-text">Sport</span>
            </h2>
          </div>
          <Link href="/products" className={styles.viewAll}>
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className={styles.grid}>
          {categories.map(cat => (
            <Link key={cat.id} href={"/products?cat=" + cat.id} className={styles.card}>
              <span className={styles.card__overlay} style={{ background: gradients[cat.id] }} />
              <span className={styles.card__icon}>{cat.icon}</span>
              <div className={styles.card__name}>{cat.name}</div>
              <div className={styles.card__count}>{cat.count}+ items</div>
            </Link>
          ))}
        </div>
        <Link href="/products" className={styles.mobileViewAll}>
          View All Categories <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
