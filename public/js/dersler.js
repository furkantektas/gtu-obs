function init() {
  var notContainer = $('#not-container');
  var refreshButton = $('#refresh-button');
  var transkriptButton = $('#transkript-button');

  var animateClass = "spin";

  refreshButton.click(function(){
    refreshButton.addClass( animateClass );
    $.ajax({ 
          url: '/dersler',
          data: {
            "login" : localStorage.getItem('login'),
            "password" : localStorage.getItem('password')
          },
          type: 'POST',
          success: function(result) {
            notContainer.html(result);
            refreshButton.removeClass( animateClass );
          }
      });
  });
  
  // transkriptButton.click(function(){
    // transkriptButton.addClass( animateClass );
    // notContainer.html('<img src="/dersler/transkript">');
    
    // $.ajax({ 
    //       url: '/dersler/transkript',
    //       data: {
    //         "login" : localStorage.getItem('login'),
    //         "password" : localStorage.getItem('password')
    //       },
    //       type: 'POST',
    //       success: function(result) {
    //         notContainer.html(result);
    //         transkriptButton.removeClass( animateClass );
    //       }
    //   });
  // });
}

if (window.addEventListener){
  window.addEventListener('load', init, false);
} else if (window.attachEvent){
  window.attachEvent('onload', init );
}
