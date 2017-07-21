//start script once HTML window is loaded.
window.onload = initialize();

// STEP 1 - prepare data.
// STEP 2 - prepare GIS data.
// STEP 3 - boilerplate HTML5.
// STEP 4 - load data (JS).
// STEP 5 - render basic map.
// STEP 6 - style basemap (CSS).
// STEP 7 - add graticules to basemap.
// STEP 8 - add choropleth geodata to basemap.
// STEP 9 - bind geodata with attribute data by key.
// STEP 10 - generate choropleth.
// STEP 11 - expose dynamic attribute selection.
// STEP 12 - update choropleth based on expressed attribute.
// STEP 13 - add interactivity to geodata.

var dataProperties = [];
var dataSetIterations = 3; // Default to 2 for now. Later generate sets based off numeric spinner selection.

var keyArray = [];
var expressed = keyArray[0];
// generate keyArray dynamically to save time.
// production version should allow selection of keys from a list popluated with available attributes.
for (var i = 1989; i <= 2010; i++) {
  var newKey = i + '_Imp';
  keyArray.push(newKey);
  newKey = i + '_Perv';
  keyArray.push(newKey);
}
// console.log(keyArray);

// Used to change color scheme used by each attribute.
var themeA = ['#D4B9DA', '#C994C7', '#DF65B0', '#DD1C77', '#980043'];
var themeB = ['#391C40', '#744380', '#A56BB5', '#CD93DE', '#F1BBFF'];
var themeC = ['#374038', '#59806E', '#58B593', '#40DEB4', '#13FFCA'];
var themeD = themeA.concat(themeB, themeC);
var themeUsed = themeD;

var choroplethKey = '1989_Imp';
var colors = d3.scale.category20c();

function initialize() {
  buildGui();
  configureMap();
  // setMap();  // Figure out why there is a single row of missing cells in this option.
};

