"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Eye, GitCompare } from "lucide-react";
import { formatPrice } from "@/lib/data";
import styles from "@/styles/product-card.module.scss";

interface Product {
  id: number; name: string; category: string;
  price: number; originalPrice: number;
  rating: number; reviews: number;
  image: string; badge?: string; brand: string;
  inStock: boolean; isNew: boolean; discount: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [added,  setAdded]  = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={"/products/" + product.id} className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.image}>
          <Image src={product.image} alt={product.name} fill sizes="(max-width:768px) 50vw, 25vw" />
          <div className={styles.badges}>
            {product.badge     && <span className={styles.badge + " " + styles["badge--blue"]}>{product.badge}</span>}
            {product.isNew     && <span className={styles.badge + " " + styles["badge--green"]}>NEW</span>}
            {product.discount > 0 && <span className={styles.badge + " " + styles["badge--red"]}>-{product.discount}%</span>}
          </div>
          <div className={styles.actions}>
            <button
              className={styles.actionBtn + (wished ? " " + styles["actionBtn--active"] : "")}
              onClick={e => { e.preventDefault(); setWished(!wished); }}
            >
              <Heart size={13} fill={wished ? "currentColor" : "none"} />
            </button>
            <button className={styles.actionBtn} onClick={e => e.preventDefault()}><Eye size={13} /></button>
            <button className={styles.actionBtn} onClick={e => e.preventDefault()}><GitCompare size={13} /></button>
          </div>
          {!product.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
        </div>
        <div className={styles.info}>
          <div className={styles.brand}>{product.brand}</div>
          <h3 className={styles.name}>{product.name}</h3>
          <div className={styles.stars}>
            {[1,2,3,4,5].map(n => (
              <svg key={n} width="11" height="11" viewBox="0 0 24 24"
                fill={n <= Math.floor(product.rating) ? "#fbbf24" : "none"}
                stroke={n <= Math.floor(product.rating) ? "#fbbf24" : "rgba(255,255,255,0.2)"}
                strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
            <span className={styles.stars__count}>({product.reviews})</span>
          </div>
          <div className={styles.bottom}>
            <div className={styles.price}>
              <div className={styles.price__current}>{formatPrice(product.price)}</div>
              {product.originalPrice > product.price && (
                <div className={styles.price__original}>{formatPrice(product.originalPrice)}</div>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={styles.addBtn + (added ? " " + styles["addBtn--added"] : "")}
            >
              <ShoppingCart size={12} />
              {added ? "Added!" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
