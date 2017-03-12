# node-workflows

Simple and fast implementation of action-driven workflows for [Node.js](https://nodejs.org/) written in [TypeScript](https://www.typescriptlang.org/).

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NVXYJ2GPSFP3S) [![](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?fid=o62pkd&url=https%3A%2F%2Fgithub.com%2Fmkloubert%2Fnode-workflows)

## Install

```bash
npm install node-workflows --save
```

## Usage

### Import

```javascript
var Workflows = require('node-workflows');
```

The [TypeScript](https://www.typescriptlang.org/) way:

```typescript
import * as Workflows from 'node-workflows';
```

### Example

```javascript
Workflows.start(function(ctx) {
    // ACTION #0
    console.log('Entering ACTION #0...');

    // will be available in
    // 'previousValue' property
    // of the next action
    ctx.nextValue = 'MK';

    // result of the workflow
    ctx.result = 23979;
}, function(ctx) {
    // ACTION #1
    console.log('Entering ACTION #1...');

    // run "async"
    return new Promise(function(resolve, reject) {
        try {
            // ctx.previousValue == 'MK'
            // ctx.result == 23979

            setTimeout(function() {
                // a value for the execution
                ctx.value = 19861222;

                resolve('TM');  // will be available in
                                // 'previousValue' property
                                // of the next action
            }, 5000);
        }
        catch (e) {
            reject(e);
        }
    });
}, {
    // use an object
    // with an 'execute()' method
    // instead a function
    execute: function(ctx) {
        // ACTION #2
        console.log('Entering ACTION #2...');

        // ctx.previousValue == 'TM'
        // ctx.value == 1781

        ctx.result = 5979;
    }
}, function(ctx) {
    // ACTION #3
    console.log('Entering ACTION #3...');

    // ctx.previousValue == undefined
    // ctx.result == 5979

    if (1781 !== ctx.value) {
        // ctx.value == 19861222

        ctx.value = 1781;

        // mark 'ACTION #2'
        // as next action
        ctx.goto(2);
    }
}).then(function(result) {
    // SUCCESS

    console.log('SUCCESS: ' + result);  // 5979
}).catch(function(err) {
    // error thrown while execution!

    console.log('ERROR: ' + err);
});
```

## Documentation

The full API documentation can be found [here](https://mkloubert.github.io/node-workflows/).
