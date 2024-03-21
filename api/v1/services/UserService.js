const { validate } = require('class-validator');
const { plainToClass } = require('class-transformer');
const Joi = require('joi');
const User = require('../models/user');
const CreditCard = require('../models/creditCard');
const CreditCardUser = require('../models/creditCardUser');

// Skema validasi menggunakan Joi
const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    photos: Joi.array().items(Joi.object({ filename: Joi.string() })).required(),
    creditcard_type: Joi.string().required(),
    creditcard_number: Joi.string().creditCard().required(),
    creditcard_name: Joi.string().required(),
    creditcard_expired: Joi.string().required(),
    creditcard_cvv: Joi.string().required()
});

exports.register = async (reqBody, apiKey) => {
    try {
        if (!apiKey) {
            return { status: 403, error: "API key is missing." };
        } else if (apiKey !== "HiJhvL$T27@1u^%u86g") {
            return { status: 401, error: "Invalid API key." };
        }
        const data = await schema.validateAsync(reqBody);

        const user = await User.create({
            name: reqBody.name,
            password: reqBody.password,
            address: reqBody.address,
            email: reqBody.email
        });

        const creditCard = await CreditCard.create({
            creditcard_type: reqBody.creditcard_type,
            creditcard_number: reqBody.creditcard_number,
            creditcard_name: reqBody.creditcard_name,
            creditcard_expired: reqBody.creditcard_expired,
            creditcard_cvv: reqBody.creditcard_cvv
        });

        const creditCardUser = await CreditCardUser.create({
            id_users: user.id,
            id_cc: creditCard.id,
            status: 'active'
        });

        const userData = {
            user_id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            photos: reqBody.photos.map((photo, index) => ({ [index + 1]: photo.filename })),
            creditcard: {
                type: creditCard.creditcard_type,
                number: creditCard.creditcard_number.slice(-4),
                name: creditCard.creditcard_name,
                expired: creditCard.creditcard_expired
            }
        };

        return { status: 200, data: userData };
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'ValidationErrorItem') {
            return { status: 400, error: error.details.map(detail => detail.message) };
        }
        return { status: 400, error: 'Please provide all required fields.' };
    }
};
exports.getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return { status: 404, error: 'User not found' };
        }

        const creditCardUser = await CreditCardUser.findOne({
            where: { id_users: userId },
        });

        if (!creditCardUser) {
            return { status: 404, error: 'Credit card details not found for this user' };
        }

        const userData = {
            user_id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            photos: {}, // Perlu diisi dengan foto yang sesuai dari model pengguna

        };

        return { status: 200, data: userData };
    } catch (error) {
        console.error(error);
        return { status: 500, error: 'Internal server error' };
    }
};


