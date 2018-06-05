spa.chat = (function() {
  //---------- BEGIN MODULE SCOPE VARIABLES ----------
  var
    configMap = {
      main_html:  String()
        + '<div class="spa-chat">'
          + '<div class="spa-chat-head">'
            + '<div class="spa-chat-head-toggle">'
            + '<div class="spa-chat-head-title">'
              + 'chat'
            + '</div>'
            + '<div class="spa-chat-closer">x</div>'
            + '<div class="spa-chat-sizer">'
              + '<div class="spa-chat-msgs">'
              + '<div class="spa-chat-box">'
                + '<input type="text"/>'
                + '<div>send</div>'
              + '</div>'
            + '</div>'
          + '</div>',

      settable_map : {
        slider_open_time    : true,
        slider_close_time   : true,
        slider_opened_em    : true,
        slider_closed_em    : true,
        slider_opened_title : true,
        slider_closed_title : true,

        chat_model      : true,
        people_model    : true,
        set_chat_anchor : true
      },

      slider_open_time    : 250,
      slider_close_time   : 250,
      slider_opened_em    : 16,
      slider_closed_em    : 2,
      slider_opened_title : 'click to close',
      slider_closed_title : 'click to open',

      chat_model      : null,
      people_model    : null,
      set_chat_anchor : null
    },
    stateMap = {
      $container        : null,
      position_type     : 'closed',
      px_per_em         : 0,
      slider_hidden_px  : 0,
      slider_closed_px  : 0,
      slider_opened_px  : 0
    },
    jqueryMap = {},
    setJqueryMap, getEmSize, setPxSizes, setSliderPosition,
    onClickToggle, configModule, initModule
    ;
    //---------- END MODULE SCOPE VARIABLES ----------

    getEmSize = function( elem ) {
      return Number(
        getComputerStyle( elem, '' ).fontsize.match(/\d*\.?\d*/)[0]
      );
    };

  // Begin Dom Method /setJqueryMap/
  setJqueryMap = function() {
    var
      $append_target = stateMap.$append_target,
      $slider = $append_target.find( '.spa-chat' );

    jqeuryMap = {
      $slider : $slider,
      $head   : $slider.find( '.spa-chat-head' ),
      $toggle : $slider.find( '.spa-chat-head-toggle' ),
      $title  : $slider.find( '.spa-chat-head-title' ),
      $sizer  : $slider.find( '.spa-chat-sizer' ),
      $msgs   : $slider.find( '.spa-chat-msgs' ),
      $box    : $slider.find( '.spa-chat-box' ),
      $input  : $slider.find( '.spa-chat-input input[type=text]' )
    };

  };
  // End Dom Method /setJqueryMap/

  // Begin Dom Method /setPxSizes/
  setPxSizes = function () {
    var px_per_em, opened_height_em;
    px_per_em = getEmSize( jqueryMap.$slider.get(0) );

    opened_height_em = configMap.slider_opened_em;

    stateMap.px_per_em = px_per_em;
    stateMap.slider_closed_px = configMap.slider_closed_em * px_per_em;
    stateMap.slider_opened_px = opened_height_em * px_per_em;

    jqeuryMap.$sizer.css({
      height : ( opened_height_em - 2 ) * px_per_em
    });
  };
  // End Dom Method /setPxSizes

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
  setSliderPosition = function ( position_type, callback ) {
    var
      height_px, animate_time, slider_title, toggle_text;

    // return true if slider already in requested position
    switch ( position_type ) {
      case 'opened' :
        height_px = stateMap.slider_opened_px;
        animate_time = configMap.slider_open_time;
        slider_title = configMap.slider_opened_title;
        toggle_text = '=';
      break;

      case 'hidden' :
        height_px = 0;
        animate_time = configMap.slier_open_time;
        slider_title = '';
        toggle_text = '+';
      break;

      case 'closed' :
        height_px = stateMap.slider_closed_px;
        animate_time = configMap.slider_close_time;
        slider_title = configMap.slider_closed_title;
        toggle_text = '+';
      break;

      // bail for unknown position type
      default: return false;

    }

    // animate slider position change
    stateMap.position_type = '';
    jqueryMap.$slider.animate(
      { height : height_px },
      animate_time,
      function() {
        jqueryMap.$toggle.prop( 'title', slider_title );
        jqueryMap.$toggle.text( toggle_text );
        stateMap.position_type = position_type;
        if( callback ) { callback( jqueryMap.$slider ); }
      }
    );
    return true;
  };

  onClickToggle = function ( event ) {
    var set_chat_anchor = configMap.set_chat_anchor;
    if ( stateMap.position_type === 'opened' ) {
      set_chat_anchor( 'closed' );
    }
    else if ( stateMap.position_type === 'closed' ) {
      set_chat_anchor( 'opened' );
    } return false;
  };



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
      input_map     : input_map,
      settable_map  : configMap.settable_map,
      config_map    : configMap
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
  initModule = function( $append_target ) {
    $append_target.append( configMap.main_html );
    stateMap.$append_target = $append_target;
    setJqueryMap();
    setPxSizes();

    //initializes chat slider to default title and stateMap
    jqueryMap.$toggle.prop( 'title', configMap.slider_closed_title );
    jqueryMap.$head.click( onClickToggle );
    stateMap.position_type = 'closed';

    return true;
  };
  // End public method /initModule/



  // return public Method
  return {
    setSliderPosition : setSliderPosition,
    configModule      : configModule,
    initModule        : initModule
  };
}());
