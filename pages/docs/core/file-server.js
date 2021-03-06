import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const Log =
`> curl localhost:8080/simple.html -v

*   Trying ::1...
* connect to ::1 port 8080 failed: Connection refused
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /simple.html HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.43.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Last-Modified: Fri Jun 12 2015 02:51:29 GMT-0700 (PDT)
< Cache-Control: max-age=60, must-revalidate, public
< Expires: Sun, 15 Nov 2015 02:07:46 GMT
< Content-Type: text/html
< Access-Control-Allow-Headers: Content-Type
< Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS, TRACE
< Access-Control-Allow-Origin: *
< X-Powered-By: actionhero API
< Set-Cookie: sessionID=d4453f54ff066a2ef078e5c80f18dc78a81f44ff;path=/;expires=Sun, 15 Nov 2015 03:06:46 GMT;
< Content-Length: 101
< Date: Sun, 15 Nov 2015 02:06:46 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact

<h1>ActionHero</h1>\nI am a flat file being served to you via the API from ./public/simple.html<br />
`

const FilesFromActions =
`// success case
data.connection.sendFile('/path/to/file.mp3');
data.toRender = false;
next();

// failure case
data.connection.rawConnection.responseHttpCode = 404;
data.connection.sendFile('404.html');
data.toRender = false;
next();
`

const Customizing =
`// in an initializer, override api.staticFile.path

api.staticFile.path = function(connection){
  if(connection.action == 'sendFile'){
    return '/tmp/uploads';
  }else{
    return api.config.general.paths.public[0];
  }
}`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core: File Server',
        icon: '/static/images/file-server.svg'
      },
      sections: {
        'overview': 'Overview',
        'web-clients': 'Web Clients',
        'non-web-clients': 'Non-Web clients',
        'files-from-actions': 'Files from Actions',
        'customizing': 'Customizing the File Server'
      },
      links: [
        {link: '/docs/core/logging', title: '» Core: Logging'},
        {link: '/docs/core/chat', title: '« Core: Chat'}
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
                <Code language='bash'>{Log}</Code>
                <p>ActionHero comes with a file server which clients can make use of to request files on the ActionHero server.  ActionHero is not meant to be a 'rendering' server (like express or rails), but can serve static files.</p>
                <p>If a directory is requested rather than a file, ActionHero will look for the file in that directory defined by <code>api.config.commonWeb.directoryFileType</code> (which defaults to <code>index.html</code>).  Failing to find this file, an error will be returned defined in <code>api.config.general.flatFileIndexPageNotFoundMessage</code></p>
                <p>You can use the <code>api.staticFile.get(connection, next)</code> in your actions (where <code>next(connection, error, fileStream, mime, length)</code>).  Note that fileStream is a stream which can be pipe'd to a client.  You can use this in actions if you wish,</p>
                <p>On .nix operating system's symlinks for both files and folders will be followed.</p>
              </div>
            )}

            { this.section('web-clients',
              <div>
                <ul>
                  <li><code>Cache-Control</code> and <code>Expires</code> or respectively <code>ETag</code> headers (depending on configuration) will be sent with it's caching or revalidation time defined by <code>api.config.servers.web.flatFileCacheDuration</code></li>
                  <li>Content-Types for files will attempt to be determined using the <a href='https://npmjs.org/package/mime'>mime package</a></li>
                  <li>web clients may request <code>connection.params.file</code> directly within an action which makes use of <code>api.sendFile</code>, or if they are  under the <code>api.config.servers.web.urlPathForFiles</code> route, the file will be looked up as if the route matches the directory structure under <code>flatFileDirectory</code>.</li>
                  <li>if your action wants to send content down to a client directly, you will do so like this <code>server.sendFile(connection, null, stream, 'text/html', length);</code></li>
                </ul>
              </div>
            )}

            { this.section('non-web-clients',
              <div>
                <ul>
                  <li>the param <code>file</code> should be used to request a path</li>
                  <li>file data is sent <code>raw</code>, and is likely to contain binary content and line breaks.  Parse your responses accordingly!</li>
                </ul>
              </div>
            )}

            { this.section('files-from-actions',
              <div>
                <Code>{FilesFromActions}</Code>
                <p>You can send files from within actions using <code>connection.sendFile()</code>.</p>
                <p>Note that you can optionally modify responseCodes (for HTTP clients only).  Be sure to set <code>toRender = false</code> in the callback, as you have already sent data to the client, and probably don't want to do so again on a file request.  If you try to <code>sendFile</code> on a path that doesn't exist (within your public directory), the 404 header will be handled automatically for you.</p>
              </div>
            )}

            { this.section('customizing',
              <div>
                <Code>{Customizing}</Code>
                <p>By default, we want ActionHero's file server to be very locked-down, and only serve files from directories defined in <code>api.config.general.paths.public</code>.  This is the safest default for beginners. However, you can customize things by changing the behavior of <code>api.staticFile.path()</code>.</p>
                <p>This would serve files from <code>/public</code> for all requests except the <code>sendFile</code> action, which will serve files from <code>/tmp</code></p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
