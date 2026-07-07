const {syncClaims, cleanupUserData} = require("./src/triggers/authTriggers");
const {registerStudent, changeUserRole} = require("./src/callables/userMgmt");

exports.syncClaims = syncClaims;
exports.cleanupUserData = cleanupUserData;
exports.registerStudent = registerStudent;
exports.changeUserRole = changeUserRole;
