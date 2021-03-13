# dev-tool
Simple dev tool for js fullstack

# Examples

## Client
index.js
```js
import { render } from "preact"

export function App() {


  return <h1>Hello</h1>
}

render(<App />, document.body)
```

dev.js
```js
const dev = require('dev-tool');
dev.build({
  source : "index.jsx",
  outfile : "index.js"
})
```

