const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CacheSchema = new Schema(
  {
    key: String,
    data: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('cache', CacheSchema);
