import { reviews } from "@/lib/data";
import { BadgeCheck } from "lucide-react";
import styles from "@/styles/reviews.module.scss";

const StarIcon = () => (
  <svg className={styles.star} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function CustomerReviews() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titleWrap}>
          <div className={styles.titleWrap__eyebrow}>What Athletes Say</div>
          <h2 className={styles.titleWrap__title}>
            Customer <span className="gradient-text">Reviews</span>
          </h2>
          <div className={styles.titleWrap__rating}>
            <div className={styles.stars}>{[0,1,2,3,4].map(i => <StarIcon key={i} />)}</div>
            <span className={styles.titleWrap__ratingVal}>4.9</span>
            <span className={styles.titleWrap__ratingCnt}>/ 5 · 12,000+ reviews</span>
          </div>
        </div>
        <div className={styles.grid}>
          {reviews.map(r => (
            <div key={r.id} className={styles.card}>
              <div className={styles.card__top}>
                <div className={styles.card__user}>
                  <div className={styles.card__avatar}>{r.avatar}</div>
                  <div>
                    <div className={styles.card__name}>{r.name}</div>
                    <div className={styles.card__date}>{r.date}</div>
                  </div>
                </div>
                {r.verified && <BadgeCheck size={16} className={styles.card__verify} />}
              </div>
              <div className={styles.stars} style={{ marginBottom: "0.75rem" }}>
                {[0,1,2,3,4].slice(0, r.rating).map(i => <StarIcon key={i} />)}
              </div>
              <p className={styles.card__comment}>&ldquo;{r.comment}&rdquo;</p>
              <div className={styles.card__product}>
                Purchased: <span>{r.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
