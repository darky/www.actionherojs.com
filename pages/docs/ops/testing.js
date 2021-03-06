import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const GetStarted =
`// package.json from a new actionhero project with \`mocha\` and \`chai\` included
{
  "author"      : "YOU <YOU@example.com>",
  "name"        : "my_actionhero_project",
  "description" : "my actionhero project",
  "version"     : "0.0.1",
  "engines"     : {
    "node": ">=0.10.0"
  },
  "dependencies" : {
    "actionhero" : "12.3.0",
    "ws"         : "latest"
  },
  "devDependencies" : {
    "cross-env": "latest",
    "mocha"  : "latest",
    "chai" : "latest"
  },
  "scripts" : {
    "help"         : "actionhero help",
    "start"        : "actionhero start",
    "actionhero"   : "actionhero",
    "start cluster": "actionhero start cluster",
    "test"         : "cross-env NODE_ENV=test mocha"
  }
}
`
const ExampleTest =
`'use strict'

let path = require('path')
var expect = require('chai').expect
var ActionheroPrototype = require(path.join(__dirname, '/../../actionhero.js'))
var actionhero = new ActionheroPrototype()
var api

describe('Action: RandomNumber', () => {
  before((done) => {
    actionhero.start((error, a) => {
      expect(error).to.be.null()
      api = a
      done()
    })
  })

  after((done) => {
    actionhero.stop(() => {
      done()
    })
  })

  var firstNumber = null
  it('generates random numbers', (done) => {
    api.specHelper.runAction('randomNumber', (response) => {
      expect(response.randomNumber).to.be.at.least(0)
      expect(response.randomNumber).to.be.at.most(1)
      firstNumber = response.randomNumber
      done()
    })
  })

  it('is unique / random', (done) => {
    api.specHelper.runAction('randomNumber', (response) => {
      expect(response.randomNumber).to.be.at.least(0)
      expect(response.randomNumber).to.be.at.most(1)
      expect(response.randomNumber).not.to.equal(firstNumber)
      done()
    })
  })
})`

const RunActionExample =
`api.specHelper.runAction('cacheTest', {key: 'key', value: 'value'}, function(message, connection){
// message is the normal API response;
// connection is a new connection object
})
`

const GetStaticFile =
`var message = {
error    : error,    // null if everything is OK
content  : (string), // string representation of the file's body
mime     : mime,     // file mime
length   : length    // bytes
}`

