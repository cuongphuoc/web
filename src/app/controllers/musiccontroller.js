const model_music = require('../model/music');
const fs = require('fs-extra');
const port=require('../../index');
require('dotenv').config()
class musiccontroller {
    getmusic(req, res) {
        model_music.find({})
            .then(mus => {
                res.json(mus);
            })
            .catch(err => {
                res.json(err)
            })
    }
    
    checkfile(req, res, next) {
        if (req.files) {
            
            if(req.files.value){
                console.log('ton tai file am thanh')
            }else{
               return res.json({err:"vui long nhap file am thanh"});
            }
            if (req.files.img) {
              console.log('ton tai file anh');
            }else{
              return  res.json({err:"vui long nhap file hinh anh thanh"});
                
            }
            const file_img = req.files.img;
            file_img.mv('./src/public/image/' + file_img.name)
                .catch(err => {
                    res.json({ err: "loi chuyen file anh " });
                });

            const file = req.files.value;
            file.mv('./src/public/mp3/' + file.name)
                .catch(err => {
                    res.json({ err: "loi chuyen file music" });
                });

            if (file.mimetype == 'audio/mpeg' && file_img.mimetype == 'image/jpeg') {
                next();
            } else {
                res.json({ err: "vui lòng gửi file âm thanh va hinh anh" })
            }
        } else { res.json({ err: "vui lòng gửi file" }) }
    }



    setmusic(req, res) {
        const file_music = req.files.value;
        const file_img = req.files.img;
        /*console.log(__dirname)*/

        model_music({
            name: req.body.name,
            _iduser: req._iduser,
            author: req.body.author,
            link: `${process.env.localhost}/mp3/${file_music.name}`,
            namefile: file_music.name,
            image: `${process.env.localhost}/image/${file_img.name}`,
        }).save()
            .then(mus => {
                res.json({mess:"đăng bài hát thành công"});
            })
            .catch(err => {
                res.json({err:err});
            })
    }

    deletemusic(req, res) {

        model_music.findOne({ _id: req.body.id })
            .then(value => {
                
                    model_music.deleteOne({ _id: req.body.id })
                        .catch(() => { return res.json({ err: "xoa that bai" }) })
                    console.log("xoa");
                    fs.unlinkSync(`./src/public/mp3/${value.namefile}`);
                    return res.json({ mess: "xoa thanh cong" });
                
            })
            .catch(err => {
                return res.json({ err: "xoa that bai", id: req.body.id, erro: err })
            })
    }

    updatemusic(req, res) {
        const file = req.files.value;
        model_music.findOneAndUpdate({ _id: req.body.id }, {
            name: req.body.name,
            author: req.body.author,
            link: `${process.env.localhost}/mp3/${file.name}`,
            namefile: file.name,
        })
            .then(value => {
               

                    fs.unlinkSync(`./src/public/mp3/${value.namefile}`);
                    return res.json({ sucess: "thanh cong", });
               
            })
            .catch(() => {
                res.json({ err: "sửa that bai" });
            })
    }

}

module.exports = new musiccontroller;