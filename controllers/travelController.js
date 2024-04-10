const Travel = require('../model/travelModel')

const travelController = {
    getAllTravels: async (req, res) => {
        try {
            const travels = await Travel.find();
            res.status(200).json(travels);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getTravelById: async (req, res) => {
        try {
            const travel = await Travel.findById(req.params.id);
            if (!travel) {
                return res.status(404).json({ error: 'Travel not found' });
            }
            res.status(200).json(travel);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createTravel: async (req, res) => {
        try {
            const { destination, source, name, date } = req.body;
            console.log({ destination, source, name, date });
            const newTravel = new Travel({ destination, source, name, date });
            await newTravel.save();
            res.status(201).json(newTravel);
        } catch (error) {
            res.status(400).json({ error: 'Bad Request' });
        }
    },

    updateTravel: async (req, res) => {
        try {
            const updatedTravel = await Travel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedTravel) {
                return res.status(404).json({ error: 'Travel not found' });
            }
            res.status(200).json(updatedTravel);
        } catch (error) {
            res.status(400).json({ error: 'Bad Request' });
        }
    },

    deleteTravel: async (req, res) => {
        try {
            const deletedTravel = await Travel.findByIdAndDelete(req.params.id);
            if (!deletedTravel) {
                return res.status(404).json({ error: 'Travel not found' });
            }
            res.status(200).json({ message: 'Travel deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Bad Request' });
        }
    },
    showMatchingPassengers: async (req, res) => {
        try {
            const { destination, source, date } = req.body;
            const query = {};
            if (destination) {
                query.destination = destination;
            }

            if (source) {
                query.source = source;
            }

            if (date) {
                query.date = date;
            }
            console.log(destination);
            const matchingPassengers = await Travel.find(query);
            res.status(200).json(matchingPassengers);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = travelController;
