const express = require('express');

const accountcontroller=require('../app/controllers/accountcontroller');

const inputmidelware=require('../app/middelware/inputmidelware');
const router = express.Router();
const authMid=require('../app/middelware/auth');

router.get('/',authMid.checkboss,accountcontroller.getaccount);
router.post('/',authMid.checkboss, inputmidelware.checkinputaccount,accountcontroller.createaccount);
router.delete('/',accountcontroller.deleteaccount);
router.put('/',authMid.checkboss,inputmidelware.checkinputaccount,accountcontroller.updateaccount);
router.post('/login',accountcontroller.login);


module.exports=router;