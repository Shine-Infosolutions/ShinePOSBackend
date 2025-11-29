const SalesPerson = require('../../models/salesModel/SalesPerson');
const User = require('../../models/auth/User');

// Create SalesPerson
exports.createSalesPerson = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check if User exists and has SALES role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.role !== 'SALES') {
      return res.status(400).json({ error: 'User must have SALES role' });
    }
    
    // Check if SalesPerson already exists for this user
    const existingSalesPerson = await SalesPerson.findOne({ userId });
    if (existingSalesPerson) {
      return res.status(400).json({ error: 'SalesPerson already exists for this user' });
    }
    
    const salesPerson = new SalesPerson(req.body);
    await salesPerson.save();
    
    // Populate user data in response
    await salesPerson.populate('userId', 'name email role');
    res.status(201).json(salesPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all SalesPersons
exports.getAllSalesPersons = async (req, res) => {
  try {
    const salesPersons = await SalesPerson.find()
      .populate('userId', 'name email role isActive')
      .sort({ createdAt: -1 });
    res.json(salesPersons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get SalesPerson by ID
exports.getSalesPersonById = async (req, res) => {
  try {
    const salesPerson = await SalesPerson.findById(req.params.id)
      .populate('userId', 'name email role isActive');
    if (!salesPerson) return res.status(404).json({ error: 'SalesPerson not found' });
    res.json(salesPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get SalesPerson by User ID
exports.getSalesPersonByUserId = async (req, res) => {
  try {
    const salesPerson = await SalesPerson.findOne({ userId: req.params.userId })
      .populate('userId', 'name email role isActive');
    if (!salesPerson) return res.status(404).json({ error: 'SalesPerson not found for this user' });
    res.json(salesPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get My Profile (for logged in sales person)
exports.getMyProfile = async (req, res) => {
  try {
    const salesPerson = await SalesPerson.findOne({ userId: req.user._id })
      .populate('userId', 'name email role isActive');
    if (!salesPerson) return res.status(404).json({ error: 'SalesPerson profile not found' });
    res.json(salesPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update SalesPerson
exports.updateSalesPerson = async (req, res) => {
  try {
    // Don't allow userId to be updated
    const { userId, ...updateData } = req.body;
    
    const salesPerson = await SalesPerson.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    ).populate('userId', 'name email role isActive');
    
    if (!salesPerson) return res.status(404).json({ error: 'SalesPerson not found' });
    res.json(salesPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete SalesPerson
exports.deleteSalesPerson = async (req, res) => {
  try {
    const salesPerson = await SalesPerson.findByIdAndDelete(req.params.id);
    if (!salesPerson) return res.status(404).json({ error: 'SalesPerson not found' });
    res.json({ message: 'SalesPerson deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};