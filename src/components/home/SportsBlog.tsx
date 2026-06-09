import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/data";
import styles from "@/styles/blog.module.scss";

export default function SportsBlog() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.titleGroup__eyebrow}>Knowledge Hub</div>
            <h2 className={styles.titleGroup__title}>
              Sports <span className="gradient-text">Blog</span>
            </h2>
          </div>
          <Link href="/blog" className={styles.viewAll}>All Articles <ArrowRight size={16} /></Link>
        </div>
        <div className={styles.grid}>
          {blogPosts.map(post => (
            <Link key={post.id} href={"/blog/" + post.id} className={styles.card}>
              <div className={styles.card__imgWrap}>
                <Image src={post.image} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" />
                <span className={styles.card__catBadge}>{post.category}</span>
              </div>
              <div className={styles.card__body}>
                <h3 className={styles.card__title}>{post.title}</h3>
                <p className={styles.card__excerpt}>{post.excerpt}</p>
                <div className={styles.card__meta}>
                  <span>{post.date}</span>
                  <span className={styles.card__readTime}><Clock size={11} />{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
