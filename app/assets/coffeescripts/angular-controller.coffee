# WE Angular

# MODULE
weApp = angular.module( 'weApp', [] )

# register a new service
weApp.value('appName', 'weApp');

###
  SERVICES
###
weApp.factory 'getAuthenticityToken', ->
  ->
    jQuery("meta[name=csrf-param").attr('content')

###
  Controllers
###


weApp.controller 'shareboxController',['$scope', '$http', 'getAuthenticityToken', ($scope , $http, getAuthenticityToken)->
  # on submit do this
  $scope.submit = () ->
    $http.post("/posts.json",{
      Post: this.Post,
      authenticity_token: getAuthenticityToken()

    }).success( (data, status, headers, config) ->
        console.log data
        console.log status
    ).error( (data, status, headers, config) ->
        console.log data
    )
]



jQuery ->
  #disable submits for angular forms
  jQuery('form.sharebox').submit ()->
    return false;

  jQuery('form.sharebox textarea.post-content').on 'focus', (event) ->
    jQuery( 'div.share-box-area .footer' ).show()

  jQuery('div.share-box-area .footer .actions .cancel').on 'click', (event) ->
    jQuery( 'div.share-box-area .footer' ).hide()
    return false

