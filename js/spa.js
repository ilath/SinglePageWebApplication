var spa = ( function($) {
  //Module scope variables
  var
    configMap = {
      extended_height : 434,
      extended_title : 'Click to retract',
      retracted_height : 16,
      retracted_title : 'Click to extent',
      template_html : '<div class="spa-slider"><\/div>'
    },
    $chatSlider,
    toggleSlider, onClickSlider, initModule;

  //Dom Method /toggleSlider/
  //alternates slider height
  toggleSlider = function () {
    var slider_height = $chatSlider.height();
    //extend slider if fully retract
    if(slider_height === configMap.retracted_height){
      $chatSlider
        .animate({height : comfigMap.extended_height})
        .attr('title',configMap.extended_title);
      return true;
    }
    //retract slider if fully extended
    else if(slider_height === configMap.extended_height){
      $chatSlider
        .animate({height:comfigMap.retracted_height})
        .attr('title',configMap.retracted_title);
      return true;
    }
    //do not take action if slider is in transition
    return false;
  };

  //Event handler /onClickSlider/
  //receives click event and calls toggleSlider
  onClickSlider = function (event) {
    toggleSlider();
    return false;
  };

  //Public method /initModule/
  //set initial state and provides feature
  initModule = function ($container) {
    //render html
    $container.html(configMap.template_html);
    $chatSlider = $container.find('.spa-slider');

    //initialize slider height and title
    //bind the user clink event to the event handler
    $chatSlider.attr('title', configMap.retracted_title).click(onClickSlider);

    return true;
  };

  return {initModule : initModule};
}($));
