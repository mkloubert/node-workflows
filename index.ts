/// <reference types="node" />

// The MIT License (MIT)
// 
// node-workflows (https://github.com/mkloubert/node-workflows)
// Copyright (c) Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER

import * as events from 'events';


/**
 * A logger.
 */
export interface Logger {
    /**
     * Logs a message.
     */
    log: LoggerAction;
}

/**
 * A type for a logger.
 */
export type LoggerType = Logger | LoggerAction;

/**
 * A logger action.
 * 
 * @param {LoggerContext} ctx The context.
 */
export type LoggerAction = (ctx: LoggerContext) => void;

/**
 * A logger context.
 */
export interface LoggerContext {
    /**
     * Gets the underlying action.
     */
    readonly action: WorkflowActionContext;
    /**
     * Gets the category.
     */
    readonly category?: LogCategory;
    /**
     * Gets the message (value).
     */
    readonly message: any;
    /**
     * Gets the priority.
     */
    readonly priority?: number;
    /**
     * Gets the tag.
     */
    readonly tag?: string;
    /**
     * Gets the time.
     */
    readonly time: Date;
}

/**
 * A logger entry.
 */
export interface LoggerEntry {
    /**
     * Gets the action.
     */
    readonly action: LoggerAction;
    /**
     * Gets the object / value that should be linked with the action.
     */
    readonly thisArg: any;
}

/**
 * A predicate.
 */
export type Predicate<T> = (value: T) => Promise<boolean> | boolean;

/**
 * A value storage.
 */
export type ValueStorage = { [key: string]: any};

/**
 * A workflow action.
 * 
 * @param {WorkflowActionContext} ctx The current execution context.
 * 
 * @return {WorkflowActionResult} The result.
 */
export type WorkflowAction = (ctx: WorkflowActionContext) => WorkflowActionResult;

/**
 * An entry of a workflow action.
 */
export interface WorkflowActionEntry {
    /**
     * Gets the underlying action.
     */
    readonly action: WorkflowAction;
    /**
     * Gets the object / value that should be linked with the action.
     */
    readonly thisArg: any;
}

/**
 * An execution context of a workflow action.
 */
