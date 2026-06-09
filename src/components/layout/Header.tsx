"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, X, Phone, ChevronDown, Zap } from "lucide-react";
import styles from "@/styles/header.module.scss";

const navLinks = [
  { label: "Sports",  href: "#", children: [
    { label: "Cricket",    href: "/products?cat=cricket"   },
    { label: "Football",   href: "/products?cat=football"  },
    { label: "Badminton",  href: "/products?cat=badminton" },
    { label: "Tennis",     href: "/products?cat=tennis"    },
    { label: "Volleyball", href: "/products?cat=volleyball"},
    { label: "Basketball", href: "/products?cat=basketball"},
  ]},
  { label: "Fitness", href: "#", children: [
    { label: "Gym Equipment",       href: "/products?cat=gym"      },
    { label: "Fitness Accessories", href: "/products?cat=fitness"  },
    { label: "Sports Shoes",        href: "/products?cat=shoes"    },
    { label: "Training Gear",       href: "/products?cat=training" },
  ]},
  { label: "Jerseys", href: "/products?cat=jerseys" },
  { label: "Brands",  href: "/brands" },
  { label: "Offers",  href: "#", isRed: true, children: [
    { label: "Flash Sale",   href: "#flash-sale"            },
    { label: "Bundle Deals", href: "/products?sale=bundle" },
    { label: "Team Orders",  href: "/team-orders"           },
  ]},
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDD,   setActiveDD]   = useState<string | null>(null);

  return (
    <>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBar__inner}>
          <div className={styles.topBar__left}>
            <span className={styles.topBar__phone}><Phone size={12} />01700-000000</span>
            <span>Free delivery on orders above ৳1500</span>
          </div>
          <div className={styles.topBar__right}>
            <span className={styles.topBar__flash}><Zap size={12} />Flash Sale Live!</span>
            <span className={styles.topBar__sep}>|</span>
            <Link href="/track-order" className={styles.topBar__link}>Track Order</Link>
            <span className={styles.topBar__sep}>|</span>
            <Link href="/dashboard"   className={styles.topBar__link}>My Account</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={styles.header}>
        <div className={styles.header__inner}>
          <div className={styles.header__row}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.png" alt="GoalGear BD" className={styles.logo__image} />
              <div className={styles.logo__text}>
                <div className={styles.logo__name}>GoalGear BD</div>
                <div className={styles.logo__sub}>Play Hard. Gear Up.</div>
              </div>
            </Link>

            <div className={styles.search}>
              <div className={styles.search__wrap}>
                <input className={styles.search__input} type="text" placeholder="Search cricket bats, footballs, gym equipment…" />
                <button className={styles.search__btn}><Search size={15} /></button>
              </div>
            </div>

            <div className={styles.actions}>
              <Link href="/wishlist" className={styles.iconBtn}>
                <Heart size={20} />
                <span className={`${styles.iconBtn__badge} ${styles["iconBtn__badge--red"]}`}>5</span>
              </Link>
              <Link href="/cart" className={styles.iconBtn}>
                <ShoppingCart size={20} />
                <span className={`${styles.iconBtn__badge} ${styles["iconBtn__badge--blue"]}`}>3</span>
              </Link>
              <Link href="/dashboard" className={styles.loginBtn}>
                <User size={15} /><span>Login</span>
              </Link>
              <button className={styles.menuBtn} onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className={styles.nav}>
            {navLinks.map(link => (
              <div
                key={link.label}
                className={styles.navItem}
                onMouseEnter={() => setActiveDD(link.label)}
                onMouseLeave={() => setActiveDD(null)}
              >
                <Link
                  href={link.href}
                  className={[styles.navItem__link, link.isRed ? styles["navItem__link--red"] : ""].join(" ")}
                >
                  {link.isRed && <Zap size={12} />}
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={12}
                      className={[styles.navItem__chevron, activeDD === link.label ? styles["navItem__chevron--open"] : ""].join(" ")}
                    />
                  )}
                </Link>
                {link.children && activeDD === link.label && (
                  <div className={styles.navItem__dropdown}>
                    {link.children.map(c => (
                      <Link key={c.label} href={c.href} className={styles.navItem__dropLink}>{c.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className={styles.nav__extra}>
              <Link href="/team-orders"      className={styles.nav__teamBtn}>Team Orders</Link>
              <Link href="/jersey-customize" className={styles.nav__jerseyBtn}>Customize Jersey</Link>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={styles.mobile}>
            <div className={styles.mobile__searchWrap}>
              <input className={styles.mobile__input} type="text" placeholder="Search products…" />
              <button className={styles.mobile__searchBtn}><Search size={15} /></button>
            </div>
            <div className={styles.mobile__links}>
              {navLinks.map(link => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={[styles.mobile__link, link.isRed ? styles["mobile__link--red"] : ""].join(" ")}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className={styles.mobile__sub}>
                      {link.children.map(c => (
                        <Link key={c.label} href={c.href} onClick={() => setMobileOpen(false)} className={styles.mobile__subLink}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
