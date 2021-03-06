import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const TaskEnqueue =
`// Enqueue the task now, and process it ASAP
// api.tasks.enqueue(nameOfTask, args, queue, callback)
api.tasks.enqueue("sendWelcomeEmail", {to: 'evan@evantahler.com'}, 'default', function(error, toRun){
  // enqueued!
});

// Enqueue the task now, and process it once \`timestamp\` has arrived
// api.tasks.enqueueAt(timestamp, nameOfTask, args, queue, callback)
api.tasks.enqueueAt(1234556, "sendWelcomeEmail", {to: 'evan@evantahler.com'}, 'default', function(error, toRun){
  // enqueued!
});

// Enqueue the task now, and process it once \`delay\` (ms) has passed
// api.tasks.enqueueIn(delay, nameOfTask, args, queue, callback)
api.tasks.enqueueIn(10000, "sendWelcomeEmail", {to: 'evan@evantahler.com'}, 'default', function(error, toRun){
  // enqueued!
});
`

const TaskConfig =
`// From /config/tasks.js:

exports.default = {
  tasks: function(api){
    return {
      // Should this node run a scheduler to promote delayed tasks?
      scheduler: false,
      // what queues should the TaskProcessors work?
      queues: ['*'],
      // Logging levels of task workers
      workerLogging : {
        failure   : 'error', // task failure
        success   : 'info',  // task success
        start     : 'info',
        end       : 'info',
        cleaning_worker : 'info',
        poll      : 'debug',
        job       : 'debug',
        pause     : 'debug',
        internalError : 'error',
        multiWorkerAction : 'debug'
      },
      // Logging levels of the task scheduler
      schedulerLogging : {
        start     : 'info',
        end       : 'info',
        poll      : 'debug',
        enqueue   : 'debug',
        reEnqueue : 'debug',
        working_timestamp : 'debug',
        transferred_job   : 'debug'
      },
      // how long to sleep between jobs / scheduler checks
      timeout: 5000,
      // at minimum, how many parallel taskProcessors should this node spawn?
      // (have number > 0 to enable, and < 1 to disable)
      minTaskProcessors: 0,
      // at maximum, how many parallel taskProcessors should this node spawn?
      maxTaskProcessors: 0,
      // how often should we check the event loop to spawn more TaskProcessors?
      checkTimeout: 500,
      // how many ms would constitue an event loop delay to halt TaskProcessors spawning?
      maxEventLoopDelay: 5,
      // When we kill off a taskProcessor, should we disonnect that local redis connection?
      toDisconnectProcessors: true,
      // Customize Resque primitives, replace null with required replacement.
      resque_overrides: {
        queue: null,
        multiWorker: null,
        scheduler: null
      }
    }
  }
}`

const CreatingATask =
`// define a single task in a file

var task = {
  name:          "sendWelcomeEmail",
  description:   "I will send a new user a welcome email",
  queue:         "default",
  plugins:       [],
  pluginOptions: [],
  frequency:     0,
  run: function(api, params, next){
    api.sendEmail(params.email, function(error){
      next(error); //task will fail if sendEmail does
    })
  }
};

exports.task = task;

// define multiple tasks (so you can share methods)

exports.sayHello = {
  name:          'sayHello',
  description:   'I say hello',
  queue:         "default",
  plugins:       [],
  pluginOptions: [],
  frequency:     1000,
  run: function(api, params, next){
    api.log("hello")
    next();
  }
};

exports.sayGoodbye = {
  name:          'sayGoodbye',
  description:   'I say goodbye',
  queue:         "default",
  plugins:       [],
  pluginOptions: [],
  frequency:     2000,
  run: function(api, params, next){
    api.log("goodbye")
    next();
  }
};`

