"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
exports.inject = inversify_1.inject;
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
exports.autoProvide = inversify_binding_decorators_1.autoProvide;
exports.provide = inversify_binding_decorators_1.provide;
require("reflect-metadata");
// set up container
const container = new inversify_1.Container();
exports.container = container;
const provideNamed = (identifier, name) => {
    return inversify_binding_decorators_1.fluentProvide(identifier)
        .inSingletonScope()
        .whenTargetNamed(name)
        .done(true);
};
exports.provideNamed = provideNamed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9jLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nZ3R0b280NC9EZXNrdG9wL2Jhc2VBUEkvc3JjLyIsInNvdXJjZXMiOlsiaW9jL2lvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUE4QztBQWdCVSxpQkFoQnBDLGtCQUFNLENBZ0JvQztBQWY5RCwrRUFBd0c7QUFlcEYsc0JBZlgsMENBQVcsQ0FlVztBQUFFLGtCQWZ5QixzQ0FBTyxDQWV6QjtBQWJ4Qyw0QkFBMEI7QUFLMUIsbUJBQW1CO0FBQ25CLE1BQU0sU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDO0FBT3pCLDhCQUFTO0FBTmxCLE1BQU0sWUFBWSxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3RDLE9BQU8sNENBQWEsQ0FBQyxVQUFVLENBQUM7U0FDM0IsZ0JBQWdCLEVBQUU7U0FDbEIsZUFBZSxDQUFDLElBQUksQ0FBQztTQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBQ3dDLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGFpbmVyLCBpbmplY3QgfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHsgYXV0b1Byb3ZpZGUsIGJ1aWxkUHJvdmlkZXJNb2R1bGUsIGZsdWVudFByb3ZpZGUsIHByb3ZpZGUgfSBmcm9tICdpbnZlcnNpZnktYmluZGluZy1kZWNvcmF0b3JzJztcbmltcG9ydCB7IGludGVyZmFjZXMsIEludmVyc2lmeUtvYVNlcnZlciwgVFlQRSB9IGZyb20gJ2ludmVyc2lmeS1rb2EtdXRpbHMnO1xuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcblxuaW1wb3J0ICogYXMgbG9nNGpzIGZyb20gJ2tvYS1sb2c0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuLy8gc2V0IHVwIGNvbnRhaW5lclxuY29uc3QgY29udGFpbmVyID0gbmV3IENvbnRhaW5lcigpO1xuY29uc3QgcHJvdmlkZU5hbWVkID0gKGlkZW50aWZpZXIsIG5hbWUpID0+IHtcbiAgICByZXR1cm4gZmx1ZW50UHJvdmlkZShpZGVudGlmaWVyKVxuICAgICAgICAuaW5TaW5nbGV0b25TY29wZSgpXG4gICAgICAgIC53aGVuVGFyZ2V0TmFtZWQobmFtZSlcbiAgICAgICAgLmRvbmUodHJ1ZSk7XG59O1xuZXhwb3J0IHsgY29udGFpbmVyLCBhdXRvUHJvdmlkZSwgcHJvdmlkZSwgcHJvdmlkZU5hbWVkLCBpbmplY3QgfTtcbiJdfQ==