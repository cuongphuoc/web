const express = require('express');

const musiccontroller=require('../app/controllers/musiccontroller');
const auth = require('../app/middelware/auth');
const inputmidelware=require('../app/middelware/inputmidelware');

const router = express.Router();
router.get('/',musiccontroller.getmusic);
router.post('/',auth.checklogin,musiccontroller.checkfile,inputmidelware.checkinputmusic,musiccontroller.setmusic);
router.delete('/',auth.checkboss,musiccontroller.deletemusic);
router.put('/',musiccontroller.checkfile,inputmidelware.checkinputmusic,musiccontroller.updatemusic);
module.exports=router;