"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserRole = exports.registerStudent = exports.cleanupUserData = exports.syncClaims = void 0;
const authTriggers_1 = require("./triggers/authTriggers");
Object.defineProperty(exports, "syncClaims", { enumerable: true, get: function () { return authTriggers_1.syncClaims; } });
Object.defineProperty(exports, "cleanupUserData", { enumerable: true, get: function () { return authTriggers_1.cleanupUserData; } });
const userMgmt_1 = require("./callables/userMgmt");
Object.defineProperty(exports, "registerStudent", { enumerable: true, get: function () { return userMgmt_1.registerStudent; } });
Object.defineProperty(exports, "changeUserRole", { enumerable: true, get: function () { return userMgmt_1.changeUserRole; } });
//# sourceMappingURL=index.js.map