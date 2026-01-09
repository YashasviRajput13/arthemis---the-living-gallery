const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Collection = require('../models/Collection');
const Artwork = require('../models/Artwork');

// @desc    Get all collections
// @route   GET /api/collections
// @access  Public
exports.getCollections = asyncHandler(async (req, res, next) => {
  // If user is authenticated, show their private collections too
  let query = {};
  if (!req.user) {
    query.isPrivate = false;
  } else if (req.query.user && req.query.user === 'me') {
    query.user = req.user.id;
  } else if (req.query.user) {
    query = { user: req.query.user, $or: [{ isPrivate: false }, { user: req.user.id }] };
  }

  const collections = await Collection.find(query)
    .populate('user', 'username avatar')
    .populate('artworks', 'title image artist');

  res.status(200).json({
    success: true,
    count: collections.length,
    data: collections
  });
});

// @desc    Get single collection
// @route   GET /api/collections/:id
// @access  Public
exports.getCollection = asyncHandler(async (req, res, next) => {
  const collection = await Collection.findById(req.params.id)
    .populate('user', 'username avatar')
    .populate({
      path: 'artworks',
      select: 'title image artist likes saves',
      populate: {
        path: 'artist',
        select: 'username avatar'
      }
    });

  if (!collection) {
    return next(
      new ErrorResponse(`Collection not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if collection is private and user is not the owner
  if (collection.isPrivate && (!req.user || collection.user._id.toString() !== req.user.id)) {
    return next(
      new ErrorResponse('Not authorized to access this collection', 401)
    );
  }

  res.status(200).json({
    success: true,
    data: collection
  });
});

// @desc    Create new collection
// @route   POST /api/collections
// @access  Private
exports.createCollection = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const collection = await Collection.create(req.body);

  res.status(201).json({
    success: true,
    data: collection
  });
});

// @desc    Update collection
// @route   PUT /api/collections/:id
// @access  Private
exports.updateCollection = asyncHandler(async (req, res, next) => {
  let collection = await Collection.findById(req.params.id);

  if (!collection) {
    return next(
      new ErrorResponse(`Collection not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is collection owner or admin
  if (collection.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this collection`,
        401
      )
    );
  }

  // If updating cover image
  if (req.body.coverImage) {
    collection.coverImage = req.body.coverImage;
    await collection.save();
  } else {
    collection = await Collection.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  }

  res.status(200).json({
    success: true,
    data: collection
  });
});

// @desc    Delete collection
// @route   DELETE /api/collections/:id
// @access  Private
exports.deleteCollection = asyncHandler(async (req, res, next) => {
  const collection = await Collection.findById(req.params.id);

  if (!collection) {
    return next(
      new ErrorResponse(`Collection not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is collection owner or admin
  if (collection.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this collection`,
        401
      )
    );
  }

  await collection.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add artwork to collection
// @route   POST /api/collections/:collectionId/artworks/:artworkId
// @access  Private
exports.addArtworkToCollection = asyncHandler(async (req, res, next) => {
  const collection = await Collection.findById(req.params.collectionId);
  const artwork = await Artwork.findById(req.params.artworkId);

  if (!collection) {
    return next(
      new ErrorResponse(`Collection not found with id of ${req.params.collectionId}`, 404)
    );
  }

  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.artworkId}`, 404)
    );
  }

  // Make sure user is collection owner
  if (collection.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this collection`,
        401
      )
    );
  }

  // Check if artwork is already in collection
  if (collection.artworks.includes(req.params.artworkId)) {
    return next(
      new ErrorResponse('Artwork already exists in this collection', 400)
    );
  }

  // Add artwork to collection
  collection.artworks.unshift(req.params.artworkId);
  await collection.save();

  // If this is the first artwork, set it as the cover image
  if (collection.artworks.length === 1 && !collection.coverImage) {
    collection.coverImage = artwork.image;
    await collection.save();
  }

  res.status(200).json({
    success: true,
    data: collection
  });
});

// @desc    Remove artwork from collection
// @route   DELETE /api/collections/:collectionId/artworks/:artworkId
// @access  Private
exports.removeArtworkFromCollection = asyncHandler(async (req, res, next) => {
  const collection = await Collection.findById(req.params.collectionId);
  const artwork = await Artwork.findById(req.params.artworkId);

  if (!collection) {
    return next(
      new ErrorResponse(`Collection not found with id of ${req.params.collectionId}`, 404)
    );
  }

  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.artworkId}`, 404)
    );
  }

  // Make sure user is collection owner
  if (collection.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this collection`,
        401
      )
    );
  }

  // Check if artwork is in collection
  if (!collection.artworks.includes(req.params.artworkId)) {
    return next(
      new ErrorResponse('Artwork is not in this collection', 400)
    );
  }

  // Remove artwork from collection
  const removeIndex = collection.artworks.indexOf(req.params.artworkId);
  collection.artworks.splice(removeIndex, 1);
  
  // If this was the cover image and it's the last artwork, remove the cover image
  if (collection.coverImage === artwork.image && collection.artworks.length === 0) {
    collection.coverImage = 'default-collection.jpg';
  }
  
  await collection.save();

  res.status(200).json({
    success: true,
    data: collection
  });
});

// @desc    Get all artworks in a collection
// @route   GET /api/collections/:id/artworks
// @access  Public
exports.getCollectionArtworks = asyncHandler(async (req, res, next) => {
  const collection = await Collection.findById(req.params.id);

  if (!collection) {
    return next(
      new ErrorResponse(`Collection not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if collection is private and user is not the owner
  if (collection.isPrivate && (!req.user || collection.user.toString() !== req.user.id)) {
    return next(
      new ErrorResponse('Not authorized to access this collection', 401)
    );
  }

  const artworks = await Artwork.find({ _id: { $in: collection.artworks } })
    .populate('artist', 'username avatar')
    .select('title image artist likes saves createdAt');

  res.status(200).json({
    success: true,
    count: artworks.length,
    data: artworks
  });
});
