import React, { useEffect, useState } from 'react';

const NewsBlog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'facde232f9414ed7ba020b1886c9a5b6';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`
        );
        const data = await res.json();
        if (data.status === 'ok') {
          setArticles(data.articles);
        } else {
          console.error('NewsAPI error:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Latest News</h2>
      {articles.map((article, idx) => (
        <div 
          key={idx} 
          style={{
            display: 'flex', 
            marginBottom: '2rem', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {article.urlToImage && (
            <img 
              src={article.urlToImage} 
              alt={article.title} 
              style={{ width: '250px', objectFit: 'cover' }} 
            />
          )}
          <div style={{ padding: '1rem', flex: 1 }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: '#1a0dab', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                {article.title}
              </a>
            </h3>
            <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {article.description || 'No description available.'}
            </p>
            <small style={{ color: '#999' }}>Source: {article.source.name}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsBlog;
