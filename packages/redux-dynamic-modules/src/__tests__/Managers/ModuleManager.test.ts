import { getModuleManager } from "../../Managers/ModuleManager";
import { getMiddlewareManager } from "../../Managers/MiddlewareManager";

it("module manager tests", () => {
    const middlewareManager = getMiddlewareManager();
    const moduleManager = getModuleManager(middlewareManager, []);
    let actionsDispatched = [];

    moduleManager.setDispatch((action) => {
        // Push the action type to array so we can track it
        actionsDispatched.push(action.type);
        return action.payload || null;
    });

    const reducer = (state) => state || null;

    const module1 = {
        id: "module1",
        initialActions: [{ type: "initial1" }, { type: "initial11" }],
        reducerMap: { "duplicateReducer": reducer, "key11": reducer },
        finalActions: [{ type: "final1" }, { type: "final11" }],
        sagas: [saga1]
    };

    const module2 = {
        id: "module2",
        initialActions: [{ type: "initial2" }, { type: "initial21" }],
        reducerMap: { "duplicateReducer": reducer, "key2": reducer }, // Keep one reducer duplicated to ensure ref counting of reducer
        finalActions: [{ type: "final2" }, { type: "final21" }],
        sagas: [saga1] //Keep the same saga to validate saga ref counting
    };

    // Add first module
    moduleManager.add([module1]);

    // Test initial actions are dispatched for module1
    expect(actionsDispatched).toEqual(["@@Internal/ModuleManager/ModuleAdded", "initial1", "initial11"]);

    // Add second module
    moduleManager.add([module2]);

    // Test initial actions are dispatched for module2
    expect(actionsDispatched).toEqual(["@@Internal/ModuleManager/ModuleAdded", "initial1", "initial11", "@@Internal/ModuleManager/ModuleAdded", "initial2", "initial21"]);

    // Remove Module1
    moduleManager.remove([module1]);

    // Test final actions are dispatched for module1
    expect(actionsDispatched).toEqual(["@@Internal/ModuleManager/ModuleAdded", "initial1", "initial11", "@@Internal/ModuleManager/ModuleAdded", "initial2", "initial21", "final1", "final11", "@@Internal/ModuleManager/ModuleRemoved"]);

    // Remove Module1 again
    moduleManager.remove([module1]);

    // Test no additional actions are dispatched
    expect(actionsDispatched).toEqual(["@@Internal/ModuleManager/ModuleAdded", "initial1", "initial11", "@@Internal/ModuleManager/ModuleAdded", "initial2", "initial21", "final1", "final11", "@@Internal/ModuleManager/ModuleRemoved"]);

    // Remove Module2
    moduleManager.remove([module2]);

    // Test no additional actions are dispatched
    expect(actionsDispatched).toEqual(["@@Internal/ModuleManager/ModuleAdded", "initial1", "initial11", "@@Internal/ModuleManager/ModuleAdded", "initial2", "initial21", "final1", "final11", "@@Internal/ModuleManager/ModuleRemoved", "final2", "final21", "@@Internal/ModuleManager/ModuleRemoved"]);

});

export function* saga1() {

}