const TaskOutput =
`# The output of running the last 2 tasks would be:

2013-11-28 15:21:56 - debug: resque scheduler working timestamp 1385680913
2013-11-28 15:21:56 - debug: resque scheduler enquing job 1385680913 class=sayHello, queue=default,
2013-11-28 15:21:56 - debug: resque scheduler working timestamp 1385680914
2013-11-28 15:21:56 - debug: resque scheduler enquing job 1385680914 class=sayGoodbye, queue=default,
2013-11-28 15:21:56 - debug: resque worker #1 working job default class=sayHello, queue=default,
2013-11-28 15:21:56 - info: hello
2013-11-28 15:21:56 - debug: re-enqueued reccurent job sayHello
2013-11-28 15:21:56 - debug: resque worker #1 working job default class=sayGoodbye, queue=default,
2013-11-28 15:21:56 - info: goodbye
2013-11-28 15:21:56 - debug: re-enqueued reccurent job sayGoodbye`

const JobSchedules =
`// file: initializers/node_schedule.js

var schedule = require('node-schedule');

module.exports = {
  initialize: function(api, next){
    api.scheduledJobs = [];
    next();
  },

  start: function(api, next){

    // do this job every 10 seconds, cron style
    var job = schedule.scheduleJob('0,10,20,30,40,50 * * * * *', function(){
      // we want to ensure that only one instance of this job is scheduled in our environment at once,
      // no matter how many schedulers we have running

      if(api.resque.scheduler && api.resque.scheduler.master){
        api.tasks.enqueue('sayHello', {time: new Date().toString()}, 'default', function(error){
          if(error){ api.log(error, 'error'); }
        });
      }
    });

    api.scheduledJobs.push(job);

    next();
  },

  stop: function(api, next){
    api.scheduledJobs.forEach(function(job){
      job.canel();
    });

    next();
  }
};`

const FaileJobs =
`var removeStuckWorkersOlderThan = 10000; // 10000ms
api.log('removing stuck workers solder than ' + removeStuckWorkersOlderThan + 'ms', 'info');
api.tasks.cleanOldWorkers(removeStuckWorkersOlderThan, function(error, result){
  if(error){
    api.log(error, 'error');
  }
  if(Object.keys(result).length > 0){
    api.log('removed stuck workers with errors: ', 'info', result);
  }
  callback();
});`

