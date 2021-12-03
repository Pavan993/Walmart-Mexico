'use strict';
const mockDBCalls = require('../database/index.js');

const getAgeDemoGraphicOfUsersWithTable = async (request, response) => {
    const {query = {}} = request;
    const {itemToLookup} = query;
    const ages = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
    const userCountWithAges = await mockDBCalls.getCountOfAges(ages);
    return response.status(200).send(JSON.stringify(userCountWithAges));
};

module.exports = (app) => {
    app.get('/item/ageDemographic', getAgeDemoGraphicOfUsersWithTable);
};
