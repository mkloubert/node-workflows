import * as Workflows from './index';

var workflow = Workflows.create(function(ctx) {
    // ACTION #0

    // skip 'ACTION #1'
    ctx.skip(1);  // alternate: ctx.skip()
}, function(ctx) {
    // ACTION #1

    // goto 'ACTION #0' ...
    ctx.gotoFirst();

    // ... but directly skip
    // #1 and #2
    ctx.skipWhile = function(ctxToCheck) {
        return ctxToCheck.index < 3;
    };
}, function(ctx) {
    // ACTION #2

    ctx.goto(1);  // goto 'ACTION #1'
}, function(ctx) {
    // ACTION #3

    ctx.gotoLast();
}, function(ctx) {
    // ACTION #4

    if (ctx) {

    }
}, function(ctx) {
    // ACTION #5

    if (ctx) {
        
    }
}, function(ctx) {
    // ACTION #6

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
