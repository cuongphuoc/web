class inputmidelware{
    checkinputaccount(req,res,next){
        if(!req.body.name||!req.body.password||req.body.vip===null){
            res.json({err:"loi nhap du lieu"});
            console.log("dulieu")
            console.log(req.body.name,req.body.password,req.body.vip,req.body.id);
            
        }else{
            next();
        }
    }

    checkinputmusic(req,res,next){
        if(!req.body.name||!req.body.author){

            res.json({err:"vui long nhap day du music",value:req.body.value,name:req.body.name,author:req.body.author});
        }else{
            next();
        }
    }
}

module.exports=new inputmidelware;