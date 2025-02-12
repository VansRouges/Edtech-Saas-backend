"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const appwrite_1 = require("appwrite");
const appwrite_2 = require("../config/appwrite"); // Import Appwrite client
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionToken = req.headers['authorization'];
        if (!sessionToken) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const account = new appwrite_1.Account(appwrite_2.client);
        yield account.get(); // Validate session
        next(); // Move to the next middleware or route
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid or expired session' });
    }
});
exports.authMiddleware = authMiddleware;
