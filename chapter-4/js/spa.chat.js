spa.chat = ( function () {
  var
    configMap = {
      main_html : String()
        + '<div style = "padding:1em; color:#fff;">'
          + 'Tou nima'
        + '</div>',
      settable_map : {}
    },
    stateMap  = { $container : null },
    jqueryMap = {},
    setJqueryMap, configModule, initModule;

    // Begin Dom Method /setJqueryMap/
    setJqueryMap = function () {
      var $container = stateMap.$container;
      jqueryMap = { $container : $container };
    };
    // End Dom Method /setJqueryMap/

    // Begin public method /configModule/
    configModule = function ( input_map ) {
      spa.util.setConfigMap({
        input_map     : input_map,
        settable_map  : configMap.settable_map,
        config_map    : configMap
      });
      return true;
    };
    // End public method /configModule/

    // Begin public method /initModule/
    initModule = function ( $container ) {
      $container.html( configMap.main_html );
      stateMap.$container = $container;
      setJqueryMap();
      return true;
    };
    // End public method /initModule/

    // return public Method
    return {
      configModule  : configModule,
      initModule    : initModule
    };
}());