const RunTask =
`api.specHelper.runTask('sendEmailTask', {message: 'hello' to: 'evan@test.com'}, function(response){
// test it!
// remember that the task really will be run, so be sure that the test environment is set properly
})`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Operations: Testing',
        icon: '/static/images/ops-tools.svg'
      },
      sections: {
        'overview': 'Overview',
        'get-started': 'Getting Started',
        'example': 'Example Test',
        'test-methods': 'Test Methods',
        'notes': 'Notes'
      },
      links: [
        {link: '/docs/ops/production-notes', title: '» Operations: Production Notes'},
        {link: '/docs/ops/development-mode', title: '« Operations: Development Mode & REPL'}
      ]
    }
  }

  render () {
    return (
      <DocsPage sideNav={this.state.sections} titleSection={this.state.titleSection} links={this.state.links} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('overview',
              <div>
                <p>ActionHero provides test helpers so that you may try your actions and tasks within a headless environment. We do this by including a <code>specHelper</code> initializer which creates a server, <code>testServer</code> when running within the test environment.  Via the <code>testServer</code>, you can easily call actions or tasks without making a real request.</p>
                <p>We have chosen <a href='http://mochajs.org/'>mocha</a> as our test framework and <a href='http://chaijs.com/'>chai</a> as our assertion tool which are included as dependencies within all new projects (<a href='/docs/get-started'>generated</a> with <code>./node_modules/.bin/actionhero generate</code>).  We also use <code>cross-env</code> to set NODE_ENV in a way that works for all operating systems, including Windows. You do not need to use these testing tools, but an example will be provided which makes use of them.</p>
                <p>You also don't need to use these test helpers, and you may want to make a real http or websocket request to test something specific.  If this is the case, you can <a href='https://github.com/actionhero/actionhero/tree/master/test/servers'>check out how ActionHero tests its own servers</a> for examples.</p>
              </div>
            )}

            { this.section('get-started',
              <div>
                <Code>{GetStarted}</Code>
                <p>To run a mocha test suite, you invoke the mocha binary, <code>./node_modules/.bin/mocha</code>.  This will tell mocha to look in your <code>./test</code> folder and run any tests that it can find.  There are ways to change the test folder location, only run specific tests, change the reporting format and more which you can learn about on <a href='http://mochajs.org/'>Mocha's website</a>.  We asume that you have <code>mocha</code> (and <code>chai</code>) installed to your project by listing it in your <code>package.json</code>.  If you used <code>ActionHero generate</code> to create your project, this should already be configured for your.</p>
                <p>The majority of the time, you'll be testing actions and other methods you have written, so you'll need to "run" an actionhero server as part of your test suite.  Many times you'll want to have ActionHero behave in a slightly unique way while testing (perhaps connect to a special database, don't log, etc).  To do this, you can change the behavior of the config files for the <code>test</code> environment.  Here is how we tell ActionHero <a href='https://github.com/actionhero/actionhero/blob/master/config/logger.js#L48-L54'>not to write any logs when testing</a>. Note thest test-specific configuration overrides the defaults.  To ensure that ActionHero boots with the <code>test</code> environment loaded, the test command you run should explicitly do this, AKA: <code>NODE_ENV=test ./node_modules/.bin/mocha</code>.  You can log this in as the <a href='https://github.com/actionhero/actionhero/blob/master/package.json#L63'><code>test</code> script in your <code>package.json</code></a> so you can simplify the running of tests with just <code>npm test</code>.</p>
                <p>ActionHero comes with a <code>specHelper</code> to make it easier to test tasks and actions.  This specHelper is a special <a href='/docs/core/#servers'>server</a> which can check things without needing to make an HTTP, websocket, etc request.  If you need to check the true behavior of a server (perhaps how the router works for an HTTP request), you should make a real HTTP request in your test suite, using something like the <a href='https://github.com/request/request'>request</a> library (<a href='https://github.com/actionhero/actionhero/blob/master/test/servers/web.js#L178-L184'>example</a>).</p>
              </div>
            )}

            { this.section('example',
              <div>
                <Code>{ExampleTest}</Code>
                <p>Say you had an action that was supposed to respond with a <code>randomNumber</code>, and you wanted to write a test for it.</p>
                <p>More details on the specHelper methods are below.</p>
                <p>If you want to see fuller example of how to create an integration test within ActionHero, please <a href='https://github.com/actionhero/actionhero-tutorial#testing'>check out the tutorial</a></p>
              </div>
            )}

            { this.section('test-methods',
              <div>
                <h3><code>new api.specHelper.connection()</code></h3>
                <ul>
                  <li>generate a new connection object for the <code>testServer</code></li>
                  <li>this connection can run actions, chat, etc.</li>
                  <li><code>connection.messages</code> will contain all messages the connection has been sent (welcome messages, action responses, say messages, etc)</li>
                </ul>

                <h3><code>api.specHelper.runAction(actionName, input, callback)</code></h3>
                <ul>
                  <li>use this method to run an action</li>
                  <li><code>input</code> can be either a <code>api.specHelper.connection</code> object, or simply a hash of params, IE: <code>{`{key: 'value'}`}</code></li>
                  <li>the callback returns <code>message</code> and <code>connection</code>.</li>
                  <li>example use:</li>
                </ul>
                <Code>{RunActionExample}</Code>

                <h3><code>api.specHelper.getStaticFile(file, callback)</code></h3>
                <ul>
                  <li>request a file in <code>/public</code> from the server</li>
                  <li>the callback returns <code>message</code> and <code>connection</code> where <code>message</code> is a hash:</li>
                </ul>
                <Code>{GetStaticFile}</Code>

                <h3><code>api.specHelper.runTask(taskName, params, callback)</code></h3>
                <ul>
                  <li>callback may or may not return anything depending on your task's makeup</li>
                </ul>
                <Code>{RunTask}</Code>
              </div>
            )}

            { this.section('notes',
              <div>
                <p>Be sure to run your tests in the <code>test</code> environment, setting the shell's env with <code>NODE_ENV=test</code>.  You can alternatively set this explicitly in your tests with <code>process.env.NODE_ENV = 'test'</code></p>
                <p>If you do not want the <code>specHelper</code> actions to include metadata (<code>data.response.serverInformation</code>, <code>data.response.requesterInformation</code>, and <code>data.response.messageCount</code>) from the server, you can configure <code>api.specHelper.returnMetadata = false</code> in your tests.</p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
