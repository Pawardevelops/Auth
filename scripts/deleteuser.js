const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/userModel'); // Adjust the path according to your project structure

// Connect to MongoDB and delete all users
const deleteAllUsers = async () => {
  try {
    await mongoose.connect("mongodb+srv://sp20002511:kz6jKfFEcf1rHoMj@user.evcjoy5.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    const result = await User.deleteMany({});
    if (result.deletedCount === 0) {
      console.log('No users found to delete.');
    } else {
      console.log(`Deleted ${result.deletedCount} users.`);
    }
  } catch (err) {
    console.error('Error deleting users:', err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
deleteAllUsers();