export interface WorkflowActionContext {
    /**
     * Logs an alert message.
     * 
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     * 
     * @chainable
     */
    readonly alert: (msg: any, tag?: string,
                     priority?: number) => this;
    /**
     * Gets the number of all workflow actions.
     */
    readonly count: number;
    /**
     * Logs a critical message.
     * 
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     * 
     * @chainable
     */
    readonly crit: (msg: any, tag?: string,
                    priority?: number) => this;
    /**
     * Gets the context of the current executing action.
     */
    readonly current: WorkflowActionContext;
    /**
     * Logs a debug message.
     * 
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     * 
     * @chainable
     */
    readonly dbg: (msg: any, tag?: string,
                   priority?: number) => this;
    /**
     * Logs an emergency message.
     * 
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     * 
     * @chainable
     */
    readonly emerg: (msg: any, tag?: string,
                     priority?: number) => this;
    /**
     * Logs an error message.
     * 
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     * 
     * @chainable
     */
    readonly err: (msg: any, tag?: string,
                   priority?: number) => this;
    /**
     * Gets the (global) events for all actions.
     */
    readonly events: NodeJS.EventEmitter;
    /**
     * Gets the current number of executed actions.
     */
    readonly executions: number;
    /**
     * Skips all upcoming actions.
     * 
     * @chainable
     */
    readonly finish: () => this;
    /**
     * Accesses the global event emitter.
     */
    readonly globalEvents: NodeJS.EventEmitter;
    /**
     * Gets the global value storage.
     */
    readonly globals: ValueStorage;
    /**
     * Goes back a number of actions.
     * 
     * @param {number} [cnt] The number of actions to go back. Default: 1
     * 
     * @chainable
     */
    readonly goBack: (cnt?: number) => void;
    /**
     * Sets the pointer for the next action.
     * 
     * @param {number} newIndex The zero based index of the next action.
     * 
     * @chainable
     */
    readonly goto: (newIndex: number) => this;
    /**
     * Sets the pointer to the first action.
     * 
     * @chainable
     */
    readonly gotoFirst: () => this;
    /**
     * Sets the pointer to the last action.
     * 
     * @chainable
     */
    readonly gotoLast: () => this;
    /**
     * Sets the pointer to the next action.
     * 
     * @chainable
     */
    readonly gotoNext: () => this;
    /**
     * Gets the current zero based index.
     */
    readonly index: number;
    /**
     * Logs an info message.
     * 
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     * 
     * @chainable
     */
    readonly info: (msg: any, tag?: string,
                    priority?: number) => this;
    /**
     * Gets if the current action is NOT the first AND NOT the last one.
     */
    readonly isBetween: boolean;
    /**
     * Gets if the current action is the FIRST one.
     */
    readonly isFirst: boolean;
    /**
     * Gets if the current action is the LAST one.
     */
    readonly isLast: boolean;
    /**
     * Logs a message.
     * 
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {LogCategory} [category] The category.
     * @param {number} [priority] The priority.
     * 
     * @chainable
     */
    readonly log: (msg: any, tag?: string,
                   category?: LogCategory, priority?: number) => this;
    /**
     * Gets or sets the value for the next execution.
     */
    nextValue?: any;
    /**
     * Logs a notice.
     * 
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     * 
     * @chainable
     */
    readonly note: (msg: any, tag?: string,
                    priority?: number) => this;
    /**
     * Access the value for permanent, global values.
     */
    readonly permanentGlobals: ValueStorage;
    /**
     * Gets or sets the (permanent) state value for the underlying action.
     */
    permanentState: any;
    /**
     * Gets the end time of the previous action.
     */
    readonly previousEndTime?: Date;
    /**
     * Gets the index of the previous workflow.
     */
    readonly previousIndex?: number;
    /**
     * Gets the start time of the previous action.
     */
    readonly previousStartTime?: Date;
    /**
     * Gets the value from the previous execution.
     */
    readonly previousValue?: any;
    /**
     * Marks the action to be repeated next time.
     */
    repeat: () => this;
    /**
     * Gets or sets the result of the whole workflow.
     */
    result: any;
    /**
     * Skips a number of upcoming actions.
     * 
     * @param {number} cnt The number of actions to skip. Default: 1
     * 
     * @chainable
     */
    readonly skip: (cnt?: number) => this;
    /**
     * Skips the upcoming actions based on a predicate.
     */
    skipWhile: Predicate<WorkflowActionContext>;
    /**
     * Gets the start time of the workflow.
     */
    readonly startTime: Date;
    /**
     * Gets or sets the state value for the underlying action.
     */
    state: any;
    /**
     * Gets the time the action has been started.
     */
    readonly time: Date;
    /**
     * Logs a trace message.
     * 
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     * 
     * @chainable
     */
    readonly trace: (msg: any, tag?: string,
                     priority?: number) => this;
    /**
     * Gets or sets a value for the whole execution chain.
     */
    value: any;
    /**
     * Logs a warning message.
     * 
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     * 
     * @chainable
     */
    readonly warn: (msg: any, tag?: string,
                    priority?: number) => this;
    /**
     * Accesses the event emitter of the underlying workflow.
     */
    readonly workflowEvents: NodeJS.EventEmitter;
    /**
     * Gets the number of workflow executions.
     */
    readonly workflowExecutions: number;
    /**
     * Gets or sets the state of the underlying workflow.
     */
    workflowState: any;
}


/**
 * The result of a workflow action.
 */
export type WorkflowActionResult = Promise<any> | void;

/**
 * An object that executes a workflow action.
 */
export interface WorkflowExecutor {
    /**
     * Executes the action.
     */
    execute: WorkflowAction;
}

/**
 * Possible types for executing a workflow action.
 */
export type WorkflowExecutorType = WorkflowAction | WorkflowExecutor;

/**
 * Global events.
 */
export const EVENTS = new events.EventEmitter();
/**
 * Stores global values.
 */
export const GLOBALS: ValueStorage = {};

/**
 * List of log categories.
 */
