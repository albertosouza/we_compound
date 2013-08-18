# WE Angular controllers

### Sharebox ( post ) ###

# sharebox controller
window.shareboxController = ($scope, $http)->
  console.log $scope
  # on submit do this
  $scope.submit = () ->
    $http.post("/posts.json",{
      Post: this.Post,
      authenticity_token: jQuery('input[name=authenticity_token]').val()

    }).success( (data, status, headers, config) ->
        console.log data
        console.log status
    ).error( (data, status, headers, config) ->
        console.log data
    )

jQuery ->
  #disable submits for angular forms
  jQuery('form.sharebox').submit ()->
    return false;

  jQuery('form.sharebox textarea.post-content').on 'focus', (event) ->
    jQuery( 'div.share-box-area .footer' ).show()

  jQuery('div.share-box-area .footer .actions .cancel').on 'click', (event) ->
    jQuery( 'div.share-box-area .footer' ).hide()
    return false

