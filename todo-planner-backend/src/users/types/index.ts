import { Types } from 'mongoose';

export type IUser = {
  _id: string | Types.ObjectId;
  email: string;
  name: string;
  password: string;
  workInterval: number;
  breakInterval: number;
  intervalsCount: number;
  tasks: [];
  timeBlocks: [];
  pomodoroSessions: [];
};
