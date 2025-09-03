// src/app/page.js
"use client";

import { useState } from 'react';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProductData(null);

    try {
      const res = await fetch('/api/track-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'فشل في سحب بيانات المنتج.');
      }

      setProductData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>أداة تتبع أسعار المنتجات</h1>
      <p>أدخل رابط المنتج أدناه لسحب بياناته وتتبع سعره.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="الصق رابط المنتج هنا"
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'جاري السحب...' : 'سحب البيانات'}
        </button>
      </form>

      {loading && <p>جاري التحميل...</p>}
      {error && <p style={{ color: 'red' }}>خطأ: {error}</p>}

      {productData && (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>{productData.title}</h2>
          <p><strong>السعر:</strong> {productData.price ? `${productData.price}` : 'غير متوفر'}</p>
          <p><strong>التوافر:</strong> {productData.availability ? 'متوفر' : 'غير متوفر'}</p>
          {productData.image_url && (
            <img src={productData.image_url} alt={productData.title} style={{ maxWidth: '300px', display: 'block', marginTop: '10px' }} />
          )}
        </div>
      )}
    </div>
  );
}