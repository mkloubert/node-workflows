
import * as Workflows from './index';

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
}, function(ctx) {
    // ACTION #2
    console.log('Entering ACTION #2...');

    // ctx.previousValue == 'TM'
    // ctx.value == 1781

    ctx.result = 5979;
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