function buildGui() {
  // Data Ranking Slide-in Panel.
  jQuery(document).ready(function($) {
    //open the lateral panel
    $('.cd-btn').on('click', function(event) {
      event.preventDefault();
      $('.cd-panel').addClass('is-visible');
    });
    //close the lateral panel
    $('.cd-panel').on('click', function(event) {
      if ($(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close')) {
        $('.cd-panel').removeClass('is-visible');
        event.preventDefault();
      }
    });
  });
};

function configureMap() {
  // Configure Map.
  var width = $('#sketch').width();
  var height = $('#sketch').height();
  // console.log(width,height);

  // var geojson_data = '../data/geojson/idaho-data.json';
  // var geojson_data = '../data/geojson/BSGAMKZ.geo.json';
  var geojson_data = '../data/geojson/BSGAMKZ_merged.geo.json';

  // Build data display.
  var gisData = d3.select('#sketch').append('div').attr('id', 'gisData').attr('class', 'scroll-area');
  var dataDetails = d3.select('#gisData').append('div').attr('id', 'dataDetails');
  dataDetails.append('div').attr('class', 'data-properties-title').text('Data Properties:');

  // // Static assignment of properties from the uploaded GeoJSON/TopoJSON file.
  // // var dataProperties = ['OBJECTID','bsltthck','fault','roads','terrain','trans','use','watertemp'];
  // // Dynamic assignment of properties from the uploaded GeoJSON/TopoJSON file.
  // var dataProperties = [];
  // var dataSets = d3.select('#data-sets');
  // // var dataSetIterations = 3; // Default to 2 for now. Later generate sets based off numeric spinner selection.

  d3.json(geojson_data, function(error, json) {
    // Handle any errors.
    if (error) return console.error(error);

    var features = json.features;

    // Need to limit the array to one instance of each property. Otherwise good to go.
    for (var feature in features) {
      if (features.hasOwnProperty(feature)) {
        var obj = features[feature];
        var properties = obj.properties;
        dataProperties = Object.keys(properties);
      }
    }

    // Dynamic assignment of properties from the uploaded GeoJSON/TopoJSON file.
    dataProperties.forEach(function(d, i) {
      dataDetails.append('div').attr('id', 'property-' + dataProperties[i]) // Corresponds to css selector assignment in UI.
        .append('text').attr('class', 'data-property-name').text(dataProperties[i] + ': ')
        .append('text').attr('id', 'dpv' + i).attr('class', 'data-value').text('-');
    });

    buildDataPanels(dataProperties);

    // Build Map.
    var gis_data_svg = d3.select('#sketch').append('svg').attr('id', 'gisDataSVG').attr('width', width).attr('height', height);

    // create a first guess for the projection
    var center = d3.geo.centroid(json)
      // console.log(center);
    var scale = 150;
    var offset = [width / 2, height / 2];
    var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);

    // Create the path.
    var path = d3.geo.path().projection(projection);

    // Using the path determine the bounds of the current map and use these to determine better values for the scale and translation.
    var bounds = path.bounds(json);
    // console.log(bounds);
    var hscale = scale * width / (bounds[1][0] - bounds[0][0]);
    var vscale = scale * height / (bounds[1][1] - bounds[0][1]);
    // var scale   = (hscale < vscale) ? hscale : vscale; // Fits element bounds but is partially obscured by padding, etc.
    var scale = 125000; // 10000 for Idaho data.  // 125000 for BartonSprings data. // To see entire geo-object in panel.

    var w_off = 2;
    var h_off = 2;
    var offset = [width - (bounds[0][0] + bounds[1][0]) / w_off, height - (bounds[0][1] + bounds[1][1]) / h_off];

    // new projection
    projection = d3.geo.mercator().center(center).scale(scale).translate(offset);
    path = path.projection(projection);

    var tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
    var currentTarget;

    gis_data_svg.selectAll('path').data(json.features).enter().append('path').attr('d', path)
      .attr('id', function(d) {
        return d.properties.OBJECTID;
      })
      .attr('class', 'cell-default')
      .style('z-index', 0)
      .style('fill-opacity', 0.5)
      .style('stroke', 'rgb(0,0,0)')
      .style('stroke-width', 1)
      // .style('fill', function (d) {    // color by zones.
      //  return colors(d.properties.OBJECTID);
      // })
      // .style('fill', function (d) {    // color by bottom elevation.
      //  return colors(d.properties.BotElev);
      // })
      .style('fill', function(d) { // color by impervous coverage year data.
        // Note: Must use ['property_name'] notation to access these.
        // Need a more complex color selection process here to establish chromatic ranges and a key.
        // Value ranges per cell are 0 - 500K (500 x 1000 sqft per cell).
        var value = d.properties[choroplethKey];
        // console.log(value);
        return colors(value);
      })
      .html(function(d) {
        var textString = '<div class="cell-label">' + d.properties.OBJECTID + '</div>';
        return textString;
      })
      .on('click', function(d, i) {
        // console.log(i,d);
        var target = d3.select(this);
        if (currentTarget) {
          currentTarget.transition().duration(150).style('stroke', 'rgb(0,0,0)');
          currentTarget.moveToBack();
        }
        currentTarget = target;
        currentTarget.transition().duration(150).style('stroke', 'rgb(255,255,255)');
        currentTarget.moveToFront();
        updateDataDisplay(dataProperties, d); // i
      })
      .on('mouseover', function(d, i) {
        var target = d3.select(this);
        target.transition().duration(50).style('fill-opacity', 1.0);
        // target.moveToFront();
        tooltipDiv.transition().duration(50).style('opacity', 1.0);
      })
      .on('mousemove', function(d, i) {
        tooltipDiv.html('<p>ObjectID: ' + d.properties.OBJECTID + '</p>')
          .style('left', Math.max(0, d3.event.pageX - 50) + 'px')
          .style('top', (d3.event.pageY - 50) + 'px');
      })
      .on('mouseout', function(d, i) {
        var target = d3.select(this);
        target.transition().duration(750).style('fill-opacity', 0.5);
        // target.moveToBack();
        tooltipDiv.transition().duration(750).style('opacity', 0);
      });
  });
};

