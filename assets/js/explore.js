var getURL = function (params) {
  var endpoint = 'http://api.hi-rezclimate.org/amsr2.py/';
  endpoint += params['category'] + '?';
  delete params['category'];
  Object.keys(params).forEach(function(key) {
    endpoint += key + '=' + params[key] + '&';
  });

  return endpoint.slice(0, -1);
};

$('#demo').on('click', function () {
  var params = {
    category: 'sst',
    lat: '35.32',
    lng: '138.99',
    date: '2014-04-10',
    range: '0.5'
  };
  Object.keys(params).forEach(function(key) {
    $('#' + key).val(params[key]);
  });
});

$('#send').on('click', function () {
  var params = {
    category: $('#category').val(),
    lat: $('#lat').val(),
    lng: $('#lng').val(),
    date: $('#date').val(),
    range: $('#range').val()
  };
  $('#canvas').empty();
  $('#json').fadeOut('slow', function () {
    $.get(getURL(params), function(data){
      var json = JSON.stringify(data.values, null, 4);
      $('#json').html(json).fadeIn('slow');
    });
  });
  init(params);
});

$('#json_button').on('change', function () {
  if($(this).val() === 'on') {
    $('#canvas').fadeOut('slow', function () {
      $('#json').fadeIn('slow');
    });
  } else {
    $('#json').fadeOut('slow', function () {
      $('#canvas').fadeIn('slow');
    });
  }
});

$('#open_layer_button').on('change', function () {
  if($(this).val() === 'on') {
    $('#json').fadeOut('slow', function () {
      $('#canvas').fadeIn('slow');
    });
  } else {
    $('#canvas').fadeOut('slow', function () {
      $('#json').fadeIn('slow');
    });
  }
});

$('#canvas').width($('#board').width());
$('#canvas').height($('#board').width());

function init(params) {
  var options = {
    controls: [
      new OpenLayers.Control.Navigation({mouseWheelOptions: {interval: 100}}),
      new OpenLayers.Control.PanZoomBar(),
      new OpenLayers.Control.KeyboardDefaults(),
      new OpenLayers.Control.LayerSwitcher(),
      new OpenLayers.Control.Attribution()
    ],
    projection: new OpenLayers.Projection("EPSG900913"),
    displayProjection: new OpenLayers.Projection("EPSG:4326"),
    units: "m",
    maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34)
  };
  var map = new OpenLayers.Map("canvas", options);
  map.addControl(new OpenLayers.Control.Attribution());
  var mapnik = new OpenLayers.Layer.OSM();

  var snd = new OpenLayers.Layer.TMS("Sea Surface Temperature",
    "http://tms.hi-rezclimate.org/amsr2/",
    {
      url:'http://tms.hi-rezclimate.org/amsr2/',
      layername: params.category,
      type:'png',
      alpha: true,
      isBaseLayer: false,
      opacity: 0.7
    }
  );
  map.addLayers([mapnik, snd]);
  var lonLat = new OpenLayers.LonLat(params.lng, params.lat)
    .transform(
      new OpenLayers.Projection("EPSG:4326"),
      new OpenLayers.Projection("EPSG:900913")
    );
  map.setCenter(lonLat, 3);
}
