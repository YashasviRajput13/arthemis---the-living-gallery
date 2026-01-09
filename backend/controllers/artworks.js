const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Artwork = require('../models/Artwork');
const User = require('../models/User');
const Collection = require('../models/Collection');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// @desc    Get all artworks
// @route   GET /api/artworks
// @access  Public
exports.getArtworks = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Search artworks
// @route   GET /api/artworks/search
// @access  Public
exports.searchArtworks = asyncHandler(async (req, res, next) => {
  const { q, medium, style, minYear, maxYear, sort } = req.query;
  
  // Build query
  const query = {};
  
  // Search by text
  if (q) {
    query.$text = { $search: q };
  }
  
  // Filter by medium
  if (medium) {
    query.medium = { $in: medium.split(',') };
  }
  
  // Filter by style
  if (style) {
    query.style = { $in: style.split(',') };
  }
  
  // Filter by year range
  if (minYear || maxYear) {
    query.year = {};
    if (minYear) query.year.$gte = parseInt(minYear);
    if (maxYear) query.year.$lte = parseInt(maxYear);
  }
  
  // Execute query
  let queryResult = Artwork.find(query).populate('artist', 'username avatar');
  
  // Sort
  if (sort) {
    const sortBy = {};
    if (sort === 'newest') sortBy.createdAt = -1;
    if (sort === 'oldest') sortBy.createdAt = 1;
    if (sort === 'popular') sortBy.views = -1;
    queryResult = queryResult.sort(sortBy);
  } else {
    queryResult = queryResult.sort('-createdAt');
  }
  
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Artwork.countDocuments(query);
  
  queryResult = queryResult.skip(startIndex).limit(limit);
  
  // Execute query
  const artworks = await queryResult;
  
  // Pagination result
  const pagination = {};
  
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }
  
  res.status(200).json({
    success: true,
    count: artworks.length,
    pagination,
    data: artworks
  });
});

// @desc    Get single artwork
// @route   GET /api/artworks/:id
// @access  Public
exports.getArtwork = asyncHandler(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id)
    .populate('artist', 'username avatar')
    .populate('comments');
    
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Increment view count
  artwork.views += 1;
  await artwork.save();
  
  res.status(200).json({
    success: true,
    data: artwork
  });
});

// @desc    Create new artwork
// @route   POST /api/artworks
// @access  Private/Artist
exports.createArtwork = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.artist = req.user.id;
  
  // Check if user has artist role
  if (req.user.role !== 'artist' && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add an artwork`,
        401
      )
    );
  }
  
  const artwork = await Artwork.create(req.body);
  
  res.status(201).json({
    success: true,
    data: artwork
  });
});

// @desc    Update artwork
// @route   PUT /api/artworks/:id
// @access  Private/Artist
exports.updateArtwork = asyncHandler(async (req, res, next) => {
  let artwork = await Artwork.findById(req.params.id);
  
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Make sure user is artwork owner or admin
  if (artwork.artist.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this artwork`,
        401
      )
    );
  }
  
  artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: artwork
  });
});

