
          window.__NEXT_REGISTER_PAGE('/docs/core/cache', function() {
            var comp = module.exports=webpackJsonp([33],{1202:function(e,l,t){e.exports=t(1203)},1203:function(e,l,t){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(l,"__esModule",{value:!0});var n=t(9),c=a(n),u=t(1),r=a(u),d=t(8),o=a(d),i=t(2),s=a(i),f=t(3),m=a(f),h=t(0),E=a(h),p=t(16),k=a(p),b=t(11),w=t(14),y=a(w),v=function(e){function l(e){(0,r.default)(this,l);var t=(0,s.default)(this,(l.__proto__||(0,c.default)(l)).call(this,e));return t.state={titleSection:{title:"Core: Cache",icon:"/static/images/video-game-servers.svg"},sections:{overview:"Overview","cache-methods":"Cache Methods","list-methods":"List Methods","lock-methods":"Lock Methods",redis:"Redis & Cache"},links:[{link:"/docs/core/chat",title:"» Core: Chat"},{link:"/docs/core/action-cluster",title:"« Core: Action Cluster"}]},t}return(0,m.default)(l,e),(0,o.default)(l,[{key:"render",value:function(){return E.default.createElement(y.default,{sideNav:this.state.sections,titleSection:this.state.titleSection,links:this.state.links,currentSection:this.state.currentSection},E.default.createElement(b.Row,null,E.default.createElement(b.Col,{md:12},this.section("overview",E.default.createElement("div",null,E.default.createElement("p",null,"ActionHero ships with the functions needed for a distributed key-value cache.  You can cache strings, numbers, arrays and objects (anything that responds to ",E.default.createElement("code",null,"JSON.stringify"),")."),E.default.createElement("p",null,"The cache's redis server is defined by ",E.default.createElement("code",null,"api.config.redis"),".  It is possible to use fakeredis."))),this.section("cache-methods",E.default.createElement("div",null,E.default.createElement("h3",null,E.default.createElement("code",null,"api.cache.save")),E.default.createElement("ul",null,E.default.createElement("li",null,"Invoke: ",E.default.createElement("code",null,"api.cache.save(key, value, expireTimeMS, next)"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"expireTimeMS")," can be null if you never want the object to expire"))),E.default.createElement("li",null,"Callback: ",E.default.createElement("code",null,"next(error, newObject)"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"error")," will be null unless the object can't be saved (perhaps out of ram or a bad object type)."),E.default.createElement("li",null,"overwriting an existing object will return ",E.default.createElement("code",null,"newObject = true"))))),E.default.createElement("p",null,E.default.createElement("code",null,"api.cache.save")," is used to both create new entries or update existing cache entries.  If you don't define an expireTimeMS, ",E.default.createElement("code",null,"null")," will be assumed, and using ",E.default.createElement("code",null,"null")," will cause this cached item to never expire.  Expired cache objects will be periodically swept away (but not necessarily exactly when they expire)"),E.default.createElement("h3",null,E.default.createElement("code",null,"api.cache.load")),E.default.createElement("ul",null,E.default.createElement("li",null,"Invoke: ",E.default.createElement("code",null,"api.cache.load(key, next)")," or ",E.default.createElement("code",null,"api.cache.load(key, options, next)"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"options")," can be ",E.default.createElement("code",null,"{expireTimeMS: 1234}")," where the act of reading the key will reset the key's expire time"),E.default.createElement("li",null,"If the requested ",E.default.createElement("code",null,"key")," is not found (or is expired), all values returned will be null."))),E.default.createElement("li",null,"Callback: ",E.default.createElement("code",null,"next(error, value, expireTimestamp, createdAt, readAt)"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"value")," will be the object which was saved and ",E.default.createElement("code",null,"null")," if the object cannot be found or is expired"),E.default.createElement("li",null,E.default.createElement("code",null,"expireTimestamp")," (ms) is when the object is set to expire in system time"),E.default.createElement("li",null,E.default.createElement("code",null,"createdAt")," (ms) is when the object was created"),E.default.createElement("li",null,E.default.createElement("code",null,"readAt")," (ms) is the timestamp at which the object was last read with ",E.default.createElement("code",null,"api.cache.load"),".  Useful for telling if another worker has consumed the object recently")))),E.default.createElement("h3",null,E.default.createElement("code",null,"api.cache.destroy")),E.default.createElement("ul",null,E.default.createElement("li",null,"Invoke: ",E.default.createElement("code",null,"api.cache.destroy(key)")),E.default.createElement("li",null,"Callback: ",E.default.createElement("code",null,"next(error, destroyed)"),E.default.createElement("ul",null,E.default.createElement("li",null,"will be false if the object cannot be found, and true if destroyed")))))),this.section("list-methods",E.default.createElement("div",null,E.default.createElement("p",null,E.default.createElement("code",null,"api.cache")," implements a distributed shared list.  3 simple functions are provided to interact with this list, ",E.default.createElement("code",null,"push"),", ",E.default.createElement("code",null,"pop"),", and ",E.default.createElement("code",null,"listLength"),".  These lists are stored in Redis, and cannot be locked.  That said, a ",E.default.createElement("code",null,"push")," and ",E.default.createElement("code",null,"pop")," operation will guarantee that one-and-only-one copy of your data is returned to whichever application acted first (when popping) or an error will be returned (when pushing)."),E.default.createElement("h3",null,E.default.createElement("code",null,"api.cache.push")),E.default.createElement("ul",null,E.default.createElement("li",null,"Invoke: ",E.default.createElement("code",null,"api.cache.push(key, data, next)"),E.default.createElement("ul",null,E.default.createElement("li",null,"data must be serializable via JSON.stringify"))),E.default.createElement("li",null,"Callback: ",E.default.createElement("code",null,"next(error)"))),E.default.createElement("h3",null,E.default.createElement("code",null,"api.cache.pop")),E.default.createElement("ul",null,E.default.createElement("li",null,"Invoke: ",E.default.createElement("code",null,"api.cache.pop(key, next)")),E.default.createElement("li",null,"Callback: ",E.default.createElement("code",null,"next(error, data)"),E.default.createElement("ul",null,E.default.createElement("li",null,"data will be returned in the object form it was saved (array, object, string)")))),E.default.createElement("h3",null,E.default.createElement("code",null,"api.cache.listLength")),E.default.createElement("ul",null,E.default.createElement("li",null,"Invoke: ",E.default.createElement("code",null,"api.cache.listLength(key, next)")),E.default.createElement("li",null,"Callback: ",E.default.createElement("code",null,"next(error, length)"),E.default.createElement("ul",null,E.default.createElement("li",null,"length will be an integer.",E.default.createElement("ul",null,E.default.createElement("li",null,"if the list does not exist, ",E.default.createElement("code",null,"0")," will be returned")))))))),this.section("lock-methods",E.default.createElement("div",null,E.default.createElement("p",null,"You may optionally implement locking methods along with your cache objects.  This will allow one ActionHero server to obtain a lock on an object and prevent modification of it by another member of the cluster.  For example you may want to first ",E.default.createElement("code",null,"api.cache.lock")," a key, and then save it to prevent other nodes from modifying the object."),E.default.createElement("h3",null,E.default.createElement("code",null,"api.cache.lock")),E.default.createElement("ul",null,E.default.createElement("li",null,"Invoke: ",E.default.createElement("code",null,"api.cache.lock(key, expireTimeMS, next)"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"expireTimeMS")," is optional, and will be ",E.default.createElement("code",null,"expireTimeMS = api.cache.lockDuration = api.config.general.lockDuration")))),E.default.createElement("li",null,"Callback: ",E.default.createElement("code",null,"next(error, lockOk)"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"error")," will be null unless there was something wrong with the connection (perhaps a redis error)"),E.default.createElement("li",null,E.default.createElement("code",null,"lockOk")," will be ",E.default.createElement("code",null,"true")," or ",E.default.createElement("code",null,"false")," depending on if the lock was obtained.")))),E.default.createElement("h3",null,E.default.createElement("code",null,"api.cache.unlock")),E.default.createElement("ul",null,E.default.createElement("li",null,"Invoke: ",E.default.createElement("code",null,"api.cache.unlock(key, next)")),E.default.createElement("li",null,"Callback: ",E.default.createElement("code",null,"next(error, lockOk)"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"error")," will be null unless there was something wrong with the connection (perhaps a redis error)"),E.default.createElement("li",null,E.default.createElement("code",null,"lockOk")," will be ",E.default.createElement("code",null,"true")," or ",E.default.createElement("code",null,"false")," depending on if the lock was removed.")))),E.default.createElement("h3",null,E.default.createElement("code",null,"api.cache.checkLock")),E.default.createElement("ul",null,E.default.createElement("li",null,"Invoke: ",E.default.createElement("code",null,"api.cache.checkLock(key,retry, next)"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"retry")," is either ",E.default.createElement("code",null,"null")," or an integer (ms) that we should keep retrying until the lock is free to be re-obtained"))),E.default.createElement("li",null,"Callback: ",E.default.createElement("code",null,"next(error, lockOk)"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"error")," will be null unless there was something wrong with the connection (perhaps a redis error)"),E.default.createElement("li",null,E.default.createElement("code",null,"lockOk")," will be ",E.default.createElement("code",null,"true")," or ",E.default.createElement("code",null,"false")," depending on if the lock is currently obtainable.")))),E.default.createElement("h3",null,E.default.createElement("code",null,"api.cache.locks")),E.default.createElement("ul",null,E.default.createElement("li",null,"Invoke: ",E.default.createElement("code",null,"api.cache.locks(next)")),E.default.createElement("li",null,"Callback: ",E.default.createElement("code",null,"next(error, locks)"),E.default.createElement("ul",null,E.default.createElement("li",null,E.default.createElement("code",null,"locks")," is an array of all currently active locks")))),E.default.createElement("p",null,"You can see an example of using the cache within an action in ",E.default.createElement("a",{href:"https://github.com/actionhero/actionhero/blob/master/actions/cacheTest.js"},"actions/cacheTest.js")))),this.section("redis",E.default.createElement("div",null,E.default.createElement("p",null,"The timestamps regarding ",E.default.createElement("code",null,"api.cache.load")," are to help clients understand if they are working with data which has been modified by another peer (when running in a cluster)."),E.default.createElement("p",null,"Keep in mind that many clients/servers can access a cached value simultaneously, so build your actions carefully not to have conflicting state.  You can ",E.default.createElement("a",{href:"/docs/core/cache"},"learn more about the cache methods here"),".  You can also ",E.default.createElement("a",{href:"docs/ops/production-notes"},"review recommendations about Production Redis configurations"),"."))))))}}]),l}(k.default);l.default=v}},[1202]);
            return { page: comp.default }
          })
        