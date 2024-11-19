const Students = require('../model/student');
const User = require('../model/user');
const {getInstance} = require('./setupDB');

const setupModel = async () => {
const instanceDb = await getInstance();
Students.init(instanceDb);
User.init(instanceDb);
};
setupModel();