const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema(
    {
        title : {type: String, required: true, unique: true},
        gallery: {type: String},
        desc: {type: String, required: true},
        img: {type: Array, default: {}},
        date: {type: String, required: true},
        direction: {type: String, required: true},
        exibitArt: {type: String},
        exibitLink: {type: String},
    },
    {timestamps: true}
);
module.exports = mongoose.model("Events", EventsSchema);