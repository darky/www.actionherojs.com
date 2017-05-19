import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const MainExample =
`> telnet localhost 5000

Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.

{"welcome":"Hello! Welcome to the actionhero api","room":"defaultRoom","context":"api"}
$ detailsView
{"status":"OK","context":"response","data":{"id":"2d68c389-521d-4dc6-b4f1-8292cd6cbde6","remoteIP":"127.0.0.1","remotePort":57393,"params":{},"connectedAt":1368918901456,"room":"defaultRoom","totalActions":0,"pendingActions":0},"messageCount":1}
randomNumber
{"randomNumber":0.4977603426668793,"context":"response","messageCount":2}
$ cacheTest
{"error":"Error: key is a required parameter for this action","context":"response","messageCount":3}
$ paramAdd key=myKey
{"status":"OK","context":"response","data":null,"messageCount":4}
$ paramAdd value=myValue
{"status":"OK","context":"response","data":null,"messageCount":5}
$ paramsView
{"status":"OK","context":"response","data":{"action":"cacheTest","key":"myKey","value":"myValue"},"messageCount":6}
$ cacheTest
{"cacheTestResults":{"saveResp":true,"sizeResp":1,"loadResp":{"key":"cacheTest_myKey","value":"myValue","expireTimestamp":1368918936984,"createdAt":1368918931984,"readAt":1368918931995},"deleteResp":true},"context":"response","messageCount":7}
$ roomAdd default Room
{"status":"OK"}
$ say defaultRoom hooray!
{"status":"OK","context":"response","data":null,"messageCount":8}
`

const ConfigOptions =
`exports['default'] = {
  servers: {
    socket: function (api) {
      return {
        enabled: (process.env.ENABLE_TCP_SERVER !== undefined),
        // TCP or TLS?
        secure: false,
        // Passed to tls.createServer if secure=true. Should contain SSL certificates
        serverOptions: {},
        // Port or Socket
        port: 5000,
        // Which IP to listen on (use 0.0.0.0 for all)
        bindIP: '0.0.0.0',
        // Enable TCP KeepAlive pings on each connection?
        setKeepAlive: false,
        // Delimiter string for incoming messages
        delimiter: '\n',
        // Maximum incoming message string length in Bytes (use 0 for Infinite)
        maxDataLength: 0
      }
    }
  }
}`

const TLS =
`config.severs.socket = {
  // TCP or TLS?
  secure: true,
  // Passed to tls.createServer if secure=true. Should contain SSL certificates
  serverOptions: {
    key: fs.readFileSync('certs/server-key.pem'),
    cert: fs.readFileSync('certs/server-cert.pem')
  }
};`

const TLSFromNode =
`// Connecting over TLS from another node process

var tls = require('tls');
var fs = require('fs');

var options = {
  key: fs.readFileSync('certs/server-key.pem'),
  cert: fs.readFileSync('certs/server-cert.pem')
};

var cleartextStream = tls.connect(5000, options, function() {
  console.log('client connected', cleartextStream.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(cleartextStream);
  process.stdin.resume();
});
cleartextStream.setEncoding('utf8');
cleartextStream.on('data', function(data) {
  console.log(data);
});`

