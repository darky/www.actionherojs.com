import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const ConnectionDetails =
`// In the Browser...
<script src="/public/javascript/actionheroClient.js"></script>

<script>

  client = new ActionheroClient;

  client.on('connected',    function(){ console.log('connected!') })
  client.on('disconnected', function(){ console.log('disconnected :(') })

  client.on('error',        function(error){ console.log('error', error.stack) })
  client.on('reconnect',    function(){ console.log('reconnect') })
  client.on('reconnecting', function(){ console.log('reconnecting') })

  // this will log all messages send the client
  // client.on('message',      function(message){ console.log(message) })

  client.on('alert',        function(message){ alert(message) })
  client.on('api',          function(message){ alert(message) })

  client.on('welcome',      function(message){ appendMessage(message); })
  client.on('say',          function(message){ appendMessage(message); })

  client.connect(function(error, details){
    if(error != null){
      console.log(error);
    }else{
      client.roomAdd("defaultRoom");
      client.action('someAction', {key: 'k', value: 'v'}, function(error, data){
        // do stuff
      });
    }
  });

</script>`

const FileCallback =
`{
  content: "<h1>ActionHero</h1>\nI am a flat file being served to you via the API from ./public/simple.html<br />",
  context: "response",
  error: null,
  length: 101,
  messageCount: 3,
  mime: "text/html"
}`

