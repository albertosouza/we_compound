###
  messenger's coffee-script code
###

jQuery ->
  jQuery(".messenger-off").click ->
    jQuery(".messenger-off").hide()
    jQuery(".messenger").show()

  jQuery(".messenger .header").click ->
    jQuery(".messenger").hide()
    jQuery(".messenger-off").show()