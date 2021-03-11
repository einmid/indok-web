import { User } from "./users";

export interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime?: string;
  location?: string;
  description: string;
  organization?: { id: string; name: string; color?: string };
  category?: { id: string; name: string };
  image?: string;
  isAttendable: boolean;
  deadline?: string;
  publisher: User;
  isFull?: boolean;
  availableSlots?: number;
  shortDescription?: string;
  signupOpenDate?: string;
  signedUpUsers?: User[];
  usersOnWaitingList?: User[];
}

export interface Category {
  id: string;
  name: string;
}