const Config =
`exports['default'] = {
  servers: {
    websocket: function (api) {
      return {
        enabled: true,
        // you can pass a FQDN (string) here or 'window.location.origin'
        clientUrl: 'window.location.origin',
        // Directory to render client-side JS.
        // Path should start with "/" and will be built starting from api.config..general.paths.public
        clientJsPath: 'javascript/',
        // the name of the client-side JS file to render.  Both \`.js\` and \`.min.js\` versions will be created
        // do not include the file exension
        // set to \`undefined\` to not render the client-side JS on boot
        clientJsName: 'actionheroClient',
        // should the server signal clients to not reconnect when the server is shutdown/reboot
        destroyClientsOnShutdown: false,

        // websocket Server Options:
        server: {
          // authorization: null,
          // pathname:      '/primus',
          // parser:        'JSON',
          // transformer:   'websockets',
          // plugin:        {},
          // timeout:       35000,
          // origins:       '*',
          // methods:       ['GET','HEAD','PUT','POST','DELETE','OPTIONS'],
          // credentials:   true,
          // maxAge:        '30 days',
          // exposed:       false,
        },

        // websocket Client Options:
        client: {
          apiPath: '/api' // the api base endpoint on your actionhero server
          // reconnect:        {},
          // timeout:          10000,
          // ping:             25000,
          // pong:             10000,
          // strategy:         "online",
          // manual:           false,
          // websockets:       true,
          // network:          true,
          // transport:        {},
          // queueSize:        Infinity,
        }
      }
    }
  }
}`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Servers: Web Socket',
        icon: '/static/images/real-time-chat.svg'
      },
      sections: {
        'overview': 'Overview',
        'connection-details': 'Connection Details',
        'client-methods': 'Client Methods',
        'client-events': 'Client Events',
        'link-web-websocket': 'Linking WebSockets to Web Clients',
        'config-options': 'Config Options'
      },
      links: [
        {link: '/docs/servers/socket', title: '» Servers: Socket'},
        {link: '/docs/servers/web', title: '« Servers: Web'}
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
                <p>ActionHero uses <a href='https://github.com/primus/primus'>Primus</a> for web sockets.  The Primus project allows you to choose from many websocket backends, including <code>ws</code>, <code>engine.io</code>, <code>socket.io</code>, and more. Within ActionHero, web sockets are bound to the web server (either http or https).</p>
                <p>ActionHero will generate the client-side javascript needed for you (based on the actionheroClient library, primus, and the underlying ws transport). This file is regenerated each time you boot the application.</p>
              </div>
            )}

            { this.section('connection-details',
              <div>
                <Code>{ConnectionDetails}</Code>
                <p><code>connection.type</code> for a webSocket client is "webSocket".  This type will not change regardless of if the client has fallen back to another protocol.</p>
                <p>Data is always returned as JSON objects to the webSocket client.</p>
                <p>An example web socket session might be the following:</p>
                <p>You can also inspect <code>client.state</code> (‘connected', ‘disconnected', etc).  The websocket client will attempt to re-connect automatically.</p>
                <p>If you want to communicate with a websocket client outside of an action, you can call <code>connection.send(message)</code> on the server. In the client lib, the event message will be fired. So, <code>{`client.on('message, function(m){ ... })`}</code>.  Be sure to add some descriptive content to the message you send from the sever (like perhaps <code>{`{"type": 'message type'}`}</code>) so you can route message types on the client.</p>
              </div>
            )}

            { this.section('client-methods',
              <div>
                <p>Methods which an ActionHero Client instance provider are:</p>

                <h3><code>client.connect(callback)</code></h3>
                <ul>
                  <li><code>callback</code> will contain (error, details)</li>
                  <li>details here is the same as the <code>detailsView</code> method</li>
                </ul>

                <h3><code>client.action(action, params, callback)</code></h3>
                <ul>
                  <li><code>action</code> is a string, like "login"</li>
                  <li><code>params</code> is an object</li>
                  <li><code>callback</code> will be passed <code>response</code> (and you can inspect <code>response.error</code>)</li>
                </ul>

                <h3><code>client.say(room, message, callback)</code></h3>
                <ul>
                  <li><code>message</code> is a string</li>
                  <li>may contain an <code>error</code></li>
                  <li>note that you have to first join a room with <code>roomAdd</code> to chat within it of recieve events</li>
                </ul>

                <h3><code>client.detailsView(callback)</code></h3>
                <ul>
                  <li><code>callback</code> will be passed <code>error</code>, <code>response</code></li>
                  <li>the first response from detailsView will also always be saved to <code>client.details</code> for later inspection</li>
                  <li>may contain an <code>error</code></li>
                </ul>

                <h3><code>client.roomView(room, callback)</code></h3>
                <ul>
                  <li>will return metadata about the room</li>
                  <li>may contain an <code>error</code></li>
                </ul>

                <h3><code>client.roomAdd(room, callback)</code></h3>
                <ul>
                  <li><code>room</code> is a string</li>
                  <li>may contain an <code>error</code></li>
                </ul>

                <h3><code>client.roomLeave(room, callback)</code></h3>
                <ul>
                  <li><code>room</code> is a string</li>
                  <li>may contain an <code>error</code></li>
                </ul>

                <h3><code>client.file(callback)</code></h3>
                <ul>
                  <li>see below for details</li>
                </ul>

                <h3><code>client.disconnect()</code></h3>
                <ul>
                  <li>instantly sever the connection to the server</li>
                </ul>

                <p>The contents of the <code>file</code> callback look like:</p>

                <Code>{FileCallback}</Code>
              </div>
            )}

            { this.section('client-events',
              <div>
                <h3><code>{`client.on(‘connected', callback)`}</code></h3>
                <ul>
                  <li>no event data</li>
                </ul>

                <h3><code>{`client.on(‘disconnected', callback)`}</code></h3>
                <ul>
                  <li>no event data</li>
                </ul>

                <h3><code>{`client.on(‘error', (error) => { console.log(‘error', error.stack) })`}</code></h3>
                <ul>
                  <li>this is fired when a general error is encountered (outside of an action or verb)</li>
                  <li>this may fire when a general server error occurs</li>
                </ul>

                <h3><code>{`client.on(‘reconnect', () => { console.log(‘reconnect') })`}</code></h3>
                <ul>
                  <li>fired when client has reconnected</li>
                  <li>this will indicate that details, connection.id and other server-generated settings may have changed</li>
                </ul>

                <h3><code>{`client.on(‘reconnecting', callback })`}</code></h3>
                <ul>
                  <li>client is attempting to reconnect to server</li>
                </ul>

                <h3><code>{`client.on(‘message', (message) => { console.log(message) })`}</code></h3>
                <ul>
                  <li>this is VERY noisy, and is fired on all messages from the server, regardless of context or callback</li>
                </ul>

                <h3><code>{`client.on(‘alert', (message) => { alert(message) })`}</code></h3>
                <ul>
                  <li>fired when message recieved from the server's context is specifically <code>alert</code></li>
                </ul>

                <h3><code>{`client.on(‘api', (message) => { alert(message) })`}</code></h3>
                <ul>
                  <li>fired when message recieved from the server's context is unknown or from the server</li>
                </ul>

                <h3><code>{`client.on(‘welcome', (message) => { console.log(message); })`}</code></h3>
                <ul>
                  <li>server's welcome message</li>
                </ul>

                <h3><code>{`client.on(‘say', (message) => { console.log(message); })`}</code></h3>
                <ul>
                  <li>fired on all say messages from other clients in all rooms</li>
                  <li>message.room can be inspected</li>
                </ul>
              </div>
            )}

            { this.section('link-web-websocket',
              <div>
                <p>ActionHero provides <code>connection.fingerprint</code> where available to help you link websocket connections to related web connections. While every connection will always have a unique <code>connection.id</code>, we attempt to build <code>connection.fingerprint</code> by checking the headers the websocket connection began with.  If the cookie defined by <code>api.config.servers.web.fingerprint.cookieKey</code> is present, we will store its value on the websocket connection.</p>
                <p>You can read more about using a value like <code>connection.fingerprint</code> in an <a href='/docs/core/middleware'>authentication middleware</a> or using it as a key for session information.</p>
              </div>
            )}

            { this.section('config-options',
              <div>
                <Code>{Config}</Code>
                <p>You can create your client with options.  Options for both the server and client are stored in <code>/config/servers/websocket.js</code>.  Note there are 2 sections: <code>server</code> and <code>client</code>.</p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
