import mpg_data from "./data/mpg_data.js";
import {
    getStatistics
} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
var citySum = 0;
var highwaySum = 0;
var years = []
var hybridCars = 0;
for (const [index, element] of mpg_data.entries()) {
    citySum += element["city_mpg"];
    highwaySum += element["highway_mpg"];
    years.push(element["year"]);
    if (element["hybrid"]) {
        hybridCars += 1;
    }
}


export const allCarStats = {
    avgMpg: {
        "city": citySum / mpg_data.length,
        "highway": highwaySum / mpg_data.length
    },
    allYearStats: getStatistics(years),
    ratioHybrids: hybridCars / mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]

  /* var makerhybrids = [];
var models = [];
for (const [index, element] of mpg_data.entries()) {
    if (element["hybrid"]) {
        var dict = {};
        if (!(element["make"] in models)) {
            var hybrids = [];
            models.push(element["make"]);
            dict["make"] = element["make"];
            hybrids.push(element["id"]);
            dict["hybrids"] = hybrids;
            
        }
    }
    
} */

 /*
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */


var yearsDict = {};
const reducerCity = (elementP, elementN) => elementP["city_mpg"] + elementN["city_mpg"];
const reducerHighway = (elementP, elementN) => elementP["highway_mpg"] + elementN["highway_mpg"];

for (const [index, element] of mpg_data.entries()) {
    if(!(element["year"] in yearsDict)) {
        // construct the dictionary for that year altogether?      
        var dict = {};
        //get hybrid and nothybrid cars for that specific year
        var yearAllCars = mpg_data.filter(car => car["year"] === element["year"]);
        var yearHybrid = yearAllCars.filter(car => car["hybrid"] === true);
        var yearNotHybrid = yearAllCars.filter(car => car["hybrid"] === false);
        // get the citysum and highway sum
        var hybridCity = yearHybrid.reduce(
            (hybridCity, p) => hybridCity + p.city_mpg, 0
        ) / yearHybrid.length;

        var nothybridCity = yearNotHybrid.reduce(
            (nothybridCity, p) => nothybridCity + p.city_mpg, 0
        ) / yearNotHybrid.length;

        var hybridHighway = yearHybrid.reduce(
            (hybridHighway, p) => hybridHighway + p.highway_mpg, 0
        ) / yearHybrid.length;

        var nothybridHighway = yearNotHybrid.reduce(
            (nothybridHighway, p) => nothybridHighway + p.highway_mpg, 0
        ) / yearNotHybrid.length; 
        
        // fill in the dict
        dict["hybrid"] = {
            "city": hybridCity,
            "highway": hybridHighway
        }
        dict["notHybrid"] = {
            "city": nothybridCity,
            "highway": nothybridHighway
        }
        yearsDict[element["year"]] = dict;
    }
}

export const moreStats = {
    makerHybrids: [],
    avgMpgByYearAndHybrid: yearsDict
};