import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import styles from "@/styles/sections.module.scss";

export default function FeaturedProducts() {
  return (
    <section className={styles.section + " " + styles["section--dark2"]}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.titleGroup__eyebrow}>Handpicked For You</div>
            <h2 className={styles.titleGroup__title}>
              Featured <span className="gradient-text">Products</span>
            </h2>
          </div>
          <Link href="/products" className={styles.viewAll}>View All <ArrowRight size={16} /></Link>
        </div>
        <div className={styles.grid}>
          {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
