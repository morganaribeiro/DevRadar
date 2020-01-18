const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('./utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        return res.json({devs});
    },

    async create(req, res) {
        const { github, techs, latitude, longitude } = req.body;

        const devRegistered = await Dev.findOne({github})
        if (devRegistered) return res.json(devRegistered);

        const apiResponse = await axios.get(`https://api.github.com/users/${github}`);
        
        const { name = login, avatar_url, bio } = apiResponse.data;
        techsArray = parseStringAsArray(techs)
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        
        const dev = await Dev.create({
            github,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });
    
        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray
        );

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    
        return res.json(dev);
    },

    

    async update(req, res) {
        const { github } = req.params;
        const dev = await Dev.findOne({github});
        const { latitude, longitude, techs, ...rest} = req.body;
        rest.github = github;
        if (latitude && longitude)
            var newLocation = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        if (techs)
            var techsArray = str2array(techs);
        const newDev = await Dev.updateOne({ github }, {
            location: (latitude&&longitude) ? newLocation : dev.location,
            techs: techs ? techsArray : dev.techs,
            ...rest
        });

        return res.json({
            modifiedCount: newDev.nModified,
            ok: newDev.ok
        });
    },

    async destroy(req, res) {
        const { github } = req.params;
        await Dev.deleteOne({ github });
        return res.json();
    }
}