export type TargetExam = "gaokao" | "toefl" | "ielts" | "cet4" | "cet6" | "gre" | "gmat";
export type UserRole = "user" | "admin" | "teacher";
export type UserStatus = "active" | "suspended" | "banned" | "deleted";
export type MembershipType = "free" | "monthly" | "yearly" | "lifetime";

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  phone?: string;
  phoneVerified: boolean;
  name: string;
  avatar: string;
  bio?: string;
  targetExam: TargetExam;
  targetScore?: number;
  examDate?: Date;
  dailyGoal: number;
  role: UserRole;
  status: UserStatus;
  membership: MembershipType;
  membershipExpiresAt?: Date;
  streakDays: number;
  maxStreakDays: number;
  totalQuestions: number;
  totalCorrect: number;
  totalTimeSpent: number;
  followers: number;
  following: number;
  twoFactorEnabled: boolean;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type QuestionType =
  "vocabulary" | "phrase" | "sentence" | "cloze" | "reading" | "translation" | "writing";
export type QuestionStatus = "active" | "disabled" | "reviewing";

export interface Option {
  id: string; // A/B/C/D
  text: string;
}

export interface RelatedWord {
  word: string;
  meaning: string;
  partOfSpeech: string;
  relation: "synonym" | "antonym" | "derivative" | "root";
}

export interface KeyWord {
  word: string;
  position: { start: number; end: number };
  frequency: number;
  examTags: string[];
}

export interface Question {
  id: string;
  bankId: string;
  type: QuestionType;
  category: string;
  subCategory: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  year?: number;
  source?: string;
  content: {
    passage?: string;
    question: string;
    options: Option[];
    correctAnswer: string;
  };
  explanation: {
    text: string;
    keyPoints: string[];
    relatedWords: RelatedWord[];
    videoUrl?: string;
  };
  keyWords: KeyWord[];
  tags: string[];
  stats: {
    totalAttempts: number;
    correctCount: number;
    correctRate: number;
    avgTimeSpent: number;
  };
  status: QuestionStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  questionId: string;
  createdAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  questionId: string;
  isCorrect: boolean;
  timeSpent: number;
  createdAt: Date;
}
