var fs = require('fs');
var babyParse = require('babyparse');

var csvData = '../data/landUseDetailed_1990_2008.csv';

getData(csvData);    // async, so handle all actions in the completion callback.

// Callable Functions.
function getData(source) {
    // console.log('------------------------------');
    console.log('Loading file data...');

    // Alternate approach.
    loadDataSource(source);
};

function loadDataSource(targetSource) {
    fs.readFile(targetSource, 'utf8', function (err,data) {
        if (err) {
            console.log('Error loading file data!');
            return console.log(err);
        }
        console.log('File data loaded.');
        dataLoadSuccess(data);
    });
};

function dataLoadSuccess(data) {
    parseCSV(data);
};

function parseCSV(data) {
    // console.log('------------------------------');
    console.log('Parsing CSV data...');

    var parsed = babyParse.parse(data, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            // console.log('------------------------------');
            console.log('CSV Data Parsed.');
            // console.log(results);

            // logData(results);
            // debugDataset(results);
        }
    });

    console.log(parsed.data);
    // console.log(parsed.data.length);
    // console.log(parsed.data[0], parsed.data[1]);  // rows of data.

    // for (var i=0; i <= parsed.data.length; i++) {
    //     console.log('------------------------------');
    //     console.log('Iterating over item ' + i + '.');
    //     console.log(parsed.data[i]); // rows of data.
    // }

    // return parsed;
};