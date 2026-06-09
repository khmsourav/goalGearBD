"use client";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories } from "@/lib/data";
import { SlidersHorizontal, Search, ChevronDown, X, Grid3X3, List } from "lucide-react";
import styles from "@/styles/products-page.module.scss";

const sortOptions = [
  { value: "featured",   label: "Featured"           },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating",     label: "Best Rated"         },
  { value: "newest",     label: "Newest"             },
];

const priceRanges = [
  { label: "Under ৳1,000",     min: 0,     max: 1000     },
  { label: "৳1,000 – ৳5,000", min: 1000,  max: 5000     },
  { label: "৳5,000 – ৳15,000",min: 5000,  max: 15000    },
  { label: "৳15,000+",         min: 15000, max: Infinity },
];

export default function ProductsPage() {
  const [search,      setSearch]      = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [sort,        setSort]        = useState("featured");
  const [priceRange,  setPriceRange]  = useState<{ min: number; max: number } | null>(null);
  const [filterOpen,  setFilterOpen]  = useState(false);
  const [viewMode,    setViewMode]    = useState<"grid" | "list">("grid");

  let filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat    = !selectedCat || p.category === selectedCat;
    const matchPrice  = !priceRange  || (p.price >= priceRange.min && p.price <= priceRange.max);
    return matchSearch && matchCat && matchPrice;
  });

  if (sort === "price-asc")  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating")     filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sort === "newest")     filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

  const activeFilters = [
    selectedCat && categories.find(c => c.id === selectedCat)?.name,
    priceRange  && priceRanges.find(r => r.min === priceRange.min)?.label,
  ].filter(Boolean) as string[];

  return (
    <>
      <Header />
      <main className={styles.page}>
        {/* Hero bar */}
        <div className={styles.hero}>
          <div className={styles.hero__inner}>
            <div className={styles.hero__eyebrow}>Explore</div>
            <h1 className={styles.hero__title}>All Products</h1>
            <div className={styles.hero__search}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products, brands…"
                className={styles.hero__input}
              />
              <Search size={16} className={styles.hero__searchIcon} />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button className={styles.filterBtn} onClick={() => setFilterOpen(!filterOpen)}>
              <SlidersHorizontal size={15} />
              Filters
              {activeFilters.length > 0 && <span className={styles.filterBadge}>{activeFilters.length}</span>}
            </button>
            {activeFilters.map(f => (
              <span key={f} className={styles.chip}>
                {f}
                <button className={styles.chipRemove} onClick={() => { setSelectedCat(null); setPriceRange(null); }}>
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>

          <div className={styles.toolbarRight}>
            <span className={styles.count}>{filtered.length} products</span>
            <div className={styles.viewToggle}>
              <button
                onClick={() => setViewMode("grid")}
                className={styles.viewBtn + (viewMode === "grid" ? " " + styles["viewBtn--active"] : "")}
              >
                <Grid3X3 size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={styles.viewBtn + (viewMode === "list" ? " " + styles["viewBtn--active"] : "")}
              >
                <List size={14} />
              </button>
            </div>
            <div className={styles.sortWrap}>
              <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={13} className={styles.sortIcon} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {filterOpen && (
            <aside className={styles.sidebar}>
              <div className={styles.sidebarPanel}>
                <div className={styles.filterGroup}>
                  <div className={styles.filterGroup__title}>Sport</div>
                  <div className={styles.filterGroup__list}>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCat(selectedCat === cat.id ? null : cat.id)}
                        className={styles.filterGroup__btn + (selectedCat === cat.id ? " " + styles["filterGroup__btn--active"] : "")}
                      >
                        <span className={styles.filterGroup__btnLeft}>
                          <span>{cat.icon}</span>{cat.name}
                        </span>
                        <span className={styles.filterGroup__count}>{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.filterGroup}>
                  <div className={styles.filterGroup__title}>Price Range</div>
                  <div className={styles.filterGroup__list}>
                    {priceRanges.map(range => (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange(priceRange?.min === range.min ? null : { min: range.min, max: range.max })}
                        className={styles.filterGroup__btn + (priceRange?.min === range.min ? " " + styles["filterGroup__btn--active"] : "")}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          <div className={styles.results}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.empty__emoji}>🔍</div>
                <div className={styles.empty__title}>No products found</div>
                <div className={styles.empty__sub}>Try adjusting your filters or search</div>
              </div>
            ) : (
              <div className={styles.grid + (viewMode === "list" ? " " + styles["grid--list"] : "")}>
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
