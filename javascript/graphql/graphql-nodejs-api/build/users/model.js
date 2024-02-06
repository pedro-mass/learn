"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, firstName, lastName, email, password, permissionLevel) {
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.permissionLevel = 1;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.permissionLevel = permissionLevel;
    }
}
exports.User = User;
