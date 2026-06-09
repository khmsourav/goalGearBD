import Link from "next/link";
import { ArrowRight, Play, Star, Shield, Truck, Zap } from "lucide-react";
import styles from "@/styles/hero.module.scss";

const stats  = [
  { value: "50,000+", label: "Happy Athletes" },
  { value: "5,000+",  label: "Products"        },
  { value: "100%",    label: "Authentic"        },
  { value: "48hr",    label: "Delivery"         },
];
const badges = [
  { Icon: Shield, text: "Authentic Products"   },
  { Icon: Truck,  text: "Free Delivery ৳1500+" },
  { Icon: Star,   text: "4.9/5 Rating"          },
  { Icon: Zap,    text: "Flash Deals Daily"     },
];
const orbits = ["⚽","🏸","🎾","💪","🏐","🏀"];

export default function HeroBanner() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <div className={styles.bg__glow1} />
        <div className={styles.bg__glow2} />
        <div className={styles.bg__grid}  />
      </div>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <div className={styles.eyebrow}><Zap size={12} />Bangladesh&apos;s #1 Sports Marketplace</div>
            <h1 className={styles.title}>
              PLAY LIKE A<br />
              <span>CHAMPION</span>
            </h1>
            <p className={styles.subtitle}>
              Premium sports equipment for every athlete. Cricket, Football, Badminton, Gym &amp; more — authentic brands, competitive prices.
            </p>
            <div className={styles.ctas}>
              <Link href="/products"  className={styles.btnPrimary}>Shop Now <ArrowRight size={18} /></Link>
              <Link href="#flash-sale" className={styles.btnSecondary}><Zap size={16} style={{ color: "#FF1744" }} /> Flash Sale</Link>
              <button className={styles.btnPlay}><span className={styles.btnPlay__icon}><Play size={14} /></span>Watch Video</button>
            </div>
            <div className={styles.stats}>
              {stats.map(s => (
                <div key={s.label}>
                  <div className={styles.stats__value}>{s.value}</div>
                  <div className={styles.stats__label}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.visualGlow} />
            <div className={styles.mainEmoji}>
              🏏
              <span className={styles.mainEmoji__badgeNew}>NEW ARRIVAL</span>
              <span className={styles.mainEmoji__badgeSale}>22% OFF</span>
            </div>
            {orbits.map((emoji, i) => {
              const angle = (i / orbits.length) * 360;
              const rad = (angle * Math.PI) / 180;
              const r = 50;
              return (
                <div
                  key={emoji}
                  className={styles.orbit}
                  style={{ left: (50 + r * Math.cos(rad)) + "%", top: (50 + r * Math.sin(rad)) + "%" }}
                >
                  {emoji}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.badges}>
          {badges.map(({ Icon, text }) => (
            <div key={text} className={styles.badge}><Icon size={14} />{text}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
