const mongoose = require('mongoose');

const SalesPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  assignedAreas: [{ type: String }],
  isActive: { type: Boolean, default: true },
  commissionRate: { type: Number, default: 5 },
  createdBy: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SalesPerson', SalesPersonSchema);