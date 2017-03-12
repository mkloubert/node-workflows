import * as Workflows from './index';

var workflow = Workflows.create();

// custom events for the execution
workflow.then(function(ctx) {
    // ACTION #0

    ctx.events.on('myWorkflowEvent_0', function(val1: string, val2: string, val3: string) {
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
Workflows.EVENTS.once('myGlobalEvent', function(val: number) {
    // val == 1234

    if (val) {
        
    }
});

// a custom workflow event
workflow.on('myCustomWorkflowEvent', function(val: string) {
    // [0] val == 'XyZ_1'
    // [1] val == 'XyZ_2'

    if (val) {

    }
});

// START
workflow.start().then(function() {
    // success
}).catch(function() {
    // ERROR
});

workflow.start().then(function(result) {
    // success

    if (result) {

    }
}).catch(function(err) {
    // ERROR!!!

    if (err) {

    }
});
