import * as Workflows from './index';

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
    if (ctx) {

    }
});

workflow.on('action.before', function(ctx: Workflows.WorkflowActionContext) {
    console.log('ACTION #' + ctx.index);

    ctx.result = ctx.index;
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
