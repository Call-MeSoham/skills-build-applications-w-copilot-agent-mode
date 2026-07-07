"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
    teamId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team' }
}, { timestamps: true });
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    location: { type: String, required: true }
}, { timestamps: true });
const activitySchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    notes: { type: String, default: '' }
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true },
    streak: { type: Number, default: 0 }
}, { timestamps: true });
const workoutSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, required: true },
    instructions: { type: [String], required: true }
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
