## What is it?
**redux-dynamic-modules** is a library that aims to make Redux Reducers and middleware easy to modular-ize and add/remove dynamically. 

## Motivation
In large Javascript applications, it is often desired to perform some kind of code-splitting, so that the initial script size is small. However, in Redux, you are required to define the your reducers and middleware up-front; there is no good way to dynamically add/remove these constructs at runtime.

**redux-dynamic-modules** is designed to make dynamically loading these constructs easier. You can define a **module**, which contains reducers and middleware, and add it to the Redux store at runtime. We also provide a React component `DynamicModuleLoader`, which can load/unload modules on mount/unmount.

Modules provide the following benefits:
* Modules can be easily re-used across the application, or between multiple similar applications.
* Components declare the modules needed by them and redux-dynamic-modules ensures that the module is loaded for the component. 
* Modules can be added/removed from the store dynamically, ex. when a component mounts or when a user performs an action

## Features
* Group together reducers, middleware, and state into a single, re-usable module.
* Add and remove modules from a Redux store at any time.
* Use the included `<DynamicModuleLoader />` component to automatically add a module when a component is rendered
* Extensions provide integration with popular libraries, including `redux-saga` and `redux-observable`

## Example Scenarios
* You don't want to load the code for all your reducers up front. Define a module for some reducers and use `DynamicModuleLoader` and a library like [react-loadable](https://github.com/jamiebuilds/react-loadable) to download and add your module at runtime.
* You have some common reducers/middleware that need to be re-used in different areas of your application. Define a module and easily include it in those areas.
* You have a mono-repo that contains multiple applications which share similar state. Create a package containing some modules and re-use them across your applications

## Examples
See the [Widgets](https://github.com/Microsoft/redux-dynamic-modules/tree/master/packages/widgets-example) for a quick of example of the library in practice.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
