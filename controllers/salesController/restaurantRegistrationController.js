const RestaurantRegistration = require('../../models/salesModel/RestaurantRegistration');

// 1. Sales Person - Create Registration (SECURE)
exports.createRestaurantRegistration = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const registration = new RestaurantRegistration({
      ...req.body,
      salesPersonId: req.user.id,
      status: 'pending'
    });
    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. Sales Person - Submit Registration (SECURE)
exports.submitRestaurantRegistration = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const registration = await RestaurantRegistration.findOneAndUpdate(
      { _id: req.params.id, salesPersonId: req.user.id, status: 'pending' },
      { status: 'submitted' },
      { new: true }
    );
    if (!registration) return res.status(404).json({ error: 'Registration not found or already submitted' });
    res.json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 3. Get All Restaurant Registrations
exports.getAllRestaurantRegistrations = async (req, res) => {
  try {
    const registrations = await RestaurantRegistration.find()
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Get Restaurant Registration By ID
exports.getRestaurantRegistrationById = async (req, res) => {
  try {
    const registration = await RestaurantRegistration.findById(req.params.id);
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Sales Person - Get My Registrations (SECURE)
exports.getMyRegistrations = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const registrations = await RestaurantRegistration.find({
      salesPersonId: req.user.id
    }).sort({ createdAt: -1 });
    
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Sales Person - Update Registration (SECURE)
exports.updateRestaurantRegistration = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const registration = await RestaurantRegistration.findOneAndUpdate(
      { _id: req.params.id, salesPersonId: req.user.id, status: "pending" },  
      req.body,
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ error: "Registration not found or already submitted" });
    }

    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7. Sales Person - Delete Registration (SECURE)
exports.deleteRestaurantRegistration = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const deleted = await RestaurantRegistration.findOneAndDelete({
      _id: req.params.id,
      salesPersonId: req.user.id,
      status: "pending"
    });

    if (!deleted)
      return res.status(404).json({ error: "Cannot delete – Already submitted or not found" });

    res.json({ message: "Registration deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};