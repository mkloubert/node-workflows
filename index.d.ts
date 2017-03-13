/// <reference types="node" />
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
export declare type LoggerType = Logger | LoggerAction;
/**
 * A logger action.
 *
 * @param {LoggerContext} ctx The context.
 */
export declare type LoggerAction = (ctx: LoggerContext) => void;
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
export declare type Predicate<T> = (value: T) => Promise<boolean> | boolean;
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
     * Logs an alert message.
     *
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     *
     * @chainable
     */
    readonly alert: (msg: any, tag?: string, priority?: number) => this;
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
    readonly crit: (msg: any, tag?: string, priority?: number) => this;
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
    readonly dbg: (msg: any, tag?: string, priority?: number) => this;
    /**
     * Logs an emergency message.
     *
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     *
     * @chainable
     */
    readonly emerg: (msg: any, tag?: string, priority?: number) => this;
    /**
     * Logs an error message.
     *
     * @param {any} msg The message (value).
     * @param {string} [tag] The tag.
     * @param {number} [priority] The priority.
     *
     * @chainable
     */
    readonly err: (msg: any, tag?: string, priority?: number) => this;
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
    readonly info: (msg: any, tag?: string, priority?: number) => this;
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
    readonly log: (msg: any, tag?: string, category?: LogCategory, priority?: number) => this;
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
    readonly note: (msg: any, tag?: string, priority?: number) => this;
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
    readonly trace: (msg: any, tag?: string, priority?: number) => this;
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
    readonly warn: (msg: any, tag?: string, priority?: number) => this;
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
 * List of log categories.
 */
export declare enum LogCategory {
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
 * The initial value for 'logLevel' property of 'Workflow' class.
 */
export declare let DefaultLogLevel: LogCategory;
/**
 * List of default loggers.
 */
export declare let DefaultLoggers: LoggerType[];
/**
 * The initial value for 'state' property of 'Workflow' class.
 */
export declare let DefaultState: any;
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
     * Stores the loggers.
     */
    protected _loggers: LoggerEntry[];
    /**
     * Stores the minimal log level.
     */
    protected _logLevel: LogCategory;
    /**
     * Stores the current state value.
     */
    protected _state: any;
    /**
     * Initializes a new instance of that class.
     */
    constructor();
    /**
     * Adds a logger.
     *
     * @param {LoggerType} [logger] The logger to add.
     * @param {any} [thisArg] The optional object / value that should be linked with the underlying action.
     *
     * @chainable
     */
    addLogger(logger?: LoggerType, thisArg?: any): this;
    /**
     * Gets the number of workflow executions.
     */
    readonly executions: number;
    /**
     * Gets or sets the minimal log level.
     */
    logLevel: LogCategory;
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
     * Resets the loggers.
     *
     * @chainable
     */
    resetLoggers(): this;
    /**
     * Resets the state value.
     *
     * @chainable
     */
    resetState(): this;
    /**
     * Sets the minimal log level.
     *
     * @param {LogCategory} newValue The new value.
     *
     * @chainable
     */
    setLogLevel(newValue: LogCategory): this;
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
