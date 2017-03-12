/// <reference types="node" />
import * as events from 'events';
/**
 * A value storage.
 */
export declare type ValueStorage = {
    [key: string]: any;
};
/**
 * A workflow action.
 *
 * @param {WorkflowActionContext} ctx The current execution context.
 *
 * @return {WorkflowActionResult} The result.
 */
export declare type WorkflowAction = (ctx: WorkflowActionContext) => WorkflowActionResult;
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
     * Gets or sets the result of the whole workflow.
     */
    result?: any;
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
     * Gets or sets a value for the whole execution chain.
     */
    value?: any;
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
export declare type WorkflowActionResult = Promise<any> | void;
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
export declare type WorkflowExecutorType = WorkflowAction | WorkflowExecutor;
/**
 * Global events.
 */
export declare const EVENTS: events.EventEmitter;
/**
 * Stores global values.
 */
export declare const GLOBALS: ValueStorage;
/**
 * A workflow.
 */
export declare class Workflow extends events.EventEmitter {
    /**
     * Stores the actions of the Workflow.
     */
    protected _actions: WorkflowActionEntry[];
    /**
     * Stores the permanent state values of the actions.
     */
    protected _actionStates: any[];
    /**
     * Stores the number of workflow execution.
     */
    protected _executions: number;
    /**
     * Stores the current state value.
     */
    protected _state: any;
    /**
     * Gets the number of workflow executions.
     */
    readonly executions: number;
    /**
     * Alias for 'then'.
     */
    next(executor?: WorkflowExecutorType, thisArg?: any): this;
    /**
     * Notifies for a property change.
     *
     * @param {string} propertyName The name of the property.
     * @param {any} oldValue The old value.
     * @param {any} newValue The new value.
     *
     * @chainable
     */
    protected notifyPropertyChanged(propertyName: string, oldValue: any, newValue: any): this;
    /**
     * Resets the workflow.
     *
     * @chainable
     */
    reset(): this;
    /**
     * Resets the state values of the actions.
     *
     * @chainable
     */
    resetActionStates(): this;
    /**
     * Resets the state value.
     *
     * @chainable
     */
    resetState(): this;
    /**
     * Sets the state value.
     *
     * @param {any} newValue The new value.
     *
     * @chainable
     */
    setState(newValue: any): this;
    /**
     * Starts the workflow.
     *
     * @param {any} [initialValue] The initial value for the execution.
     *
     * @returns {Promise<any>} The promise with the result of the workflow.
     */
    start(initialValue?: any): Promise<any>;
    /**
     * Gets or sets state of that workflow.
     */
    state: any;
    /**
     * Adds a new action.
     *
     * @param {WorkflowExecutorType} [executor] The executor to add.
     * @param {any} [thisArg] The optional object / value that should be linked with the underlying action.
     *
     * @chainable
     */
    then(executor?: WorkflowExecutorType, thisArg?: any): this;
}
/**
 * Creates a new workflow.
 *
 * @param {...WorkflowExecutorType[]} firstExecutors The first executors.
 *
 * @returns {Workflow} The new workflow.
 */
export declare function create(...firstExecutors: WorkflowExecutorType[]): Workflow;
/**
 * Starts a new workflow.
 *
 * @param {...WorkflowExecutorType[]} executors The first executors.
 *
 * @returns {Promise<any>} The promise with the result of the workflow.
 */
export declare function start(...executors: WorkflowExecutorType[]): Promise<any>;
