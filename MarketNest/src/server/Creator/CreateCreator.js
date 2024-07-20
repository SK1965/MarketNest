// services/createCreator.js
const Creator = require('./Creator');

async function createCreator(data) {
    try {
        const newCreator = new Creator(data);
        await newCreator.save();
        return "Creator added successfully";
    } catch (error) {
        return "Unable to Create Creator";
    }
}

module.exports = createCreator;