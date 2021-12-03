'use strict';
const _ = require('lodash');
const db = require('./db.js');


const {usersById = {}, itemsOfUserByUsername = {}, } = db;
// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------

// Get List Of Users
const getUsers = () => {
    const dataAccessMethod = () => _.map(usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

// Get List Of Ages Of User
const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        const userNames = Object.keys(itemsOfUserByUsername).filter(userName => itemsOfUserByUsername[userName].includes(item))
        const usersByUserName = {}
        Object.values(usersById).forEach(({username, age}) => {
            usersByUserName[username] = {
                username,
                age
            }
        })       
        return _.map(userNames, userName => usersByUserName[userName]['age'])
    }
    return mockDBCall(dataAccessMethod);
}

// List Counts Of Ages
const getCountOfAges = (ages) => {
    const setOfAges = [...new Set(ages)]
    const dataAccessMethod = () => {
        const ageCounts = {};
        Object.values(usersById).forEach(({age}) => {
            ageCounts[age] = 1 + (ageCounts[age] || 0)
        })       
        return _.map(setOfAges, age => ({age, count: ageCounts[age]}))
    }
    return mockDBCall(dataAccessMethod);
}

// List of Items
const getItems = () => {
    const dataAccessMethod = () => {
        const items = Object.values(itemsOfUserByUsername).reduce((acc, itemArray = []) => {
            return [
                ...acc,
                ...itemArray
            ]
        }, [])
        return [...new Set(items)]
    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith,
    getCountOfAges,
    getItems
};
