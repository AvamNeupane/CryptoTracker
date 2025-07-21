import { useEffect, useState } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('http://localhost:8000/news');
        console.log("Response data from backend (NewsFeed):", response.data);

        // Expecting the backend to send { data: [articles array] }
        if (response.data && Array.isArray(response.data.data)) {
          setArticles(response.data.data);
        } else {
          console.error("Unexpected data structure - expected {data: [articles]}, got:", response.data);
          setError("Invalid data structure received from API");
        }

      } catch (err) {
        console.error("API access is currently limited to conserve credits. Please try again later:", err);
        setError("Failed to fetch news");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array means this effect runs once on mount

  console.log("Articles state (NewsFeed component):", articles);

  if (loading) {
    return (
      <div style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Crypto News</h2>
        <p>Loading news...</p>
        {/* Simple loading placeholders */}
        <div style={{ height: '20px', backgroundColor: '#f0f0f0', marginBottom: '8px' }}></div>
        <div style={{ height: '15px', backgroundColor: '#f0f0f0', width: '80%', marginBottom: '4px' }}></div>
        <div style={{ height: '15px', backgroundColor: '#f0f0f0', width: '60%' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Crypto News</h2>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  // Show all articles
  const allArticles = Array.isArray(articles) ? articles : [];

  return (
    <div className="news-feed">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Crypto News</h2>
        {/* Simple badge-like display for article count */}
        <span style={{ backgroundColor: '#e0e0e0', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>
          {articles.length} articles
        </span>
      </div>

      {
        allArticles.length === 0 ? (
          <p style={{ color: '#666' }}>No news articles available</p>
        ) : (
          <div className="news-articles-list scrollable-news-list">
            {allArticles.map((article, index) => (
              <div key={index} className="news-article-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                  <a
                    className="news-article-link"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h3>
                {article.description && (
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {article.description}
                  </p>
                )}
                {article.createdAt && (
                  <p style={{ fontSize: '12px', color: '#888' }}>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
};

export default NewsFeed;
