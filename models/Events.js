const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema(
    {
        title : {type: String, required: true, unique: true},
        desc: {type: String, required: true},
        img: {type: Array, default: {}},
        date: {type: String, required: true},
        direction: {type: String, required: true}
    },
    {timestamps: true}
);
module.exports = mongoose.model("Events", EventsSchema);