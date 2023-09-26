import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  //   console.log(req.user);
  if (!req.isSeller)
    return next(
      createError(403, "Please upgrade to seller account to create gigs")
    );

  const newGig = new Gig({
    userId: req.user,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    next(error);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    // console.log(gig);
    if (gig.userId !== req.user)
      return next(createError(403, "You can only delete your own gigs!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig deleted successfully!");
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.category && { category: q.category }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && {$gte: q.min}),
        ...(q.max && {$lte: q.max}),
      },
    }),

    ...(q.search && {
      title: { $regex: q.search, $options: "i" },
    }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ createdAt: -1 });
    res.status(200).send(gigs);
  } catch (error) {
    next(error);
  }
};

export const updateGig = async (req, res, next) => {
  try {
  } catch (error) {}
};
