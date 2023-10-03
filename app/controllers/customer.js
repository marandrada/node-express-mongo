const Customer = require('../models/customer')

const create = async (req, res) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).send({ message: "name and number are required" });
    }

    const data = new Customer({
        name: req.body.name,
        number: req.body.number
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const findAll = async (req, res) => {
    try {
        const data = await Customer.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};


const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Customer.findById(id);
        if (data) {
            return res.json(data);
        }
        res.status(404).send({ message: "Not found" });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const updateOne = async (req, res) => {
    const { id } = req.params;
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).send({ message: "name and number are required" });
    }

    try {
        const data = await Customer.findByIdAndUpdate(id, req.body);
        if (data) {
            return res.json({});
        }
        res.status(404).send({ message: "Not found" });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const deleteOne = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Customer.findOneAndDelete(id);
        if (data) {
            return res.json({});
        }
        res.status(404).send({ message: "Not found" });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = {
    create,
    findAll,
    findOne,
    deleteOne,
    updateOne
}