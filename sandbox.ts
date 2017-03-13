import * as Workflows from './index';

var workflow = Workflows.create(function(ctx) {
    // ACTION #0

    var tag = 'ACTION #0';

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
        if (ctx) {

        }
    }
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