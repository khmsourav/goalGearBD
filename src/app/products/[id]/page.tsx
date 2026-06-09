"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products, formatPrice } from "@/lib/data";
import {
  Heart, ShoppingCart, Truck, Shield, RotateCcw,
  ChevronRight, Minus, Plus, Share2, GitCompare, BadgeCheck
} from "lucide-react";
import styles from "@/styles/product-detail.module.scss";

const specs: Record<string, Record<string, string>> = {
  cricket:  { "Wood Type": "Kashmir Willow", "Grade": "Grade A", "Weight": "1.1–1.3 kg", "Handle": "Oval", "Edge": "38 mm", "Toe": "Round" },
  football: { "Size": "5 (Standard)", "Material": "PU Leather", "Bladder": "Latex", "Circumference": "68–70 cm", "Weight": "410–450 g", "Certification": "FIFA Quality" },
  badminton:{ "Weight": "3U (85–89 g)", "Grip Size": "G4", "Flex": "Extra Stiff", "String Tension": "22–30 lbs", "Material": "HM Graphite", "Balance": "Head Heavy" },
  tennis:   { "Head Size": "97 sq in", "Weight": "315 g", "Balance": "310 mm", "Beam Width": "21.5 mm", "String Pattern": "16×19", "Material": "Braided Graphite" },
};

const StarFill = () => (
  <svg className={styles.starFill} width="15" height="15" viewBox="0 0 24 24" fill="#fbbf24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const StarEmpty = () => (
  <svg className={styles.starEmpty} width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.1)">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function ProductDetailPage() {
  const params  = useParams();
  const id      = Number(params.id);
  const product = products.find(p => p.id === id) ?? products[0];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const [qty,       setQty]       = useState(1);
  const [wished,    setWished]    = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "shipping">("specs");
  const [added,     setAdded]     = useState(false);

  const productSpecs = specs[product.category] ?? specs.cricket;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const tabLabel = (t: string) => t === "specs" ? "Specifications" : t === "reviews" ? "Reviews" : "Shipping & Returns";

  return (
    <>
      <Header />
      <main className={styles.page}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumb__inner}>
            <Link href="/"        className={styles.breadcrumb__link}>Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className={styles.breadcrumb__link}>Products</Link>
            <ChevronRight size={12} />
            <span className={styles.breadcrumb__cur}>{product.name}</span>
          </div>
        </div>

        <div className={styles.main}>
          {/* Product grid */}
          <div className={styles.productGrid}>
            {/* Gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImg}>
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                {product.discount > 0 && (
                  <div className={styles.discountBadge}>-{product.discount}%</div>
                )}
              </div>
              <div className={styles.thumbGrid}>
                {[0,1,2,3].map(i => (
                  <div key={i} className={styles.thumb}>
                    <Image src={product.image} alt="" width={120} height={120} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.7 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className={styles.info}>
              <div className={styles.brandLabel}>{product.brand}</div>
              <h1 className={styles.productTitle}>{product.name}</h1>

              <div className={styles.ratingRow}>
                <div className={styles.stars}>
                  {[0,1,2,3,4].map(i => i < Math.floor(product.rating) ? <StarFill key={i} /> : <StarEmpty key={i} />)}
                </div>
                <span className={styles.ratingVal}>{product.rating}</span>
                <span className={styles.ratingCnt}>({product.reviews} reviews)</span>
                <span className={styles.verified}><BadgeCheck size={13} />Verified Brand</span>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className={styles.origPrice}>{formatPrice(product.originalPrice)}</span>
                    <span className={styles.saveBadge}>Save {formatPrice(product.originalPrice - product.price)}</span>
                  </>
                )}
              </div>

              <div className={styles.stockRow}>
                <div className={styles.stockDot + " " + (product.inStock ? styles["stockDot--in"] : styles["stockDot--out"])} />
                <span className={styles.stockText + " " + (product.inStock ? styles["stockText--in"] : styles["stockText--out"])}>
                  {product.inStock ? "In Stock — Ready to Ship" : "Out of Stock"}
                </span>
              </div>

              <div className={styles.qtyRow}>
                <div className={styles.qtyControl}>
                  <button className={styles.qtyBtn} onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={15} /></button>
                  <span className={styles.qtyVal}>{qty}</span>
                  <button className={styles.qtyBtn} onClick={() => setQty(qty + 1)}><Plus size={15} /></button>
                </div>
                <button
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className={styles.addBtn + " " + (added ? styles["addBtn--added"] : styles["addBtn--default"])}
                >
                  <ShoppingCart size={17} />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
                <button
                  onClick={() => setWished(!wished)}
                  className={styles.wishBtn + (wished ? " " + styles["wishBtn--active"] : "")}
                >
                  <Heart size={17} fill={wished ? "currentColor" : "none"} />
                </button>
              </div>

              <div className={styles.actionRow}>
                <button className={styles.actionBtn}><GitCompare size={13} />Compare</button>
                <button className={styles.actionBtn}><Share2 size={13} />Share</button>
              </div>

              <div className={styles.perks}>
                {[
                  { Icon: Truck,     text: "Free Delivery",   sub: "Orders ৳1500+" },
                  { Icon: Shield,    text: "100% Authentic",  sub: "Genuine product" },
                  { Icon: RotateCcw, text: "7-Day Return",    sub: "Easy returns" },
                ].map(({ Icon, text, sub }) => (
                  <div key={text} className={styles.perk}>
                    <Icon size={18} className={styles.perk__icon} />
                    <div className={styles.perk__text}>{text}</div>
                    <div className={styles.perk__sub}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <div className={styles.tabList}>
              {(["specs","reviews","shipping"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={styles.tabBtn + (activeTab === tab ? " " + styles["tabBtn--active"] : "")}
                >
                  {tabLabel(tab)}
                </button>
              ))}
            </div>

            {activeTab === "specs" && (
              <div className={styles.specTable}>
                {Object.entries(productSpecs).map(([key, val], i) => (
                  <div key={key} className={styles.specRow + (i % 2 !== 0 ? " " + styles["specRow--alt"] : "")}>
                    <span className={styles.specRow__key}>{key}</span>
                    <span className={styles.specRow__val}>{val}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                {[["RH","Rakib H."],["TA","Tasnim A."],["MU","Minhaj U."]].map(([init, name]) => (
                  <div key={name} className={styles.reviewCard}>
                    <div className={styles.reviewCard__top}>
                      <div className={styles.reviewCard__avatar}>{init}</div>
                      <div>
                        <div className={styles.reviewCard__name}>{name}</div>
                        <div className={styles.stars}>{[0,1,2,3,4].map(i => <StarFill key={i} />)}</div>
                      </div>
                    </div>
                    <p className={styles.reviewCard__text}>Excellent product quality. Exactly as described. Fast delivery from SportZone BD!</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className={styles.shippingBox}>
                <div><strong>Delivery:</strong> Dhaka: 1–2 days · Outside Dhaka: 2–5 days</div>
                <div><strong>Free Shipping:</strong> On orders above ৳1,500</div>
                <div><strong>Returns:</strong> 7-day hassle-free returns for unused items in original packaging</div>
                <div><strong>Payment:</strong> bKash, Nagad, Rocket, Visa, MasterCard, Cash on Delivery</div>
              </div>
            )}
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className={styles.related}>
              <h2 className={styles.related__title}>Related Products</h2>
              <div className={styles.related__grid}>
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
