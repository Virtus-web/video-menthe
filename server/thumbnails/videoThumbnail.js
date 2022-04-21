// let ffmpeg = require('fluent-ffmpeg')
// const { spawn } = require('child_process')
// const { createWriteStream } = require('fs')

const VideoDetails = require('../models/video')
const port = require('../config/default').port

// const ffmpegPath = '/usr/bin/ffmpeg'
// const width = 256
// const height = 144

const generateThumbnail = (target, title) => {
    title = title.replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '')

    // let tmpFile = createWriteStream('uploads/thumbnails/' + title + '.jpg')
    // const ffmpeg = spawn(ffmpegPath, [
    //     '-ss',
    //     0,
    //     '-i',
    //     target,
    //     '-vf',
    //     `thumbnail,scale=${width}:${height}`,
    //     '-qscale:v',
    //     '2',
    //     '-frames:v',
    //     '1',
    //     '-f',
    //     'image2',
    //     '-c:v',
    //     'mjpeg',
    //     'pipe:1'
    // ])
    // ffmpeg.stdout.pipe(tmpFile)
    
    const videoDetails = new VideoDetails({
        upload_title: title,
        video_path: target,
        thumbnail_path: 'http://127.0.0.1:' + port + '/api/video/thumbnails/' + encodeURIComponent(title + '.jpg')
    })
    videoDetails
    .save()
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = {
  generateThumbnail: generateThumbnail
}
