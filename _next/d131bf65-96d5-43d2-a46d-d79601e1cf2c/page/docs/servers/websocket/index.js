
          window.__NEXT_REGISTER_PAGE('/docs/servers/websocket', function() {
            var comp = module.exports=webpackJsonp([10],{1251:function(e,t,l){e.exports=l(1252)},1252:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=l(9),a=n(r),i=l(1),c=n(i),o=l(8),u=n(o),m=l(2),s=n(m),f=l(3),d=n(f),_="/home/ubuntu/www.actionherojs.com/pages/docs/servers/websocket.js?entry",N=l(0),b=n(N),h=l(16),E=n(h),g=l(11),p=l(14),w=n(p),v=l(18),k=n(v),y=function(e){function t(e){(0,c.default)(this,t);var l=(0,s.default)(this,(t.__proto__||(0,a.default)(t)).call(this,e));return l.state={titleSection:{title:"Servers: Web Socket",icon:"/static/images/real-time-chat.svg"},sections:{overview:"Overview","connection-details":"Connection Details","client-methods":"Client Methods","client-events":"Client Events","link-web-websocket":"Linking WebSockets to Web Clients","config-options":"Config Options"},links:[{link:"/docs/servers/socket",title:"» Servers: Socket"},{link:"/docs/servers/web",title:"« Servers: Web"}]},l}return(0,d.default)(t,e),(0,u.default)(t,[{key:"render",value:function(){return b.default.createElement(w.default,{sideNav:this.state.sections,titleSection:this.state.titleSection,links:this.state.links,currentSection:this.state.currentSection,__source:{fileName:_,lineNumber:133}},b.default.createElement(g.Row,{__source:{fileName:_,lineNumber:134}},b.default.createElement(g.Col,{md:12,__source:{fileName:_,lineNumber:135}},this.section("overview",b.default.createElement("div",{__source:{fileName:_,lineNumber:137}},b.default.createElement("p",{__source:{fileName:_,lineNumber:138}},"ActionHero uses ",b.default.createElement("a",{href:"https://github.com/primus/primus",__source:{fileName:_,lineNumber:138}},"Primus")," for web sockets.  The Primus project allows you to choose from many websocket backends, including ",b.default.createElement("code",{__source:{fileName:_,lineNumber:138}},"ws"),", ",b.default.createElement("code",{__source:{fileName:_,lineNumber:138}},"engine.io"),", ",b.default.createElement("code",{__source:{fileName:_,lineNumber:138}},"socket.io"),", and more. Within ActionHero, web sockets are bound to the web server (either http or https)."),b.default.createElement("p",{__source:{fileName:_,lineNumber:139}},"ActionHero will generate the client-side javascript needed for you (based on the actionheroClient library, primus, and the underlying ws transport). This file is regenerated each time you boot the application."))),this.section("connection-details",b.default.createElement("div",{__source:{fileName:_,lineNumber:144}},b.default.createElement(k.default,{__source:{fileName:_,lineNumber:145}},"// In the Browser...\n<script src=\"/public/javascript/actionheroClient.js\"><\/script>\n\n<script>\n\n  client = new ActionheroClient;\n\n  client.on('connected',    function(){ console.log('connected!') })\n  client.on('disconnected', function(){ console.log('disconnected :(') })\n\n  client.on('error',        function(error){ console.log('error', error.stack) })\n  client.on('reconnect',    function(){ console.log('reconnect') })\n  client.on('reconnecting', function(){ console.log('reconnecting') })\n\n  // this will log all messages send the client\n  // client.on('message',      function(message){ console.log(message) })\n\n  client.on('alert',        function(message){ alert(message) })\n  client.on('api',          function(message){ alert(message) })\n\n  client.on('welcome',      function(message){ appendMessage(message); })\n  client.on('say',          function(message){ appendMessage(message); })\n\n  client.connect(function(error, details){\n    if(error != null){\n      console.log(error);\n    }else{\n      client.roomAdd(\"defaultRoom\");\n      client.action('someAction', {key: 'k', value: 'v'}, function(error, data){\n        // do stuff\n      });\n    }\n  });\n\n<\/script>"),b.default.createElement("p",{__source:{fileName:_,lineNumber:146}},b.default.createElement("code",{__source:{fileName:_,lineNumber:146}},"connection.type"),' for a webSocket client is "webSocket".  This type will not change regardless of if the client has fallen back to another protocol.'),b.default.createElement("p",{__source:{fileName:_,lineNumber:147}},"Data is always returned as JSON objects to the webSocket client."),b.default.createElement("p",{__source:{fileName:_,lineNumber:148}},"An example web socket session might be the following:"),b.default.createElement("p",{__source:{fileName:_,lineNumber:149}},"You can also inspect ",b.default.createElement("code",{__source:{fileName:_,lineNumber:149}},"client.state")," (‘connected', ‘disconnected', etc).  The websocket client will attempt to re-connect automatically."),b.default.createElement("p",{__source:{fileName:_,lineNumber:150}},"If you want to communicate with a websocket client outside of an action, you can call ",b.default.createElement("code",{__source:{fileName:_,lineNumber:150}},"connection.send(message)")," on the server. In the client lib, the event message will be fired. So, ",b.default.createElement("code",{__source:{fileName:_,lineNumber:150}},"client.on('message, function(m){ ... })"),".  Be sure to add some descriptive content to the message you send from the sever (like perhaps ",b.default.createElement("code",{__source:{fileName:_,lineNumber:150}},"{\"type\": 'message type'}"),") so you can route message types on the client."))),this.section("client-methods",b.default.createElement("div",{__source:{fileName:_,lineNumber:155}},b.default.createElement("p",{__source:{fileName:_,lineNumber:156}},"Methods which an ActionHero Client instance provider are:"),b.default.createElement("h3",{__source:{fileName:_,lineNumber:158}},b.default.createElement("code",{__source:{fileName:_,lineNumber:158}},"client.connect(callback)")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:159}},b.default.createElement("li",{__source:{fileName:_,lineNumber:160}},b.default.createElement("code",{__source:{fileName:_,lineNumber:160}},"callback")," will contain (error, details)"),b.default.createElement("li",{__source:{fileName:_,lineNumber:161}},"details here is the same as the ",b.default.createElement("code",{__source:{fileName:_,lineNumber:161}},"detailsView")," method")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:164}},b.default.createElement("code",{__source:{fileName:_,lineNumber:164}},"client.action(action, params, callback)")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:165}},b.default.createElement("li",{__source:{fileName:_,lineNumber:166}},b.default.createElement("code",{__source:{fileName:_,lineNumber:166}},"action"),' is a string, like "login"'),b.default.createElement("li",{__source:{fileName:_,lineNumber:167}},b.default.createElement("code",{__source:{fileName:_,lineNumber:167}},"params")," is an object"),b.default.createElement("li",{__source:{fileName:_,lineNumber:168}},b.default.createElement("code",{__source:{fileName:_,lineNumber:168}},"callback")," will be passed ",b.default.createElement("code",{__source:{fileName:_,lineNumber:168}},"response")," (and you can inspect ",b.default.createElement("code",{__source:{fileName:_,lineNumber:168}},"response.error"),")")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:171}},b.default.createElement("code",{__source:{fileName:_,lineNumber:171}},"client.say(room, message, callback)")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:172}},b.default.createElement("li",{__source:{fileName:_,lineNumber:173}},b.default.createElement("code",{__source:{fileName:_,lineNumber:173}},"message")," is a string"),b.default.createElement("li",{__source:{fileName:_,lineNumber:174}},"may contain an ",b.default.createElement("code",{__source:{fileName:_,lineNumber:174}},"error")),b.default.createElement("li",{__source:{fileName:_,lineNumber:175}},"note that you have to first join a room with ",b.default.createElement("code",{__source:{fileName:_,lineNumber:175}},"roomAdd")," to chat within it of recieve events")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:178}},b.default.createElement("code",{__source:{fileName:_,lineNumber:178}},"client.detailsView(callback)")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:179}},b.default.createElement("li",{__source:{fileName:_,lineNumber:180}},b.default.createElement("code",{__source:{fileName:_,lineNumber:180}},"callback")," will be passed ",b.default.createElement("code",{__source:{fileName:_,lineNumber:180}},"error"),", ",b.default.createElement("code",{__source:{fileName:_,lineNumber:180}},"response")),b.default.createElement("li",{__source:{fileName:_,lineNumber:181}},"the first response from detailsView will also always be saved to ",b.default.createElement("code",{__source:{fileName:_,lineNumber:181}},"client.details")," for later inspection"),b.default.createElement("li",{__source:{fileName:_,lineNumber:182}},"may contain an ",b.default.createElement("code",{__source:{fileName:_,lineNumber:182}},"error"))),b.default.createElement("h3",{__source:{fileName:_,lineNumber:185}},b.default.createElement("code",{__source:{fileName:_,lineNumber:185}},"client.roomView(room, callback)")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:186}},b.default.createElement("li",{__source:{fileName:_,lineNumber:187}},"will return metadata about the room"),b.default.createElement("li",{__source:{fileName:_,lineNumber:188}},"may contain an ",b.default.createElement("code",{__source:{fileName:_,lineNumber:188}},"error"))),b.default.createElement("h3",{__source:{fileName:_,lineNumber:191}},b.default.createElement("code",{__source:{fileName:_,lineNumber:191}},"client.roomAdd(room, callback)")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:192}},b.default.createElement("li",{__source:{fileName:_,lineNumber:193}},b.default.createElement("code",{__source:{fileName:_,lineNumber:193}},"room")," is a string"),b.default.createElement("li",{__source:{fileName:_,lineNumber:194}},"may contain an ",b.default.createElement("code",{__source:{fileName:_,lineNumber:194}},"error"))),b.default.createElement("h3",{__source:{fileName:_,lineNumber:197}},b.default.createElement("code",{__source:{fileName:_,lineNumber:197}},"client.roomLeave(room, callback)")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:198}},b.default.createElement("li",{__source:{fileName:_,lineNumber:199}},b.default.createElement("code",{__source:{fileName:_,lineNumber:199}},"room")," is a string"),b.default.createElement("li",{__source:{fileName:_,lineNumber:200}},"may contain an ",b.default.createElement("code",{__source:{fileName:_,lineNumber:200}},"error"))),b.default.createElement("h3",{__source:{fileName:_,lineNumber:203}},b.default.createElement("code",{__source:{fileName:_,lineNumber:203}},"client.file(callback)")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:204}},b.default.createElement("li",{__source:{fileName:_,lineNumber:205}},"see below for details")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:208}},b.default.createElement("code",{__source:{fileName:_,lineNumber:208}},"client.disconnect()")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:209}},b.default.createElement("li",{__source:{fileName:_,lineNumber:210}},"instantly sever the connection to the server")),b.default.createElement("p",{__source:{fileName:_,lineNumber:213}},"The contents of the ",b.default.createElement("code",{__source:{fileName:_,lineNumber:213}},"file")," callback look like:"),b.default.createElement(k.default,{__source:{fileName:_,lineNumber:215}},'{\n  content: "<h1>ActionHero</h1>\nI am a flat file being served to you via the API from ./public/simple.html<br />",\n  context: "response",\n  error: null,\n  length: 101,\n  messageCount: 3,\n  mime: "text/html"\n}'))),this.section("client-events",b.default.createElement("div",{__source:{fileName:_,lineNumber:220}},b.default.createElement("h3",{__source:{fileName:_,lineNumber:221}},b.default.createElement("code",{__source:{fileName:_,lineNumber:221}},"client.on(‘connected', callback)")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:222}},b.default.createElement("li",{__source:{fileName:_,lineNumber:223}},"no event data")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:226}},b.default.createElement("code",{__source:{fileName:_,lineNumber:226}},"client.on(‘disconnected', callback)")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:227}},b.default.createElement("li",{__source:{fileName:_,lineNumber:228}},"no event data")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:231}},b.default.createElement("code",{__source:{fileName:_,lineNumber:231}},"client.on(‘error', (error) => { console.log(‘error', error.stack) })")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:232}},b.default.createElement("li",{__source:{fileName:_,lineNumber:233}},"this is fired when a general error is encountered (outside of an action or verb)"),b.default.createElement("li",{__source:{fileName:_,lineNumber:234}},"this may fire when a general server error occurs")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:237}},b.default.createElement("code",{__source:{fileName:_,lineNumber:237}},"client.on(‘reconnect', () => { console.log(‘reconnect') })")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:238}},b.default.createElement("li",{__source:{fileName:_,lineNumber:239}},"fired when client has reconnected"),b.default.createElement("li",{__source:{fileName:_,lineNumber:240}},"this will indicate that details, connection.id and other server-generated settings may have changed")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:243}},b.default.createElement("code",{__source:{fileName:_,lineNumber:243}},"client.on(‘reconnecting', callback })")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:244}},b.default.createElement("li",{__source:{fileName:_,lineNumber:245}},"client is attempting to reconnect to server")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:248}},b.default.createElement("code",{__source:{fileName:_,lineNumber:248}},"client.on(‘message', (message) => { console.log(message) })")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:249}},b.default.createElement("li",{__source:{fileName:_,lineNumber:250}},"this is VERY noisy, and is fired on all messages from the server, regardless of context or callback")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:253}},b.default.createElement("code",{__source:{fileName:_,lineNumber:253}},"client.on(‘alert', (message) => { alert(message) })")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:254}},b.default.createElement("li",{__source:{fileName:_,lineNumber:255}},"fired when message recieved from the server's context is specifically ",b.default.createElement("code",{__source:{fileName:_,lineNumber:255}},"alert"))),b.default.createElement("h3",{__source:{fileName:_,lineNumber:258}},b.default.createElement("code",{__source:{fileName:_,lineNumber:258}},"client.on(‘api', (message) => { alert(message) })")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:259}},b.default.createElement("li",{__source:{fileName:_,lineNumber:260}},"fired when message recieved from the server's context is unknown or from the server")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:263}},b.default.createElement("code",{__source:{fileName:_,lineNumber:263}},"client.on(‘welcome', (message) => { console.log(message); })")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:264}},b.default.createElement("li",{__source:{fileName:_,lineNumber:265}},"server's welcome message")),b.default.createElement("h3",{__source:{fileName:_,lineNumber:268}},b.default.createElement("code",{__source:{fileName:_,lineNumber:268}},"client.on(‘say', (message) => { console.log(message); })")),b.default.createElement("ul",{__source:{fileName:_,lineNumber:269}},b.default.createElement("li",{__source:{fileName:_,lineNumber:270}},"fired on all say messages from other clients in all rooms"),b.default.createElement("li",{__source:{fileName:_,lineNumber:271}},"message.room can be inspected")))),this.section("link-web-websocket",b.default.createElement("div",{__source:{fileName:_,lineNumber:277}},b.default.createElement("p",{__source:{fileName:_,lineNumber:278}},"ActionHero provides ",b.default.createElement("code",{__source:{fileName:_,lineNumber:278}},"connection.fingerprint")," where available to help you link websocket connections to related web connections. While every connection will always have a unique ",b.default.createElement("code",{__source:{fileName:_,lineNumber:278}},"connection.id"),", we attempt to build ",b.default.createElement("code",{__source:{fileName:_,lineNumber:278}},"connection.fingerprint")," by checking the headers the websocket connection began with.  If the cookie defined by ",b.default.createElement("code",{__source:{fileName:_,lineNumber:278}},"api.config.servers.web.fingerprint.cookieKey")," is present, we will store its value on the websocket connection."),b.default.createElement("p",{__source:{fileName:_,lineNumber:279}},"You can read more about using a value like ",b.default.createElement("code",{__source:{fileName:_,lineNumber:279}},"connection.fingerprint")," in an ",b.default.createElement("a",{href:"/docs/core/middleware",__source:{fileName:_,lineNumber:279}},"authentication middleware")," or using it as a key for session information."))),this.section("config-options",b.default.createElement("div",{__source:{fileName:_,lineNumber:284}},b.default.createElement(k.default,{__source:{fileName:_,lineNumber:285}},"exports['default'] = {\n  servers: {\n    websocket: function (api) {\n      return {\n        enabled: true,\n        // you can pass a FQDN (string) here or 'window.location.origin'\n        clientUrl: 'window.location.origin',\n        // Directory to render client-side JS.\n        // Path should start with \"/\" and will be built starting from api.config..general.paths.public\n        clientJsPath: 'javascript/',\n        // the name of the client-side JS file to render.  Both `.js` and `.min.js` versions will be created\n        // do not include the file exension\n        // set to `undefined` to not render the client-side JS on boot\n        clientJsName: 'actionheroClient',\n        // should the server signal clients to not reconnect when the server is shutdown/reboot\n        destroyClientsOnShutdown: false,\n\n        // websocket Server Options:\n        server: {\n          // authorization: null,\n          // pathname:      '/primus',\n          // parser:        'JSON',\n          // transformer:   'websockets',\n          // plugin:        {},\n          // timeout:       35000,\n          // origins:       '*',\n          // methods:       ['GET','HEAD','PUT','POST','DELETE','OPTIONS'],\n          // credentials:   true,\n          // maxAge:        '30 days',\n          // exposed:       false,\n        },\n\n        // websocket Client Options:\n        client: {\n          apiPath: '/api' // the api base endpoint on your actionhero server\n          // reconnect:        {},\n          // timeout:          10000,\n          // ping:             25000,\n          // pong:             10000,\n          // strategy:         \"online\",\n          // manual:           false,\n          // websockets:       true,\n          // network:          true,\n          // transport:        {},\n          // queueSize:        Infinity,\n        }\n      }\n    }\n  }\n}"),b.default.createElement("p",{__source:{fileName:_,lineNumber:286}},"You can create your client with options.  Options for both the server and client are stored in ",b.default.createElement("code",{__source:{fileName:_,lineNumber:286}},"/config/servers/websocket.js"),".  Note there are 2 sections: ",b.default.createElement("code",{__source:{fileName:_,lineNumber:286}},"server")," and ",b.default.createElement("code",{__source:{fileName:_,lineNumber:286}},"client"),"."))))))}}]),t}(E.default);t.default=y}},[1251]);
            return { page: comp.default }
          })
        