const app = require('express')();
const fs = require('fs');
const hls = require('hls-server');

app.get('/', (req, res) => {
   return res.status(200).sendFile(`${__dirname}/client.html`);
});

const server = app.listen(1442);

new hls(server, {
   exists: (req, cb) => {
      const ext = req.url.split('.').pop();

      if (ext !== 'm3u8' && ext !== 'ts') {
         return (null, cb);
      }

      fs.access(__dirname + req.url, fs.constants, F_OK, function (err) {
         if (err) {
            console.info('File not exist');
            return cb(null, false);
         }

         cb(null, true);
      });
   },
   getManifestStream: (req, cb) => {
      const stream = fs.createReadStream(__dirname + req.url);
      cb(null, stream);
   },
   getSegmentStream: (req, cb) => {
      const stream = fs.createReadStream(__dirname + req.url);
      cb(null, stream);
   }
})