# Cakefile

{exec} = require "child_process"

REPORTER = "list"

task "test", "run tests", ->
  exec "NODE_ENV=test
    ./node_modules/.bin/mocha
    --reporter #{REPORTER}
    --require test/init.js test/*/*.test.js
    --colors
    --ui bdd
  ", (err, output) ->
    throw err if err
    console.log output

task "test-one", "run tests", ->
  exec "NODE_ENV=test
    ./node_modules/.bin/mocha
    --reporter #{REPORTER}
    --require test/init.js test/*/*.test.js
    --colors
    --bail false
    --ui bdd
  ", (err, output) ->
    console.log err if err
    console.log output


  # NODE_ENV=test ./node_modules/.bin/mocha --require test/init.js test/*/*.test.js