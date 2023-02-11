const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CacheSchema = new Schema(
  {
    key: String,
    data: Schema.Types.Mixed,
    expiresAt: Date,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

module.exports = mongoose.model('cache', CacheSchema);
