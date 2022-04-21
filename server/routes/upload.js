const express = require('express')
const router = express.Router()
const multer = require('multer')
const thumbnailGenerator = require('../thumbnails/videoThumbnail');
const port = require('../config/default').port
// let ffmpeg = require('fluent-ffmpeg')


//MULTER CONFIG//
let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file, callback) => {
        const name = file.originalname
        callback(null, Date.now() + '_' + name)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50
    }
})

router.post("/", upload.single('file'), (req, res, next) => {
    thumbnailGenerator.generateThumbnail(
    'http://127.0.0.1:' + port + '/api/video/' + req.file.filename.replace(/ /g, '_'), 
    req.file.filename.replace(/ /g, '_'))

    res.status(200).json({
        message: 'Video uploaded successfully'
    })
})

// router.post("/thumbnail", (req, res) => {

//     let filePath = ""
//     let fileDuration = ""

//     ffmpeg.ffprobe(req.body.url, function(error, metadata) {
//         console.dir(metadata)
//         console.log(metadata.format.duration)
//         fileDuration = metadata.format.duration
//     })

//     ffmpeg(req.body.url)
//     .on('filenames', function(filenames) {
//         console.log('will generate' + filenames.join(', '))
//         console.log(filenames)
//         filePath = "uploads/thumbnails/" + filenames[0]
//     })
//     .on('end', function(filenames) {
//         console.log('screenshot taken')
//         console.log(filenames)
//         return res.json({ success: true, url: filePath, fileName: filenames, fileDuration: fileDuration })
//     })
//     .on('error', function(error) {
//         console.log(error)
//         return res.json({ success: false, err })
//     })
//     .screenshots({
//         count: 3,
//         folder: 'uploads/thumbnails',
//         size: '320x240',
//         filename: 'thumbnail-%b.png'
//     })
// })

module.exports = router
