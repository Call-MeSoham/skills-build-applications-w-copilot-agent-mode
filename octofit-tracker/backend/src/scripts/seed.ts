import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const db = mongoose.connection.db;
    if (db) {
      await db.dropDatabase().catch(() => undefined);
    }

    const teams = await Team.create([
      { name: 'Alpha Squad', sport: 'Cycling', location: 'Seattle' },
      { name: 'Velocity Club', sport: 'Running', location: 'Austin' }
    ]);

    const users = await User.create([
      {
        name: 'Ava Patel',
        email: 'ava.patel@example.com',
        age: 29,
        fitnessGoal: 'Improve endurance',
        teamId: teams[0]._id
      },
      {
        name: 'Liam Chen',
        email: 'liam.chen@example.com',
        age: 34,
        fitnessGoal: 'Build strength',
        teamId: teams[1]._id
      },
      {
        name: 'Mina Flores',
        email: 'mina.flores@example.com',
        age: 27,
        fitnessGoal: 'Increase mobility',
        teamId: teams[0]._id
      }
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        type: 'Cycling',
        durationMinutes: 45,
        distanceKm: 18,
        notes: 'Morning interval ride'
      },
      {
        userId: users[1]._id,
        teamId: teams[1]._id,
        type: 'Running',
        durationMinutes: 35,
        distanceKm: 7,
        notes: 'Tempo run'
      },
      {
        userId: users[2]._id,
        teamId: teams[0]._id,
        type: 'Yoga',
        durationMinutes: 30,
        notes: 'Recovery session'
      }
    ]);

    await LeaderboardEntry.create([
      { userId: users[0]._id, teamId: teams[0]._id, points: 240, streak: 5 },
      { userId: users[1]._id, teamId: teams[1]._id, points: 210, streak: 3 },
      { userId: users[2]._id, teamId: teams[0]._id, points: 195, streak: 2 }
    ]);

    await Workout.create([
      {
        name: 'HIIT Intervals',
        difficulty: 'Intermediate',
        durationMinutes: 25,
        focusArea: 'Cardio',
        instructions: ['Warm up for 5 minutes', 'Perform 8 rounds of 30s fast / 30s easy', 'Cool down']
      },
      {
        name: 'Core Strength Flow',
        difficulty: 'Beginner',
        durationMinutes: 20,
        focusArea: 'Core',
        instructions: ['Do 3 rounds', 'Hold plank for 30 seconds', 'Complete bird-dogs and dead bugs']
      },
      {
        name: 'Mobility Reset',
        difficulty: 'Beginner',
        durationMinutes: 15,
        focusArea: 'Mobility',
        instructions: ['Perform 10 hip circles each side', 'Do 8 cat-cow reps', 'Finish with deep breathing']
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
