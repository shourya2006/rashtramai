const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const baseUrl = 'https://prsindia.org';
  const url = `${baseUrl}/billtrack/`;

  const page = parseInt(req.query.page || '1');
  const limit = parseInt(req.query.limit || '10');
  const skip = (page - 1) * limit;

  try {
    // Fetch main listing
    const { data: body } = await axios.get(url, { headers: { 'Cache-Control': 'no-store' } });
    const $ = cheerio.load(body);

    const allBills = [];

    $('.view-content .views-row').each((i, el) => {
      const billTitle = $(el).find('.views-field-title-field a').text().trim();
      const detailLink = $(el).find('.views-field-title-field a').attr('href');
      const status = $(el).find('.views-field-field-bill-status span').text().trim();

      if (billTitle && detailLink) {
        allBills.push({
          id: i + 1,
          title: billTitle,
          link: baseUrl + detailLink,
          status: status || 'Unknown',
          pdf: null,
        });
      }
    });

    // Paginate
    const paginatedBills = allBills.slice(skip, skip + limit);

    // Try fetching PDFs for the current page only (optional)
    for (const bill of paginatedBills) {
      try {
        const { data: html } = await axios.get(bill.link);
        const $$ = cheerio.load(html);
        const pdfLink = $$("a[href$='.pdf']").attr('href');

        if (pdfLink) {
          bill.pdf = pdfLink.startsWith('http')
            ? pdfLink
            : pdfLink.startsWith('/')
            ? baseUrl + pdfLink
            : baseUrl + '/' + pdfLink;
        }
      } catch (err) {
        console.error(`⚠️ Failed to fetch PDF for ${bill.title}: ${err.message}`);
      }
    }

    const totalBills = allBills.length;
    const hasMore = skip + limit < totalBills;

    res.json({
      bills: paginatedBills,
      pagination: {
        page,
        limit,
        total: totalBills,
        hasMore,
        totalPages: Math.ceil(totalBills / limit),
      },
    });
  } catch (error) {
    console.error('❌ Error scraping bills:', error.message);
    res.status(500).json({
      error: 'Failed to fetch bills',
      bills: [],
      pagination: {
        page,
        limit,
        total: 0,
        hasMore: false,
        totalPages: 0,
      },
    });
  }
});

module.exports = router;
