// src/app/api/track-product/route.js
import axios from 'axios';
import * as cheerio from 'cheerio';
import prisma from '../../../lib/prisma'; // تأكد من أن المسار صحيح

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json({ message: 'URL is required' }, { status: 400 });
    }
    
    // سحب البيانات من الرابط
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });
    const $ = cheerio.load(data);
    
    // **هام**: هذه المحددات (selectors) هي أمثلة عامة ويجب تعديلها لتناسب المواقع الفعلية
    // يمكنك الحصول على المحدد الصحيح باستخدام "Inspect" في متصفحك
    // 
    const title = $('h1.product-title').text().trim() || null;
    const priceText = $('.price-display .value').text().trim() || null;
    const availabilityText = $('.stock-status').text().trim() || null;
    const imageUrl = $('.product-image img').attr('src') || null;
    
    // معالجة البيانات قبل التخزين
    const price = priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : null;
    const availability = availabilityText ? availabilityText.toLowerCase().includes('in stock') : null;

    // حفظ البيانات في قاعدة البيانات باستخدام Prisma
    const product = await prisma.product.create({
      data: {
        url,
        title,
        price,
        availability,
        image_url: imageUrl,
      },
    });

    return Response.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching or parsing product data:', error);
    return Response.json({ message: 'فشل في سحب بيانات المنتج، الرجاء التأكد من الرابط.', error: error.message }, { status: 500 });
  }
}