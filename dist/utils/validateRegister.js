"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
    if (options.username.length <= 3) {
        return [
            {
                field: "username",
                message: "username must be at least 3 characters"
            }
        ];
    }
    if (options.username.includes("@")) {
        return [
            {
                field: "username",
                message: "username cannot include an @ symbol"
            }
        ];
    }
    if (options.password.length <= 3) {
        return [
            {
                field: "password",
                message: "password must be at least 3 characters"
            }
        ];
    }
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "please enter a valid e-mail"
            }
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map