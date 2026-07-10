import { syncClaims, cleanupUserData } from "./triggers/authTriggers";
import { registerStudent, changeUserRole } from "./callables/userMgmt";

export {
  syncClaims,
  cleanupUserData,
  registerStudent,
  changeUserRole
};