function setMap() { //set choropleth map parameters
  //map frame dimensions
  var width = $('#sketch').width();
  var height = $('#sketch').height();

  var gis_data_svg = d3.select('#sketch').append('svg').attr('id', 'gisDataSVG').attr('class', 'map').attr('width', width).attr('height', height);

  // create a first guess for the projection
  // var center = d3.geo.centroid(json);
  var center = [-97.86166148916013, 30.148777344634926];
  var scale = 150;
  var offset = [width / 2, height / 2];
  var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);

  // Create the path.
  var path = d3.geo.path().projection(projection);

  // Using the path determine the bounds of the current map and use these to determine better values for the scale and translation.
  // var bounds = path.bounds(json);
  var bounds = [
    [484.6837240575509, 449.5511230665418],
    [485.2816215003711, 450.4119390528123]
  ];
  var hscale = scale * width / (bounds[1][0] - bounds[0][0]);
  var vscale = scale * height / (bounds[1][1] - bounds[0][1]);
  // var scale   = (hscale < vscale) ? hscale : vscale; // Fits element bounds but is partially obscured by padding, etc.
  var scale = 150000; // 10000 for Idaho data.  // To see entire geo-object in panel.

  var w_off = 2;
  var h_off = 2;
  var offset = [width - (bounds[0][0] + bounds[1][0]) / w_off, height - (bounds[0][1] + bounds[1][1]) / h_off];

  //optional--create a title for the page
  // var title = d3.select('#sketch') // body
  //   .append('h1')
  //   .text('France Regions Choropleth');

  //create a new svg element with the above dimensions.
  var map = d3.select('#gisDataSVG');
  // var map = d3.select('#sketch') // body
  //   .append('svg')
  //   .attr('width', width)
  //   .attr('height', height)
  //   // .attr('id', 'gisDataSVG')
  //   .attr('class', 'map');

  // //create Europe albers equal area conic projection, centered on France
  // var projection = d3.geo.albers()
  //   .center([-8, 46.2])
  //   .rotate([-10, 0])
  //   .parallels([43, 62])
  //   .scale(2500)
  //   .translate([width / 2, height / 2]);

  //create svg path generator using the projection
  // var path = d3.geo.path()
  //   .projection(projection);

  // new projection
  projection = d3.geo.mercator().center(center).scale(scale).translate(offset);
  path = path.projection(projection);

  var graticule = d3.geo.graticule()
    .step([10, 10]); //place graticule lines every 10 degrees of longitude and latitude

  //create graticule background
  var gratBackground = map.append('path')
    .datum(graticule.outline) //bind graticule background
    .attr('class', 'gratBackground') //assign class for styling
    .attr('d', path) //project graticule

  //create graticule lines
  var gratLines = map.selectAll('.gratLines') //select graticule elements that will be created
    .data(graticule.lines) //bind graticule lines to each element to be created
    .enter() //create an element for each datum
    .append('path') //append each element to the svg as a path element
    .attr('class', 'gratLines') //assign class for styling
    .attr('d', path); //project graticule lines

  var geojson_data = '../data/geojson/BSGAMKZ_merged.geo.json';

  queue() //use queue.js to parallelize asynchronous data loading for cpu efficiency
    .defer(d3.json, geojson_data) //load geodata.
    .await(callback);

  function callback(error, json) {
    console.log('callback() called.');
    // console.log(json);

    var recolorMap = colorScale(json); //retrieve color scale generator

    gis_data_svg.selectAll('path').data(json.features).enter().append('path').attr('d', path)
      .attr('id', function(d) {
        return d.properties.OBJECTID;
      })
      .attr('class', 'cell-default')
      .style('z-index', 0)
      .style('fill-opacity', 0.5)
      .style('stroke', 'rgb(0,0,0)')
      .style('stroke-width', 1)
      // .style('fill', function (d) {    // color by zones.
      //  return colors(d.properties.OBJECTID);
      // })
      // .style('fill', function (d) {    // color by bottom elevation.
      //  return colors(d.properties.BotElev);
      // })
      .style('fill', function(d) { // color by impervous coverage year data.
        // Note: Must use ['property_name'] notation to access these.
        // Need a more complex color selection process here to establish chromatic ranges and a key.
        // Value ranges per cell are 0 - 500K (500 x 1000 sqft per cell).
        var value = d.properties[choroplethKey];
        // console.log(value);
        return colors(value);
        // return choropleth(d, recolorMap);
      })
      .html(function(d) {
        var textString = '<div class="cell-label">' + d.properties.OBJECTID + '</div>';
        return textString;
      })
      .on('click', function(d, i) {
        // console.log(i,d);
        var target = d3.select(this);
        if (currentTarget) {
          currentTarget.transition().duration(150).style('stroke', 'rgb(0,0,0)');
          currentTarget.moveToBack();
        }
        currentTarget = target;
        currentTarget.transition().duration(150).style('stroke', 'rgb(255,255,255)');
        currentTarget.moveToFront();
        updateDataDisplay(dataProperties, d); // i
      })
      .on('mouseover', function(d, i) {
        var target = d3.select(this);
        target.transition().duration(50).style('fill-opacity', 1.0);
        // target.moveToFront();
        tooltipDiv.transition().duration(50).style('opacity', 1.0);
      })
      .on('mousemove', function(d, i) {
        tooltipDiv.html('<p>ObjectID: ' + d.properties.OBJECTID + '</p>')
          .style('left', Math.max(0, d3.event.pageX - 50) + 'px')
          .style('top', (d3.event.pageY - 50) + 'px');
      })
      .on('mouseout', function(d, i) {
        var target = d3.select(this);
        target.transition().duration(750).style('fill-opacity', 0.5);
        // target.moveToBack();
        tooltipDiv.transition().duration(750).style('opacity', 0);
      });

    createDropdown(json); //create the dropdown menu
  };
};

