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
     * Gets the number of all workflow actions.
     */
    readonly count: number;
    /**
     * Gets the current number of executed actions.
     */
    readonly executions: number;
    /**
     * Skips all upcoming actions.
     * 
     * @chainable
     */
    readonly finish: () => WorkflowAction;
    /**
     * Gets the global value storage.
     */
    readonly globals: ValueStorage;
    /**
     * Sets the pointer for the next action.
     * 
     * @param {number} newIndex The zero based index of the next action.
     * 
     * @chainable
     */
    readonly goto: (newIndex: number) => WorkflowAction;
    /**
     * Sets the pointer to the first action.
     * 
     * @chainable
     */
    readonly gotoFirst: () => WorkflowAction;
    /**
     * Sets the pointer to the last action.
     * 
     * @chainable
     */
    readonly gotoLast: () => WorkflowAction;
    /**
     * Sets the pointer to the next action.
     * 
     * @chainable
     */
    readonly gotoNext: () => WorkflowAction;
    /**
     * Gets the current zero based index.
     */
    readonly index: number;
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
     * Gets or sets the value for the next execution.
     */
    nextValue?: any;
    /**
     * Access the value for permanent, global values.
     */
    readonly permanentGlobals: ValueStorage;
    /**
     * Gets or sets the (permanent) state value for the underlying action.
     */
    permanentState: any;
    /**
     * Gets the index of the previous workflow.
     */
    readonly previousIndex?: number;
    /**
     * Gets the value from the previous execution.
     */
    readonly previousValue: any;
    /**
     * Gets or sets the result of the whole workflow.
     */
    result?: any;
    /**
     * Gets or sets the state value for the underlying action.
     */
    state: any;
    /**
     * Gets or sets a value for the whole execution chain.
     */
    value?: any;
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
 * Stores global values.
 */
export const GLOBALS: ValueStorage = {};

/**
 * A workflow.
 */
export class Workflow {
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
     * Gets the number of workflow executions.
     */
    public get executions(): number {
        return this._executions;
    }
    
    /**
     * Alias for 'then'.
     */
    public next(executor?: WorkflowExecutorType, thisArg?: any): Workflow {
        return this.then
                   .apply(this, arguments);
    }

    /**
     * Resets the workflow.
     * 
     * @chainable
     */
    public reset(): Workflow {
        this._actions = [];
        this._actionStates = [];
        this._executions = 0;

        this.resetActionStates();
        this.resetState();

        return this;
    }

    /**
     * Resets the state values of the actions.
     * 
     * @chainable
     */
    public resetActionStates(): Workflow {
        this._actionStates = [];
        
        return this;
    }

    /**
     * Resets the state value.
     * 
     * @chainable
     */
    public resetState(): Workflow {
        return this.setState(undefined);
    }

    /**
     * Sets the state value.
     * 
     * @param {any} newValue The new value.
     * 
     * @chainable
     */
    public setState(newValue: any): Workflow {
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
                ++me._executions;

                let entries = me._actions.map(x => x);

                let actionStates: any[] = [];
                let globals: ValueStorage = {};

                let nextAction: () => void;

                let executions = 0;
                let index = -1;
                let prevIndx: number;
                let prevVal: any;
                let result: any;
                let value = initialValue;

                nextAction = () => {
                    try {
                        ++index;
                        if (index >= entries.length) {
                            resolve(result);
                            return;
                        }

                        let e = entries[index];

                        let ctx: WorkflowActionContext = {
                            count: entries.length,
                            executions: ++executions,
                            finish: function() {
                                index = entries.length - 1;
                                return this;
                            },
                            globals: globals,
                            goto: function(newIndex) {
                                --newIndex;
                                if (newIndex < 0 || newIndex >= entries.length) {
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
                            isBetween: index > 0 && (index < (entries.length - 1)),
                            isFirst: 0 === index,
                            isLast: (entries.length - 1) === index,
                            permanentGlobals: GLOBALS,
                            permanentState: undefined,
                            previousIndex: prevIndx,
                            previousValue: prevVal,
                            result: result,
                            state: undefined,
                            value: value,
                            workflowExecutions: me._executions,
                            workflowState: undefined,
                        };

                        // ctx.permanentState
                        Object.defineProperty(ctx, 'permanentState', {
                            get: function() {
                                return me._actionStates[index];
                            },
                            set: function(newValue) {
                                me._actionStates[index] = newValue;
                            }
                        });

                        // ctx.state
                        Object.defineProperty(ctx, 'state', {
                            get: function() {
                                return actionStates[index];
                            },
                            set: function(newValue) {
                                actionStates[index] = newValue;
                            }
                        });

                        // ctx.workflowState
                        Object.defineProperty(ctx, 'workflowState', {
                            get: function() {
                                return me.state;
                            },
                            set: function(newValue) {
                                me.state = newValue;
                            }
                        });

                        let actionCompleted = function(err: any, nextValue?: any) {
                            if (arguments.length > 1) {
                                prevVal = nextValue;
                            }
                            else {
                                prevVal = ctx.nextValue;
                            }

                            prevIndx = ctx.index;
                            result = ctx.result;
                            value = ctx.value;
                            
                            if (err) {
                                reject(err);
                            }
                            else {
                                nextAction();
                            }
                        };

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
                    catch (e) {
                        reject(e);
                    }
                };

                nextAction();  // start with first action
                               // (if available)
            }
            catch (e) {
                reject(e);
            }
        });
    }

    /**
     * The state of that workflow.
     */
    public state: any;

    /**
     * Adds a new action.
     * 
     * @param {WorkflowExecutorType} [executor] The executor to add.
     * @param {any} [thisArg] The optional object / value that should be linked with the underlying action.
     * 
     * @chainable
     */
    public then(executor?: WorkflowExecutorType, thisArg?: any): Workflow {
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

        this._actions.push({
            action: action,
            thisArg: thisArg,
        });

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
