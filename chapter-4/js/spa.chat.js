spa.chat = (function() {
  var
    configMap = {
      main_html: String() +
        '<div style = "padding:1em; color:#fff;">' +
          'Tou nima' +
        '</div>',
      settable_map: {}
    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule;

  // Begin Dom Method /setJqueryMap/
  setJqueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container
    };
  };
  // End Dom Method /setJqueryMap/

  // Begin public method /configModule/
  // Example    : spa.chat.configModule({ slider_open_em : 18 });
  // Purpose    : Configure the module prior to initialization
  // Arguments  :
  //    * set_chat_anchor - a callback to modify the URI anchor to
  //      indicate opened or closed state. THis callback must return
  //      false if the requested state cannot be met
  //    * chat_model - the chat model object provides methods
  //      to interact with our instant messaging
  //    * people_model - the people model object which provides
  //      methods to manage the list of people the model maintains
  //    * slider_* settings. All these are optional scalars.
  //      See mapConfig.settable_map for a full list
  //      Example: slider_open_em is the open height in em's
  // Actions    :
  //  The internal configuration date structure (configMap) is
  //  updated with provided arguments. No other actions are taken.
  // Returns    : true
  // Throws     : Javascript error object and stack trace on
  //              unacceptable or missing arguments
  configModule = function(input_map) {
    spa.util.setConfigMap({
      input_map: input_map,
      settable_map: configMap.settable_map,
      config_map: configMap
    });
    return true;
  };
  // End public method /configModule/

  // Begin public method /initModule/
  // Example    : soa.chat.initModule( $('#dev_id') );
  // Purpose    :
  //    Directs Chat to offer its capability to the user
  // Arguments  :
  //    * $append_target (example: $('#dev_id')).
  //      A jQuery collection that should represent
  //      a single DOM container
  // Action     :
  //    Appends the chat slider to the provided container and fills
  //    it with HTML content. It then initializes elements,
  //    events, and handles to provides the user with a chat-room
  //    interface
  //  Returns   : true on success, false on failure
  //  Throws    : none
  initModule = function($container) {
    $container.html(configMap.main_html);
    stateMap.$container = $container;
    setJqueryMap();
    return true;
  };
  // End public method /initModule/

  // Begin public method /setSliderPosition/
  //
  // Example    : spa.chat.setSliderPosition( 'closed' );
  // Purpose    : Ensure chat slider is in the requested state
  // Arguments  :
  //  * position_type - enum('closed', 'opened', or 'hidden')
  //  * callback - optional callback at end of animation.
  //    (callback receives slider DOM element as argument)
  // Actions    :
  //  Leaves slider in current state if it mathces requested
  //  otherwise animate to requested state.
  // Returns    :
  //    * true  - requested state achieved
  //    * false - requested state not achieved
  // Throws     : none

  // return public Method
  return {
    configModule: configModule,
    initModule: initModule
  };
}());
