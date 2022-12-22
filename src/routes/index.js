
const account = require('./account');

const music=require('./music');
function route(app) {


   
   app.use('/api/account', account);
   
   app.use('/api/music',music);
   




}

module.exports = route;
