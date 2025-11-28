const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  salesPersonId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesPerson', required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: String
  },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);