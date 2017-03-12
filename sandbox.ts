
import * as Workflows from './index';

// WORKFLOW #1
var workflow = Workflows.create();

// ADD ACTIONS
workflow.then(function(ctx) {
    // ACTION #0

    ctx.result = 'A result value';

    ctx.events.on('myWorkflowEvent_0', function(val1: any, val2: any, val3: any) {
        // will be invoked via 'ACTION #1'

        // "TM+MK"
        var v = val1 + val2 + val3;
        if (v) {

        }
    });
}).next(function(ctx) {  // <= alias for 'then()'
    // ACTION #1

    ctx.events.emit('myWorkflowEvent_0',
                    'TM', '+', 'MK');

    ctx.events.once('myWorkflowEvent_1', function() {
        // will be invoked via 'ACTION #2'
        // BUT: only once!

        ctx.value = 'MK';
    });
}).next(function(ctx) {
    // ACTION #2

    ctx.nextValue = 23979;

    ctx.events.emit('myWorkflowEvent_1');  // invokes event in 'ACTION #1'
    ctx.events.emit('myWorkflowEvent_1');  // DOES NOT invoke event in 'ACTION #1'
                                           // because it has already been invoked
});

workflow.once('start', (workflowExecutionCount: number, initialValue: any, startTime: Date) => {
    if (startTime) {

    }
});

workflow.once('end', (err: any, workflowExecutionCount: number, result: any, endTime: Date, value: any, previousValue: any, previousIndex: number) => {
    if (err) {

    }
});

// START
workflow.start('TM').then(function(result) {
    // success
    if (result) {

    }
}).catch(function(err) {
    // ERROR
    if (err) {

    }
});