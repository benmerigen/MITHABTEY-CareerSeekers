import mongoose from "mongoose";

/**
 * @file userModel.js is a mongoose schema model for the user
 * It includes the username, email, password, avatar, role, traits, and suitable jobs.
 * It uses the mongoose library to interact with the database.
 */
const userSchema = new mongoose.Schema({
  // Username of the user
  username: {
    type: String, // The data type is String
    required: true, // This field is mandatory
  },
  
  // Email of the user
  email: {
    type: String, // The data type is String
    required: true, // This field is mandatory
    unique: true, // This field must be unique across all documents in the collection
  },
  
  // Password of the user
  password: {
    type: String, // The data type is String
    required: true, // This field is mandatory
  },
  
  // Avatar image URL of the user
  avatar: {
    type: String, // The data type is String
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" // Default image URL if none is provided
  },
  
  // Role of the user
  role: {
    type: String, // The data type is String
    enum: ['Regular', 'Admin'], // Allowed values for this field
    default: 'Regular', // Default value if none is provided
  },
  
  // Traits associated with the user, represented as an object with various categories
  traits: {
    Business: {
      type: Number, // The data type is Number
      default: 0 // Default value if none is provided
    },
    'General Culture': {
      type: Number, // The data type is Number
      default: 0 // Default value if none is provided
    },
    'Arts and Entertainment': {
      type: Number, // The data type is Number
      default: 0 // Default value if none is provided
    },
    Science: {
      type: Number, // The data type is Number
      default: 0 // Default value if none is provided
    },
    Organization: {
      type: Number, // The data type is Number
      default: 0 // Default value if none is provided
    },
    Service: {
      type: Number, // The data type is Number
      default: 0 // Default value if none is provided
    },
    Outdoor: {
      type: Number, // The data type is Number
      default: 0 // Default value if none is provided
    },
    Technology: {
      type: Number, // The data type is Number
      default: 0 // Default value if none is provided
    }
  },
  
  // Suitable jobs for the user, represented as an array of objects
  SuitableJobs: {
    type: [
      {
        job: {
          type: String, // The data type is String
          required: true // This field is mandatory within each job object
        },
        percentage: {
          type: Number, // The data type is Number
          required: true // This field is mandatory within each job object
        }
      }
    ],
    default: [] // Default value is an empty array if none is provided
  },
},
  { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

export default User;
