const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ffmpeg('videos/example.mp4', { timeout: 0 }).addOptions([
   '-profile:v baseline',
   '-level 3.0',
   '-start_number 0',
   '-hls_time 10',
   '-hls_list_size 0',
   '-f hls'
]).output('videos/output.m3u8').on('end', () => {
   console.info('end');
}).run();