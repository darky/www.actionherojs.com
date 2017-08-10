
          window.__NEXT_REGISTER_PAGE('/docs/ops/production-notes', function() {
            var comp = module.exports=webpackJsonp([17],{1237:function(e,t,r){e.exports=r(1238)},1238:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(9),o=a(n),i=r(1),l=a(i),s=r(8),u=a(s),c=r(2),m=a(c),f=r(3),d=a(f),h="/home/ubuntu/www.actionherojs.com/pages/docs/ops/production-notes.js?entry",_=r(0),p=a(_),N=r(16),b=a(N),g=r(11),y=r(14),E=a(y),w=r(18),v=a(w),k=function(e){function t(e){(0,l.default)(this,t);var r=(0,m.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e));return r.state={titleSection:{title:"Operations: Production Notes",icon:"/static/images/ops-tools.svg"},sections:{topology:"Topology Example",paths:"Paths and Environments",daemon:"Daemon","number-of-workers":"Number of Workers",pidfiles:"Pidfiles",git:"Git-Based Deployment",procfile:"PAAS and Procfile Deployment","global-packages":"Global Packages",nginx:"Nginx Example",redis:"Redis High-Availability","best-practices":"Best Practices"},links:[{link:"/docs/ops/upgrade-path",title:"» Core: Upgrade Path"},{link:"/docs/ops/testing",title:"« Core: Testing"}]},r}return(0,d.default)(t,e),(0,u.default)(t,[{key:"render",value:function(){return p.default.createElement(E.default,{sideNav:this.state.sections,titleSection:this.state.titleSection,links:this.state.links,currentSection:this.state.currentSection,__source:{fileName:h,lineNumber:268}},p.default.createElement(g.Row,{__source:{fileName:h,lineNumber:269}},p.default.createElement(g.Col,{md:12,__source:{fileName:h,lineNumber:270}},this.section("topology",p.default.createElement("div",{__source:{fileName:h,lineNumber:272}},p.default.createElement(v.default,{__source:{fileName:h,lineNumber:273}},"// Assume we use the flag `process.env.ACTIONHERO_ROLE` to denote the type of server\n// You can set this variable in the ENV of your server or launch each process with the flag:\n// Worker => `ACTIONHERO_ROLE='worker' npm start`\n// Server => `ACTIONHERO_ROLE='server' npm start`\n\n// config/tasks.js\n\nexports.production = {\n    tasks: function(api){\n\n        // default to config for 'server'\n        var config = {\n          scheduler: false,\n          queues: ['*'],\n          verbose: true,\n          // ...\n        };\n\n        if(process.env.ACTIONHERO_ROLE === 'worker'){\n            config.scheduler = true;\n            config.minTaskProcessors = 1;\n            config.maxTaskProcessors = 10;\n        }\n\n        return config;\n    }\n};\n\n// config/servers/web.js\n\nexports.default = {\n    servers: {\n        web: function(api){\n            config = {\n                enabled: true,\n                secure: false,\n                serverOptions: {},\n                port: process.env.PORT || 8080\n                // ...\n            };\n\n            if(process.env.ACTIONHERO_ROLE === 'worker'){\n                config.enabled = false;\n            }\n\n            return config;\n        }\n    }\n};\n"),p.default.createElement("p",{__source:{fileName:h,lineNumber:275}},"Here is a common ActionHero production topology:"),p.default.createElement("img",{src:"/static/images/cluster.png",__source:{fileName:h,lineNumber:277}}),p.default.createElement("p",{__source:{fileName:h,lineNumber:279}},"Notes:"),p.default.createElement("ul",{__source:{fileName:h,lineNumber:281}},p.default.createElement("li",{__source:{fileName:h,lineNumber:282}},'It\'s best to seperate the "workers" from the web "servers"',p.default.createElement("ul",{__source:{fileName:h,lineNumber:283}},p.default.createElement("li",{__source:{fileName:h,lineNumber:284}},"be sure to modify the config files for each type of server accordingly (ie: turn of all servers for the workers, and turn of all workers on the servers)"))),p.default.createElement("li",{__source:{fileName:h,lineNumber:287}},"To accomplish the above, you only need to make changes to your configuration files on each server.  You will still be running the same same ActionHero project codebase.  See the example:"),p.default.createElement("li",{__source:{fileName:h,lineNumber:288}},"Always have a replica of redis!")))),this.section("paths",p.default.createElement("div",{__source:{fileName:h,lineNumber:294}},p.default.createElement("p",{__source:{fileName:h,lineNumber:295}},"You can set a few environment variables to affect how ActionHero runs:"),p.default.createElement("ul",{__source:{fileName:h,lineNumber:297}},p.default.createElement("li",{__source:{fileName:h,lineNumber:298}},p.default.createElement("code",{__source:{fileName:h,lineNumber:298}},"PROJECT_ROOT"),": This is useful when deploying ActionHero applications on a server where symlinks will change under a running process.  The cluster will look at your symlink ",p.default.createElement("code",{__source:{fileName:h,lineNumber:298}},"PROJECT_ROOT=/path/to/current_symlink")," rather than the absolute path it was started from"),p.default.createElement("li",{__source:{fileName:h,lineNumber:299}},p.default.createElement("code",{__source:{fileName:h,lineNumber:299}},"ACTIONHERO_ROOT"),": This can used to set the absolute path to the ActionHero binaries"),p.default.createElement("li",{__source:{fileName:h,lineNumber:300}},p.default.createElement("code",{__source:{fileName:h,lineNumber:300}},"ACTIONHERO_CONFIG"),": This can be user to set the absolute path to the ActionHero config directory you wish to use.  This is useful when you might have a variable configs per server"),p.default.createElement("li",{__source:{fileName:h,lineNumber:301}},p.default.createElement("code",{__source:{fileName:h,lineNumber:301}},"ACTIONHERO_TITLE"),": The value of ",p.default.createElement("code",{__source:{fileName:h,lineNumber:301}},"api.id"),", and the name for the pidfile in some boot configurations")))),this.section("daemon",p.default.createElement("div",{__source:{fileName:h,lineNumber:307}},p.default.createElement("p",{__source:{fileName:h,lineNumber:308}},"When deploying ActionHero, you will probably have more than 1 process.  You can use the cluster manager to keep an eye on the workers and manage them"),p.default.createElement("ul",{__source:{fileName:h,lineNumber:310}},p.default.createElement("li",{__source:{fileName:h,lineNumber:311}},"Start the cluster with 2 workers: ",p.default.createElement("code",{__source:{fileName:h,lineNumber:311}},"./node_modules/.bin/actionhero start cluster --workers=2"))),p.default.createElement("p",{__source:{fileName:h,lineNumber:314}},"When deploying new code, you can gracefully restart your workers by sending the ",p.default.createElement("code",{__source:{fileName:h,lineNumber:314}},"USR2")," signal to the cluster manager to signal a reload to all workers.  You don't need to start and stop the cluster-master.  This allows for 0-downtime deployments."),p.default.createElement("p",{__source:{fileName:h,lineNumber:315}},"You may want to set some of the ENV variables above to help with your deployment."))),this.section("number-of-workers",p.default.createElement("div",{__source:{fileName:h,lineNumber:320}},p.default.createElement("p",{__source:{fileName:h,lineNumber:321}},"When choosing the number of workers (",p.default.createElement("code",{__source:{fileName:h,lineNumber:321}},"--workers=n"),") for your ActionHero cluster, choose at least 1 less than the number of CPUs available.  If you have a \"burstable\" architecture (like a Joyent smart machine), opt for the highest number of 'consistent' CPUs you can have, meaning a number of CPUs that you will always have available to you."),p.default.createElement("p",{__source:{fileName:h,lineNumber:322}},"You never want more workers than you can run at a time, or else you will actually be slowing down the execution of all processes."),p.default.createElement("p",{__source:{fileName:h,lineNumber:323}},"Of course, not going in to swap memory is more important than utilizing all of your CPUs, so if you find yourself running out of ram, reduce the number of workers!"))),this.section("pidfiles",p.default.createElement("div",{__source:{fileName:h,lineNumber:328}},p.default.createElement("p",{__source:{fileName:h,lineNumber:329}},"ActionHero will write its pid to a pidfile in the normal unix way.  The path for the pidfile is set in ",p.default.createElement("code",{__source:{fileName:h,lineNumber:329}},"config/api.js")," with ",p.default.createElement("code",{__source:{fileName:h,lineNumber:329}},"config.general.paths.pid"),"."),p.default.createElement("p",{__source:{fileName:h,lineNumber:330}},"Individual ActionHero servers will name their pidfiles by ",p.default.createElement("code",{__source:{fileName:h,lineNumber:330}},"api.id"),", which is determined by the logic ",p.default.createElement("a",{href:"https://github.com/actionhero/actionhero/blob/master/initializers/pids.js",__source:{fileName:h,lineNumber:330}},"here")," and ",p.default.createElement("a",{href:"https://github.com/actionhero/actionhero/blob/master/initializers/id.js",__source:{fileName:h,lineNumber:330}},"here"),".  For example, on my laptop with the IP address of ",p.default.createElement("code",{__source:{fileName:h,lineNumber:330}},"192.168.0.1"),", running ",p.default.createElement("code",{__source:{fileName:h,lineNumber:330}},"npm start")," would run one ActionHero server and generate a pidfile of ",p.default.createElement("code",{__source:{fileName:h,lineNumber:330}},"./pids/actionhero-192.168.0.1")," in which would be a single line containg the process' pid."),p.default.createElement("p",{__source:{fileName:h,lineNumber:331}},"When running the cluster, the cluster process first writes his own pidfile to ",p.default.createElement("code",{__source:{fileName:h,lineNumber:331}},"process.cwd() + './pids/cluster_pidfile'"),".  Then, every worker the cluster master creates will have a pid like ",p.default.createElement("code",{__source:{fileName:h,lineNumber:331}},"actionhero-worker-1")," in the location defined by ",p.default.createElement("code",{__source:{fileName:h,lineNumber:331}},"config/api.js"),"."))),this.section("git",p.default.createElement("div",{__source:{fileName:h,lineNumber:336}},p.default.createElement(v.default,{language:"bash",__source:{fileName:h,lineNumber:337}},"#!/usr/bin/env bash\n# assuming the ActionHero cluster master process is already running\n\nDEPLOY_PATH=/path/to/your/application\n\ncd $DEPLOY_PATH && git pull\ncd $DEPLOY_PATH && npm install\n# run any build tasks here, like perhaps an asset compile step or a database migration\ncd $DEPLOY_PATH && kill -s USR2 `cat pids/cluster_pidfile`"),p.default.createElement("p",{__source:{fileName:h,lineNumber:338}},"To send a signal to the cluster master process to reboot all its workers (",p.default.createElement("code",{__source:{fileName:h,lineNumber:338}},"USR2"),"), you can cat the pidfile (bash): ",p.default.createElement("code",{__source:{fileName:h,lineNumber:338}},'kill -s USR2 "cat /path/to/pids/cluster_pidfile"')),p.default.createElement("p",{__source:{fileName:h,lineNumber:339}},"If you want to setup a git-based deployment, the simplest steps would be something like =>"))),this.section("procfile",p.default.createElement("div",{__source:{fileName:h,lineNumber:344}},p.default.createElement("p",{__source:{fileName:h,lineNumber:345}},"When deploying to a Platform as a Service (PAAS) cluster (like ",p.default.createElement("a",{href:"https://heroku.com",__source:{fileName:h,lineNumber:345}},"Heroku"),", ",p.default.createElement("a",{href:"https://flynn.io",__source:{fileName:h,lineNumber:345}},"Flynn"),", and even some ",p.default.createElement("a",{href:"https://www.docker.com",__source:{fileName:h,lineNumber:345}},"Docker")," deployments), we can offer a few pieces of advice."),p.default.createElement("p",{__source:{fileName:h,lineNumber:346}},"If you are deploying a seperate WEB and WORKER process type, you can define them in a ",p.default.createElement("a",{href:"https://devcenter.heroku.com/articles/procfile",__source:{fileName:h,lineNumber:346}},p.default.createElement("code",{__source:{fileName:h,lineNumber:346}},"Procfile"))," and make use of environment variable overrides in addition to those defined from the environemnt.  You can modify your config files to use these options:"),p.default.createElement(v.default,{__source:{fileName:h,lineNumber:347}},"# ./Procfile\nweb:    SCHEDULER=false \\\n        MIN_TASK_PROCESSORS=0 \\\n        MAX_TASK_PROCESSORS=0 \\\n        ENABLE_WEB_SERVER=true  \\\n        ENABLE_TCP_SERVER=true  \\\n        ENABLE_WEBSOCKET_SERVER=true  \\\n        ./node_modules/.bin/actionhero start\n\nworker: SCHEDULER=true  \\\n        MIN_TASK_PROCESSORS=5 \\\n        MAX_TASK_PROCESSORS=5 \\\n        ENABLE_WEB_SERVER=false \\\n        ENABLE_TCP_SERVER=false \\\n        ENABLE_WEBSOCKET_SERVER=false \\\n        ./node_modules/.bin/actionhero start\n"),p.default.createElement("p",{__source:{fileName:h,lineNumber:348}},"Be sure ",p.default.createElement("strong",{__source:{fileName:h,lineNumber:348}},"not")," to use NPM in your ",p.default.createElement("code",{__source:{fileName:h,lineNumber:348}},"Procfile")," defintions.  In many deployment scenarios, NPM will not properly pass signals to the ActionHero process and it will be impossible to signal a graceful shutdown.  Examples of this behavior can be found ",p.default.createElement("a",{href:"https://github.com/flynn/flynn/issues/3601",__source:{fileName:h,lineNumber:348}},"here")," and ",p.default.createElement("a",{href:"https://github.com/npm/npm/issues/4603",__source:{fileName:h,lineNumber:348}},"here")))),this.section("global-packages",p.default.createElement("div",{__source:{fileName:h,lineNumber:353}},p.default.createElement("p",{__source:{fileName:h,lineNumber:354}},"It's probably best to avoid installing any global packages.  This way, you won't have to worry about conflicts, and your project can be kept up to date more easily.  When using npm to install a local package the package's binaries are always copied into ",p.default.createElement("code",{__source:{fileName:h,lineNumber:354}},"./node_modules/.bin"),"."),p.default.createElement("p",{__source:{fileName:h,lineNumber:355}},"You can add local references to your $PATH like so to use these local binaries:"),p.default.createElement("p",{__source:{fileName:h,lineNumber:356}},p.default.createElement("code",{__source:{fileName:h,lineNumber:356}},"export PATH=$PATH:node_modules/.bin")))),this.section("nginx",p.default.createElement("div",{__source:{fileName:h,lineNumber:361}},p.default.createElement(v.default,{__source:{fileName:h,lineNumber:362}},"// From `config/servers/web.js`\n\nexports.production = {\n  servers: {\n    web: function(api){\n      return {\n        port: '/home/USER/www/APP/current/tmp/sockets/actionhero.sock',\n        bindIP: null,\n        metadataOptions: {\n          serverInformation: false,\n          requesterInformation: false\n        }\n      }\n    }\n  }\n}\n"),p.default.createElement(v.default,{language:"bash",__source:{fileName:h,lineNumber:363}},'# The nginx.conf:\n\n#user  nobody;\nworker_processes  4;\n\nerror_log  /var/log/nginx/error.log warn;\npid        /var/run/nginx.pid;\n\n\nevents {\n  worker_connections 1024;\n  accept_mutex on;\n}\n\n\nhttp {\n    include       mime.types;\n    default_type  application/octet-stream;\n    server_tokens off;\n    sendfile        on;\n    keepalive_timeout  65;\n\n    set_real_ip_from  X.X.X.X/24;\n    real_ip_header    X-Forwarded-For;\n\n    gzip on;\n    gzip_http_version 1.0;\n    gzip_comp_level 9;\n    gzip_proxied any;\n    gzip_types text/plain text/xml text/css text/comma-separated-values text/javascript application/x-javascript font/ttf font/otf image/svg+xml application/atom+xml;\n\n    log_format  main  \'$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$http_x_forwarded_for" $request_time\';\n\n    server {\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header Host $http_host;\n        proxy_set_header X_FORWARDED_PROTO https;\n        proxy_redirect off;\n\n        listen       80;\n        server_name  _;\n\n        access_log  /var/log/nginx/access.log  main;\n        error_log   /var/log/nginx/error.log;\n\n        root        /home/XXUSERXX/XXAPPLICATIONXX/www/current/public/;\n        try_files /$uri/index.html /cache/$uri/index.html /$uri.html /cache/$uri.html /$uri /cache/$uri @app;\n\n        client_max_body_size 50M;\n\n        location /primus {\n            proxy_http_version 1.1;\n            proxy_buffering off;\n            proxy_set_header Upgrade $http_upgrade;\n            proxy_set_header Connection "Upgrade";\n            proxy_set_header Host $host;\n\n            proxy_pass http://unix:/home/XXUSERXX/www/XXAPPLICATIONXX/shared/tmp/sockets/actionhero.sock;\n        }\n\n        location / {\n            proxy_http_version 1.1;\n            proxy_buffering off;\n            proxy_cache_bypass $http_pragma $http_authorization;\n            proxy_no_cache $http_pragma $http_authorization;\n\n            proxy_pass http://unix:/home/XXUSERXX/www/XXAPPLICATIONXX/shared/tmp/sockets/actionhero.sock;\n        }\n    }\n\n}'),p.default.createElement("p",{__source:{fileName:h,lineNumber:364}},"While ActionHero can be the font-line server your users hit, it's probably best to proxy ActionHero behind a load balancer, nginx, haproxy, etc.  This will help you pool connections before hitting node, SSL terminate, serve static assets, etc."),p.default.createElement("p",{__source:{fileName:h,lineNumber:365}},"Here is an example nginx config for interfacing with ActionHero, including using sockets (not http) and handing the websocket upgrade path."),p.default.createElement("ul",{__source:{fileName:h,lineNumber:367}},p.default.createElement("li",{__source:{fileName:h,lineNumber:368}},"Note the proxy-pass format to the socket: ",p.default.createElement("code",{__source:{fileName:h,lineNumber:368}},"proxy_pass http://unix:/path/to/socket")),p.default.createElement("li",{__source:{fileName:h,lineNumber:369}},"Note some of the extra work you need to have for the websocket upgrade headers (the primus directive)")))),this.section("redis",p.default.createElement("div",{__source:{fileName:h,lineNumber:375}},p.default.createElement("p",{__source:{fileName:h,lineNumber:376}},p.default.createElement("a",{href:"http://redis.io/",__source:{fileName:h,lineNumber:376}},"Redis")," is technically optional in ActionHero environments, but you will need it if you want to coordinates tasks across a cluster of workers, handle group chat mechanics between WebSocket clients, or do other cross-cluster operations.  In those cases, you'll want your Redis setup to be reliable.  There are 2 methods to achieving HA redis: Sentinels and Cluster.  A simple architectural wireframe of how to deploy the various options is below  The ",p.default.createElement("a",{href:"https://github.com/luin/ioredis",__source:{fileName:h,lineNumber:376}},p.default.createElement("code",{__source:{fileName:h,lineNumber:376}},"ioredis"))," node package supports both of these connection schemes, and all you need to change is your connection options."),p.default.createElement("p",{__source:{fileName:h,lineNumber:377}},p.default.createElement("img",{width:"100%",src:"/static/images/redis.png",__source:{fileName:h,lineNumber:377}})),p.default.createElement("h3",{__source:{fileName:h,lineNumber:379}},"Sentinel Mode"),p.default.createElement("p",{__source:{fileName:h,lineNumber:381}},"In Sentinel mode, you have your Redis configured in a normal master->slave configuration. However, rather than hard-code your application to know who the master and slaves are, your application connects to the Sentinel processes instead. These Sentinels transparently pipeline your connection to the proper Redis master, and they do this invisibly to ActionHero / your application."),p.default.createElement("p",{__source:{fileName:h,lineNumber:382}},"The biggest advantage to this configuration is high-availability. In the event of a master failure, the Sentinel processes reach a consensus, then elect a new master automatically. Since the same process which handles master election also manages the client connections, no requests are lost - the sentinels hold the connection idle and then replay any pending requests on the new master after election. In the configuration shown in the first diagram above, up to 2 Redis data nodes and any 1 Sentinel can fail without the entire system failing."),p.default.createElement("p",{__source:{fileName:h,lineNumber:383}},"Note that it is not necessary to run the Sentinel nodes on separate servers. They can be run as parallel processes on the Redis nodes themselves."),p.default.createElement("p",{__source:{fileName:h,lineNumber:384}},"To run this configuration, configure ioredis with a list of the Sentinel nodes and the name of the cluster. The driver will automatically connect to an appropriate Sentinel in round-robin fashion, reconnecting to another node if one is down, or fails."),p.default.createElement("p",{__source:{fileName:h,lineNumber:385}},"An example of a ",p.default.createElement("code",{__source:{fileName:h,lineNumber:385}},"redis.js")," config file for sentinels would be:"),p.default.createElement(v.default,{__source:{fileName:h,lineNumber:386}},"exports.production = {\n  redis: function(api){\n    return {\n      channel: 'actionhero-myApp',\n      rpcTimeout: 5000,\n\n      pkg: 'ioredis',\n      port: null,\n      host: null,\n      password: 'redis-password',\n      database: 0,\n\n      options: {\n        name: 'myCluster',\n        password: 'redis-password',\n        db: 0,\n        sentinels: [\n          { host: '1.2.3.4', port: 26379 },\n        ]\n      }\n    }\n  }\n}\n"),p.default.createElement("h3",{__source:{fileName:h,lineNumber:388}},"Cluster Mode"),p.default.createElement("p",{__source:{fileName:h,lineNumber:390}},'In Cluster mode, Redis shards all the keys in data into "slots" which are evenly allocated though all the masters in the cluster. The client can connect to any node in the cluster, and if the requested key belongs on another node, it will proxy the request for you (just like the Sentinel would). The cluster can also take care of master re-election for each shard in the event of a master node failure.'),p.default.createElement("p",{__source:{fileName:h,lineNumber:391}},"Cluster mode provides similar high-availability to Sentinel mode, but the sharding allows more data to be stored in the cluster overall. However, where Sentinel mode requires a minimum of 3 servers, Cluster mode requires a minimum of 6 to reach a quorom and provide full redundancy."),p.default.createElement("p",{__source:{fileName:h,lineNumber:392}},'Also an important note:  while you may opt to run "sentinel processes", it\'s the same codebase as regular redis, just running in "sentinel mode".  The same goes if you run redis in "cluster mode".'),p.default.createElement("p",{__source:{fileName:h,lineNumber:393}},"An example of a ",p.default.createElement("code",{__source:{fileName:h,lineNumber:393}},"redis.js")," config file for redis cluster would be:"),p.default.createElement(g.Alert,{__source:{fileName:h,lineNumber:395}},"TODO"))),this.section("best-practices",p.default.createElement("div",{__source:{fileName:h,lineNumber:400}},p.default.createElement("p",{__source:{fileName:h,lineNumber:401}},"As ActionHero is a framework, much of the work for keeping your application secure is dependent on the types of actions and tasks you create.  That said, here is a list of general best-practices for ensuring your deployment is as robust as it can be:"),p.default.createElement("h3",{__source:{fileName:h,lineNumber:403}},"General Configuration"),p.default.createElement("ul",{__source:{fileName:h,lineNumber:404}},p.default.createElement("li",{__source:{fileName:h,lineNumber:405}},"Be sure to change ",p.default.createElement("code",{__source:{fileName:h,lineNumber:405}},"api.config.general.serverToken")," to something unique for your application"),p.default.createElement("li",{__source:{fileName:h,lineNumber:406}},"Turn off ",p.default.createElement("a",{href:"/docs/core/development-mode",__source:{fileName:h,lineNumber:406}},"developer mode")," in production."),p.default.createElement("li",{__source:{fileName:h,lineNumber:407}},"Use ",p.default.createElement("code",{__source:{fileName:h,lineNumber:407}},"api.config.general.filteredParams")," to hide sensitive information from the logs.  You probably don't want to log out ",p.default.createElement("code",{__source:{fileName:h,lineNumber:407}},"password"),", ",p.default.createElement("code",{__source:{fileName:h,lineNumber:407}},"credit_card"),", and other things of that nature.")),p.default.createElement("h3",{__source:{fileName:h,lineNumber:410}},"Topology"),p.default.createElement("ul",{__source:{fileName:h,lineNumber:411}},p.default.createElement("li",{__source:{fileName:h,lineNumber:412}},"Run a cluster via ",p.default.createElement("code",{__source:{fileName:h,lineNumber:412}},"start cluster"),".  This will guarantee that you can reboot your application with 0 downtime and deploy new versions without interruption.",p.default.createElement("ul",{__source:{fileName:h,lineNumber:413}},p.default.createElement("li",{__source:{fileName:h,lineNumber:414}},"You can run 1 ActionHero instance per core (assuming the server is dedicated to ActionHero), and that is the default behavior of ",p.default.createElement("code",{__source:{fileName:h,lineNumber:414}},"start cluster"),"."),p.default.createElement("li",{__source:{fileName:h,lineNumber:415}},"You don't need a tool like PM2 to manage ActionHero cluster process, but you can."),p.default.createElement("li",{__source:{fileName:h,lineNumber:416}},"You can use an init script to ",p.default.createElement("code",{__source:{fileName:h,lineNumber:416}},"start cluster")," at boot, or use a tool like ",p.default.createElement("a",{href:"https://mmonit.com/monit/",__source:{fileName:h,lineNumber:416}},"monit")," to do it for you."))),p.default.createElement("li",{__source:{fileName:h,lineNumber:419}},"Never run tasks on the same ActionHero instances you run your servers on; never run your servers on the same ActionHero instances you run your tasks on",p.default.createElement("ul",{__source:{fileName:h,lineNumber:420}},p.default.createElement("li",{__source:{fileName:h,lineNumber:421}},"Yes, under most situations running servers + tasks on the same instance will work OK, but the load profiles (and often the types of packages required) vary in each deployment.  Actions are designed to respond quickly and offload hard computations to tasks.  Tasks are designed to work slower computations."),p.default.createElement("li",{__source:{fileName:h,lineNumber:422}},"Do any CPU-intensive work in a task.  If a client needs to see the result of a CPU-intensive operation, poll for it (or use web-sockets)"))),p.default.createElement("li",{__source:{fileName:h,lineNumber:425}},"Use a centralized logging tool like Splunk, ELK, SumoLogic, etc.  ActionHero is ",p.default.createElement("em",{__source:{fileName:h,lineNumber:425}},"built for the cloud"),", which means that it expects pids, application names, etc to change, and as such, will create many log files.  Use a centralized tool to inspect the state of your application.",p.default.createElement("ul",{__source:{fileName:h,lineNumber:426}},p.default.createElement("li",{__source:{fileName:h,lineNumber:427}},"Log everything.  You never know what you might want to check up on. ","ActionHero's"," logger has various levels you can use for this."))),p.default.createElement("li",{__source:{fileName:h,lineNumber:430}},"Split out the redis instance you use for cache from the one you use for tasks.  If your cache fills up, do you want task processing to fail?"),p.default.createElement("li",{__source:{fileName:h,lineNumber:431}},"Your web request stack should look like: [Load Balancer] -> [App Server] -> [Nginx] -> [ActionHero]",p.default.createElement("ul",{__source:{fileName:h,lineNumber:432}},p.default.createElement("li",{__source:{fileName:h,lineNumber:433}},"This layout allows you to have control, back-pressure and throttling at many layers."),p.default.createElement("li",{__source:{fileName:h,lineNumber:434}},"Configure Nginx to serve static files whenever possible to remove load from ActionHero, and leave it just to process actions"))),p.default.createElement("li",{__source:{fileName:h,lineNumber:437}},"Use a CDN. ActionHero will serve static files with the proper last-modified headers, so your CDN should respect this, and you should not need to worry about asset SHAs/Checksums."),p.default.createElement("li",{__source:{fileName:h,lineNumber:438}},"Use redis-cluster or redis-sentinel.  The ",p.default.createElement("a",{href:"https://github.com/luin/ioredis",__source:{fileName:h,lineNumber:438}},p.default.createElement("code",{__source:{fileName:h,lineNumber:438}},"ioredis"))," redis library has support for them by default.  This allows you to have a High Availability redis configuration.")),p.default.createElement("h3",{__source:{fileName:h,lineNumber:441}},"Crashing and Safety"),p.default.createElement(v.default,{language:"bash",__source:{fileName:h,lineNumber:442}},"> ./node_modules./bin/actionhero start cluster --workers 1\n2016-04-11T18:51:32.891Z - info: actionhero >> start cluster\n2016-04-11T18:51:32.904Z - notice:  - STARTING CLUSTER -\n2016-04-11T18:51:32.905Z - notice: pid: 43315\n2016-04-11T18:51:32.911Z - info: starting worker #1\n2016-04-11T18:51:33.097Z - info: [worker #1 (43316)]: starting\n2016-04-11T18:51:33.984Z - info: [worker #1 (43316)]: started\n2016-04-11T18:51:33.985Z - notice: cluster equilibrium state reached with 1 workers\n2016-04-11T18:51:44.775Z - alert: [worker #1 (43316)]: uncaught exception => yay is not defined\n2016-04-11T18:51:44.775Z - alert: [worker #1 (43316)]:    ReferenceError: yay is not defined\n2016-04-11T18:51:44.775Z - alert: [worker #1 (43316)]:        at Object.exports.action.run (/app/actionhero/actions/bad.js:14:5)\n2016-04-11T18:51:44.775Z - alert: [worker #1 (43316)]:        at /app/actionhero/initializers/ActionProcessor.js:268:31\n2016-04-11T18:51:44.775Z - alert: [worker #1 (43316)]:        at /app/actionhero/initializers/ActionProcessor.js:149:9\n2016-04-11T18:51:44.776Z - alert: [worker #1 (43316)]:        at /app/actionhero/node_modules/async/lib/async.js:726:13\n2016-04-11T18:51:44.776Z - alert: [worker #1 (43316)]:        at /app/actionhero/node_modules/async/lib/async.js:52:16\n2016-04-11T18:51:44.776Z - alert: [worker #1 (43316)]:        at iterate (/app/actionhero/node_modules/async/lib/async.js:260:24)\n2016-04-11T18:51:44.776Z - alert: [worker #1 (43316)]:        at async.forEachOfSeries.async.eachOfSeries (/app/actionhero/node_modules/async/lib/async.js:281:9)\n2016-04-11T18:51:44.776Z - alert: [worker #1 (43316)]:        at _parallel (/app/actionhero/node_modules/async/lib/async.js:717:9)\n2016-04-11T18:51:44.776Z - alert: [worker #1 (43316)]:        at Object.async.series (/app/actionhero/node_modules/async/lib/async.js:739:9)\n2016-04-11T18:51:44.777Z - alert: [worker #1 (43316)]:        at api.ActionProcessor.preProcessAction (/app/actionhero/initializers/ActionProcessor.js:148:13)\n2016-04-11T18:51:44.777Z - notice: cluster equilibrium state reached with 1 workers\n2016-04-11T18:51:44.785Z - info: [worker #1 (43316)]: exited\n2016-04-11T18:51:44.785Z - info: starting worker #1\n2016-04-11T18:51:44.960Z - info: [worker #1 (43323)]: starting\n2016-04-11T18:51:45.827Z - info: [worker #1 (43323)]: started\n2016-04-11T18:51:45.827Z - notice: cluster equilibrium state reached with 1 workers\n"),p.default.createElement("ul",{__source:{fileName:h,lineNumber:443}},p.default.createElement("li",{__source:{fileName:h,lineNumber:444}},"Let the app crash rather than being defensive prematurely.  ActionHero has a good logger, and if you are running within ",p.default.createElement("code",{__source:{fileName:h,lineNumber:444}},"start cluster")," mode, your server will be restarted.  It is very easy to hide uncaught errors, exceptions, or un-resolved promises, and doing so might leave your application in strange state."),p.default.createElement("li",{__source:{fileName:h,lineNumber:445}},"We removed domains from the project in v13 to follow this philosophy, and rely on a parent process (",p.default.createElement("code",{__source:{fileName:h,lineNumber:445}},"start cluster"),") to handle error logging.  Domains are deprecated in node.js now for the same reasons we discuss here.",p.default.createElement("ul",{__source:{fileName:h,lineNumber:446}},p.default.createElement("li",{__source:{fileName:h,lineNumber:447}},"For example, if you timeout connections that are taking too long, what are you going to do about the database connection it was running?  Will you roll it back?  What about the other clients using the same connection pool?  How can you be sure which connection in the mySQL pool was in use?  Rather than handle all these edge cases… just let your app crash, log, and reboot."))),p.default.createElement("li",{__source:{fileName:h,lineNumber:450}},"As noted above, centralized logging (Splunk et al) will be invaluable here.  You can can also employ a tool like ",p.default.createElement("a",{href:"https://bugsnag.com",__source:{fileName:h,lineNumber:450}},"BugSnag")," to collect and correlate errors.")),p.default.createElement("h3",{__source:{fileName:h,lineNumber:453}},"Actions"),p.default.createElement("ul",{__source:{fileName:h,lineNumber:454}},p.default.createElement("li",{__source:{fileName:h,lineNumber:455}},"Remember that all params which come in via the ",p.default.createElement("code",{__source:{fileName:h,lineNumber:455}},"web")," and ",p.default.createElement("code",{__source:{fileName:h,lineNumber:455}},"socket")," servers are ",p.default.createElement("code",{__source:{fileName:h,lineNumber:455}},"String"),"s.  If you want to typeCast them (perhaps you always know that the param ",p.default.createElement("code",{__source:{fileName:h,lineNumber:455}},"user_id")," will be an integer), you can do so in a middleware or within an action's ",p.default.createElement("a",{href:"/docs/core/actions",__source:{fileName:h,lineNumber:455}},p.default.createElement("code",{__source:{fileName:h,lineNumber:455}},"params.formatter"))," step."),p.default.createElement("li",{__source:{fileName:h,lineNumber:456}},'Always remember to sanitize any input for SQL injection, etc.  The best way to describe this is "never pass a query to your database which can be directly modified via user input"!'),p.default.createElement("li",{__source:{fileName:h,lineNumber:457}},"Remember that you can restrict actions to specific server types.  Perhaps only a web POST request should be able to login, and not a websocket client.  You can control application flow this way."),p.default.createElement("li",{__source:{fileName:h,lineNumber:458}},"Crafting ",p.default.createElement("a",{href:"https://github.com/actionhero/actionhero-angular-bootstrap-cors-csrf",__source:{fileName:h,lineNumber:458}},"authentication middleware is not that hard"))),p.default.createElement("h3",{__source:{fileName:h,lineNumber:461}},"Tasks"),p.default.createElement("ul",{__source:{fileName:h,lineNumber:462}},p.default.createElement("li",{__source:{fileName:h,lineNumber:463}},"Tasks can be created from any part of ActionHero: Actions, Servers, Middleware, even other Tasks."),p.default.createElement("li",{__source:{fileName:h,lineNumber:464}},"You can chain tasks together to create workflows."),p.default.createElement("li",{__source:{fileName:h,lineNumber:465}},"ActionHero uses the ",p.default.createElement("a",{href:"https://github.com/taskrabbit/node-resque#multi-worker",__source:{fileName:h,lineNumber:465}},p.default.createElement("code",{__source:{fileName:h,lineNumber:465}},"multiWorker"))," from node-resque.  When configured properly, it will consume 100% of a CPU core, to work as many tasks at once as it can.  This will also fluctuate depending on the CPU difficulty of the job.  Plan accordingly."),p.default.createElement("li",{__source:{fileName:h,lineNumber:466}},"Create a way to view the state of your redis cluster.  Are you running out of RAM?  Are your Queues growing faster than they can be worked?  Checking this information is the key to having a healthy ecosystem. ",p.default.createElement("a",{href:"/docs/core/tasks",__source:{fileName:h,lineNumber:466}},"The methods for doing so")," are available."),p.default.createElement("li",{__source:{fileName:h,lineNumber:467}},"Be extra-save within your actions, and do not allow an uncaught exception.  This will cause the worker to crash and the job to be remain 'claimed' in redis, and never make it to the failed queue.")))))))}}]),t}(b.default);t.default=k}},[1237]);
            return { page: comp.default }
          })
        