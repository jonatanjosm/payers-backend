const express = require('express');
const { checkApiKey } = require('../../middleware/auth');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');


router.post('/create', function (req, res, number){
    const errorMessage = 'An error has occurred while creating user';
    try{
        controller.createUserBussiness(req.body)
            .then((data) => {
                if(data){
                    response.success(req, res, data);
                } else {
                    response.error(req, res, errorMessage, 500, "Error");   
                }
            })
            .catch((message) => {
                response.error(req, res, message, 500, errorMessage);
            });
    }catch (err) {
        console.error(err);
        response.error(req, res, err, 500, errorMessage)
    }
    
})

router.post('/login', function (req, res, number){
    const errorMessage = 'An error has occurred while logging in';
    try{
        controller.logInBussiness(req.body)
            .then((data) => {
                if(data){
                    response.success(req, res, data);
                } else {
                    response.error(req, res, errorMessage, 200, "Error");   
                }
            })
            .catch((message) => {
                response.error(req, res, message, 200, errorMessage);
            });
    }catch (err) {
        console.error(err);
        response.error(req, res, err, 500, errorMessage)
    }
    
})

module.exports = router;