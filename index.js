const express = require("express")
const nft_data =  require('./json/index')
const app = express()
const {sequelize,user,border,nft,replies,shop} = require("./public")
const cors = require("cors");
const uploads = require("./public/upload");
const { findOne } = require("./public/user");

app.use("/uploadimg", express.static(__dirname + "/uploadImg"));
setInterval(() => {
    console.log("매 10초 마다 실행")
    staking()
    // console.log(new Date() , 2000)
}, 10000);
const staking = ()=>{
    nft.findAll({
        raw:true,
        where:{nft_staking : 1}
    }).then((e)=>{
        if(e === null){
            return
        }
        e.map((el)=>{
            if(el.nft_background === el.nft_face){
                if (el.nft_eyes === "Hidden") {
                    if (el.nft_mouse === "Smile") {
                        nft.update({
                            nft_stakingPoint : el.nft_stakingPoint + 300
                        },{
                            where : {nft_tilte : el.nft_tilte}
                        })
                    }
                    else{
                        nft.update({
                            nft_stakingPoint : el.nft_stakingPoint + 250
                        },{
                            where : {nft_tilte : el.nft_tilte}
                        })
                    }
                }
                else{
                    if (el.nft_mouse === "Smile") {
                        nft.update({
                            nft_stakingPoint : el.nft_stakingPoint + 150
                        },{
                            where : {nft_tilte : el.nft_tilte}
                        })
                    }
                    else{
                        nft.update({
                            nft_stakingPoint : el.nft_stakingPoint + 100
                        },{
                            where : {nft_tilte : el.nft_tilte}
                        })
                    }
                }
            }
            else{
                if(el.nft_background === "Hidden" || el.nft_eyes ==="Hidden"){
                    if (el.nft_mouse === "Smile") {
                        nft.update({
                            nft_stakingPoint : el.nft_stakingPoint + 200
                        },{
                            where : {nft_tilte : el.nft_tilte}
                        })
                    }
                    else{
                        nft.update({
                            nft_stakingPoint : el.nft_stakingPoint + 150
                        },{
                            where : {nft_tilte : el.nft_tilte}
                        })
                    }
                }
                else if(el.nft_background === "Hidden" && el.nft_eyes ==="Hidden"){
                    if (el.nft_mouse === "Smile") {
                        nft.update({
                            nft_stakingPoint : el.nft_stakingPoint + 250
                        },{
                            where : {nft_tilte : el.nft_tilte}
                        })
                    }
                    else{
                        nft.update({
                            nft_stakingPoint : el.nft_stakingPoint + 200
                        },{
                            where : {nft_tilte : el.nft_tilte}
                        })
                    }
                }
                else{
                    if (el.nft_mouse === "Smile") {
                        nft.update({
                            nft_stakingPoint : el.nft_stakingPoint + 100
                        },{
                            where : {nft_tilte : el.nft_tilte}
                        })
                    }
                    else{
                        nft.update({
                            nft_stakingPoint : el.nft_stakingPoint + 50
                        },{
                            where : {nft_tilte : el.nft_tilte}
                        })
                    }
                }
            }
        })
    })
}

function createinit(index){
    let el = nft_data[index];
    nft.findOrCreate({
        where: {nft_tilte : el.name},
        defaults:{
            nft_tilte : el.name,
            nft_background : el.attributes[0].value,
            nft_header :el.attributes[1].value,
            nft_face :el.attributes[2].value,
            nft_eyes :el.attributes[3].value,
            nft_mouse :el.attributes[4].value,
        }
    }).then(()=>{
        if(!(nft_data.length-1 <= index))
        {
            createinit(index + 1);
        }
    })
}
const options = {
    credentials: true,
    origin : "http://13.125.218.188" // 이주소 허용
}

// 전달 받은 객체 형태를 해석해서 사용할수 있게 설정
app.use(cors(options));
app.use(express.json());
app.use('/img', express.static('uploads'))

