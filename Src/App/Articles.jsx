import { useMemo, useState } from "react";

const articles = [
  {
    title: "Understanding Sciatica: causes, symptoms, and what actually helps",
    excerpt:
      "Learn what sciatica is, why it happens, and how exercise-based rehab can support recovery without guesswork.",
    category: "Pain & Rehab",
    readTime: "6 min read",
    date: "2026-04-01",
    url: "/articles/understanding-sciatica",
    keywords: ["sciatica", "nerve pain", "back pain", "rehab"],
  },
  {
    title: "Strength training for beginners: where to start without overthinking it",
    excerpt:
      "A practical introduction to getting stronger safely, with less confusion and more structure.",
    category: "Strength & Performance",
    readTime: "5 min read",
    date: "2026-03-28",
    url: "/articles/strength-training-for-beginners",
    keywords: ["strength training", "beginners", "gym", "programming"],
  },
  {
    title: "Mobility vs flexibility: what matters more for how you move",
    excerpt:
      "These terms get mixed up constantly. Here is what each one means and how they apply to training and rehab.",
    category: "Mobility",
    readTime: "4 min read",
    date: "2026-03-22",
    url: "/articles/mobility-vs-flexibility",
    keywords: ["mobility", "flexibility", "movement", "warm-up"],
  },
];

export default function Articles() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        category === "all" || article.category === category;

      const searchableText = [
        article.title,
        article.excerpt,
        article.category,
        ...article.keywords,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <div style={styles.container}>
          <p style={styles.eyebrow}>Evidence-based articles</p>
          <h1 style={styles.title}>Health, rehab, and performance insights.</h1>
          <p style={styles.subtitle}>
            Explore practical articles on pain, rehab, strength training,
            movement, recovery, and performance.
          </p>
        </div>
      </header>

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.controls}>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Categories</option>
              <option value="Pain & Rehab">Pain & Rehab</option>
              <option value="Strength & Performance">
                Strength & Performance
              </option>
              <option value="Mobility">Mobility</option>
            </select>
          </div>

          <p style={styles.results}>
            Showing {filteredArticles.length} article
            {filteredArticles.length !== 1 ? "s" : ""}
          </p>

          <div style={styles.grid}>
            {filteredArticles.map((article) => (
              <div key={article.title} style={styles.card}>
                <div style={styles.thumb}>{article.category}</div>
                <div style={styles.cardBody}>
                  <div style={styles.metaRow}>
                    <span style={styles.tag}>{article.category}</span>
                    <span style={styles.tag}>{article.readTime}</span>
                  </div>

                  <h3 style={styles.cardTitle}>{article.title}</h3>
                  <p style={styles.cardText}>{article.excerpt}</p>

                  <a href={article.url} style={styles.link}>
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    background: "#0e0e0e",
    color: "#ffffff",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    width: "min(1100px, calc(100% - 2rem))",
    margin: "0 auto",
  },
  hero: {
    padding: "5rem 0 3rem",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background:
      "radial-gradient(circle at top right, rgba(106,30,43,0.35), transparent 30%), linear-gradient(180deg, #111111 0%, #0e0e0e 100%)",
  },
  eyebrow: {
    color: "#b0b0b0",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    fontSize: "0.8rem",
  },
  title: {
    fontSize: "clamp(2.2rem, 4vw, 4rem)",
    lineHeight: 1.05,
    margin: "0.5rem 0 1rem",
  },
  subtitle: {
    color: "#b0b0b0",
    maxWidth: "700px",
    fontSize: "1.05rem",
  },
  section: {
    padding: "2rem 0 4rem",
  },
  controls: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "1rem",
    marginBottom: "1rem",
  },
  input: {
    padding: "1rem",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "#151515",
    color: "#fff",
  },
  select: {
    padding: "1rem",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "#151515",
    color: "#fff",
  },
  results: {
    color: "#b0b0b0",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "#1b1b1b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    overflow: "hidden",
  },
  thumb: {
    padding: "1rem",
    background:
      "linear-gradient(135deg, rgba(106,30,43,0.88), rgba(24,24,24,0.95))",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  cardBody: {
    padding: "1.2rem",
  },
  metaRow: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    marginBottom: "0.8rem",
  },
  tag: {
    padding: "0.35rem 0.7rem",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#b0b0b0",
    fontSize: "0.8rem",
  },
  cardTitle: {
    margin: "0 0 0.75rem",
  },
  cardText: {
    color: "#b0b0b0",
    marginBottom: "1rem",
  },
  link: {
    color: "#fff",
    fontWeight: 700,
  },
};
