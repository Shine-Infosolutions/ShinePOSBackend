const mongoose = require('mongoose');

const CommissionLogSchema = new mongoose.Schema({
  salesPersonId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesPerson', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  
  month: { type: String, required: true }, // "2025-11"

  subscriptionAmount: { type: Number, required: true }, // Plan amount
  commissionRate: { type: Number, required: true }, // e.g., 20
  commissionAmount: { type: Number, required: true }, // 600

  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paidAt: Date
}, { timestamps: true });

module.exports = mongoose.model('CommissionLog', CommissionLogSchema);
