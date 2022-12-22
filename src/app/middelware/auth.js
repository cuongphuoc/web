const jwt=require('jsonwebtoken');
class authMid {
    checklogin(req,res,next){
        //console.log(req.headers.token);
       
          try {
            const token=req.headers.token;
            const result= jwt.verify(token, 'access_token');
            console.log(result);
            if(typeof result.vip==="boolean"){
              req._iduser=result._id;
             next();
            }
          } catch (error) {
            return res.json({err:"ban cần đăng nhập"})
          }
                }
    
    checkboss(req,res,next){
        console.log(req.headers.token);
          try {
            const token=req.headers.token;
            const result= jwt.verify(token, 'access_token');
            console.log(result);
            if(result.vip){
             
             next();
            }else{
              return res.json({err:"ban cần đăng nhập với tư cách boss để sử dụng tính năng"});
            }
          } catch (error) {
            return res.json({err:"ban cần đăng nhập với tư cách boss để sử dụng tính năng"});
          }
                }
}

module.exports=new authMid;