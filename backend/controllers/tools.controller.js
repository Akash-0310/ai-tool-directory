const mongoose = require('mongoose');
const Tool = require('../models/Tool');
const seedTools = require('../data/tools.seed');

const isDBConnected = () => mongoose.connection.readyState === 1;

// In-memory fallback if MongoDB is not running — so the frontend demo still works.
const memoryTools = seedTools.map((t, idx) => ({
  _id: `mem-${idx}`,
  ...t,
  createdAt: new Date(Date.now() - idx * 86400000).toISOString(),
}));

const matchQuery = (tool, { q, category, pricing }) => {
  if (category && category !== 'All' && tool.category !== category) return false;
  if (pricing && tool.pricing !== pricing) return false;
  if (q) {
    const needle = q.toLowerCase();
    const hay = `${tool.name} ${tool.description} ${(tool.tags || []).join(' ')}`.toLowerCase();
    if (!hay.includes(needle)) return false;
  }
  return true;
};

exports.listTools = async (req, res, next) => {
  try {
    const { q, category, pricing, sort = 'rating' } = req.query;

    const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 60);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const skip = (page - 1) * limit;

    const pageMeta = (total) => ({
      total,
      page,
      limit,
      pages: Math.max(Math.ceil(total / limit), 1),
    });

    if (isDBConnected()) {
      const filter = {};
      if (category && category !== 'All') filter.category = category;
      if (pricing) filter.pricing = pricing;
      if (q) {
        filter.$or = [
          { name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { tags: { $regex: q, $options: 'i' } },
        ];
      }
      const sortObj =
        sort === 'newest' ? { createdAt: -1 } : sort === 'name' ? { name: 1 } : { rating: -1 };
      const [data, total] = await Promise.all([
        Tool.find(filter).sort(sortObj).skip(skip).limit(limit),
        Tool.countDocuments(filter),
      ]);
      return res.json({ success: true, count: data.length, ...pageMeta(total), data });
    }

    // In-memory fallback
    let data = memoryTools.filter((t) => matchQuery(t, { q, category, pricing }));
    if (sort === 'newest') data = [...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (sort === 'name') data = [...data].sort((a, b) => a.name.localeCompare(b.name));
    else data = [...data].sort((a, b) => b.rating - a.rating);
    const total = data.length;
    const paged = data.slice(skip, skip + limit);
    return res.json({ success: true, count: paged.length, ...pageMeta(total), data: paged });
  } catch (err) {
    next(err);
  }
};

exports.getFeatured = async (_req, res, next) => {
  try {
    if (isDBConnected()) {
      const data = await Tool.find({ featured: true }).limit(6).sort({ rating: -1 });
      return res.json({ success: true, data });
    }
    const data = memoryTools.filter((t) => t.featured).slice(0, 6);
    return res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (_req, res, next) => {
  try {
    const source = isDBConnected() ? await Tool.find({}, 'category') : memoryTools;
    const counts = source.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {});
    const categories = Object.entries(counts).map(([name, count]) => ({ name, count }));
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const tool = isDBConnected()
      ? await Tool.findOne({ slug })
      : memoryTools.find((t) => t.slug === slug);
    if (!tool) return res.status(404).json({ success: false, message: 'Tool not found' });
    res.json({ success: true, data: tool });
  } catch (err) {
    next(err);
  }
};
