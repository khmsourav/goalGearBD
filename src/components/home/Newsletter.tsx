"use client";
import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import styles from "@/styles/newsletter.module.scss";

export default function Newsletter() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.wrap}>
          <div className={styles.content}>
            <div className={styles.iconWrap}><Mail size={24} /></div>
            <h2 className={styles.title}>
              Stay in the <span>Game</span>
            </h2>
            <p className={styles.subtitle}>
              Subscribe for exclusive deals, new arrivals, sports tips, and flash sale alerts. Get 10% off your first order!
            </p>

            {submitted ? (
              <div className={styles.success}>
                <CheckCircle size={22} />
                You&apos;re subscribed! Check your email for your 10% coupon.
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className={styles.form__input}
                />
                <button type="submit" className={styles.form__btn}>
                  <Send size={15} />Subscribe
                </button>
              </form>
            )}

            <p className={styles.note}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
