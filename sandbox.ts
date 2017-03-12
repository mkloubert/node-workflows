import * as Workflows from './index';

var workflow = Workflows.create();

// custom events for the execution
workflow.then(function(ctx) {
    // ACTION #0

    ctx.skip();
}).next(function(ctx) {  // <= alias for 'then()'
    // ACTION #1
    
    ctx.skip(2);
}).next(function(ctx) {
    // ACTION #2

    ctx.goBack();
}).next(function(ctx) {
    // ACTION #3
    
    if (ctx) {
        
    }
}).next(function(ctx) {
    // ACTION #4

    if (ctx) {
        
    }
});

workflow.on('end', function() {
    if (arguments) {
        
    }
});

// START
workflow.start().then(function(result) {
    // success

    if (result) {

    }
}).catch(function(err) {
    // ERROR

    if (err) {
        
    }
});
