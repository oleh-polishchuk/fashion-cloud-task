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

CacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('cache', CacheSchema);
