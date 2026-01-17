import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://127.0.0.1:5555/articles/${id}`, { method: "DELETE" })
      .then(() => navigate("/articles"));
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>Author: {article.author}</p>
      <p>{article.content}</p>
      <p>Preview: {article.preview}</p>
      <p>Minutes to read: {article.minutes_to_read}</p>
      <p>Date: {article.date}</p>
      <button onClick={handleDelete}>Delete</button>
      {/* Optional: Add Edit form here */}
    </div>
  );
}
