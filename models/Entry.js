const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    isCrossed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    isPrivate: { type: Boolean, default: false },
});

module.exports = mongoose.model("Entry", EntrySchema);