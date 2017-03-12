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
     * Gets or sets the state of the underlying workflow.
     */
    workflowState: any;
}
/**
 * The result of a workflow action.
 */
export declare type WorkflowActionResult = Promise<any> | void;
/**
 * Stores global values.
 */
export declare const GLOBALS: ValueStorage;
/**
 * A workflow.
 */
export declare class Workflow {
    /**
     * Stores the actions of the Workflow.
     */
    protected _actions: WorkflowAction[];
    /**
     * Stores the permanent state values of the actions.
     */
    protected _actionStates: any[];
    /**
     * Alias for 'then'.
     */
    next(action?: WorkflowAction): Workflow;
    /**
     * Resets the workflow.
     *
     * @chainable
     */
    reset(): Workflow;
    /**
     * Resets the state values of the actions.
     *
     * @chainable
     */
    resetActionStates(): Workflow;
    /**
     * Resets the state value.
     *
     * @chainable
     */
    resetState(): Workflow;
    /**
     * Sets the state value.
     *
     * @param {any} newValue The new value.
     *
     * @chainable
     */
    setState(newValue: any): Workflow;
    /**
     * Starts the workflow.
     *
     * @param {any} [initialValue] The initial value for the execution.
     *
     * @returns {Promise<any>} The promise with the result of the workflow.
     */
    start(initialValue?: any): Promise<any>;
    /**
     * The state of that workflow.
     */
    state: any;
    /**
     * Adds a new action.
     *
     * @param {WorkflowAction} [action] The action to add.
     *
     * @chainable
     */
    then(action?: WorkflowAction): Workflow;
}
