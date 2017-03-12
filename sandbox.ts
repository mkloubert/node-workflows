
import * as Workflows from './index';

// WORKFLOW #1
var workflow1 = Workflows.start(function(ctx) {
    // will be available for all other
    // actions while the current execution
    ctx.globals['action0'] = 'MK';

    // is availabe ONLY FOR THIS ACTION
    // and is availabe while the execution
    // of the underlying workflow
    ctx.state = 23979;

    ctx.permanentGlobals['workflow1_action0'] = 'A global value';
}, function(ctx) {
    // ACTION #1

    // ctx.globals.action0 == 'MK';
    // ctx.state == undefined

    ctx.state = 5979;

    //TODO
});

// WORKFLOW #2
var workflow2 = Workflows.start(function(ctx) {
    // ctx.permanentGlobals['workflow1_action0'] == 'A global value'

    var s = ctx.permanentGlobals['workflow1_action0'];
    if (ctx) {

    }
});
