import Link from "next/link";
import { Crown, Zap, Gift, Star, Trophy } from "lucide-react";
import styles from "@/styles/membership.module.scss";

const tiers = [
  {
    name: "Starter", Icon: Star,
    iconBg: "linear-gradient(135deg,#6b7280,#374151)",
    points: "0 – 999",
    perks: ["5% discount on all orders","Birthday bonus points","Early access to sales"],
    featured: false,
  },
  {
    name: "Pro", Icon: Zap,
    iconBg: "linear-gradient(135deg,#0066FF,#00C6FF)",
    points: "1,000 – 4,999",
    perks: ["10% discount on all orders","Free shipping always","Priority customer support","Exclusive Pro deals"],
    featured: true,
  },
  {
    name: "Champion", Icon: Trophy,
    iconBg: "linear-gradient(135deg,#f59e0b,#ea580c)",
    points: "5,000+",
    perks: ["15% discount on all orders","Personal shopping assistant","VIP event invites","Jersey customisation free"],
    featured: false,
  },
];

export default function MembershipProgram() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titleWrap}>
          <div className={styles.titleWrap__eyebrow}><Crown size={14} />Loyalty Program</div>
          <h2 className={styles.titleWrap__title}>
            SportZone <span className="gradient-text">Membership</span>
          </h2>
          <p className={styles.titleWrap__sub}>
            Earn points on every purchase and unlock exclusive rewards, discounts, and VIP benefits.
          </p>
        </div>

        <div className={styles.grid}>
          {tiers.map(tier => (
            <div key={tier.name} className={styles.card + (tier.featured ? " " + styles["card--featured"] : "")}>
              {tier.featured && <div className={styles.card__popular}>Most Popular</div>}
              <div className={styles.card__icon} style={{ background: tier.iconBg }}>
                <tier.Icon size={22} color="#fff" />
              </div>
              <div className={styles.card__name}>{tier.name}</div>
              <div className={styles.card__pts}>{tier.points} points</div>
              <ul className={styles.card__perks}>
                {tier.perks.map(p => (
                  <li key={p} className={styles.card__perk}>
                    <Gift size={13} className={styles.card__perkIcon} />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href="/membership"
                className={styles.card__btn + " " + (tier.featured ? styles["card__btn--primary"] : styles["card__btn--ghost"])}
              >
                Join {tier.name}
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.banner}>
          <strong>Already a member?</strong>{" "}
          Log in to check your points and redeem rewards.{" "}
          <Link href="/dashboard">Go to Dashboard →</Link>
        </div>
      </div>
    </section>
  );
}
