const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: ['Writing', 'Image', 'Video', 'Coding', 'Audio', 'Productivity', 'Marketing', 'Research'],
      index: true,
    },
    tags: [{ type: String }],
    description: { type: String, required: true },
    longDescription: { type: String },
    rating: { type: Number, min: 0, max: 5, default: 4.5 },
    reviews: { type: Number, default: 0 },
    pricing: {
      type: String,
      enum: ['Free', 'Freemium', 'Paid', 'Free Trial'],
      default: 'Freemium',
    },
    website: { type: String, required: true },
    logo: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ToolSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Tool', ToolSchema);
