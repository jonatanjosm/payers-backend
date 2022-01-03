const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', function (req, res){
    try{
        const dataResponse = controller.getTeams();
        response.success(req, res, dataResponse);
    }catch (err) {
        response.error(req, res, err, 500, 'Ha ocurrido un error al consultar los equipos')
    }
})

router.get('/:id', function (req, res){
    try{
        const teamId = req.params.id;
        const dataResponse = controller.getPlayersByTeam(teamId);
        response.success(req, res, dataResponse);
    }catch (err) {
        response.error(req, res, err, 500,), 'Ha ocurrido un error al consultar los jugadores'
    }
})

router.get('/players/:position', function (req, res){
    try{
        const position = req.params.position;
        const dataResponse = controller.getPlayersByPosition(position);
        response.success(req, res, dataResponse);
    }catch (err) {
        response.error(req, res, err, 500, 'Ha ocurrido un error al consultar los jugadores')
    }
})

module.exports = router;