const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  image: {
    type: String,
    required: [true, 'Please upload an image']
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medium: [{
    type: String,
    required: [true, 'Please provide at least one medium']
  }],
  style: [{
    type: String
  }],
  year: {
    type: Number,
    min: [1000, 'Year must be a valid year'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  dimensions: {
    height: Number,
    width: Number,
    depth: Number,
    unit: {
      type: String,
      enum: ['cm', 'in', 'm', 'ft'],
      default: 'cm'
    }
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative']
  },
  isForSale: {
    type: Boolean,
    default: false
  },
  isNFS: {
    type: Boolean,
    default: false
  },
  tags: [String],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  saves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create index for search functionality
artworkSchema.index({
  title: 'text',
  description: 'text',
  medium: 'text',
  style: 'text',
  tags: 'text'
});

// Virtual for comments
artworkSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'artwork',
  justOne: false
});

// Cascade delete comments when an artwork is deleted
artworkSchema.pre('remove', async function(next) {
  await this.model('Comment').deleteMany({ artwork: this._id });
  next();
});

// Static method to get average rating
artworkSchema.statics.getAverageRating = async function(artworkId) {
  const obj = await this.model('Review').aggregate([
    {
      $match: { artwork: artworkId }
    },
    {
      $group: {
        _id: '$artwork',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Artwork').findByIdAndUpdate(artworkId, {
      averageRating: obj[0] ? obj[0].averageRating : 0
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save or delete of reviews
artworkSchema.post('save', function() {
  this.constructor.getAverageRating(this._id);
});

module.exports = mongoose.model('Artwork', artworkSchema);
