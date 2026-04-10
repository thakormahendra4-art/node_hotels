const express = require('express')
const router = express.Router();

const menuItem = require('../models/menuItem');

router.post('/', async (req,res) =>{
            try{
                const data = req.body
                const newmenuItem = new menuItem(data)

                const response = await newmenuItem.save();
                console.log('data saves');
                res.status(200).json(response);
            }
            catch(err){
                console.log(err);
                res.status(500).json({error: 'Internal server Error'});
            
            }
})


router.get('/:testType', async (req,res) =>{
        try{
                const testType = req.params.testType;
                if(['sweet','spicy','sour'].includes(testType)){
                    const response = await menuItem.find({work:menuItem});
                    console.log('taste is here');
                    res.status(200).json(response)
                }
                else{
                    res.status(404).json({error:'invalide work type'})
                }  
            }

        catch{
            console.log(err);
            res.status(500).json({error: 'Internal server Error'});
            
        }
})

module.exports = router