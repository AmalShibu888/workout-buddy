const express = require('express');

const router =  express.Router();
const {addWorkout , getWorkouts , getWorkout ,delWorkout,updateWorkout} = require('../controllers/controllers.js');
const  confirmAuth  = require('../middleware/middleware.js');


router.use(confirmAuth);

router.get('/' ,getWorkouts)

router.get('/:id' ,getWorkout)

router.post('/' ,addWorkout)



router.delete('/:id' ,delWorkout)


router.patch('/:id' ,updateWorkout)

module.exports = router;