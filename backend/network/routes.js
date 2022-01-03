const express = require('express');
const teams = require('../components/teams/network')

const routes = (server) => {
    server.use('/api/teams/', teams);
}

module.exports = routes