const ExtentingResque =
`// From /config/tasks.js:
var myQueue = require('../util/myQueue.js');

exports.default = {
  tasks: function(api){
    return {
      ...
      // Customize Resque primitives, replace null with required replacement.
      resque_overrides: {
        queue: myQueue,  //<-- Explicitly pass replacement Queue implementation
        multiWorker: null,
        scheduler: null
      }
    }
  }
}

//From util/myQueue.js:
var NR = require('node-resque');
var pluginRunner = require('../node_modules/node-resque/lib/pluginRunner.js');

let myQueue = NR.queue;

myQueue.prototype.enqueueFront = function(q, func, args, callback){
  var self = this;
  if(arguments.length === 3 && typeof args === 'function'){
   callback = args;
   args = [];
  }else if(arguments.length < 3){
   args = [];
  }

  args = arrayify(args);
  var job = self.jobs[func];
  pluginRunner.runPlugins(self, 'before_enqueue', func, q, job, args, function(err, toRun){
   if(toRun === false){
     if(typeof callback === 'function'){ callback(err, toRun); }
   }else{
     self.connection.redis.sadd(self.connection.key('queues'), q, function(){
       self.connection.redis.lpush(self.connection.key('queue', q), self.encode(q, func, args), function(){
         pluginRunner.runPlugins(self, 'after_enqueue', func, q, job, args, function(){
           if(typeof callback === 'function'){ callback(err, toRun); }
         });
       });
     });
   }
  });
};

module.exports = myQueue;`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core: Tasks',
        icon: '/static/images/built-in-tasks.svg'
      },
      sections: {
        'overview': 'Overview',
        'enqueing': 'Enqueing Tasks',
        'processing-tasks': 'Processing Tasks',
        'creating-a-task': 'Creating a Task',
        'queue-inspection': 'Queue Inspection',
        'job-schedules': 'Job Schedules',
        'failed-job-management': 'Failed Job Management',
        'extending-resque': 'Extending Resque',
        'notes': 'Notes'
      },
      links: [
        {link: '/docs/core/middleware', title: '» Core: Middleware'},
        {link: '/docs/core/actions', title: '« Core: Actions'}
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
                <p>Tasks are background jobs meant to be run separately from a client's request.  They can be started by an action or by the server itself.  With ActionHero, there is no need to run a separate daemon to process these jobs.  ActionHero uses the <a href='https://github.com/taskrabbit/node-resque'>node-resque</a> package to store and process tasks in a way compatible with the <a href='https://github.com/resque/resque'>resque</a> ecosystem.</p>
                <p>There are 3 types of tasks ActionHero can process: <code>normal</code>, <code>delayed</code>, and <code>periodic</code>.</p>

                <ul>
                  <li><code>normal</code> tasks are enqueued and processed one-by-one by the task TaskProcessors</li>
                  <li><code>delayed</code> tasks are enqueued in a special `delayed` queue to only be processed at some time in the future (defined either by a timestamp in ms or milliseconds-from-now)</li>
                  <li><code>periodic</code> tasks are like delayed tasks, but they run on a set frequency (e.g. every 5 minutes).
                    <ul>
                      <li>Periodic tasks can take no input parameters.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}

            { this.section('enqueing',
              <div>
                <Code>{TaskEnqueue}</Code>
                <p>Here are examples of the 3 ways to programmatically enqueue a task.</p>
                <p>"sendWelcomeEmail" should be a task defined in the project, and <code>{`{to: 'evan@evantahler.com'}`}</code> are arguments to that task.  This task will be processed by TaskProcessors assigned to the {`‘default queue'`}.</p>
                <p>You can also enqueue tasks to be run at some time in the future (timestamp is in ms):</p>
                <p><code>enqueueAt</code> asks for a timestamp (in ms) to run at, and <code>enqueueIn</code> asks for the number of ms from now to run.</p>
                <p>The final type of task, periodic tasks, are defined with a <code>task.frequency</code> of greater than 0, and are loaded in by ActionHero when it boots.  You cannot modify these tasks once the server is running.</p>
              </div>
            )}

            { this.section('processing-tasks',
              <div>
                <Code>{TaskConfig}</Code>
                <p>To work these tasks, you need to run ActionHero with at least one <code>taskProcessor</code>. <code>TaskProcessor</code>s run in-line with the rest of your server and process jobs.  This is controlled by settings in <a href='https://github.com/actionhero/actionhero/blob/master/config/tasks.js'>/config/tasks.js</a>.</p>
                <p>If you are enqueuing delayed or periodic tasks, you also need to enable the scheduler.  This is a part of ActionHero that will periodically check the delayed queues for jobs that are ready to work now, and move them to the normal queues when the time comes.</p>
                <p>Because node and ActionHero are asynchronous, we can process more than one job at a time.  However, if the jobs we are processing are CPU-intensive, we want to limit how many we are working on at one time.  To do this, we tell ActionHero to run somewhere between <code>minTaskProcessors</code> and <code>maxTaskProcessors</code> and check every so often if the server could be working more or less jobs at a time.  Depending on the response characteristics you want for your server, you can modify these values.</p>
                <p>In production, it is best to set up some ActionHero servers that only handle requests from clients (that is, servers with no TaskProcessors) and others that handle no requests, and only process jobs (that is, no servers, many <code>TaskProcessor</code>s).</p>
                <p>As you noticed above, when you enqueue a task, you tell it which queue to be enqueued within.  This is so you can separate load or priority.  For example, you might have a <code>high</code> priority queue which does jobs like "sendPushMessage" and a <code>low</code> priority queue which does a task like "cleanupCache".  You tell the <code>taskProcessor</code>s which jobs to work, and in which priority. For the example above, you would ensure that all <code>high</code> jobs happen before all <code>low</code> jobs by setting: <code>api.config.tasks.queues = ['high', 'low']</code>.
                You could also configure more nodes to work on the <code>high</code> queue than the <code>low</code> queue, thus further ensuring that <code>high</code> priority jobs are processed faster and sooner than <code>low</code> priority jobs.</p>
              </div>
            )}

            { this.section('creating-a-task',
              <div>
                <p>An few ways to define a task:</p>
                <Code>{CreatingATask}</Code>
                <p>Output of the above:</p>
                <Code language='bash'>{TaskOutput}</Code>

                <p>You can create you own tasks by placing them in a <code>./tasks/</code> directory at the root of your application.  You can use the generator <code>actionhero generate task --name=myTask</code>. Like actions, all tasks have some required metadata:</p>

                <ul>
                  <li><code>task.name</code>: The unique name of your task</li>
                  <li><code>task.description</code>: a description</li>
                  <li><code>task.queue</code>: the default queue to run this task within (can be overwritten when enqueued)</li>
                  <li><code>task.frequency</code>: In milliseconds, how often should I run?.  A frequency of &gt;0 denotes this task as periodic and ActionHero will automatically enqueued when the server boots.  Only one instance of a periodic task will be enqueued within the cluster at a time, regardless of how many ActionHero nodes are connected.</li>
                  <li><code>task.plugins</code>: You can use resque plugins in your task from the node-resque project.  Plugins modify how your tasks are enqueued.  For example, if you use the <code>queue-lock</code> plugin, only one instance of any job (with similar arguments) can be enqueued at a time.  You can learn more about plugins from the <a href='https://github.com/taskrabbit/node-resque#plugins'>node-resque project</a>.</li>
                  <li><code>task.pluginOptions</code>: a hash of options for the plugins</li>
                </ul>

                <p><code>task.run</code> contains the actual work that the task does. It takes the following arguments:</p>

                <ul>
                  <li><code>api</code>: The ActionHero api object</li>
                  <li><code>params</code>: An array of parameters that the task was enqueued with. This is whatever was passed as the second argument to <code>api.tasks.enqueue</code></li>
                  <li><code>next</code>: A callback to call when the task is done. This callback is of the type <code>function(error, result)</code>.
                    <ul>
                      <li>Passing an <code>error</code> object will cause the job to be marked as a failure.</li>
                      <li>The result is currently not captured anywhere.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}

            { this.section('queue-inspection',
              <div>
                <p>ActionHero provides some methods to help inspect the state of your queue.  You can use these methods to check if your jobs are processing in a timely manner, if there are errors in task processing, etc.</p>

                <h3><code>api.tasks.scheduledAt(queue, taskName, args, next)</code></h3>
                <ul>
                  <li><code>next(error, timestamps)</code></li>
                  <li>finds all matching instances of queue + taskName + args from the delayed queues</li>
                  <li>timestamps will be an array of the delayed timestamps</li>
                </ul>

                <h3><code>api.tasks.del(queue, taskName, args, count, next)</code></h3>
                <ul>
                  <li><code>next(error, count)</code></li>
                  <li>removes all matching instances of queue + taskName + args from the normal queues</li>
                  <li>count is how many instances of this task were removed</li>
                </ul>

                <h3><code>api.tasks.delDelayed(queue, taskName, args, next)</code></h3>
                <ul>
                  <li><code>next(error, timestamps)</code></li>
                  <li>removes all matching instances of queue + taskName + args from the delayed queues</li>
                  <li>timestamps will be an array of the delayed timestamps which the task was removed from</li>
                </ul>

                <h3><code>api.tasks.delQueue(queue, next)</code></h3>
                <ul>
                  <li><code>next(error)</code></li>
                  <li>removes all jobs in a resque queue</li>
                </ul>

                <h3><code>api.tasks.enqueueRecurrentJob(taskName, next)</code></h3>
                <ul>
                  <li><code>next()</code></li>
                  <li>will enqueue are recurring job</li>
                  <li>might not actually enqueue the job if it is already enqueued due to resque plugins</li>
                </ul>

                <h3><code>api.tasks.stopRecurrentJob(taskName, next)</code></h3>
                <ul>
                  <li><code>next(error, removedCount)</code></li>
                  <li>will remove all instances of <code>taskName</code> from the delayed queues and normal queues</li>
                  <li>removedCount will inform you of how many instances of this job were removed</li>
                </ul>

                <h3><code>api.tasks.timestamps(next)</code></h3>
                <ul>
                  <li><code>next(error, timestamps)</code></li>
                  <li>will return an array of all timesamps which have at least one job scheduled to be run</li>
                  <li>for use with <code>api.tasks.delayedAt</code></li>
                </ul>

                <h3><code>api.tasks.queued(q, start, stop, next)</code></h3>
                <ul>
                  <li><code>next(error, jobs)</code></li>
                  <li>will return an array of all pending jobs in a resque queue (paginated via start/stop)</li>
                </ul>

                <h3><code>api.tasks.stats(next)</code></h3>
                <ul>
                  <li><code>next(error, stats)</code></li>
                  <li>will return an array of all stats from your resque cluster</li>
                </ul>

                <h3><code>api.tasks.locks(next)</code></h3>
                <ul>
                  <li><code>next(error, locks)</code></li>
                  <li>will return an array of all locks from your resque cluster (both queue and worker)</li>
                </ul>

                <h3><code>api.tasks.delLock(lockName, next)</code></h3>
                <ul>
                  <li><code>next(error, count)</code></li>
                  <li>will return the count of locks deleted (if any)</li>
                </ul>

                <h3><code>api.tasks.delayedAt(timestamp, next)</code></h3>
                <ul>
                  <li><code>next(error, jobs)</code></li>
                  <li>will return the list of jobs enqueued to run after this timestamp</li>
                </ul>

                <h3><code>api.tasks.allDelayed(next)</code></h3>
                <ul>
                  <li><code>next(error, jobs)</code></li>
                  <li>will return the list of all jobs enqueued by the timestamp they are enqueued to run at</li>
                </ul>

                <h3><code>api.tasks.workers(next)</code></h3>
                <ul>
                  <li>next(error, workers)</li>
                  <li>list all taskProcessors</li>
                </ul>

                <h3><code>api.tasks.workingOn(workerName, queues, next)</code></h3>
                <ul>
                  <li><code>next(error, status)</code></li>
                  <li>list what a specific taskProcessors (defined by the name of the server + queues) is working on (or sleeping)</li>
                </ul>

                <h3><code>api.tasks.allWorkingOn(next)</code></h3>
                <ul>
                  <li><code>next(error, workers)</code></li>
                  <li>list what all taskProcessors are working on (or sleeping)</li>
                </ul>

                <h3><code>api.tasks.details(next)</code></h3>
                <ul>
                  <li><code>next(error, details)</code></li>
                  <li>details is a hash of all the queues in the system and how long they are</li>
                  <li>this method also returns metadata about the taskProcessors and what they are currently working on</li>
                </ul>

                <h3><code>api.tasks.failedCount(next)</code></h3>
                <ul>
                  <li><code>next(error, failedCount)</code></li>
                  <li><code>failedCount</code> is how many resque jobs are in the failed queue.</li>
                </ul>

                <h3><code>api.tasks.failed(start, stop, next)</code></h3>
                <ul>
                  <li><code>next(error, failedJobs)</code></li>
                  <li><code>failedJobs</code> is an array listing the data of the failed jobs.  You can see an example at <a href='https://github.com/taskrabbit/node-resque#failed-job-managment'>https://github.com/taskrabbit/node-resque#failed-job-managment</a></li>
                </ul>

                <h3><code>api.tasks.removeFailed(failedJob, next)</code></h3>
                <ul>
                  <li><code>next(error, removedCount)</code></li>
                  <li>the input <code>failedJob</code> is an expanded node object representing the failed job, retrieved via <code>api.tasks.failed</code></li>
                </ul>

                <h3><code>api.tasks.retryAndRemoveFailed(failedJob, next)</code></h3>
                <ul>
                  <li><code>next(error, failedJob)</code></li>
                  <li>the error <code>failedJob</code> is an expanded node object representing the failed job, retrieved via <code>api.tasks.failed</code></li>
                </ul>
              </div>
            )}

            { this.section('job-schedules',
              <div>
                <Code>{JobSchedules}</Code>
                <p>You may want to schedule jobs every minute/hour/day, like a distributed CRON job.  There are a number of excellent node packages to help you with this, like <a href='https://github.com/tejasmanohar/node-schedule'>node-schedule</a> and <a href='https://github.com/ncb000gt/node-cron'>node-cron</a>.  ActionHero exposes <a href='https://github.com/taskrabbit/node-resque'>node-resque's</a> scheduler to you so you can use the scheduler package of your choice.</p>
                <p>Assuming you are running ActionHero across multiple machines, you will need to ensure that only one of your processes is actually scheduling the jobs.  To help you with this, you can inspect which of the scheduler processes is correctly acting as master, and flag only the master scheduler process to run the schedule.  An <a href='/docs/core/#initializers'>initializer for this</a> would look like:</p>
                <p>Be sure to have the scheduler enabled on at least one of your ActionHero servers!</p>
              </div>
            )}

            { this.section('failed-job-management',
              <div>
                <Code>{FaileJobs}</Code>
                <p>Sometimes a worker crashes is a severe way, and it doesn't get the time/chance to notify redis that it is leaving the pool (this happens all the time on PAAS providers like Heroku). When this happens, you will not only need to extract the job from the now-zombie worker's "working on" status, but also remove the stuck worker. To aid you in these edge cases, <code>api.tasks.cleanOldWorkers(age, callback)</code> is available.</p>
                <p>Because there are no 'heartbeats' in resque, it is impossible for the application to know if a worker has been working on a long job or it is dead. You are required to provide an "age" for how long a worker has been "working", and all those older than that age will be removed, and the job they are working on moved to the error queue (where you can then use <code>api.tasks.retryAndRemoveFailed</code>) to re-enqueue the job.</p>
                <p>You can handle this with an own initializer and the following logic =&gt;</p>
              </div>
            )}

            { this.section('extending-resque',
              <div>
                <p>In cases where you would like to extend or modify the underlying behaviour or capabilities of Resque you can specify replacements for the Queues, Scheduler, or Multi Worker implementations in the Tasks configuration.</p>
                <Code>{ExtentingResque}</Code>
                <p>The above example will give you access to <code>api.resque.queue.enqueueFront()</code>, which you could use directly or wrap by extending the <code>api.tasks</code> object.</p>
              </div>
            )}

            { this.section('notes',
              <div>
                <p>Note that the <code>frequency</code>, <code>enqueueIn</code> and <code>enqueueAt</code> times are when a task is <strong>allowed</strong> to run, not when it <strong>will</strong> run.  TaskProcessors will work tasks in a first-in-first-out manner.  TaskProcessors also <code>sleep</code> when there is no work to do, and will take some time (default 5 seconds) to wake up and check for more work to do.</p>
                <p>Remember that each ActionHero server uses one thread and one event loop, so that if you have computationally intensive task (like computing Fibonacci numbers), this <strong>will</strong> block tasks, actions, and clients from working.  However, if your tasks are meant to communicate with external services (reading from a database, sending an email, etc), then these are perfect candidates to be run simultaneously as the single thread can work on other things while waiting for these operations to complete.</p>
                <p>Tasks are stored in redis.  Be sure to enable non-fake redis if you want your tasks to persist and be shared across more than one ActionHero server.</p>
                <p>If you are running a single ActionHero server, all tasks will be run locally.  As you add more servers, the work will be split evenly across all nodes.  It is very likely that your job will be run on different nodes each time.</p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
