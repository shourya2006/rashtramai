const express = require('express');
const { searchSimilarContentForAct, generateResponse } = require('../lib/vectordb');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, actId } = req.body;

    if (!message || !actId) {
      return res.status(400).json({ error: 'Message and act ID are required' });
    }

    console.log(`Searching for content related to: ${message}`);
    const similarContent = await searchSimilarContentForAct(message, actId, 5);

    const context = similarContent
      .map(match => match.metadata.content)
      .join('\n\n');

    console.log('Generating response...');
    const response = await generateResponse(message, context);

    const sources = similarContent.map(match => ({
      score: match.score,
      chunkIndex: match.metadata.chunkIndex,
      content: match.metadata.content.substring(0, 200) + '...',
    }));

    res.json({ response, sources, actId });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({
      error: `Failed to process chat: ${error.message}`,
    });
  }
});

module.exports = router;
