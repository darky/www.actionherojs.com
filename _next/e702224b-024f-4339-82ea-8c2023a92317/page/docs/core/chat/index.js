
          window.__NEXT_REGISTER_PAGE('/docs/core/chat', function() {
            var comp = module.exports=webpackJsonp([32],{1204:function(e,t,l){e.exports=l(1205)},1205:function(e,t,l){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=l(9),o=a(n),r=l(1),c=a(r),u=l(8),d=a(u),i=l(2),s=a(i),m=l(3),f=a(m),h=l(0),E=a(h),b=l(16),p=a(b),y=l(11),w=l(14),v=a(w),g=l(18),k=a(g),R=function(e){function t(e){(0,c.default)(this,t);var l=(0,s.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e));return l.state={titleSection:{title:"Core: Chat",icon:"/static/images/chat.svg"},sections:{general:"General",methods:"Methods",middleware:"Middleware","specific-clients":"Chatting to specific clients","client-use":"Client Use"},links:[{link:"/docs/core/file-server",title:"» Core: File Server"},{link:"/docs/core/cache",title:"« Core: Cache"}]},l}return(0,f.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){return E.default.createElement(v.default,{sideNav:this.state.sections,titleSection:this.state.titleSection,links:this.state.links,currentSection:this.state.currentSection},E.default.createElement(y.Row,null,E.default.createElement(y.Col,{md:12},this.section("general",E.default.createElement("div",null,E.default.createElement("p",null,"ActionHero ships with a chat framework which may be used by all persistent connections (",E.default.createElement("code",null,"socket")," and ",E.default.createElement("code",null,"websocket"),").  There are methods to create and manage chat rooms and control the users in those rooms.  Chat does not have to be for peer-to-peer communication, and is a metaphor used for many things, including game state in MMOs."),E.default.createElement("p",null,"Clients themselves interact with rooms via ",E.default.createElement("code",null,"verbs"),".  Verbs are short-form commands that will attempt to modify the connection's state, either joining or leaving a room.  Clients can be in many rooms at once."),E.default.createElement("p",null,"Relevant chat verbs are:"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"roomAdd")),E.default.createElement("li",null,E.default.createElement("code",null,"roomLeave")),E.default.createElement("li",null,E.default.createElement("code",null,"roomView")),E.default.createElement("li",null,E.default.createElement("code",null,"say"))),E.default.createElement("p",null,"The special verb for persistent connections ",E.default.createElement("code",null,"say")," makes use of ",E.default.createElement("code",null,"api.chatRoom.broadcast")," to tell a message to all other users in the room, IE: ",E.default.createElement("code",null,"say myRoom Hello World")," from a socket client or ",E.default.createElement("code",null,'client.say("myRoom", \'Hello World")')," for a websocket."),E.default.createElement("p",null,"Chat on multiple actionHero nodes relies on redis for both chat (pub/sub) and a key store defined by ",E.default.createElement("code",null,"api.config.redis"),". Note that if you elect to use fakeredis, you will be using an in-memory redis server rather than a real redis process, which does not work to share data across nodes.  The redis store and the key store don't need to be the same instance of redis, but they do need to be the same for all ActionHero servers you are running in parallel.  This is how ActionHero scales the chat features."),E.default.createElement("p",null,"There is no limit to the number of rooms which can be created, but keep in mind that each room stores information in redis, and there load created for each connection."))),this.section("methods",E.default.createElement("div",null,E.default.createElement("p",null,"These methods are to be used within your server (perhaps an action or initializer).  They are not exposed directly to clients, but they can be within an action."),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.broadcast(connection, room, message, callback)")),E.default.createElement("ul",null,E.default.createElement("li",null,"tell a message to all members in a room."),E.default.createElement("li",null,"connection can either be a real connection (A message coming from a client), or a mockConnection.  A mockConnection at the very least has the form ",E.default.createElement("code",null,'room: "someOtherRoom"'),".  mockConnections without an id will be assigned the id of 0"),E.default.createElement("li",null,"The ",E.default.createElement("code",null,"context")," of messages sent with ",E.default.createElement("code",null,"api.chatRoom.broadcast")," always be ",E.default.createElement("code",null,"user")," to differentiate these responses from a ",E.default.createElement("code",null,"response")," to a request")),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.list(callback)")),E.default.createElement("ul",null,E.default.createElement("li",null,"callback will return (error, [rooms])")),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.add(room, callback)")),E.default.createElement("ul",null,E.default.createElement("li",null,"callback will return 1 if you created the room, 0 if it already existed")),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.destroy(room, callback)")),E.default.createElement("ul",null,E.default.createElement("li",null,"callback is empty")),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.exists(room, callback)")),E.default.createElement("ul",null,E.default.createElement("li",null,"callback returns (error, found); found is a boolean")),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.roomStatus(room, callback)")),E.default.createElement("ul",null,E.default.createElement("li",null,"callback returns (error, details); details is a hash containing room information"),E.default.createElement("li",null,"details of the form:")),E.default.createElement(k.default,null,'{\n  room: "myRoom",\n  membersCount: 2,\n  members: {\n    aaa: {id: "aaa", joinedAt: 123456789 },\n    bbb: {id: "bbb", joinedAt: 123456789 },\n  }\n}'),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.addMember(connectionId, room, callback)")),E.default.createElement("ul",null,E.default.createElement("li",null,"callback is of the form (error, wasAdded)"),E.default.createElement("li",null,"you can add connections from this or any other server in the cluster")),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.removeMember(connectionId, room, callback)")),E.default.createElement("ul",null,E.default.createElement("li",null,"callback is of the form (error, wasRemoved)"),E.default.createElement("li",null,"you can remove connections from this or any other server in the cluster")),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.generateMemberDetails( connection )")),E.default.createElement("ul",null,E.default.createElement("li",null,"defines what is stored from the connection object in the member data"),E.default.createElement("li",null,"default is ",E.default.createElement("code",null,"id: connection.id")),E.default.createElement("li",null,"other data that is stored by default is ",E.default.createElement("code",null,"host: api.id")," and ",E.default.createElement("code",null,"joinedAt: new Date().getTime()")),E.default.createElement("li",null,"override the entire method to store custom data ",E.default.createElement("em",null,"that is on the connection"))),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.sanitizeMemberDetails( memberData )")),E.default.createElement("ul",null,E.default.createElement("li",null,"Defines what is pulled out of the member data when returning roomStatus"),E.default.createElement("li",null,"Defaults to ",E.default.createElement("code",null,"joinedAt : memberData.joinedAt")),E.default.createElement("li",null,"After method call, always filled with ",E.default.createElement("code",null,"id"),", based on the ",E.default.createElement("code",null,"connection.id")," used to store the data"),E.default.createElement("li",null,"Override the entire method to use custom data as defined in ",E.default.createElement("code",null,"api.chatRoom.generateMemberDetails"))),E.default.createElement("h3",null,E.default.createElement("code",null,"api.chatRoom.generateMessagePayload( message )")),E.default.createElement("ul",null,E.default.createElement("li",null,"Defiens how messages from clients are sanitized"),E.default.createElement("li",null,"Override the entire method to use custom data as defined in ",E.default.createElement("code",null,"api.chatRoom.generateMessagePayload"))))),this.section("middleware",E.default.createElement("div",null,E.default.createElement("p",null,"There are 4 types of middleware you can install for the chat system: ",E.default.createElement("code",null,"say"),", ",E.default.createElement("code",null,"onSayReceive"),", ",E.default.createElement("code",null,"join"),", and ",E.default.createElement("code",null,"leave"),".  You can learn more about ",E.default.createElement("a",{href:"/docs/core/middleware"},"chat middleware in the middleware section of this site")))),this.section("specific-clients",E.default.createElement("div",null,E.default.createElement("p",null,"Every connection object also has a ",E.default.createElement("code",null,"connection.sendMessage(message)")," method which you can call directly from the server."))),this.section("client-use",E.default.createElement("div",null,E.default.createElement("p",null,"The details of communicating within a chat room are up to each individual server (see ",E.default.createElement("a",{href:"/docs/servers/websocket"},"websocket")," or ",E.default.createElement("a",{href:"/docs/servers/socket"},"socket"),"), but the same principals apply:"),E.default.createElement("ul",null,E.default.createElement("li",null,"Client will join a room (",E.default.createElement("code",null,"client.roomAdd(room)"),")."),E.default.createElement("li",null,"Once in the room, clients can send messages (which are strings) to everyone else in the room via ",E.default.createElement("code",null,"say"),", ie: ",E.default.createElement("code",null,"client.say('room', Hello World')")),E.default.createElement("li",null,"Once a client is in a room, they will revive messages from other members of the room as events.  For example, catching say events from the websocket client looks like ",E.default.createElement("code",null,"client.on('say', function(message){ console.log(message); })"),".  You can inspect ",E.default.createElement("code",null,"message.room")," if you are in more than one room.",E.default.createElement("ul",null,E.default.createElement("li",null,"The payload of a message will contain the room, sender, and the message body: ",E.default.createElement("code",null,"{message: &quot;Hello World&quot;, room: &quot;SecretRoom&quot;, from: &quot;7d419af9-accf-40ac-8d78-9281591dd59e&quot;, context: &quot;user&quot;, sentAt: 1399437579346}"))))),E.default.createElement("p",null,"If you want to create an authenticated room, there are 2 steps:"),E.default.createElement("ul",null,E.default.createElement("li",null,"First, create an action which modifies some property eitehr on the connection object it self, or stores permissions to a database."),E.default.createElement("li",null,"Then, create a ",E.default.createElement("code",null,"joinCallback"),"-style middleware which cheks these values.")))))))}}]),t}(p.default);t.default=R}},[1204]);
            return { page: comp.default }
          })
        