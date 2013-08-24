# WE Angular

# MODULE
weApp = angular.module( 'weApp', [ 'ngResource' ]  )

# register a new service
weApp.value('appName', 'weApp');


weApp.config ["$httpProvider", (provider)->
      provider.defaults.headers.common['X-CSRF-Token'] = jQuery('meta[name=csrf-token]').attr('content')
]

###
  SERVICES
###
weApp.factory 'getAuthenticityToken', ->
  ->
    jQuery("meta[name=csrf-token").attr('content')

###
  Resources
###

weApp.factory 'PostsResource', ['$resource', ($resource) ->
  PostsResource = $resource('/posts/:id.json', {
  }, {
    # Define methods on the Station object

    # /stations/autocomplete?term=Pra
    # Invoke as: Station.autocomplete({term: 'Pra'})
    #autocomplete: {method: 'GET', isArray: true, params: {collectionRoute: 'autocomplete'}}

    # /stations/123/location
    # Invoke as: Station.location({id: 123})
    #location: {method: 'GET', params: {memberRoute: 'location'}}
  })

  PostsResource
]

###
  Controllers
###

weApp.controller 'postsController',['$scope', '$http', 'PostsResource', ($scope , $http, PostsResource)->

  $scope.posts = []

  $scope.load = ->
    posts = PostsResource.query ->
      $scope.posts = posts

  #initial load
  $scope.load()

  #$scope.PostsAutoload = setInterval($scope.load,10000);

]

weApp.controller 'postController',['$scope', '$http', 'getAuthenticityToken', ($scope , $http, getAuthenticityToken)->

  $scope.init = (id)->
    $scope.Post.id = id

  $scope.up = ()->
    console.log 'up'

  $scope.down = ()->
    console.log 'down'

  $scope.share = ()->
    console.log 'share'

  $scope.edit = (event)->
    event.preventDefault()
    event.stopPropagation()
    console.log $scope
    console.log 'edit'

  $scope.delete = (event)->
    event.preventDefault()
    event.stopPropagation()
    console.log 'delete'
    if confirm 'Permanently delete this post?'
      $http.delete("/posts/" + $scope.Post.id + ".json",{
          params: {
            authenticity_token: getAuthenticityToken()
          }

        }).success( (data, status, headers, config) ->
          if status == 200
            console.log 'deleted'
          console.log data
          console.log status
        ).error( (data, status, headers, config) ->
            console.log data
        )
]

weApp.controller 'shareboxController',['$scope', '$http', 'getAuthenticityToken', 'PostsResource', ($scope , $http, getAuthenticityToken, PostsResource)->
  # on submit do this

  $scope.submit = ()->
    # TODO change post server receive to accept oly attributes and remove 'Post' from next line
    post = new PostsResource { 'Post': $scope.Post }
    post.$save( (data,headers)->
      jQuery( 'div.share-box-area .footer' ).hide()
      jQuery( 'div.share-box-area textarea' ).val('')
    ,
    (err,headers)->
      # TODO need error handler here
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

