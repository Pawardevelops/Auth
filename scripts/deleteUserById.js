const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/userModel');  // Adjust the path according to your project structure

// Check if the email argument is provided
if (process.argv.length < 3) {
  console.error('Please provide an email address as an argument');
  process.exit(1);
}

const email = process.argv[2];

// Connect to MongoDB and delete user by email
const deleteUserByEmail = async (email) => {
  try {
    await mongoose.connect("mongodb+srv://sp20002511:kz6jKfFEcf1rHoMj@user.evcjoy5.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    const result = await User.deleteOne({ email });
    if (result.deletedCount === 0) {
      console.log(`No user found with email: ${email}`);
    } else {
      console.log(`Deleted user with email: ${email}`);
    }
  } catch (err) {
    console.error('Error deleting user:', err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
deleteUserByEmail(email);
