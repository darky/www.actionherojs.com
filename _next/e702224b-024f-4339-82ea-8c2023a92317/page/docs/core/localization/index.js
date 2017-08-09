
          window.__NEXT_REGISTER_PAGE('/docs/core/localization', function() {
            var comp = module.exports=webpackJsonp([26],{1216:function(e,t,n){e.exports=n(1217)},1217:function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(9),a=l(o),i=n(1),c=l(i),u=n(8),r=l(u),s=n(2),d=l(s),f=n(3),m=l(f),h=n(0),p=l(h),E=n(16),g=l(E),y=n(11),v=n(14),w=l(v),b=n(18),z=l(b),k=function(e){function t(e){(0,c.default)(this,t);var n=(0,d.default)(this,(t.__proto__||(0,a.default)(t)).call(this,e));return n.state={titleSection:{title:"Core: Localization",icon:"/static/images/localization.svg"},sections:{overview:"Overview","locale-files":"Loale Files","connection-locale":"Determining Connection Locale","connection-methods":"Connection Methods","other-strings":"Localizing other Strings"},links:[{link:"/docs/core/config",title:"» Core: Config"},{link:"/docs/core/servers",title:"« Core: Servers"}]},n}return(0,m.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){return p.default.createElement(w.default,{sideNav:this.state.sections,titleSection:this.state.titleSection,links:this.state.links,currentSection:this.state.currentSection},p.default.createElement(y.Row,null,p.default.createElement(y.Col,{md:12},this.section("overview",p.default.createElement("div",null,p.default.createElement("p",null,"Starting in ActionHero ",p.default.createElement("code",null,"v13.0.0"),", you can now use the ",p.default.createElement("a",{href:"https://github.com/mashpie/i18n-node"},"i18n")," module to customize all aspects of ActionHero."))),this.section("locale-files",p.default.createElement("div",null,p.default.createElement("ul",null,p.default.createElement("li",null,"When running ActionHero with ",p.default.createElement("code",null,"api.config.i18n.updateFiles = true"),", you will see ActionHero generate a 'locales' folder at the top level of your project which will contain translations of all strings in your project with are passed though the new localization system.  This includes all uses of ",p.default.createElement("code",null,"api.i18n.localize"),", ",p.default.createElement("code",null,"connection.localize")," and ",p.default.createElement("code",null,"api.log"),".",p.default.createElement("ul",null,p.default.createElement("li",null,"be sure to use sprintf-style string interpolation for variables!"))),p.default.createElement("li",null,"From here, it is an easy matter to change the strings, per locale, to how you would like them presented back in your application.  The next time you restart the server, the values you've updated in your locale strings file will be used."),p.default.createElement("li",null,"disable ",p.default.createElement("code",null,"api.config.i18n.updateFiles")," if you do not want this behavior.")))),this.section("connection-locale",p.default.createElement("div",null,p.default.createElement("p",null,"Since every ActionHero implementation is unique, we cannot ship with a \"guess\" about how to determine a given connection's locale. Perhaps you have an HTTP server and you can trust your client's ",p.default.createElement("code",null,"accept-language")," headers.  Or perhaps you run your API under a number of different host names and you can presume locale based on them.   Whatever the case, you need to create a synchronous method in an initializer which will be called when each connection connects to return its locale."),p.default.createElement("p",null,"For example, I may have an initializer in my project like this:"),p.default.createElement(z.default,null,"module.exports = {\n  initialize: function(api, next){\n    api.customLocalization = {\n      lookup: function(connection){\n        var locale = 'en';\n        if(connection.type === 'web'){\n          var host = connection.rawConnection.req.headers.host\n          if(host === 'usa.site.com'){ locale = 'en-US'; }\n          if(host === 'uk.site.com'){  locale = 'en-GB'; }\n          if(host === 'es.site.com'){  locale = 'es-ES'; }\n          if(host === 'mx.site.com'){  locale = 'es-MX'; }\n        }\n        return locale;\n      }\n    }\n    next();\n  }\n}\n"),p.default.createElement("p",null,"To tell the i18n to use this method with a new connection, set ",p.default.createElement("code",null,"api.config.i18n.determineConnectionLocale = 'api.customLocalization.lookup'")))),this.section("connection-methods",p.default.createElement("div",null,p.default.createElement("ul",null,p.default.createElement("li",null,p.default.createElement("code",null,"connection.localize(string)")," or ",p.default.createElement("code",null,"connection.localize([string-with-interpolation, value])"),p.default.createElement("ul",null,p.default.createElement("li",null,"Allows you to interpolate a string based on the connection's current locale.  For example, say in an action you wanted to respond with ",p.default.createElement("code",null,"data.response.message = connection.localize('the count was {{count}}', {count: 4})")," In your locale files, you would define ",p.default.createElement("code",null,"the count was ","{{count}}")," in every language you cared about, and not need to modify the action itself at all.")))))),this.section("other-strings",p.default.createElement("div",null,p.default.createElement("ul",null,p.default.createElement("li",null,"To localize strings that are not used in methods mentioned above you can use ",p.default.createElement("code",null,"api.i18n.localize(string, options)"),".",p.default.createElement("ul",null,p.default.createElement("li",null,"Allows you to interpolate a string."),p.default.createElement("li",null,"Just as the other localize methods above, the input string will be in your locale files for you to change it anytime you want."),p.default.createElement("li",null,"The second ",p.default.createElement("code",null,"options")," optional argument (default value is ",p.default.createElement("code",null,"api.i18n"),") allows you to ",p.default.createElement("a",{href:"https://github.com/mashpie/i18n-node#list-of-all-configuration-options"},"configure")," i18n. Note that you will use this argument only in very few special cases, It is recommended to edit the global ",p.default.createElement("code",null,"api.config.i18n")," settings to suit your localization needs.")))))))))}}]),t}(g.default);t.default=k}},[1216]);
            return { page: comp.default }
          })
        