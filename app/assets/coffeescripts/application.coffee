###
  Add your application's coffee-script code here
###
#oi
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


### Sharebox ( post ) ###

window.shareboxController = ($scope)->
  $scope.list = []
  $scope.text = 'hello'

  # on submit do this
  $scope.submit = () ->
    console.log this
    console.log this.action
    if this.text
      this.list.push(this.text);
      this.text = '';


