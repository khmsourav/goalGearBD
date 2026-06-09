import Link from "next/link";
import { MapPin, Phone, Mail, Zap, Shield, Truck, RotateCcw, Headphones } from "lucide-react";
import styles from "@/styles/footer.module.scss";

const footerLinks: Record<string, [string, string][]> = {
  "Quick Links":      [["About Us","/about"],["Contact Us","/contact"],["Track Order","/track-order"],["Store Locator","/stores"],["Sports Blog","/blog"]],
  "Sports":           [["Cricket","/products?cat=cricket"],["Football","/products?cat=football"],["Badminton","/products?cat=badminton"],["Tennis","/products?cat=tennis"],["Gym & Fitness","/products?cat=gym"]],
  "Customer Service": [["My Account","/dashboard"],["Order History","/dashboard/orders"],["Returns & Refunds","/returns"],["Shipping Policy","/shipping"],["Privacy Policy","/privacy"]],
  "Business":         [["Team Kit Builder","/team-orders"],["Academy Partners","/academy"],["Bulk Orders","/bulk-orders"],["Brand Partnership","/partnership"],["Affiliate Program","/affiliate"]],
};

const features = [
  { Icon: Truck,      label: "Free Delivery", sub: "Orders above ৳1500"  },
  { Icon: Shield,     label: "100% Authentic",sub: "Genuine products"    },
  { Icon: RotateCcw,  label: "Easy Returns",  sub: "7-day return policy" },
  { Icon: Headphones, label: "24/7 Support",  sub: "Always here for you" },
];

const FB = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const IG = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>;
const YT = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>;
const TW = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.features}>
        <div className={styles.features__grid}>
          {features.map(({ Icon, label, sub }) => (
            <div key={label} className={styles.features__item}>
              <div className={styles.features__icon}><Icon size={20} /></div>
              <div>
                <div className={styles.features__label}>{label}</div>
                <div className={styles.features__sub}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brand__logo}>
            <img src="/logo.png" alt="GoalGear BD" className={styles.brand__icon_image} />
            <div>
              <div className={styles.brand__name}>GoalGear BD</div>
              <div className={styles.brand__sub}>Play Hard. Gear Up.</div>
            </div>
          </Link>
          <p className={styles.brand__desc}>
            GoalGear BD — Bangladesh's most trusted sports marketplace. Authentic products, competitive prices, fast delivery across the country.
          </p>
          <div className={styles.brand__contact}>
            {([
              [MapPin, "Mirpur DOHS, Dhaka 1216"],
              [Phone,  "01700-000000"],
              [Mail,   "support@goalgearbd.com"],
            ] as const).map(([Icon, text]) => (
              <div key={text} className={styles.brand__contactItem}>
                <Icon size={14} />{text}
              </div>
            ))}
          </div>
          <div className={styles.brand__social}>
            {[FB, IG, YT, TW].map((Icon, i) => (
              <Link key={i} href="#" className={styles.brand__socialLink}><Icon /></Link>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className={styles.col}>
            <h4 className={styles.col__title}>{title}</h4>
            <ul className={styles.col__list}>
              {links.map(([label, href]) => (
                <li key={label}><Link href={href} className={styles.col__link}>{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottom__inner}>
          <div className={styles.bottom__copy}>© 2026 GoalGear BD. All rights reserved.</div>
          <div className={styles.bottom__pay}>
            <span className={styles.bottom__payLabel}>We accept:</span>
            {["bKash","Nagad","Rocket","Visa","Master","COD"].map(m => (
              <span key={m} className={styles.bottom__method}>{m}</span>
            ))}
          </div>
          <div className={styles.bottom__powered}><Zap size={12} />Powered by GoalGear BD</div>
        </div>
      </div>
    </footer>
  );
}
