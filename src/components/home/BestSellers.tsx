import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import styles from "@/styles/sections.module.scss";

export default function BestSellers() {
  const best = products.filter(p => p.reviews > 200).slice(0, 4);
  return (
    <section className={styles.section + " " + styles["section--dark"]}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.titleGroup__eyebrow} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <TrendingUp size={14} />Most Popular
            </div>
            <h2 className={styles.titleGroup__title}>
              Best <span className="gradient-text">Sellers</span>
            </h2>
          </div>
          <Link href="/products?sort=bestseller" className={styles.viewAll}>View All <ArrowRight size={16} /></Link>
        </div>
        <div className={styles.grid}>
          {best.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
