
###
  Jquery's
###
jQuery ->
    jQuery("#Board_createdAt").datepicker()

    #    Avatar
    # Dialog Link
    jQuery('.js-change-avatar').click ->
        console.log('oi')
        jQuery('#user-avatar-form-area').dialog({
           width: 'auto',
           buttons: [{
            text: "Ok",
            click: ->
                jQuery( this ).dialog( "close" )
            },
            text: "Cancel",
            click: ->
                jQuery(this).dialog("close")

           ]
        })
        return false