function buildDataPanels(dataProperties) {
  // Build ranking sets in data panel.
  var dataSets = d3.select('#data-sets');
  for (var numSets = 0; numSets < dataSetIterations; numSets++) {
    var currentSet = dataSets.append('div').attr('id', function() {
      return ('data-set-' + numSets);
    });
    currentSet.append('div').attr('class', 'set-weighting-header').text('Data Ranking : Set ' + (numSets + 1));

    dataProperties.forEach(function(d, i) {
      if (dataProperties[i] != 'OBJECTID') {
        var thisProperty = currentSet.append('div').attr('class', 'row data-property');
        thisProperty.append('div').attr('id', dataProperties[i]).attr('class', 'set-weighting-attribute').append('text').attr('class', 'data-property-name').text(dataProperties[i]);
        // thisProperty.append('label').attr('class','weight-label').attr('for', function () { return ('set-' + numSets + '-value-' + i); }).text('Weighting: ');
        thisProperty.append('input').attr('class', 'weight-value').attr('type', 'text').attr('id', function() {
          return ('set-' + numSets + '-value-' + i);
        }).attr('readonly');
        thisProperty.append('div').attr('class', 'bootstrap-slider').append('div').attr('id', function() {
          return ('set-' + numSets + '-slider-' + i);
        });

        $(function() {
          var currentSlider = '#set-' + numSets + '-slider-' + i;
          var currentValue = '#set-' + numSets + '-value-' + i;
          $(currentSlider).slider({
            range: 'min',
            min: 0,
            max: 100,
            value: 50,
            slide: function(event, ui) {
              $(currentValue).val(ui.value);
            }
          });
          $(currentValue).val($(currentSlider).slider('value'));
        });
      }
    });
  }
};

// Method used to update the dataDisplay elements.
function updateDataDisplay(dataProperties, data) {
  var currentDatum = data;

  dataProperties.forEach(function(d, i) {
    var currentProperty = '#property-' + dataProperties[i]; // add character prefix to avoid selector issues for properties named starting with numbers.
    var currentPropertyValueIndex = '#dpv' + i;

    // loop through object properties.
    for (var property in currentDatum) {
      if (currentDatum.hasOwnProperty(property)) {
        var obj = currentDatum[property];
        for (var prop in obj) {
          // important check that this is objects own property and not from prototype prop inherited
          if (obj.hasOwnProperty(prop)) {
            // compare with properties of the dataProperties array.
            if (prop == dataProperties[i]) {
              // console.log(prop, obj[prop]);
              // set display values.
              d3.select(currentProperty).select(currentPropertyValueIndex).text(function() {
                var propertyValueText = obj[prop];
                return propertyValueText;
              });
            }
          }
        }
      }
    }
  });
};

function createDropdown(csvData) {
  //add a select element for the dropdown menu
  var dropdown = d3.select('#properties-dropdown')
    .append('div')
    .attr('class', 'dropdown') //for positioning menu with css
    .html('<h3>Select Variable:</h3>')
    .append('select')
    .on('change', function() {
      changeAttribute(this.value, csvData)
    }); //changes expressed attribute

  //create each option element within the dropdown
  dropdown.selectAll('options')
    .data(keyArray)
    .enter()
    .append('option')
    .attr('value', function(d) {
      return d;
    })
    .text(function(d) {
      d = d[0].toUpperCase() + d.substring(1, 3) + ' ' + d.substring(3);
      return d;
    });
};

function colorScale(rangeData) {

  //create quantile classes with color scale
  var color = d3.scale.quantile() //designate quantile scale generator
    .range([
      '#D4B9DA',
      '#C994C7',
      '#DF65B0',
      '#DD1C77',
      '#980043'
    ]);

  //build array of all currently expressed values for input domain
  var domainArray = [];
  for (var i in rangeData) {
    console.log(rangeData[i]);
    domainArray.push(Number(rangeData[i][expressed]));
  };

  //for equal-interval scale, use min and max expressed data values as domain
  // color.domain([
  //  d3.min(csvData, function(d) { return Number(d[expressed]); }),
  //  d3.max(csvData, function(d) { return Number(d[expressed]); })
  // ]);

  //for quantile scale, pass array of expressed values as domain
  color.domain(domainArray);

  return color; //return the color scale generator
};

function choropleth(d, recolorMap) {
  //get data value
  var value = d.properties[expressed];
  //if value exists, assign it a color; otherwise assign gray
  if (value) {
    return recolorMap(value); //recolorMap holds the colorScale generator
  } else {
    return '#ccc';
  };
};

function changeAttribute(attribute, csvData) {
  //change the expressed attribute
  expressed = attribute;
  //recolor the map
  d3.selectAll('.regions') //select every region
    .style('fill', function(d) { //color enumeration units
      return choropleth(d, colorScale(csvData)); //->
    })
    .select('desc') //replace the color text in each region's desc element
    .text(function(d) {
      return choropleth(d, colorScale(csvData)); //->
    });
};
