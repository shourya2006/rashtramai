const mongoose = require('mongoose');

const RelatedBillsSchema = new mongoose.Schema({
  billId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  billTitle: {
    type: String,
    required: true,
  },
  relatedBills: [{
    billId: String,
    title: String,
    link: String,
    status: String,
    pdf: String,
    similarityScore: Number,
  }],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
RelatedBillsSchema.index({ billId: 1 });
RelatedBillsSchema.index({ lastUpdated: -1 });

module.exports = mongoose.model('RelatedBills', RelatedBillsSchema);
