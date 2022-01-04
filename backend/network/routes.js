const express = require('express');
const teams = require('../components/teams/network');
const users = require('../components/users/network')

const routes = (server) => {
    server.use('/api/teams/', teams);
    server.use('/api/users/', users);
}

module.exports = routes