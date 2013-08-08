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

  /* Sharebox ( post )*/


  window.shareboxController = function($scope) {
    $scope.list = [];
    $scope.text = 'hello';
    return $scope.submit = function() {
      console.log(this);
      console.log(this.action);
      if (this.text) {
        this.list.push(this.text);
        return this.text = '';
      }
    };
  };

}).call(this);
