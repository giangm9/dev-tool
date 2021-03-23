# dev-tool
Simple dev tool for js fullstack

# Examples

## Client
index.jsx
```js
import React from "react"
import ReactDOM from "react-dom"

ReactDOM.render(<h1>Hello</h1>, document.body)
```

dev.js
```js
const dev = require('dev-tool');
dev.build({
  source : "index.jsx",
  outfile : "index.js"
})
```
See more at `/examples`
