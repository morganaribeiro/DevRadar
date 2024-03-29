const Dev = require('../models/Dev');
const parseStringAsArray = require('./utils/parseStringAsArray');

module.exports = {
    async index(req, res){ // raio 10km + filtro de techs
        const { latitude, longitude, techs } = req.query;

        const devs = await Dev.find({
            techs: {
                $in: parseStringAsArray(techs, true)
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return res.json({devs});
    }
}