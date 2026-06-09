import Link from "next/link";
import { athletes } from "@/lib/data";
import { Quote } from "lucide-react";
import styles from "@/styles/athlete.module.scss";

export default function AthleteRecommendations() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titleWrap}>
          <div className={styles.titleWrap__eyebrow}>Pro Endorsed</div>
          <h2 className={styles.titleWrap__title}>
            Athlete <span className="gradient-text">Recommendations</span>
          </h2>
        </div>
        <div className={styles.grid}>
          {athletes.map(a => (
            <div key={a.id} className={styles.card}>
              <div className={styles.card__top}>
                <div className={styles.card__avatar}>{a.initials}</div>
                <div className={styles.card__info}>
                  <div className={styles.card__name}>{a.name}</div>
                  <div className={styles.card__sport}>{a.sport} · {a.role}</div>
                  <div className={styles.card__product}>Recommends: {a.product}</div>
                  <div className={styles.card__quote}>
                    <Quote size={20} />
                    {a.quote}
                  </div>
                </div>
              </div>
              <div className={styles.card__footer}>
                <Link href={"/products?search=" + encodeURIComponent(a.product)} className={styles.card__shopLink}>
                  Shop {a.product} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
