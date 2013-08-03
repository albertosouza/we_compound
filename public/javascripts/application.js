/*
  Add your application's coffee-script code here
*/


(function() {
  jQuery(function() {
    jQuery("#Board_createdAt").datepicker();
    return jQuery('.js-change-avatar').click(function() {
      console.log('oi');
      jQuery('#user-avatar-form-area').dialog({
        width: 'auto',
        buttons: [
          {
            text: "Ok",
            click: function() {
              return jQuery(this).dialog("close");
            }
          }, {
            text: "Cancel",
            click: function() {
              return jQuery(this).dialog("close");
            }
          }
        ]
      });
      return false;
    });
  });

}).call(this);
