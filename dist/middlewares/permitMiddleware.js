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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permit_1 = __importDefault(require("../utils/permit"));
const checkPermission = (action, resource) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.user; // Ensure your auth middleware sets `req.user`
            if (!user) {
                return res.status(401).json({ error: 'Unauthorized. User not found' });
            }
            const isAllowed = yield permit_1.default.check(user.id, action, resource);
            if (!isAllowed) {
                return res.status(403).json({ error: `Permission denied for ${action} on ${resource}` });
            }
            next();
        }
        catch (error) {
            console.error('Permit.io authorization error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
exports.default = checkPermission;
