"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '0.0.0.0';
app.use(express_1.default.json());
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.get('/api', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API is running',
        baseUrl,
        endpoints: [
            '/api/users/',
            '/api/teams/',
            '/api/activities/',
            '/api/leaderboard/',
            '/api/workouts/'
        ]
    });
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find().lean();
    res.json({ message: 'Users endpoint', users });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find().lean();
    res.json({ message: 'Teams endpoint', teams });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find().populate('userId').populate('teamId').lean();
    res.json({ message: 'Activities endpoint', activities });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().populate('userId').populate('teamId').lean();
    res.json({ message: 'Leaderboard endpoint', leaderboard });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find().lean();
    res.json({ message: 'Workouts endpoint', workouts });
});
app.listen(port, host, () => {
    console.log(`Octofit Tracker API listening on ${baseUrl}`);
    console.log(`Bound to host ${host}`);
});
