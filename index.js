var nodeSpotifyWebHelper = require('node-spotify-webhelper');
var spotify = new nodeSpotifyWebHelper.SpotifyWebHelper();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
global.currentSong = ''

require('./js/eeg.js')

getStatus()

// get the name of the song which is currently playing
function getStatus(){
  spotify.getStatus(function (err, res) {
    if (err) {
      return console.error(err);
    }

    currentSong = res.track.artist_resource.name + ' - ' + res.track.track_resource.name
    // console.info('currently playing: ' +currentSong)
    getStatus();
  });
}
