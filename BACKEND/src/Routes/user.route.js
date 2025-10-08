import express from 'express'
const router=express();


router.get('/login',(req,res)=>{
    res.send("logged in success !");
})

export default router;