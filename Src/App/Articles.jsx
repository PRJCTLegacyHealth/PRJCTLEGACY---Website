import React, { useMemo, useState } from 'react';

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
    <div className="min-h-screen bg-[#0E0E0E] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#B0B0B0] uppercase tracking-[0.3em] text-xs mb-4">
          PRJCT: Legacy Articles
        </p>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          Articles
        </h1>

        <p className="text-[#B0B0B0] text-lg max-w-2xl mb-10">
          Evidence-based writing on rehab, pain, performance, recovery, and training.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#111] border border-[#222] text-white"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#111] border border-[#222] text-white"
          >
            <option value="all">All Categories</option>
            <option value="Pain & Rehab">Pain & Rehab</option>
            <option value="Strength & Performance">Strength & Performance</option>
            <option value="Mobility">Mobility</option>
          </select>
        </div>

        <p className="text-[#B0B0B0] mb-8">
          Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.title}
              className="rounded-2xl border border-[#222] bg-[#111] overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-[#6A1E2B] to-[#1a1a1a] text-sm uppercase tracking-wider">
                {article.category}
              </div>

              <div className="p-6">
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="text-xs text-[#B0B0B0] border border-[#333] rounded-full px-3 py-1">
                    {article.readTime}
                  </span>
                  <span className="text-xs text-[#B0B0B0] border border-[#333] rounded-full px-3 py-1">
                    {article.date}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-3">{article.title}</h2>
                <p className="text-[#B0B0B0] mb-4">{article.excerpt}</p>

                <a href={article.url} className="text-white font-bold hover:text-[#B0B0B0]">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
