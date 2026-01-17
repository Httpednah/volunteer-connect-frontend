import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="page-head">
          <h2 className="h2">Articles</h2>
          <p className="p-muted">
            Read the latest news and updates from our community.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card skeleton-card" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && articles.length === 0 && (
          <div className="empty card">
            <h3>No articles yet</h3>
            <p className="p-muted">
              Check back later — new content will be posted soon.
            </p>
          </div>
        )}

        {/* Articles */}
        {!loading && articles.length > 0 && (
          <div className="grid grid-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="card article-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3 className="article-title">{article.title}</h3>
                <p className="p-muted article-preview">
                  {article.preview ||
                    article.content?.substring(0, 100) + "..."}
                </p>
                <div className="article-meta">
                  <span>By {article.author}</span>
                  <span>{article.minutes_to_read} min read</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
