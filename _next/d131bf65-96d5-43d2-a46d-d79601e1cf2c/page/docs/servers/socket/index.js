
          window.__NEXT_REGISTER_PAGE('/docs/servers/socket', function() {
            var comp = module.exports=webpackJsonp([12],{1247:function(e,t,n){e.exports=n(1248)},1248:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(9),r=a(o),l=n(1),s=a(l),i=n(8),c=a(i),u=n(2),m=a(u),d=n(3),f=a(d),N="/home/ubuntu/www.actionherojs.com/pages/docs/servers/socket.js?entry",_=n(0),h=a(_),p=n(16),b=a(p),E=n(11),v=n(14),g=a(v),y=n(18),k=a(y),S=function(e){function t(e){(0,s.default)(this,t);var n=(0,m.default)(this,(t.__proto__||(0,r.default)(t)).call(this,e));return n.state={titleSection:{title:"Servers: Socket",icon:"/static/images/internet-of-things.svg"},sections:{overview:"Overview","config-options":"Config Options",tls:"TLS Encryption","files-and-routes":"Files and Routes","json-params":"JSON Params","client-suggestions":"Client Suggestions"},links:[{link:"/docs/servers/websocket",title:"« Servers: Web Socket"}]},n}return(0,f.default)(t,e),(0,c.default)(t,[{key:"render",value:function(){return h.default.createElement(g.default,{sideNav:this.state.sections,titleSection:this.state.titleSection,links:this.state.links,currentSection:this.state.currentSection,__source:{fileName:N,lineNumber:172}},h.default.createElement(E.Row,{__source:{fileName:N,lineNumber:173}},h.default.createElement(E.Col,{md:12,__source:{fileName:N,lineNumber:174}},this.section("overview",h.default.createElement("div",{__source:{fileName:N,lineNumber:176}},h.default.createElement(k.default,{__source:{fileName:N,lineNumber:177}},'> telnet localhost 5000\n\nTrying 127.0.0.1...\nConnected to localhost.\nEscape character is \'^]\'.\n\n{"welcome":"Hello! Welcome to the actionhero api","room":"defaultRoom","context":"api"}\n$ detailsView\n{"status":"OK","context":"response","data":{"id":"2d68c389-521d-4dc6-b4f1-8292cd6cbde6","remoteIP":"127.0.0.1","remotePort":57393,"params":{},"connectedAt":1368918901456,"room":"defaultRoom","totalActions":0,"pendingActions":0},"messageCount":1}\nrandomNumber\n{"randomNumber":0.4977603426668793,"context":"response","messageCount":2}\n$ cacheTest\n{"error":"Error: key is a required parameter for this action","context":"response","messageCount":3}\n$ paramAdd key=myKey\n{"status":"OK","context":"response","data":null,"messageCount":4}\n$ paramAdd value=myValue\n{"status":"OK","context":"response","data":null,"messageCount":5}\n$ paramsView\n{"status":"OK","context":"response","data":{"action":"cacheTest","key":"myKey","value":"myValue"},"messageCount":6}\n$ cacheTest\n{"cacheTestResults":{"saveResp":true,"sizeResp":1,"loadResp":{"key":"cacheTest_myKey","value":"myValue","expireTimestamp":1368918936984,"createdAt":1368918931984,"readAt":1368918931995},"deleteResp":true},"context":"response","messageCount":7}\n$ roomAdd default Room\n{"status":"OK"}\n$ say defaultRoom hooray!\n{"status":"OK","context":"response","data":null,"messageCount":8}\n'),h.default.createElement("p",{__source:{fileName:N,lineNumber:179}},"You can access actionhero's methods via a persistent socket connection.  The default port for this type of communication is 5000.  As this is a persistent connection, socket connections have actionhero's verbs available to them.  These verbs are:"),h.default.createElement("ul",{__source:{fileName:N,lineNumber:181}},h.default.createElement("li",{__source:{fileName:N,lineNumber:182}},h.default.createElement("code",{__source:{fileName:N,lineNumber:182}},"quit")," disconnect from the session"),h.default.createElement("li",{__source:{fileName:N,lineNumber:183}},h.default.createElement("code",{__source:{fileName:N,lineNumber:183}},"paramAdd")," - save a singe variable to your connection.  IE: ‘addParam screenName=evan'"),h.default.createElement("li",{__source:{fileName:N,lineNumber:184}},h.default.createElement("code",{__source:{fileName:N,lineNumber:184}},"paramView")," - returns the details of a single param. IE: ‘viewParam screenName'"),h.default.createElement("li",{__source:{fileName:N,lineNumber:185}},h.default.createElement("code",{__source:{fileName:N,lineNumber:185}},"paramDelete")," - deletes a single param.  IE: ",h.default.createElement("code",{__source:{fileName:N,lineNumber:185}},"deleteParam screenName")),h.default.createElement("li",{__source:{fileName:N,lineNumber:186}},h.default.createElement("code",{__source:{fileName:N,lineNumber:186}},"paramsView")," - returns a JSON object of all the params set to this connection"),h.default.createElement("li",{__source:{fileName:N,lineNumber:187}},h.default.createElement("code",{__source:{fileName:N,lineNumber:187}},"paramsDelete")," - deletes all params set to this session"),h.default.createElement("li",{__source:{fileName:N,lineNumber:188}},h.default.createElement("code",{__source:{fileName:N,lineNumber:188}},"roomAdd")," - connect to a room."),h.default.createElement("li",{__source:{fileName:N,lineNumber:189}},h.default.createElement("code",{__source:{fileName:N,lineNumber:189}},"roomLeave")," - (room) leave the ",h.default.createElement("code",{__source:{fileName:N,lineNumber:189}},"room")," you are connected to."),h.default.createElement("li",{__source:{fileName:N,lineNumber:190}},h.default.createElement("code",{__source:{fileName:N,lineNumber:190}},"roomView")," - (room) show you the room you are connected to, and information about the members currently in that room."),h.default.createElement("li",{__source:{fileName:N,lineNumber:191}},h.default.createElement("code",{__source:{fileName:N,lineNumber:191}},"detailsView")," - show you details about your connection, including your public ID."),h.default.createElement("li",{__source:{fileName:N,lineNumber:192}},h.default.createElement("code",{__source:{fileName:N,lineNumber:192}},"say")," (room,) message")),h.default.createElement("p",{__source:{fileName:N,lineNumber:195}},"Please note that any verbs set using the above method will be sticky to the connection and sent for all subsequent requests.  Be sure to delete or update your params before your next request."),h.default.createElement("p",{__source:{fileName:N,lineNumber:196}},'To help sort out the potential stream of messages a socket user may receive, it is best to understand the "context" of the response.  For example, by default all actions set a context of "response" indicating that the message being sent to the client is response to a request they sent (either an action or a chat action like ',h.default.createElement("code",{__source:{fileName:N,lineNumber:196}},"say"),").  Messages sent by a user via the ",h.default.createElement("code",{__source:{fileName:N,lineNumber:196}},"say")," command have the context of ",h.default.createElement("code",{__source:{fileName:N,lineNumber:196}},"user")," indicating they came form a user.  Messages resulting from data sent to the api (like an action) will have the ",h.default.createElement("code",{__source:{fileName:N,lineNumber:196}},"response")," context."),h.default.createElement("p",{__source:{fileName:N,lineNumber:197}},h.default.createElement("code",{__source:{fileName:N,lineNumber:197}},"connection.type"),' for a TCP/Socket client is "socket"'))),this.section("config-options",h.default.createElement("div",{__source:{fileName:N,lineNumber:202}},h.default.createElement(k.default,{__source:{fileName:N,lineNumber:203}},"exports['default'] = {\n  servers: {\n    socket: function (api) {\n      return {\n        enabled: (process.env.ENABLE_TCP_SERVER !== undefined),\n        // TCP or TLS?\n        secure: false,\n        // Passed to tls.createServer if secure=true. Should contain SSL certificates\n        serverOptions: {},\n        // Port or Socket\n        port: 5000,\n        // Which IP to listen on (use 0.0.0.0 for all)\n        bindIP: '0.0.0.0',\n        // Enable TCP KeepAlive pings on each connection?\n        setKeepAlive: false,\n        // Delimiter string for incoming messages\n        delimiter: '\n',\n        // Maximum incoming message string length in Bytes (use 0 for Infinite)\n        maxDataLength: 0\n      }\n    }\n  }\n}"))),this.section("tls",h.default.createElement("div",{__source:{fileName:N,lineNumber:208}},h.default.createElement(k.default,{__source:{fileName:N,lineNumber:209}},"config.severs.socket = {\n  // TCP or TLS?\n  secure: true,\n  // Passed to tls.createServer if secure=true. Should contain SSL certificates\n  serverOptions: {\n    key: fs.readFileSync('certs/server-key.pem'),\n    cert: fs.readFileSync('certs/server-cert.pem')\n  }\n};"),h.default.createElement("p",{__source:{fileName:N,lineNumber:211}},"You can switch your TCP server to use TLS encryption if you desire.  Just toggle the settings in ",h.default.createElement("code",{__source:{fileName:N,lineNumber:211}},"/config/servers/socket.js")," and provide valid certificates.  You can test this with the openSSL client rather than telnet ",h.default.createElement("code",{__source:{fileName:N,lineNumber:211}},"openssl s_client -connect 127.0.0.1:5000")),h.default.createElement("p",{__source:{fileName:N,lineNumber:212}},"Note that if you wish to create a secure (tls) server, you will be required to complete the serverOptions hash with at least a cert and a keyfile:"),h.default.createElement("p",{__source:{fileName:N,lineNumber:213}},"You can connect like: ",h.default.createElement("code",{__source:{fileName:N,lineNumber:213}},"openssl s_client -connect 127.0.0.1:5000")),h.default.createElement("p",{__source:{fileName:N,lineNumber:214}},"or from node:"),h.default.createElement(k.default,{__source:{fileName:N,lineNumber:215}},"// Connecting over TLS from another node process\n\nvar tls = require('tls');\nvar fs = require('fs');\n\nvar options = {\n  key: fs.readFileSync('certs/server-key.pem'),\n  cert: fs.readFileSync('certs/server-cert.pem')\n};\n\nvar cleartextStream = tls.connect(5000, options, function() {\n  console.log('client connected', cleartextStream.authorized ? 'authorized' : 'unauthorized');\n  process.stdin.pipe(cleartextStream);\n  process.stdin.resume();\n});\ncleartextStream.setEncoding('utf8');\ncleartextStream.on('data', function(data) {\n  console.log(data);\n});"))),this.section("files-and-routes",h.default.createElement("div",{__source:{fileName:N,lineNumber:220}},h.default.createElement("p",{__source:{fileName:N,lineNumber:221}},"Connections over socket can also use the file action.  There is no route for files."),h.default.createElement("ul",{__source:{fileName:N,lineNumber:223}},h.default.createElement("li",{__source:{fileName:N,lineNumber:224}},"Errors are returned in the normal way ",h.default.createElement("code",{__source:{fileName:N,lineNumber:224}},"{error: someError}")," when they exist."),h.default.createElement("li",{__source:{fileName:N,lineNumber:225}},"A successful file transfer will return the raw file data in a single send().  There will be no headers set, not will the content be JSON.")))),this.section("json-params",h.default.createElement("div",{__source:{fileName:N,lineNumber:231}},h.default.createElement("p",{__source:{fileName:N,lineNumber:232}},"The default method of using actions for TCP clients is to use the methods above to set params to their session and then call actions inline.  However, you can also communication via JSON, passing along params specific to each request."),h.default.createElement("ul",{__source:{fileName:N,lineNumber:234}},h.default.createElement("li",{__source:{fileName:N,lineNumber:235}},h.default.createElement("code",{__source:{fileName:N,lineNumber:235}},'{"action": "myAction", "params": {"key": "value"}}')," is also a valid request over TCP")))),this.section("client-suggestions",h.default.createElement("div",{__source:{fileName:N,lineNumber:241}},h.default.createElement(k.default,{__source:{fileName:N,lineNumber:242}},'var actionheroClient = require("actionhero-client");\nvar client = new actionheroClient();\n\nclient.on("say", function(msgBlock){\n  console.log(" > SAY: " + msgBlock.message + " | from: " + msgBlock.from);\n});\n\nclient.on("welcome", function(msg){\n  console.log("WELCOME: " + msg);\n});\n\nclient.on("error", function(error, data){\n  console.log("ERROR: " + error);\n  if(data){ console.log(data); }\n});\n\nclient.on("end", function(){\n  console.log("Connection Ended");\n});\n\nclient.on("timeout", function(error, request, caller){\n  console.log(request + " timed out");\n});\n\nclient.connect({\n  host: "127.0.0.1",\n  port: "5000",\n}, function(){\n  // get details about myself\n  console.log(client.details);\n\n  // try an action\n  var params = { key: "mykey", value: "myValue" };\n  client.actionWithParams("cacheTest", params, function(error, apiResponse, delta){\n    console.log("cacheTest action response: " + apiResponse.cacheTestResults.saveResp);\n    console.log(" ~ request duration: " + delta + "ms");\n  });\n\n  // join a chat room and talk\n  client.roomAdd("defaultRoom", function(error){\n    client.say("defaultRoom", "Hello from the actionheroClient");\n    client.roomLeave("defaultRoom");\n  });\n\n  // leave\n  setTimeout(function(){\n    client.disconnect(function(){\n      console.log("all done!");\n    });\n  }, 1000);\n\n});'),h.default.createElement("p",{__source:{fileName:N,lineNumber:243}},"The main ",h.default.createElement("code",{__source:{fileName:N,lineNumber:243}},"trick")," to working with TCP/wire connections directly is to remember that you can have many ‘pending' requests at the same time.  Also, the order in which you receive responses back can be variable.  if you request ",h.default.createElement("code",{__source:{fileName:N,lineNumber:243}},"slowAction")," and then ",h.default.createElement("code",{__source:{fileName:N,lineNumber:243}},"fastAction"),", it's fairly likely that you will get a response to ",h.default.createElement("code",{__source:{fileName:N,lineNumber:243}},"fastAction")," first."),h.default.createElement("p",{__source:{fileName:N,lineNumber:244}},"Note that only requests the client makes increment the ",h.default.createElement("code",{__source:{fileName:N,lineNumber:244}},"messageCount"),", but broadcasts do not (the ",h.default.createElement("code",{__source:{fileName:N,lineNumber:244}},"say")," command, etc)"),h.default.createElement("p",{__source:{fileName:N,lineNumber:245}},h.default.createElement("a",{href:"https://github.com/actionhero/actionhero-client",__source:{fileName:N,lineNumber:245}},"The actionhero client library")," uses TCP/TLS connections, and makes use of actionhero's ",h.default.createElement("code",{__source:{fileName:N,lineNumber:245}},"messageCount")," parameter to keep track of requests, and keeps response callbacks for actions in a pending queue. For example:"))))))}}]),t}(b.default);t.default=S}},[1247]);
            return { page: comp.default }
          })
        