sequelize
  .sync({ force: false }) // force 강제로 초기화를 시킬것인지. (테이블 내용을 다 비워줄것인지)
  .then(() => {
    // 연결 성공
    console.log("DB연결 성공");
    createinit(0)
    console.log("서버 열림")
  })
  .catch((err) => {
    // 연결실패
    console.log(err);
  });
app.post("/login",async(req,res)=>{
    let {id,pw} = req.body;
    console.log(id,pw)
    await user.findOne({
        raw:true,
        where : {user_id : id,user_pw:pw}
    }).then((e)=>{
        if(e == null){
            res.send(false);
        }
        else{
            nft.findAll({raw:true,where:{nft_owner : e.user_nickname}}).then((mynft)=>{
                res.send({user:e,mynft:mynft});
            })
        }
    })
})

app.post("/signup",async(req,res)=>{
    let {id,pw,nickname} = req.body;
    const users = await user.findOne({
        where : {user_id : id}
    }).then((el)=>{
        if(el===null){
            user.findOne({
                where : {user_nickname : nickname}
            }).then((e)=>{
                if(e === null){
                    user.create({
                        user_id : id, user_pw:pw , user_nickname : nickname 
                    }).then(()=>{
                        res.send("가입이 완료되었습니다.")
                    })
                }
                else{
                    res.send("동일한 닉네임이 존재합니다.")
                }
            })
        }
        else{
            res.send("동일한 아이디가 존재합니다.")
        }

    });
})
app.post("/bordercreact",(req,res)=>{
    let { nickname,img,title,content }= req.body
    console.log(nickname,title,content)
    border.create({
        border_title : title,border_content : content,border_writer : nickname,border_writer_profil:img
    }).then(()=>{
        border.findAll({
            raw: true,
        }).then((e)=>{
            res.send(e)
        })
    }).catch((err)=>{
        console.log(err)
        res.send(false)
    })
})
app.post("/border",(req,res)=>{
    border.findAll({
        raw: true,
    }).then((e)=>{
        res.send(e)
    })
})
app.post("/bordershow",async(req,res)=>{
    const {id} = req.body
    await border.findOne({
            raw : true,
            where : {border_id : id}
        }).then((e)=>{
            border.update({
                border_view_count : e.border_view_count+1
            }
            ,
            { where : {border_id : id}}
            ).then(()=>{
                border.findOne({
                    raw : true,
                    where : {border_id : id}
                }).then((el)=>{
                    res.send(el)
                })
            })
            console.log(e.border_view_count+1)
        }).catch((err)=>{
            console.log(err);
        })
})
app.post("/borderdelete",async(req,res)=>{
    const {id} = req.body
    await border.destroy({
        where : {border_id : id}
    }).then(()=>{
        replies.destroy({
            where : {border_id : id}
        })
        .then(()=>{
            border.findAll({
                raw : true
            }).then((e)=>{
                res.send(e)
            })
        })
    }).catch((err)=>{
        console.log(err);
    })
})
app.post("/borderupdate",async(req,res)=>{
    const {id,title,content} = req.body
    console.log("실행돼썽요")
    await border.update(
        {
            border_title : title , border_content : content
        }
        ,{
        where : {border_id : id}
    }).then(()=>{
        border.findOne({
            raw : true,
            where : {border_id : id}
        }).then((e)=>{
            res.send(e)
        })
    
    }).catch((err)=>{
        console.log(err);
    })
})
app.post("/replie",async(req,res)=>{
    const {borderid,nickname,profil,content} = req.body
    await replies.create({
        border_id : borderid,replies_writer : nickname,replies_profil : profil ,replies_content : content
    }).then(()=>{
        replies.findAll({
            raw:true,
            where : {border_id : borderid}
        }).then((e)=>{
            res.send(e)
        })
    })
})
app.post("/replieshow",async(req,res)=>{
    const {borderid} = req.body
    await replies.findAll({
            raw:true,
            where : { border_id:borderid}
        }).then((e)=>{
            res.send(e)
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.post("/repliesdelete",async(req,res)=>{
    const {replies_id,border_id} = req.body
    await replies.destroy({
            raw:true,
            where : { replies_id:replies_id}
        }).then(()=>{
            replies.findAll({
                raw:true,
                where : { border_id:border_id}
            }).then((e)=>{
                res.send(e)
            })
        })
})
app.post("/repliesupdate",async(req,res)=>{
    const {replies_id,border_id,content} = req.body
    await replies.update(
        {
            replies_content : content
        },
        {
        where : { replies_id:replies_id},
        }).then(()=>{
            replies.findAll({
                raw:true,
                where : { border_id:border_id}
            }).then((e)=>{
                res.send(e)
            })
        })
})
app.post("/nft",async(req,res)=>{
    await nft.findAll({raw:true})
    .then((e)=>{
        nft.findAll({raw:true,where :{nft_owner : "null"}}).then((el)=>{
            shop.findAll({raw:true}).then((sell)=>{
                res.send({nft :e,nftcount:el,nftsell:sell})
            })
        })
    }).catch((err)=>{
        console.log(err)
    })
})
app.post("/minting",async(req,res)=>{
    const {nickname,point,minting_id} = req.body
    await user.update({user_point:point},{where : {user_nickname : nickname}}).then(()=>{
        nft.update({nft_owner:nickname},{where: {id :minting_id}}).then(()=>{
            user.findOne({
                raw:true,
                where : {user_nickname : nickname}
            }).then((user)=>{
                nft.findAll({
                    raw:true
                }).then((nftdata)=>{
                    nft.findAll({raw:true,where:{nft_owner : "null"}}).then((nftcount)=>{
                        nft.findAll({raw:true,where:{nft_owner:nickname}}).then((mynft)=>{
                            res.send({user:user,nft:nftdata,nftcount:nftcount,mynft:mynft})
                        })
                    })
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
        })
    })
})

app.post("/nftsell",async(req,res)=>{
    const {price,img,name,nickname,user_profil} = req.body
    await shop.create({
        shop_price : price,shop_img : img,shop_title : name , shop_writer : nickname,shop_writer_profil : user_profil
    }).then(()=>{
        nft.update({
            nft_sell : true
        },{
            where : {nft_owner : nickname,nft_tilte : name}
        })
        shop.findAll({
            raw:true
        }).then((e)=>{
            nft.findAll({raw:true,where:{nft_owner : nickname}}).then((el)=>{
                res.send({nftsell:e ,mynft: el})
            })
        })
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.post("/nftbuy",async(req,res)=>{
    const {id,price,name,nickname,writer} = req.body
    await nft.update({
        nft_owner : nickname ,nft_sell : 0
    },{
        where : {nft_tilte : name}
    }).then(()=>{
        user.findOne({
            raw:true,
            where : {user_nickname : nickname}
        }).then((e)=>{
            user.update({
                user_point: Number(e.user_point) - Number(price)
            },{
                where: {user_nickname : nickname}
            })
        })
        user.findOne({
            raw:true,
            where : {user_nickname : writer}
        }).then((e)=>{
            user.update({
                user_point : Number(e.user_point) +Number(price)
            },{
                where: {user_nickname : writer}
            })
        })
        
        shop.destroy({
            where : {shop_id : id}
        })
        .then(()=>{
            shop.findAll({raw:true}).then((nftsell)=>{
                nft.findAll({raw : true}).then((nfts)=>{
                    nft.findAll({raw: true,where : {nft_owner : nickname}}).then((mynft)=>{
                        user.findOne({raw:true,where:{user_nickname : nickname}}).then((user)=>{
                            res.send({nftsell:nftsell,nft:nfts,mynft:mynft,user:user})
                        })
                    })
                })
            })
        })
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.post("/nftstaking",async(req,res)=>{
    const {name,nickname} = req.body
    await nft.update({nft_staking : 1},{where : {nft_tilte : name}}).then(()=>{
        nft.findAll({where:{nft_owner : nickname}}).then((e)=>{
            res.send({mynft : e})
        })
    })
})
app.post("/stakingPoint",async(req,res)=>{
    const {nickname,stakingpoint,userpoint} = req.body
    await nft.update({nft_stakingPoint : 0},{where : {nft_owner : nickname}}).then(()=>{
        user.update({user_point : Number(userpoint)+Number(stakingpoint)},{where:{user_nickname:nickname}})
        nft.findAll({where:{nft_owner : nickname}}).then((e)=>{
            user.findOne({raw:true,where:{user_nickname:nickname}}).then((el)=>{
                res.send({mynft : e,user:el})
            })
        })
    })
})
app.post("/nftnonstaking",async(req,res)=>{
    const {name,nickname} = req.body
    await user.findOne({raw:true,where:{user_nickname:nickname}}).then((el)=>{
        nft.findOne({raw:true,where:{nft_tilte : name}}).then((e)=>{
            user.update({
               user_point : Number(el.user_point) + Number(e.nft_stakingPoint)
            },{where:{user_nickname:nickname}}).then(()=>{
                user.findOne({raw:true,where:{user_nickname:nickname}}).then((users)=>{
                    nft.update({nft_staking : 0 , nft_stakingPoint : 0},{where : {nft_tilte : name}}).then(()=>{
                        nft.findAll({where:{nft_owner : nickname}}).then((mynft)=>{
                            res.send({mynft : mynft,user : users})
                        })
                    })
                })
            })
        })
    }) 
})
app.post("/stakingcheck",async(req,res)=>{
    const {nickname} = req.body
    await nft.findAll({raw:true,where:{nft_owner : nickname}}).then((el)=>{
        res.send({mynft:el})
    })

})
app.post("/imgupload", uploads.upload.single("files"), (req, res) => {
    const formData = req.body
    user.update(
      {
        user_profil: "uploadimg/" + req.file.originalname.replace(".PNG", ""),
      },
      {
        where: {
          user_nickname: formData.nickname,
        },
      }
    )
      .then(() => {
        user.findOne({raw:true,where:{user_nickname:formData.nickname}}).then((e)=>{
            res.send({user:e})
        })
      })
      .catch((err) => {
        console.log(err);
      });
  });
app.post("/usersdata", (req, res) => {
    user.findAll({raw:true}).then((e)=>{
        res.send({users : e})
    })
  });
app.post("/userschange", (req, res) => {
    const {nickname,type} = req.body
    if(type === "일반유저"){
        user.update({user_whitelist : 0},{where:{user_nickname:nickname}}).then(()=>{
            user.findAll({raw:true}).then((e)=>{
                res.send({users : e})
            })
        })
    }
    else if(type === "화이트리스트"){
        user.update({user_whitelist : 1},{where:{user_nickname:nickname}}).then(()=>{
            user.findAll({raw:true}).then((e)=>{
                res.send({users : e})
            })
        })
    }
    else if(type === "정지"){
        user.update({user_stop : 1},{where:{user_nickname:nickname}}).then(()=>{
            user.findAll({raw:true}).then((e)=>{
                res.send({users : e})
            })
        })
    }
    else if(type === "정지 해제"){
        user.update({user_stop : 0},{where:{user_nickname:nickname}}).then(()=>{
            user.findAll({raw:true}).then((e)=>{
                res.send({users : e})
            })
        })
    }
    else if(type === "관리자"){
        user.update({user_admin : 1},{where:{user_nickname:nickname}}).then(()=>{
            user.findAll({raw:true}).then((e)=>{
                res.send({users : e})
            })
        })
    }
    else if(type === "관리자 해제"){
        user.update({user_admin : 0},{where:{user_nickname:nickname}}).then(()=>{
            user.findAll({raw:true}).then((e)=>{
                res.send({users : e})
            })
        })
    }
  });


app.listen(8000,()=>{
})