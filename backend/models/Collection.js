const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the collection'],
    trim: true,
    maxlength: [50, 'Collection name cannot be more than 50 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artworks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork'
  }],
  coverImage: {
    type: String,
    default: 'default-collection.jpg'
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create index for search functionality
collectionSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text'
});

// Virtual for number of artworks in the collection
collectionSchema.virtual('artworkCount').get(function() {
  return this.artworks.length;
});

// Update user's collections array when a collection is saved
collectionSchema.post('save', async function(doc) {
  try {
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(doc.user, {
      $addToSet: { collections: doc._id }
    });
  } catch (error) {
    console.error('Error updating user collections:', error);
  }
});

// Remove collection from user's collections array when deleted
collectionSchema.pre('remove', async function(next) {
  try {
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(this.user, {
      $pull: { collections: this._id }
    });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Collection', collectionSchema);
