/*
  messenger's coffee-script code
*/


(function() {
  jQuery(function() {
    jQuery(".messenger-off").click(function() {
      jQuery(".messenger-off").hide();
      return jQuery(".messenger").show();
    });
    return jQuery(".messenger .header").click(function() {
      jQuery(".messenger").hide();
      return jQuery(".messenger-off").show();
    });
  });

}).call(this);
