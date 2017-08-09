
          window.__NEXT_REGISTER_PAGE('/docs/core/middleware', function() {
            var comp = module.exports=webpackJsonp([24],{1220:function(e,t,n){e.exports=n(1221)},1221:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=n(9),o=a(l),r=n(1),c=a(r),i=n(8),d=a(i),s=n(2),u=a(s),m=n(3),f=a(m),h=n(0),p=a(h),w=n(16),E=a(w),y=n(11),b=n(14),k=a(b),g=n(39),v=a(g),x=n(18),P=a(x),q=function(e){function t(e){(0,c.default)(this,t);var n=(0,u.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e));return n.state={titleSection:{title:"Core: Middleware",icon:"/static/images/api-first-development.svg"},sections:{overview:"Overview","action-request-flow":"Action Request Flow","action-middleware":"Action Middleware","connection-middleware":"Connection Middleware","chat-middleware":"Chat Middleware","task-request-flow":"Task Request Flow","task-middleware":"Task Middleware"},links:[{link:"/docs/core/initializers",title:"» Core: Initializers"},{link:"/docs/core/tasks",title:"« Core: Tasks"}]},n}return(0,f.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){return p.default.createElement(k.default,{sideNav:this.state.sections,titleSection:this.state.titleSection,links:this.state.links,currentSection:this.state.currentSection},p.default.createElement(y.Row,null,p.default.createElement(y.Col,{md:12},this.section("overview",p.default.createElement("div",null,p.default.createElement("p",null,"There are 4 types of middleware in ActionHero:"),p.default.createElement("ul",null,p.default.createElement("li",null,p.default.createElement("strong",null,"Action")),p.default.createElement("li",null,p.default.createElement("strong",null,"Connection")),p.default.createElement("li",null,p.default.createElement("strong",null,"Chat")),p.default.createElement("li",null,p.default.createElement("strong",null,"Task"))),p.default.createElement(P.default,{language:"bash"},"> Client **Connects**\n#     connection middleware, `create` hook\n> Client requests an **action**\n#     action middleware, `preProcessor` hook\n#     action middleware, `postProcessor` hook\n> Client **joins a room**\n#     chat middleware, `join` hook\n> Client **says a message** in a room\n#     chat middleware, `say` hook\n#     chat middleware, `onSayReceive` hook\n> Client requests a **disconnect** (quit)\n#     chat middleware, `leave` hook\n#     connection middleware, `destroy` hook\n> Client executes a **task**\n#     task middleware, `preProcessor` hook\n#     task middleware, `postProcessor` hook\n"),p.default.createElement("p",null,"Each type of middleware is distinct from the others, and operates on distinct parts of a client's lifecycle.  For a logical example, please inspect the following connection lifecycle:"))),this.section("action-request-flow",p.default.createElement("div",null,p.default.createElement("img",{width:"100%",src:"/static/images/connection_flow_actions.png"}))),this.section("action-middleware",p.default.createElement("div",null,p.default.createElement(P.default,null,"var middleware = {\n  name: 'userId checker',\n  global: false,\n  priority: 1000,\n  preProcessor: function(data, next){\n    if(!data.params.userId){\n      next(new Error('All actions require a userId') );\n    }else{\n      next();\n    }\n  },\n  postProcessor: function(data, next){\n    if(data.thing.stuff == false){\n      data.toRender = false;\n    }\n    next(error);\n  }\n}\n\napi.actions.addMiddleware(middleware);"),p.default.createElement("p",null,"ActionHero provides hooks for you to execute custom code both before and after the execution of all or some actions.  This is a great place to write authentication logic or custom loggers."),p.default.createElement("p",null,"Action middleware requires a ",p.default.createElement("code",null,"name")," and at least one of ",p.default.createElement("code",null,"preProcessor")," or ",p.default.createElement("code",null,"postProcessor"),".  Middleware can be ",p.default.createElement("code",null,"global"),", or you can choose to apply each middleware to an action specifically via ",p.default.createElement("code",null,"action.middleware = []")," in the action's definition.  You supply a list of middleware names, like ",p.default.createElement("code",null,"action.middleware = ['userId checker']")," in the example above."),p.default.createElement("p",null,"Each processor is passed ",p.default.createElement("code",null,"data")," and the callback ",p.default.createElement("code",null,"next"),".  Just like within actions, you can modify the ",p.default.createElement("code",null,"data")," object to add to ",p.default.createElement("code",null,"data.response")," to create a response to the client.  If you pass ",p.default.createElement("code",null,"error")," to the callback ",p.default.createElement("code",null,"next"),", that error will be returned to the client.  If a ",p.default.createElement("code",null,"preProcessor")," has an error, the action will never be called."),p.default.createElement("p",null,"The priority of a middleware orders it with all other middleware which might fire for an action.  Lower numbers happen first.  If you do not provide a priority, the default from ",p.default.createElement("code",null,"api.config.general.defaultProcessorPriority")," will be used"),p.default.createElement("h3",null,"The Data Object"),p.default.createElement("p",null,p.default.createElement("code",null,"data")," contains the same information as would be passed to an action:"),p.default.createElement(P.default,null,"data = {\n  connection: {},\n  action: 'randomNumber',\n  toProcess: true,\n  toRender: true,\n  messageCount: 1,\n  params: { action: 'randomNumber', apiVersion: 1 },\n  missingParams: [],\n  validatorErrors: [],\n  actionStartTime: 1429531553417,\n  actionTemplate: {}, // the actual object action definition\n  working: true,\n  response: {},\n  duration: null,\n  actionStatus: null,\n}"))),this.section("connection-middleware",p.default.createElement("div",null,p.default.createElement(P.default,null,"var connectionMiddleware = {\n  name: 'connection middleware',\n  priority: 1000,\n  create: function(connection){\n    // do stuff\n  },\n  destroy: function(connection){\n    // do stuff\n  }\n};\n\napi.connections.addMiddleware(connectionMiddleware);"),p.default.createElement("p",null,"Like the action middleware above, you can also create middleware to react to the creation or destruction of all connections.  Unlike action middleware, connection middleware is non-blocking and connection logic will continue as normal regardless of what you do in this type of middleware."),p.default.createElement("p",null,"Keep in mind that some connections persist (webSocket, socket) and some only exist for the duration of a single request (web).  You will likely want to inspect ",p.default.createElement("code",null,"connection.type")," in this middleware.  Again, if you do not provide a priority, the default from ",p.default.createElement("code",null,"api.config.general.defaultProcessorPriority")," will be used."),p.default.createElement("p",null,"Any modification made to the connection at this stage may happen either before or after an action, and may or may not persist to the connection depending on how the server is implemented."))),this.section("chat-middleware",p.default.createElement("div",null,p.default.createElement(P.default,null,"var chatMiddleware = {\n  name: 'chat middleware',\n  priority: 1000,\n  join: function(connection, room, callback){\n    // announce all connections entering a room\n    api.chatRoom.broadcast({}, room, 'I have joined the room: ' + connection.id, callback);\n  },\n  leave: function(connection, room, callback){\n    // announce all connections leaving a room\n    api.chatRoom.broadcast({}, room, 'I have left the room: ' + connection.id, callback);\n  },\n  /**\n   * Will be executed once per client connection before delivering the message.\n   */\n  say: function(connection, room, messagePayload, callback){\n    // do stuff\n    api.log(messagePayload);\n    callback(null, messagePayload);\n  },\n  /**\n   * Will be executed only once, when the message is sent to the server.\n   */\n  onSayReceive: function(connection, room, messagePayload, callback){\n    // do stuff\n    api.log(messagePayload);\n    callback(null, messagePayload);\n  }\n};\n\napi.chatRoom.addMiddleware(chatMiddleware);"),p.default.createElement("p",null,"The last type of middleware is used to act when a connection joins, leaves, or communicates within a chat room. We have 4 types of middleware for each step: ",p.default.createElement("code",null,"say"),", ",p.default.createElement("code",null,"onSayReceive"),", ",p.default.createElement("code",null,"join"),", and ",p.default.createElement("code",null,"leave"),"."),p.default.createElement("p",null,"Priority is optional in all cases, but can be used to order your middleware.  If an error is returned in any of these methods, it will be returned to the user, and the action/verb/message will not be sent."),p.default.createElement("p",null,"More detail and nuance on chat middleware can be found in the ",p.default.createElement(v.default,{href:"/docs/core/chat"},p.default.createElement("a",null,"chat section"))),p.default.createElement("h3",null,"Chat Midleware Notes"),p.default.createElement("ul",null,p.default.createElement("li",null,"In the example above, I want to announce the member joining the room, but he has not yet been added to the room, as the callback chain is still firing.  If the connection itself were to make the broadcast, it would fail because the connection is not in the room.  Instead, an empty ",p.default.createElement("code",null)," connection is used to proxy the message coming from the 'system'"),p.default.createElement("li",null,"Only the ",p.default.createElement("code",null,"sayCallbacks")," have a second return value on the callback, ",p.default.createElement("code",null,"messagePayload"),".  This allows you to modify the message being sent to your clients."),p.default.createElement("li",null,p.default.createElement("code",null,"messagePayload")," will be modified and and passed on to all ",p.default.createElement("code",null,"addSayCallback")," middlewares inline, so you can append and modify it as you go"),p.default.createElement("li",null,"If you have a number of callbacks (",p.default.createElement("code",null,"say"),", ",p.default.createElement("code",null,"onSayReceive"),", ",p.default.createElement("code",null,"join")," or ",p.default.createElement("code",null,"leave"),"), the priority maters, and you can block subsequent methods from firing by returning an error to the callback."),p.default.createElement("li",null,p.default.createElement("code",null,"sayCallbacks")," are executed once per client connection. This makes it suitable for customizing the message based on the individual client."),p.default.createElement("li",null,p.default.createElement("code",null,"onSayReceiveCallbacks")," are executed only once, when the message is sent to the server.")),p.default.createElement(P.default,null,"// in this example no one will be able to join any room, and the `say` callback will never be invoked.\n\napi.chatRoom.addMiddleware({\n  name: 'blocking chat middleware',\n  join: function(connection, room, callback){\n    callback(new Error('blocked from joining the room'));\n  }),\n  say: function(connection, room, messagePayload, callback){\n    api.chatRoom.broadcast({}, room, 'I have entered the room: ' + connection.id, function(e){\n      callback();\n    });\n  },\n});"),p.default.createElement("p",null,"If a ",p.default.createElement("code",null,"say")," is blocked/errored, the message will simply not be delivered to the client.  If a ",p.default.createElement("code",null,"join")," or ",p.default.createElement("code",null,"leave")," is blocked/errored, the verb or method used to invoke the call will be returned that error."))),this.section("task-request-flow",p.default.createElement("div",null,p.default.createElement("img",{width:"100%",src:"/static/images/connection_flow_tasks.png"}))),this.section("task-middleware",p.default.createElement("div",null,p.default.createElement("p",null,"Task middleware is implemented as a thin wrapper around Node Resque plugins and currently exposes the ",p.default.createElement("code",null,"before_perform"),", ",p.default.createElement("code",null,"after_perform"),", ",p.default.createElement("code",null,"before_enqueue"),", and ",p.default.createElement("code",null,"after_enqueue")," functions of Resque plugins through ",p.default.createElement("code",null,"preProcessor"),", ",p.default.createElement("code",null,"postProcessor"),",",p.default.createElement("code",null,"preEnqueue"),", and ",p.default.createElement("code",null,"postEnqueue")," methods. Each middleware requires a ",p.default.createElement("code",null,"name")," and at least one ","function",". In addition, a middleware can be global, in which case it also requires a ",p.default.createElement("code",null,"priority"),"."),p.default.createElement("p",null,"In the ",p.default.createElement("code",null,"preProcessor"),", you can access the original task ",p.default.createElement("code",null,"params")," through ",p.default.createElement("code",null,"this.args[0]"),". In the ",p.default.createElement("code",null,"postProcessor"),", you can access the task result at ",p.default.createElement("code",null,"this.worker.result"),". In the ",p.default.createElement("code",null,"preEnqueue")," and ",p.default.createElement("code",null,"postEnqueue")," you can access the task ",p.default.createElement("code",null,"params")," through ",p.default.createElement("code",null,"this.args[0]"),". If you wish to prevent a task from being enqueued using the ",p.default.createElement("code",null,"preEnqueue")," middleware you must explicitly set the ",p.default.createElement("code",null,"toRun")," value to ",p.default.createElement("code",null,"false")," in the callback. Because the task middleware is executed by Resque ",p.default.createElement("code",null,"this")," is an instance of a Resque Worker and contains a number of other elements which may be useful in a middleware."),p.default.createElement("h3",null,"Task Middleware Example"),p.default.createElement("p",null,"The following example is a simplistic implementation of a task execution timer middleware."),p.default.createElement(P.default,null,"'use strict';\n\nmodule.exports = {\n  loadPriority:  1000,\n  initialize: function(api, next){\n    api.taskTimer = {\n      middleware: {\n        name: 'timer',\n        global: true,\n        priority: 90,\n        preProcessor: function(next){\n          var worker = this.worker;\n          worker.start = process.hrtime();\n          next();\n        },\n        postProcessor: function(next){\n          var worker = this.worker;\n          var elapsed = process.hrtime(worker.start);\n          var seconds = elapsed[0];\n          var millis = elapsed[1] / 1000000;\n          api.log(worker.job.class + ' done in ' + seconds + ' s and ' + millis + ' ms.', 'info');\n          next();\n        },\n        preEnqueue: function(next){\n          var params = this.args[0];\n          //Validate params\n          next(null, true); //callback is in form cb(error, toRun)\n        },\n        postEnqueue: function(next){\n          api.log(\"Task successfully enqueued!\");\n          next();\n        }\n      }\n    };\n\n    api.tasks.addMiddleware(api.taskTimer.middleware);\n  }\n};"))))))}}]),t}(E.default);t.default=q}},[1220]);
            return { page: comp.default }
          })
        