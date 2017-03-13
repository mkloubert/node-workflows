# node-workflows

[![npm](https://img.shields.io/npm/v/node-workflows.svg)](https://www.npmjs.com/package/node-workflows)
[![npm](https://img.shields.io/npm/dt/node-workflows.svg?label=npm%20downloads)](https://www.npmjs.com/package/node-workflows)

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

### Examples

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
    // ACTION #2

    // use an object
    // with an 'execute()' method
    // instead a function
    execute: function(ctx) {
        console.log('Entering ACTION #2...');

        // ctx.previousValue == 'TM'
        // ctx.result == 23979

        // ctx.value == 19861222 (at first time)
        // ctx.value == 1781 (at 2nd time)

        ctx.result = 5979;  // set a result value
                            // for the workflow
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
    // finished with SUCCESS

    console.log('SUCCESS: ' + result);  // 5979
                                        // s. ctx.result
}).catch(function(err) {
    // finished with ERROR

    console.log('ERROR: ' + err);
});
```

#### Jump / skip

```javascript
var workflow = Workflows.create(function(ctx) {
    // ACTION #0

    // skip one action ('ACTION #1')
    ctx.skip(1);  // alternate: ctx.skip()
}, function(ctx) {
    // ACTION #1

    // mark 'ACTION #0'
    // as next ...
    ctx.gotoFirst();

    // ... but directly skip
    // #0 to #2
    ctx.skipWhile = function(ctxToCheck) {
        return ctxToCheck.index < 3;
    };
}, function(ctx) {
    // ACTION #2

    if (!ctx.value) {
        ctx.value = true;

        ctx.repeat();
    }
    else {
        ctx.goto(1);  // goto 'ACTION #1'
    }
}, function(ctx) {
    // ACTION #3

    ctx.gotoLast();  // goto last action ('ACTION #6')
}, function(ctx) {
    // ACTION #4

    ctx.value = 'PZ';

    // if we would reach here
    // we could finish
    // the execution by calling...
    ctx.finish();
}, function(ctx) {
    // ACTION #5

    // if we would reach here
    // we could jump to a previous
    // action by calling...
    ctx.goBack();  // goto to 'ACTION #4'
    ctx.goBack(2);  // goto to 'ACTION #3'
}, function(ctx) {
    // ACTION #6

    // ctx.value == undefined (because we never reached 'ACTION #4')
});

workflow.on('action.before', function(ctx) {
    console.log('ACTION #' + ctx.index);

    ctx.result = ctx.index;
});

workflow.start().then(function(result) {
    // success

    // result == 6
}).catch(function(err) {
    // ERROR!!!
});
```

#### Logging

```javascript
var workflow = Workflows.create(function(ctx) {
    // ACTION #0

    var tag = 'ACTION #1';

    ctx.emerg('system is unusable', tag);
    ctx.alert('an action must be taken immediately', tag);
    ctx.crit('critical conditions', tag);
    ctx.err('error conditions', tag);
    ctx.warn('warning conditions', tag);
    ctx.note('normal but significant condition', tag);

    // the following messages will NOT logged
    // by default
    // 
    // you can change the minimal log level
    // by setting the
    // 'logLevel' property of 'workflow'
    ctx.info('informational messages', tag);
    ctx.dbg('debug messages', tag);
    ctx.trace('output anything', tag);
});

// add loggers by function ...
workflow.addLogger(function(ctx) {
    // log level / category is stored in
    // ctx.category

    console.log('[' + ctx.tag + ' :: ' + ctx.time + '] ' + ctx.message);
});
// ... and by object
workflow.addLogger({
    log: function(ctx) {
        // your code
    }
});

workflow.start().then(function(result) {
    // success
}).catch(function(err) {
    // ERROR!!!
});
```

#### Share values

```javascript
// create workflow WITHOUT starting it
var newWorkflow = Workflows.create(function(ctx) {
    // ACTION #0

    // ctx.value == 'PZ'  (s. below - newWorkflow.start())

    ctx.value = 'MK';
    ctx.nextValue = 23979;  // will be available in 'previousValue' property
                            // of 'ACTION #1'
                            // and 'nextValue' will be resetted there
}, function(ctx) {
    // ACTION #1

    // ctx.previousValue == 23979 (from 'ACTION #0')
    // ctx.value == 'MK'

    ctx.value = 'TM';
    ctx.nextValue = 5979;  // for 'ACTION #2'
}, function(ctx) {
    // ACTION #2

    // ctx.previousValue == 5979
    // ctx.value == 'TM'
}, function(ctx) {
    // ACTION #3

    // ctx.previousValue == undefined
    // ctx.value == 'TM'
});


// START
newWorkflow.start('PZ').then(function() {
    // success
}).catch(function(err) {
    // ERROR!!!
});
```

#### States

```javascript
// WORKFLOW #1
Workflows.start(function(ctx) {
    // will be available for all
    // actions while the current execution
    ctx.globals['action0'] = 'MK';

    // is availabe ONLY FOR THIS ACTION
    // and is availabe while the execution
    // of the underlying workflow
    ctx.state = 23979;

    // will be available for all
    // actions of all workflows
    // and is stored permanent
    ctx.permanentGlobals['workflow1_action0'] = 'A global value';
}, function(ctx) {
    // ACTION #1

    // ctx.globals.action0 == 'MK';
    // ctx.state == undefined

    ctx.state = 5979;

    //TODO
});

// WORKFLOW #2
Workflows.start(function(ctx) {
    // ctx.permanentGlobals['workflow1_action0'] == 'A global value'
});
```

#### Events

```javascript
var workflow = Workflows.create();

// workflow events ...
workflow.on('action.after', function(err, ctx) {
    // AFTER workflow action has been invoked
});
workflow.on('action.before', function(ctx) {
    // BEFORE workflow action is being invoked
});
workflow.on('action.new', function(action, newActionCount) {
    // new action added
});
workflow.on('action.skip', function(ctx) {
    // this action has been skipped
});
workflow.on('end', function(err, workflowExecutionCount, result, endTime, value, previousValue, previousIndex) {
    // workflow has ended
});
workflow.on('logger.new', function(action, newLoggerCount) {
    // new logger added
});
workflow.on('reset', function() {
    // whole workflow has been resetted
});
workflow.on('reset.actions', function(oldEntries) {
    // workflow actions have been resetted
});
workflow.on('reset.actionstates', function(oldStates) {
    // states of workflow actions have
    // been resetted
});
workflow.on('reset.loggers', function(oldLoggerActions) {
    // loggers have been resetted
});
workflow.on('reset.state', function(oldValue) {
    // state value of workflow has been resetted
});
workflow.on('start', function(workflowExecutionCount, initialValue, startTime) {
    // workflow is starting
});

// custom events for the execution
workflow.then(function(ctx) {
    // ACTION #0

    ctx.events.on('myWorkflowEvent_0', function(val1, val2, val3) {
        // will be invoked via 'ACTION #1'

        // v == "TM+MK"
        var v = val1 + val2 + val3;
    });
}).next(function(ctx) {  // <= alias for 'then()'
    // ACTION #1

    // invokes event in 'ACTION #0'
    ctx.events.emit('myWorkflowEvent_0',
                    'TM', '+', 'MK');

    ctx.events.once('myWorkflowEvent_1', function() {
        // will be invoked via 'ACTION #2'
        // BUT: only once!
    });
}).next(function(ctx) {
    // ACTION #2

    ctx.events.emit('myWorkflowEvent_1');  // invokes event in 'ACTION #1'
    ctx.events.emit('myWorkflowEvent_1');  // DOES NOT invoke event in 'ACTION #1'
                                           // because it has already been invoked

    // s. below
    ctx.globalEvents.emit('myGlobalEvent', 1234);
    ctx.globalEvents.emit('myGlobalEvent', 5678);  // not invoked

    ctx.workflowEvents.emit('myCustomWorkflowEvent', 'XyZ_1');
    ctx.workflowEvents.emit('myCustomWorkflowEvent', 'XyZ_2');
});

// a global event
Workflows.EVENTS.once('myGlobalEvent', function(val) {
    // val == 1234
});

// a custom workflow event
workflow.on('myCustomWorkflowEvent', function(val) {
    // [0] val == 'XyZ_1'
    // [1] val == 'XyZ_2'
});

// START
workflow.start().then(function() {
    // success
}).catch(function() {
    // ERROR
});
```

#### Other information

```javascript
Workflows.start(function(ctx) {
    // ctx.count              => the total number of all actions of that workflow
    // ctx.current            => the context of the current executing action
    // ctx.executions         => the number of action executions
    // ctx.index              => zero based index of THAT ACTION
    // ctx.isBetween          => is between first AND last action or not
    // ctx.isFirst            => is FIRST action or not
    // ctx.isLast             => is LAST action or not
    // ctx.previousEndTime    => the end time of the PREVIOUS action
    // ctx.previousIndex      => zero based index of the PREVIOUS action
    // ctx.previousStartTime  => the start time of the PREVIOUS action
    // ctx.startTime          => the start time of the workflow
    // ctx.time               => the start time of that action
    // ctx.workflowExecutions => the number workflow executions
});
```

## Documentation

The full API documentation can be found [here](https://mkloubert.github.io/node-workflows/).
