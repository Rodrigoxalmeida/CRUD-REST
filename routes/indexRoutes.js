const router = require('express').Router();

//rota inicial / endpoint
router.get('/', (req, res)=>{
    res.json({message: 'OI express'});
});

module.exports = router;