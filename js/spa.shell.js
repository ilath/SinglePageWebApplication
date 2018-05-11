spa.shell = (function () {
  var
    configMap = {
      main_html : String()
        + '<div class="spa-shell-head">'
          + '<div class="spa-shell-head-logo"></div>'
          + '<div class="spa-shell-head-acct"></div>'
          + '<div class="spa-shell-head-search"></div>'
        + '</div>'
        + '<div class="spa-shell-main">'
          + '<div class="spa-shell-main-nav"></div>'
          + '<div class="spa-shell-main-content"></div>'
        + '</div>'
        + '<div class="spa-shell-foot"></div>'
        + '<div class="spa-shell-chat"></div>'
        + '<div class="spa-shell-modal"></div>',
      chat_extend_time    : 1000,
      chat_retract_time   : 300,
      chat_extend_height  : 450,
      chat_retract_height : 15,
      chat_extend_title   : 'Click to retract',
      chat_retract_title  : 'Click to extend'
    },
    stateMap  = {
      $container        : null,
      is_chat_retracted : true
    },
    jqueryMap = {},

    setJqueryMap, toggleChat, onClickChat, initModule;

    setJqueryMap = function () {
      var $container = stateMap.$container;

      jqueryMap = {
        $container : $container,
        $chat : $container.find( '.spa-shell-chat' )
      };
    };


    // Begin Dom Method /toggleChat/
    toggleChat = function ( do_extend, callback ) {
      var
        px_chat_ht  = jqueryMap.$chat.height(),
        is_open     = px_chat_ht === configMap.chat_extend_height,
        is_closed   = px_chat_ht === configMap.chat_retract_height,
        is_sliding  = ! is_open && ! is_closed;

      // Avoid race condition
      if ( is_sliding ) { return false; }

      // Begin extend chat slider
      if( do_extend ) {
        jqueryMap.$chat.animate(
          { height : configMap.chat_extend_height },
          configMap.chat_extend_time,
          function () {
            jqueryMap.$chat.attr(
              'title' , configMap.chat_extend_title
            );
            stateMap.is_chat_retracted = false;
            if ( callback ) { callback( jqueryMap.$chat ); }
          }
        );
        return true;
      }
      // End extend chat slider

      // Begin retract chat slider
      jqueryMap.$chat.animate(
        { height : configMap.chat_retract_height },
        configMap.chat_retract_time,
        function () {
          jqueryMap.$chat.attr(
            'title' , configMap.chat_retract_title
          );
          stateMap.is_chat_retracted = true;
          if ( callback ) { callback( jqueryMap.$chat ); }
        }
      );
      return true;
      // End retract chat slider
    };
    // End Dom Method /toggleChat/

    onClickChat = function ( event ) {
      toggleChat( stateMap.is_chat_retracted );
      return false;
    }

    // Begin Public Method /initModule/
    initModule = function ( $container ) {
      //loat HTML and map jQuery collections
      stateMap.$container = $container;
      $container.html( configMap.main_html );
      setJqueryMap();

      stateMap.is_chat_retracted = true;
      jqueryMap.$chat
        .attr( 'title', configMap.chat_extend_title )
        .click( onClickChat );
    };
    // End Public Method /initModule/

    return { initModule : initModule };
} () );
