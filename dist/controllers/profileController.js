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
exports.getProfileByEmail = exports.createProfile = void 0;
const appwrite_1 = require("../config/appwrite");
const profileId = process.env.APPWRITE_PROFILE_COLLECTION_ID; // Ensure this is in .env
const databaseId = process.env.APPWRITE_DATABASE_ID; // Ensure this is in .env
// Create Profile Controller
const createProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, role, userId, schoolId } = req.body;
    console.log(req.body);
    if (!name || !email || !role || !userId || !schoolId) {
        res.status(400).json({ error: 'Name, email, role and schoolId are required.' });
        return;
    }
    // Validate role
    const allowedRoles = ['admin', 'teacher', 'parent'];
    if (!allowedRoles.includes(role)) {
        res.status(400).json({ error: 'Invalid role. Allowed roles: admin, teacher, parent.' });
        return;
    }
    try {
        const profile = yield appwrite_1.database.createDocument(databaseId, profileId, appwrite_1.ID.unique(), { name, email, role, userId, schoolId });
        res.status(201).json({ success: true, profile });
        return;
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
        return;
    }
});
exports.createProfile = createProfile;
// Fetch Profile by Email
const getProfileByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
        res.status(400).json({ error: 'Email is required.' });
        return;
    }
    else {
        try {
            const profile = yield appwrite_1.database.listDocuments(databaseId, profileId, [appwrite_1.Query.equal("email", email)]);
            if (profile.documents.length === 0) {
                res.status(404).json({ error: 'Profile not found' });
                return;
            }
            res.status(200).json({ success: true, profile: profile.documents[0] });
        }
        catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
});
exports.getProfileByEmail = getProfileByEmail;