export enum LogCategory {
    /**
     * Emergency: system is unusable
     */
    Emergency = 0,
    /**
     * Alert: action must be taken immediately
     */
    Alert = 1,
    /**
     * Critical: critical conditions
     */
    Critical = 2,
    /**
     * Error: error conditions
     */
    Error = 3,
    /**
     * Warning: warning conditions
     */
    Warning = 4,
    /**
     * Notice: normal but significant condition
     */
    Notice = 5,
    /**
     * Informational: informational messages
     */
    Info = 6,
    /**
     * Debug: debug messages
     */
    Debug = 7,
    /**
     * Trace: output the most you can
     */
    Trace = 8,
}

/**
 * A workflow.
 */
export class Workflow extends events.EventEmitter {
    /**
     * Stores the actions of the Workflow.
     */
    protected _actions: WorkflowActionEntry[] = [];
    /**
     * Stores the permanent state values of the actions.
     */
    protected _actionStates: any[] = [];
    /**
     * Stores the number of workflow execution.
     */
    protected _executions = 0;
    /**
     * Stores the loggers.
     */
    protected _loggers: LoggerEntry[] = [];
    /**
     * Stores the minimal log level.
     */
    protected _logLevel = LogCategory.Notice;
    /**
     * Stores the current state value.
     */
    protected _state: any;

    /**
     * Adds a logger.
     * 
     * @param {LoggerType} [logger] The logger to add. 
     * @param {any} [thisArg] The optional object / value that should be linked with the underlying action.
     *  
     * @chainable
     */
    public addLogger(logger?: LoggerType, thisArg?: any): this {
        if (arguments.length < 2) {
            thisArg = this;
        }

        if (logger) {
            let action: LoggerAction;
            if ('function' === typeof logger) {
                action = logger;
            }
            else {
                let l: Logger = logger;

                action = function(ctx) {
                    l.log(ctx);
                };
            }

            let newLoggerCount = this._loggers.push({
                action: action,
                thisArg: thisArg,
            });

            this.emit('logger.new',
                      [ action, newLoggerCount ]);
        }

        return this;
    }

    /**
     * Gets the number of workflow executions.
     */
    public get executions(): number {
        return this._executions;
    }

    /**
     * Gets or sets the minimal log level.
     */
    public get logLevel(): LogCategory {
        return this._logLevel;
    }
    public set logLevel(newValue: LogCategory) {
        let oldValue = this._logLevel;
        if (newValue !== oldValue) {
            this.notifyPropertyChanged('logLevel',
                                       oldValue, newValue);
        }
    }
    
    /**
     * Alias for 'then'.
     */
    public next(executor?: WorkflowExecutorType, thisArg?: any): this {
        return this.then
                   .apply(this, arguments);
    }

    /**
     * Notifies for a property change.
     * 
     * @param {string} propertyName The name of the property.
     * @param {any} oldValue The old value.
     * @param {any} newValue The new value.
     * 
     * @chainable
     */
    protected notifyPropertyChanged(propertyName: string,
                                    oldValue: any, newValue: any): this {
        this.emit('property.changed',
                  propertyName,
                  newValue, oldValue);

        return this;
    }

    /**
     * Resets the workflow.
     * 
     * @chainable
     */
    public reset(): this {
        let oldEntries = this._actions.map(x => x);
        this._actions = [];

        this.emit('reset.actions',
                  oldEntries);

        this._actionStates = [];
        this._executions = 0;

        this.resetLoggers();
        this.resetActionStates();
        this.resetState();

        this.emit('reset');

        return this;
    }

    /**
     * Resets the state values of the actions.
     * 
     * @chainable
     */
    public resetActionStates(): this {
        let oldStates = this._actionStates.map(x => x);
        this._actionStates = [];

        this.emit('reset.actionstates',
                  oldStates);
        
        return this;
    }

    /**
     * Resets the loggers.
     * 
     * @chainable
     */
    public resetLoggers(): this {
        let oldLoggers = this._loggers.map(x => x);
        this._loggers = [];

        this.emit('reset.loggers',
                  oldLoggers);
        
        return this;
    }

    /**
     * Resets the state value.
     * 
     * @chainable
     */
    public resetState(): this {
        let oldValue = this._state;
        this.setState(undefined);

        this.emit('reset.state',
                  oldValue);

        return this;
    }

