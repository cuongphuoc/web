const model_acc = require('../model/account');

const jwt=require('jsonwebtoken');

class accountcontroller {
    //begin account
    
    getaccount(req, res) {
        model_acc.find({})
            .then(acc => {

                res.json({
                    acc: acc,

                });

            })
            .catch(err => {
                return res.json({ err: "loi" });
            })
    }
    createaccount(req, res) {
        model_acc({
            name: req.body.name,
            password: req.body.password,
            vip: req.body.vip,
        }).save()
            .then(acc => {
                return res.json({mess:"thêm account thành công "});
            });
    }
    deleteaccount(req, res) {

        model_acc.deleteOne({ _id: req.body.id })
            .then(acc => {
                return res.json(acc);
            })
            .catch(err => {
                return res.json({ err: "loi" });
            })
    }

    updateaccount(req, res) {
        model_acc.updateOne({ _id: req.body.id }, {
            name: req.body.name,
            password: req.body.password,
            vip: req.body.vip

        })
            .then(acc => {
                return res.json({mess:"update thành công",acc:acc});
            })
            .catch(err => {
                return res.json({err:"update thất bại"});
            })

    }
    //end account



    //begin loggin
    login(req, res) {
        model_acc.findOne({
            name: req.body.name,
            password: req.body.password
        })
            .then((acc) => {
                if (acc) {
                  
                  const access_token=jwt.sign({vip:acc.vip,_id:acc._id},"access_token",{expiresIn:"30m"})
                   console.log(access_token, typeof access_token);
                   
                   res.json({
                    status:"Bạn đăng nhập thành công",
                    data:{
                        access_token,

                    }
                   })
                    
                   

                }else{
                    res.json({err:"bạn đã sai mật khẩu hoặc tên tài khoản"});
                }



            }
            )

    }






}
module.exports = new accountcontroller;