// @desc    Delete artwork
// @route   DELETE /api/artworks/:id
// @access  Private/Artist
exports.deleteArtwork = asyncHandler(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id);
  
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Make sure user is artwork owner or admin
  if (artwork.artist.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this artwork`,
        401
      )
    );
  }
  
  // Delete image from cloudinary if exists
  if (artwork.image && artwork.image.includes('res.cloudinary.com')) {
    const publicId = artwork.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`arthemis/artworks/${publicId}`);
  }
  
  await artwork.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Like an artwork
// @route   POST /api/artworks/:id/like
// @access  Private
exports.likeArtwork = asyncHandler(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id);
  
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Check if the artwork has already been liked
  if (artwork.likes.includes(req.user.id)) {
    return next(new ErrorResponse('Artwork already liked', 400));
  }
  
  artwork.likes.unshift(req.user.id);
  await artwork.save();
  
  res.status(200).json({
    success: true,
    data: artwork.likes
  });
});

// @desc    Unlike an artwork
// @route   DELETE /api/artworks/:id/like
// @access  Private
exports.unlikeArtwork = asyncHandler(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id);
  
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Check if the artwork has not yet been liked
  if (!artwork.likes.includes(req.user.id)) {
    return next(new ErrorResponse('Artwork has not yet been liked', 400));
  }
  
  // Get remove index
  const removeIndex = artwork.likes.indexOf(req.user.id);
  artwork.likes.splice(removeIndex, 1);
  
  await artwork.save();
  
  res.status(200).json({
    success: true,
    data: artwork.likes
  });
});

// @desc    Save an artwork to user's saved collection
// @route   POST /api/artworks/:id/save
// @access  Private
exports.saveArtwork = asyncHandler(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id);
  
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Check if the artwork has already been saved
  if (artwork.saves.includes(req.user.id)) {
    return next(new ErrorResponse('Artwork already saved', 400));
  }
  
  // Add to artwork's saves
  artwork.saves.unshift(req.user.id);
  await artwork.save();
  
  // Add to user's savedArtworks
  const user = await User.findById(req.user.id);
  user.savedArtworks.unshift(artwork._id);
  await user.save();
  
  res.status(200).json({
    success: true,
    data: artwork.saves
  });
});

// @desc    Unsave an artwork from user's saved collection
// @route   DELETE /api/artworks/:id/save
// @access  Private
exports.unsaveArtwork = asyncHandler(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id);
  
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Check if the artwork has been saved
  if (!artwork.saves.includes(req.user.id)) {
    return next(new ErrorResponse('Artwork has not been saved', 400));
  }
  
  // Get remove index from artwork's saves
  const removeArtworkIndex = artwork.saves.indexOf(req.user.id);
  artwork.saves.splice(removeArtworkIndex, 1);
  
  // Get remove index from user's savedArtworks
  const user = await User.findById(req.user.id);
  const removeUserIndex = user.savedArtworks.indexOf(artwork._id);
  user.savedArtworks.splice(removeUserIndex, 1);
  
  await Promise.all([artwork.save(), user.save()]);
  
  res.status(200).json({
    success: true,
    data: artwork.saves
  });
});

// @desc    Get likes for an artwork
// @route   GET /api/artworks/:id/likes
// @access  Public
exports.getArtworkLikes = asyncHandler(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id).populate('likes', 'username avatar');
  
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  res.status(200).json({
    success: true,
    count: artwork.likes.length,
    data: artwork.likes
  });
});

// @desc    Get saves for an artwork
// @route   GET /api/artworks/:id/saves
// @access  Public
exports.getArtworkSaves = asyncHandler(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id).populate('saves', 'username avatar');
  
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  res.status(200).json({
    success: true,
    count: artwork.saves.length,
    data: artwork.saves
  });
});

// @desc    Get comments for an artwork
// @route   GET /api/artworks/:id/comments
// @access  Public
exports.getArtworkComments = asyncHandler(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id).populate({
    path: 'comments',
    populate: {
      path: 'user',
      select: 'username avatar'
    }
  });
  
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  res.status(200).json({
    success: true,
    count: artwork.comments.length,
    data: artwork.comments
  });
});

// @desc    Upload image for artwork
// @route   PUT /api/artworks/:id/image
// @access  Private/Artist
exports.uploadArtworkImage = asyncHandler(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id);
  
  if (!artwork) {
    return next(
      new ErrorResponse(`Artwork not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Make sure user is artwork owner or admin
  if (artwork.artist.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this artwork`,
        401
      )
    );
  }
  
  if (!req.file) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  
  // Check file type
  if (!req.file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }
  
  // Check file size
  const maxSize = process.env.MAX_FILE_UPLOAD || 1000000; // 1MB default
  if (req.file.size > maxSize) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${maxSize / 1000}KB`,
        400
      )
    );
  }
  
  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'arthemis/artworks',
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    resource_type: 'image',
    transformation: [
      { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
      { fetch_format: 'auto' }
    ]
  });
  
  // Remove file from server
  fs.unlinkSync(req.file.path);
  
  // Delete old image from Cloudinary if exists
  if (artwork.image && artwork.image.includes('res.cloudinary.com')) {
    const publicId = artwork.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`arthemis/artworks/${publicId}`);
  }
  
  // Update artwork with new image
  artwork.image = result.secure_url;
  await artwork.save();
  
  res.status(200).json({
    success: true,
    data: artwork
  });
});
