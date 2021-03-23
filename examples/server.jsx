import React from 'react'
import ReactDOMServer from 'react-dom/server';

console.log(ReactDOMServer.renderToString(
  <h1>
    Hello
  </h1>
));