    /**
     * Sets the minimal log level.
     * 
     * @param {LogCategory} newValue The new value.
     * 
     * @chainable
     */
    public setLogLevel(newValue: LogCategory): this {
        this.logLevel = newValue;

        return this;
    }

    /**
     * Sets the state value.
     * 
     * @param {any} newValue The new value.
     * 
     * @chainable
     */
    public setState(newValue: any): this {
        this.state = newValue;

        return this;
    }
    
    /**
     * Starts the workflow.
     * 
     * @param {any} [initialValue] The initial value for the execution.
     * 
     * @returns {Promise<any>} The promise with the result of the workflow.
     */
    public start(initialValue?: any): Promise<any> {
        let me = this;

        return new Promise<any>((resolve, reject) => {
            try {
                let oldExecutionsValue = me._executions;
                let newExecutionsValue = me._executions = oldExecutionsValue + 1;

                me.notifyPropertyChanged('executions',
                                         oldExecutionsValue, newExecutionsValue);

                let entries = me._actions.map(x => x);

                let actionStates: any[] = [];
                let globals: ValueStorage = {};

                let nextAction: () => void;

                let actionEvents = new events.EventEmitter();
                let current: WorkflowActionContext;
                let executions = 0;
                let index = -1;
                let prevIndx: number;
                let prevEndTime: Date;
                let prevStartTime: Date;
                let prevVal: any;
                let result: any;
                let skipWhile: Predicate<WorkflowActionContext>;
                let startTime: Date;
                let value = initialValue;

                let completed = (err: any) => {
                    let endTime = new Date();

                    actionEvents.removeAllListeners();

                    me.emit('end',
                            err, newExecutionsValue, result, endTime, value, prevVal, prevIndx);

                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                };

                nextAction = () => {
                    try {
                        current = null;

                        ++index;
                        if (index >= entries.length) {
                            completed(null);
                            return;
                        }

                        let e = entries[index];
                        ++executions;

                        let ctx: WorkflowActionContext
                        ctx = {
                            alert: function(msg, tag?, priority?) {
                                return this.log(msg, tag,
                                                LogCategory.Alert, priority);
                            },
                            count: entries.length,
                            crit: function(msg, tag?, priority?) {
                                return this.log(msg, tag,
                                                LogCategory.Critical, priority);
                            },
                            current: undefined,
                            dbg: function(msg, tag?, priority?) {
                                return this.log(msg, tag,
                                                LogCategory.Debug, priority);
                            },
                            emerg: function(msg, tag?, priority?) {
                                return this.log(msg, tag,
                                                LogCategory.Emergency, priority);
                            },
                            err: function(msg, tag?, priority?) {
                                return this.log(msg, tag,
                                                LogCategory.Error, priority);
                            },
                            events: actionEvents,
                            executions: undefined,
                            finish: function() {
                                index = entries.length - 1;
                                return this;
                            },
                            globalEvents: EVENTS,
                            globals: globals,
                            goBack: function(cnt?) {
                                if (arguments.length < 1) {
                                    cnt = 1;
                                }

                                return this.goto(this.index - 1);
                            },
                            goto: function(newIndex) {
                                --newIndex;
                                if (newIndex < -1 || newIndex >= (entries.length - 1)) {
                                    throw new Error('Index out of range!');
                                }

                                index = newIndex;
                                return this;
                            },
                            gotoFirst: function() {
                                index = -1;
                                return this;
                            },
                            gotoLast: function() {
                                index = entries.length - 1 - 1;
                                return this;
                            },
                            gotoNext: function() {
                                index = this.index;
                                return this;
                            },
                            index: index,
                            info: function(msg, tag?, priority?) {
                                return this.log(msg, tag,
                                                LogCategory.Info, priority);
                            },
                            isBetween: index > 0 && (index < (entries.length - 1)),
                            isFirst: 0 === index,
                            isLast: (entries.length - 1) === index,
                            log: function(msg, tag?, category?, priority?) {
                                if (arguments.length < 3) {
                                    category = LogCategory.Info;
                                }

                                if (category <= me.logLevel) {
                                    try {
                                        let logTime = new Date();

                                        me._loggers.map(x => x).forEach(le => {
                                            try {
                                                let loggerCtx: LoggerContext = {
                                                    action: ctx,
                                                    category: category,
                                                    message: msg,
                                                    priority: priority,
                                                    tag: tag,
                                                    time: logTime,
                                                };

                                                le.action.apply(le.thisArg,
                                                                [ loggerCtx ]);
                                            }
                                            catch (e) {
                                                console.log('[ERROR.node-workflows.2] ' + e);
                                            }
                                        });
                                    }
                                    catch (e) {
                                        console.log('[ERROR.node-workflows.1] ' + e);
                                    }
                                }
                                
                                return this;
                            },
                            note: function(msg, tag?, priority?) {
                                return this.log(msg, tag,
                                                LogCategory.Notice, priority);
                            },
                            permanentGlobals: GLOBALS,
                            permanentState: undefined,
                            previousEndTime: prevEndTime,
                            previousIndex: prevIndx,
                            previousStartTime: prevStartTime,
                            previousValue: prevVal,
                            repeat: function() {
                                return this.goto(this.index);
                            },
                            result: undefined,
                            skip: function(cnt?) {
                                if (arguments.length < 1) {
                                    cnt = 1;
                                }

                                this.skipWhile = () => {
                                    if (cnt > 0) {
                                        --cnt;
                                        return true;
                                    }

                                    return false;
                                };

                                return this;
                            },
                            skipWhile: undefined,
                            startTime: startTime,
                            state: undefined,
                            time: undefined,
                            trace: function(msg, tag?, priority?) {
                                return this.log(msg, tag,
                                                LogCategory.Trace, priority);
                            },
                            value: undefined,
                            warn: function(msg, tag?, priority?) {
                                return this.log(msg, tag,
                                                LogCategory.Warning, priority);
                            },
                            workflowEvents: me,
                            workflowExecutions: me._executions,
                            workflowState: undefined,
                        };

                        // ctx.current
                        Object.defineProperty(ctx, 'current', {
                            enumerable: true,
                            get: function() {
                                return current;
                            }
                        });

                        // ctx.executions
                        Object.defineProperty(ctx, 'executions', {
                            enumerable: true,
                            get: function() {
                                return executions;
                            }
                        });

                        // ctx.permanentState
                        Object.defineProperty(ctx, 'permanentState', {
                            enumerable: true,
                            get: function() {
                                return me._actionStates[index];
                            },
                            set: function(newValue) {
                                me._actionStates[index] = newValue;
                            }
                        });

                        // ctx.result
                        Object.defineProperty(ctx, 'result', {
                            enumerable: true,
                            get: function() {
                                return result;
                            },
                            set: function(newValue) {
                                result = newValue;
                            }
                        });

                        // ctx.skipWhile
                        Object.defineProperty(ctx, 'skipWhile', {
                            enumerable: true,
                            get: function() {
                                return skipWhile;
                            },
                            set: function(newValue) {
                                skipWhile = newValue;
                            }
                        });

                        // ctx.state
                        Object.defineProperty(ctx, 'state', {
                            enumerable: true,
                            get: function() {
                                return actionStates[index];
                            },
                            set: function(newValue) {
                                actionStates[index] = newValue;
                            }
                        });

                        // ctx.value
                        Object.defineProperty(ctx, 'value', {
                            enumerable: true,
                            get: function() {
                                return value;
                            },
                            set: function(newValue) {
                                value = newValue;
                            }
                        });

                        // ctx.workflowState
                        Object.defineProperty(ctx, 'workflowState', {
                            enumerable: true,
                            get: function() {
                                return me.state;
                            },
                            set: function(newValue) {
                                me.state = newValue;
                            }
                        });

                        let actionCompleted = function(err: any, nextValue?: any) {
                            prevEndTime = new Date();

                            if (arguments.length > 1) {
                                prevVal = nextValue;
                            }
                            else {
                                prevVal = ctx.nextValue;
                            }

                            prevIndx = ctx.index;
                            result = ctx.result;
                            value = ctx.value;

                            me.emit('action.after',
                                    err, ctx);
                            
                            if (err) {
                                reject(err);
                            }
                            else {
                                nextAction();
                            }
                        };

                        let invokeAction = () => {
                            current = ctx;
                            prevEndTime = undefined;
                            prevStartTime = (<any>ctx).time = new Date();

                            me.emit('action.before',
                                    ctx);

                            if (e.action) {
                                let result = e.action
                                              .apply(e.thisArg,
                                                     [ ctx ]);
                                if (result) {
                                    // promise => "async" execution

                                    result.then(function(nextValue?: any) {
                                        if (arguments.length > 0) {
                                            actionCompleted(null, nextValue);
                                        }
                                        else {
                                            actionCompleted(null);
                                        }
                                    }, (err: any) => {
                                        actionCompleted(err);  // error
                                    });
                                }
                                else {
                                    actionCompleted(null);  // no result
                                }
                            }
                            else {
                                actionCompleted(null);  // no action
                            }
                        }

                        let doSkip = false;
                        let skipOrNot = () => {
                            if (doSkip) {
                                me.emit('action.skip',
                                        ctx);

                                nextAction();
                            }
                            else {
                                skipWhile = null;

                                invokeAction();
                            }
                        };

                        if (skipWhile) {
                            let skipWhileResult = skipWhile(ctx);
                            if (skipWhileResult) {
                                if ('object' === typeof skipWhileResult) {
                                    skipWhileResult.then((skip) => {
                                        doSkip = skip;

                                        skipOrNot();
                                    }, (err) => {
                                        completed(err);
                                    });
                                }
                                else {
                                    doSkip = skipWhileResult;

                                    skipOrNot();
                                }
                            }
                            else {
                                skipOrNot();
                            }
                        }
                        else {
                            skipOrNot();
                        }
                    }
                    catch (e) {
                        me.emit('action.after',
                                e);

                        completed(e);
                    }
                };

                startTime = new Date();

                me.emit('start',
                        newExecutionsValue, value, startTime);

                nextAction();  // start with first action
                               // (if available)
            }
            catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Gets or sets state of that workflow.
     */
    public get state(): any {
        return this._state;
    }
    public set state(newValue: any) {
        let oldValue = this._state;
        if (newValue !== oldValue) {
            this.notifyPropertyChanged('state',
                                       oldValue, newValue);
        }
    }

    /**
     * Adds a new action.
     * 
     * @param {WorkflowExecutorType} [executor] The executor to add.
     * @param {any} [thisArg] The optional object / value that should be linked with the underlying action.
     * 
     * @chainable
     */
    public then(executor?: WorkflowExecutorType, thisArg?: any): this {
        if (arguments.length < 2) {
            thisArg = this;
        }

        let action: WorkflowAction;
        if (executor) {
            if ('function' === typeof executor) {
                action = executor;
            }
            else {
                let e: WorkflowExecutor = executor;

                action = function(ctx) {
                    if (e.execute) {
                        e.execute(ctx);
                    }
                };
            }
        }
        else {
            action = <any>executor;
        }

        let newActionCount = this._actions.push({
            action: action,
            thisArg: thisArg,
        });

        this.emit('action.new',
                  action, newActionCount);

        return this;
    }
}


/**
 * Creates a new workflow.
 * 
 * @param {...WorkflowExecutorType[]} firstExecutors The first executors.
 * 
 * @returns {Workflow} The new workflow.
 */
export function create(...firstExecutors: WorkflowExecutorType[]): Workflow {
    let newWorkflow = new Workflow();

    if (firstExecutors) {
        firstExecutors.forEach(e => {
            newWorkflow.then(e);
        });
    }
    
    return newWorkflow;
}

/**
 * Starts a new workflow.
 * 
 * @param {...WorkflowExecutorType[]} executors The first executors.
 * 
 * @returns {Promise<any>} The promise with the result of the workflow.
 */
export function start(...executors: WorkflowExecutorType[]): Promise<any> {
    let newWorkflow = new Workflow();

    if (executors) {
        executors.forEach(e => {
            newWorkflow.then(e);
        });
    }

    return newWorkflow.start();
}
