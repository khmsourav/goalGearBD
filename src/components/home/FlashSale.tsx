"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, ArrowRight, ShoppingCart } from "lucide-react";
import { flashSaleProducts, formatPrice } from "@/lib/data";
import styles from "@/styles/flash-sale.module.scss";

function useCountdown(initial: number) {
  const [secs, setSecs] = useState(initial);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  return [Math.floor(secs / 3600), Math.floor((secs % 3600) / 60), secs % 60] as const;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function FlashSale() {
  const [h, m, s] = useCountdown(4 * 3600 + 23 * 60 + 45);

  return (
    <section id="flash-sale" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.wrap}>
          <div className={styles.glowBg} />

          <div className={styles.topRow}>
            <div className={styles.titleWrap}>
              <div className={styles.label}>
                <div className={styles.label__icon}><Zap size={15} fill="white" /></div>
                <span className={styles.label__text}>Flash Sale</span>
                <span className={styles.label__live}>LIVE</span>
              </div>
              <h2 className={styles.headline}>
                Deals Up To <span>50% OFF</span>
              </h2>
            </div>

            <div className={styles.countdown}>
              <span className={styles.countdown__label}>Ends in:</span>
              <div className={styles.countdown__units}>
                {[["hrs", h], ["min", m], ["sec", s]].map(([lbl, val], i) => (
                  <>
                    {i > 0 && <span key={"sep" + i} className={styles.countdown__sep}>:</span>}
                    <div key={lbl as string} className={styles.timeUnit}>
                      <div className={styles.timeUnit__val}>{pad(val as number)}</div>
                      <div className={styles.timeUnit__lbl}>{lbl}</div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {flashSaleProducts.map(p => (
              <Link key={p.id} href={"/products/" + p.id} className={styles.card}>
                <div className={styles.card__imgWrap}>
                  <Image src={p.image} alt={p.name} fill sizes="25vw" />
                  <span className={styles.card__discBadge}>-{p.discount}%</span>
                </div>
                <div className={styles.card__body}>
                  <div className={styles.card__name}>{p.name}</div>
                  <div className={styles.card__prices}>
                    <span className={styles.card__flash}>{formatPrice(p.flashPrice)}</span>
                    <span className={styles.card__orig}>{formatPrice(p.price)}</span>
                  </div>
                  <div className={styles.card__stockLabel}>
                    <span>Sold: {p.totalStock - p.stock}</span>
                    <span>Left: {p.stock}</span>
                  </div>
                  <div className={styles.card__bar}>
                    <div
                      className={styles.card__barFill}
                      style={{ width: ((p.totalStock - p.stock) / p.totalStock * 100) + "%" }}
                    />
                  </div>
                  <button className={styles.card__btn} onClick={e => e.preventDefault()}>
                    <ShoppingCart size={12} />Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.footer}>
            <Link href="/products?sale=flash" className={styles.footer__link}>
              View All Flash Deals <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
