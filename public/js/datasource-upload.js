console.log('datasource-upload.js');

let nameCheck = new Boolean(false);
let geoCheck = new Boolean(false);
let formatCheck = new Boolean(false);
let filePath = new Boolean(false);

const resetGeospatialCheck = function() {
  $('#geospatialCheck').hide();
  $('#isGeospatial').prop('checked', false);
  $('#notGeospatial').prop('checked', false);
}

const resetNonGeospatial = function() {
  $('#nonGeospatial').hide();
  $('#dataSourceFileType_csv').prop('checked', false);
  $('#dataSourceFileType_tsv').prop('checked', false);
  $('#dataSourceFileType_json').prop('checked', false);
  $('#dataSourceFileType_piped').prop('checked', false);
}

const resetGeospatial = function() {
  $('#geospatial').hide();
  $('#geodataSourceFileType_geo').prop('checked', false);
  $('#geodataSourceFileType_topo').prop('checked', false);
  $('#geodataSourceFileType_shp').prop('checked', false);
}

const resetTargetFile = function() {
  $('#targetFile').hide();
}

const hideAllInputs = function() {
  nameCheck = false;
  geoCheck = false;
  formatCheck = false;
  filePath = false;
  resetGeospatialCheck();
  resetNonGeospatial();
  resetGeospatial();
  resetTargetFile();
  $('#targetFileName').val('');
}

// Called once a file is selected for upload.
const chooseTargetFile = function() {
  // Verify that a filepath or filename was chosen.
  filePath = true;
  // if succesful, then validate form and enable upload.
  validateForm();
}

const validateForm = function() {
  console.log('validating form');
  if (nameCheck && geoCheck && formatCheck && filePath) {
    console.log('form is valid');
    $('#uploadButton').prop('disabled', false);
  } else {
    console.log('something is amiss');
    $('#uploadButton').prop('disabled', true);
  }
}

// Start by hiding everything.
hideAllInputs();

// Reveal geospatialCheck based on file name being given.
$('#targetFileName').blur(function() {
  console.log('blurred');
  if ($(this).val().trim() != '') {
    console.log($(this).val());
    $('#geospatialCheck').show();
    nameCheck = true;
  } else {
    // $('#fileNameErrors').innerHTML = 'Please enter a name for the data file.';
    alert('You must provide a name for the target file.');
    hideAllInputs();
  }
});

// Reveal correct form inputs based on geospatial selection.
$('input[type=radio][name="isGeospatial"]').change(function() {
  var currentState = $(this).val();
  if (currentState === 'true') {
    console.log('Geospatial TRUE');
    $('#geospatial').show();
    resetNonGeospatial();
    resetTargetFile();
  } else if (currentState === 'false') {
    console.log('Geospatial FALSE');
    $('#nonGeospatial').show();
    resetGeospatial();
    resetTargetFile();
  }
  geoCheck = true;
});

// Enable Upload button based on subsequent format selection.
$('input[type=radio][name="dataSourceFileType"]').change(function() {
  var currentState = $(this).val();
  console.log(currentState);
  switch(currentState) {
    case 'csv':
      console.log('CSV data selected');
      formatCheck = true;
      $('#targetFile').show();
      break;
    case 'tsv':
      console.log('TSV data selected');
      formatCheck = true;
      $('#targetFile').show();
      break;
    case 'json':
      console.log('JSON data selected');
      formatCheck = true;
      $('#targetFile').show();
      break;
    case 'pipe':
      console.log('Pipe-delimited data selected');
      formatCheck = true;
      $('#targetFile').show();
      break;
    default:
      console.log('No data format selected.');
      formatCheck = false;
      break;
  }
  // chooseTargetFile();
});

$('input[type=radio][name="geodataSourceFileType"]').change(function() {
  var currentState = $(this).val();
  console.log(currentState);
  switch(currentState) {
    case 'geojson':
      console.log('GeoJSON data selected');
      formatCheck = true;
      $('#targetFile').show();
      break;
    case 'topojson':
      console.log('TopoJSON data selected');
      formatCheck = true;
      $('#targetFile').show();
      break;
    case 'shapefile':
      console.log('ESRI Shapefile data selected');
      formatCheck = true;
      $('#targetFile').show();
      break;
    default:
      console.log('No data format selected.');
      formatCheck = false;
      break;
  }
  // chooseTargetFile();
});



console.log('end of script');
