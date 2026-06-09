import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import styles from "@/styles/sections.module.scss";

export default function NewArrivals() {
  const newProds = products.filter(p => p.isNew);
  const display  = newProds.length >= 4 ? newProds.slice(0, 4) : products.slice(4, 8);
  return (
    <section className={styles.section + " " + styles["section--dark2"]}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.titleGroup__eyebrow} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Sparkles size={14} />Just Arrived
            </div>
            <h2 className={styles.titleGroup__title}>
              New <span className="gradient-text">Arrivals</span>
            </h2>
          </div>
          <Link href="/products?sort=newest" className={styles.viewAll}>View All <ArrowRight size={16} /></Link>
        </div>
        <div className={styles.grid}>
          {display.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
