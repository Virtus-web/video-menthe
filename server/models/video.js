const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    upload_title: { type: String, required: true },
    video_path: { type: String, required: true },
    thumbnail_path: { type: String, required: true }
})

module.exports = mongoose.model('upload', VideoSchema)
