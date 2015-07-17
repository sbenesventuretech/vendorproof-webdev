jQuery(function($){
  var $con = $('.miwt_form');
  
  var updateHelpPoints = function updateHelpPoints() {
    var $helpPoints = $con.find('span.help_point');
    
    $helpPoints.each(function(){
      var $helpPoint = $(this);
      var text, $prop;
      
      if ($helpPoint.attr('title').length) {
        text = $helpPoint.attr('title').replace(/\([^\)]*\)\s+$/, '');
        text = text.replace('(Example:', '<br />(Example:');
        
        $prop = $helpPoint.closest('.prop');
        
        $helpPoint.attr('title', '').hide();
        $prop.find('.help_info').remove();
        $prop.prepend($('<div class="help_info" />').html(text));
      }
    });
  };
  
  $con.each(function(){
    var $form = $(this);
                
    $form.on('focus', '.business_information input, .business_information select', function(evt){
      $(this).closest('.prop').addClass('active').siblings().removeClass('active');
    }); 
    
    $form.on('click', '.business_information .ctb label', function(evt){
      $(this).siblings('input[type=checkbox]').focus();
    });
    
    $form.on('click', '.business_information .ctb input[type=checkbox]', function(evt){
      $(this).focus();
    }); 
    
    this.submit_options = {
      postUpdate: function(){    
        updateHelpPoints();
      }
    };
  });
  
  
    
  updateHelpPoints();
});