import express, { Request, Response } from 'express';
import './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '0.0.0.0';

app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.get('/api', (_req: Request, res: Response) => {
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

app.get('/api/users/', async (_req: Request, res: Response) => {
  const users = await User.find().lean();
  res.json({ message: 'Users endpoint', users });
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const teams = await Team.find().lean();
  res.json({ message: 'Teams endpoint', teams });
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('userId').populate('teamId').lean();
  res.json({ message: 'Activities endpoint', activities });
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find().populate('userId').populate('teamId').lean();
  res.json({ message: 'Leaderboard endpoint', leaderboard });
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean();
  res.json({ message: 'Workouts endpoint', workouts });
});

app.listen(port, host, () => {
  console.log(`Octofit Tracker API listening on ${baseUrl}`);
  console.log(`Bound to host ${host}`);
});