const ClientSuggestions =
`var actionheroClient = require("actionhero-client");
var client = new actionheroClient();

client.on("say", function(msgBlock){
  console.log(" > SAY: " + msgBlock.message + " | from: " + msgBlock.from);
});

client.on("welcome", function(msg){
  console.log("WELCOME: " + msg);
});

client.on("error", function(error, data){
  console.log("ERROR: " + error);
  if(data){ console.log(data); }
});

client.on("end", function(){
  console.log("Connection Ended");
});

client.on("timeout", function(error, request, caller){
  console.log(request + " timed out");
});

client.connect({
  host: "127.0.0.1",
  port: "5000",
}, function(){
  // get details about myself
  console.log(client.details);

  // try an action
  var params = { key: "mykey", value: "myValue" };
  client.actionWithParams("cacheTest", params, function(error, apiResponse, delta){
    console.log("cacheTest action response: " + apiResponse.cacheTestResults.saveResp);
    console.log(" ~ request duration: " + delta + "ms");
  });

  // join a chat room and talk
  client.roomAdd("defaultRoom", function(error){
    client.say("defaultRoom", "Hello from the actionheroClient");
    client.roomLeave("defaultRoom");
  });

  // leave
  setTimeout(function(){
    client.disconnect(function(){
      console.log("all done!");
    });
  }, 1000);

});`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Servers: Socket',
        icon: '/static/images/internet-of-things.svg'
      },
      sections: {
        'overview': 'Overview',
        'config-options': 'Config Options',
        'tls': 'TLS Encryption',
        'files-and-routes': 'Files and Routes',
        'json-params': 'JSON Params',
        'client-suggestions': 'Client Suggestions'
      },
      links: [
        {link: '/docs/servers/websocket', title: '« Servers: Web Socket'}
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
                <Code>{MainExample}</Code>

                <p>You can access actionhero's methods via a persistent socket connection.  The default port for this type of communication is 5000.  As this is a persistent connection, socket connections have actionhero's verbs available to them.  These verbs are:</p>

                <ul>
                  <li><code>quit</code> disconnect from the session</li>
                  <li><code>paramAdd</code> - save a singe variable to your connection.  IE: ‘addParam screenName=evan'</li>
                  <li><code>paramView</code> - returns the details of a single param. IE: ‘viewParam screenName'</li>
                  <li><code>paramDelete</code> - deletes a single param.  IE: <code>deleteParam screenName</code></li>
                  <li><code>paramsView</code> - returns a JSON object of all the params set to this connection</li>
                  <li><code>paramsDelete</code> - deletes all params set to this session</li>
                  <li><code>roomAdd</code> - connect to a room.</li>
                  <li><code>roomLeave</code> - (room) leave the <code>room</code> you are connected to.</li>
                  <li><code>roomView</code> - (room) show you the room you are connected to, and information about the members currently in that room.</li>
                  <li><code>detailsView</code> - show you details about your connection, including your public ID.</li>
                  <li><code>say</code> (room,) message</li>
                </ul>

                <p>Please note that any verbs set using the above method will be sticky to the connection and sent for all subsequent requests.  Be sure to delete or update your params before your next request.</p>
                <p>To help sort out the potential stream of messages a socket user may receive, it is best to understand the "context" of the response.  For example, by default all actions set a context of "response" indicating that the message being sent to the client is response to a request they sent (either an action or a chat action like <code>say</code>).  Messages sent by a user via the <code>say</code> command have the context of <code>user</code> indicating they came form a user.  Messages resulting from data sent to the api (like an action) will have the <code>response</code> context.</p>
                <p><code>connection.type</code> for a TCP/Socket client is "socket"</p>
              </div>
            )}

            { this.section('config-options',
              <div>
                <Code>{ConfigOptions}</Code>
              </div>
            )}

            { this.section('tls',
              <div>
                <Code>{TLS}</Code>

                <p>You can switch your TCP server to use TLS encryption if you desire.  Just toggle the settings in <code>/config/servers/socket.js</code> and provide valid certificates.  You can test this with the openSSL client rather than telnet <code>openssl s_client -connect 127.0.0.1:5000</code></p>
                <p>Note that if you wish to create a secure (tls) server, you will be required to complete the serverOptions hash with at least a cert and a keyfile:</p>
                <p>You can connect like: <code>openssl s_client -connect 127.0.0.1:5000</code></p>
                <p>or from node:</p>
                <Code>{TLSFromNode}</Code>
              </div>
            )}

            { this.section('files-and-routes',
              <div>
                <p>Connections over socket can also use the file action.  There is no route for files.</p>

                <ul>
                  <li>Errors are returned in the normal way <code>{`{error: someError}`}</code> when they exist.</li>
                  <li>A successful file transfer will return the raw file data in a single send().  There will be no headers set, not will the content be JSON.</li>
                </ul>
              </div>
            )}

            { this.section('json-params',
              <div>
                <p>The default method of using actions for TCP clients is to use the methods above to set params to their session and then call actions inline.  However, you can also communication via JSON, passing along params specific to each request.</p>

                <ul>
                  <li><code>{`{"action": "myAction", "params": {"key": "value"}}`}</code> is also a valid request over TCP</li>
                </ul>
              </div>
            )}

            { this.section('client-suggestions',
              <div>
                <Code>{ClientSuggestions}</Code>
                <p>The main <code>trick</code> to working with TCP/wire connections directly is to remember that you can have many ‘pending' requests at the same time.  Also, the order in which you receive responses back can be variable.  if you request <code>slowAction</code> and then <code>fastAction</code>, it's fairly likely that you will get a response to <code>fastAction</code> first.</p>
                <p>Note that only requests the client makes increment the <code>messageCount</code>, but broadcasts do not (the <code>say</code> command, etc)</p>
                <p><a href='https://github.com/actionhero/actionhero-client'>The actionhero client library</a> uses TCP/TLS connections, and makes use of actionhero's <code>messageCount</code> parameter to keep track of requests, and keeps response callbacks for actions in a pending queue. For example:</p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
