const Loan = require('../models/loan')
const Customer = require('../models/customer')

const create = async (req, res) => {
    const { customer, totalAmount } = req.body;

    if (!customer || !totalAmount || typeof totalAmount !== 'number') {
        return res.status(400).json({ message: 'customer and totalAmount are required' });
    }

    try {
        const existingCustomer = await Customer.findById(customer);
        if (!existingCustomer) {
            return res.status(404).json({ message: 'customer not found' });
        }

        const data = new Loan({
            customer,
            totalAmount,
            pendingPayment: true
        })

        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const findAll = async (req, res) => {
    try {
        const data = await Loan.find().populate('customer');;
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const pendingLoan = async (req, res) => {
    try {
        const data = await Loan.find({pendingPayment: true}).populate('customer');;
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const paidLoan = async (req, res) => {
    try {
        const data = await Loan.find({pendingPayment: false}).populate('customer');;
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};


const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Loan.findById(id);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send({ message: "Not found" });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const registerPayment = async (req, res) => {
    const { id } = req.params;
    const { paidAmount } = req.body;

    if (!paidAmount || typeof paidAmount !== 'number') {
        return res.status(400).json({ message: 'paidAmount is required' });
    }

    try {
        const data = await Loan.findByIdAndUpdate(id, {
            paidAmount,
            pendingPayment: false
        });

        if (data) {
            return res.json({});
        }
        res.status(404).send({ message: "Not found" });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const updateOne = async (req, res) => {
    const { id } = req.params;
    const { customer, totalAmount } = req.body;

    if (!customer || !totalAmount || typeof totalAmount !== 'number') {
        return res.status(400).json({ message: 'customer and totalAmount are required' });
    }

    try {
        const existingCustomer = await Customer.findById(customer);
        if (!existingCustomer) {
            return res.status(404).json({ message: 'customer not found' });
        }

        const data = await Loan.findByIdAndUpdate(id, {
            customer,
            totalAmount
        });

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
        const data = await Loan.findOneAndDelete(id);
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
    updateOne,
    paidLoan,
    pendingLoan,
    registerPayment
}