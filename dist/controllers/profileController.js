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
exports.getProfileByEmail = exports.createProfile = void 0;
const appwrite_1 = require("../config/appwrite");
const permit_1 = __importDefault(require("../utils/permit")); // Ensure this is correctly configured
const profileId = process.env.APPWRITE_PROFILE_COLLECTION_ID; // Ensure this is in .env
const databaseId = process.env.APPWRITE_DATABASE_ID; // Ensure this is in .env
// Function to sync user with Permit.io
const syncUserToPermit = (userId, role, email, lastName, firstName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permitted = yield permit_1.default.check(email, "create", "students");
        const tenants = yield permit_1.default.api.tenants.list();
        if (permitted) {
            console.log(`${email} is PERMITTED to create a document`);
        }
        else {
            console.log("John is NOT PERMITTED to create a document");
        }
        console.log("Permitted", permitted);
        console.log(`User ${userId} synced to Permit.io with role ${role}`);
        console.log("Tenants", tenants);
        return permitted;
    }
    catch (error) {
        console.error(`Error syncing user ${userId} to Permit.io:`, error);
    }
});
// Create Profile Controller
const createProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, role, userId } = req.body;
    console.log(req.body);
    if (!email || !role || !userId) {
        res.status(400).json({ error: 'FirstName, lastName, email, role, and userId are required.' });
        return;
    }
    // Validate role
    const allowedRoles = ['admin', 'teacher'];
    if (!allowedRoles.includes(role)) {
        res.status(400).json({ error: 'Invalid role. Allowed roles: admin, teacher' });
        return;
    }
    try {
        const profile = yield appwrite_1.database.createDocument(databaseId, profileId, appwrite_1.ID.unique(), { firstName, lastName, email, role, userId });
        // Sync user to Permit.io
        const check = yield syncUserToPermit(userId, role, email, firstName, lastName);
        console.log('Profile created and synced:', profile);
        res.status(201).json({ success: true, profile, check });
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
});
exports.getProfileByEmail = getProfileByEmail;
