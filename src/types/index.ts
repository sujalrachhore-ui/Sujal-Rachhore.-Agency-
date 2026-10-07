export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';

export type LoginProvider = 'GOOGLE' | 'EMAIL' | 'MOBILE';

export interface User {
  id: string;
  loginId: string; // Unique student / user credential ID (e.g. MI-2026-0101)
  name: string;
  email: string;
  mobile: string;
  role: Role;
  avatar?: string;
  createdAt: string;
  loginProvider?: LoginProvider;
  profileCompleted?: boolean;
  targetExam?: string;
  currentClass?: string;
  targetYear?: string;
  city?: string;
  schoolCollege?: string;
  previousPercentage?: number;
  parentName?: string;
  parentMobile?: string;
  preferredTiming?: string;
  lastLoginAt?: string;
}

export interface UserLoginLog {
  id: string;
  userId: string;
  loginId: string;
  userName: string;
  email: string;
  mobile: string;
  loginProvider: LoginProvider;
  loginTimestamp: string;
  device: string;
  location: string;
  status: 'ONLINE' | 'OFFLINE';
  profileCompleted: boolean;
  targetExam?: string;
  currentClass?: string;
  city?: string;
  schoolCollege?: string;
  parentName?: string;
  parentMobile?: string;
  previousPercentage?: number;
  preferredTiming?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  admissionId: string;
  name: string;
  email: string;
  mobile: string;
  courseId: string;
  batchId: string;
  dateOfJoining: string;
  parentName: string;
  parentMobile: string;
  address: string;
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
}

export interface TeacherProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  mobile: string;
  qualification: string;
  experienceYears: number;
  specialization: string;
  subjects: string[];
  batchIds: string[];
  bio: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE';
}

export interface Course {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  duration: string;
  subjects: string[];
  eligibility: string;
  totalFees: number;
  features: string[];
  badge?: string;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface Batch {
  id: string;
  courseId: string;
  name: string;
  code: string;
  timing: string;
  classroom: string;
  teacherIds: string[];
  maxCapacity: number;
  currentStrength: number;
  startDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'UPCOMING';
}

export interface TimetableEntry {
  id: string;
  batchId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  subject: string;
  teacherId: string;
  classroom: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  batchId: string;
  date: string; // YYYY-MM-DD
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  remark?: string;
  markedBy: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  courseId: string;
  batchId?: string; // Optional: all batches if not set
  subject: string;
  type: 'PDF' | 'VIDEO' | 'PYQ' | 'NOTES';
  fileUrl: string;
  fileSize?: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: string;
  downloadCount: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  marks: number;
  negativeMarks: number;
  subject: string;
}

export interface OnlineTest {
  id: string;
  title: string;
  courseId: string;
  batchId?: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  negativeMarking: boolean;
  questions: Question[];
  status: 'DRAFT' | 'PUBLISHED' | 'EXPIRED';
  createdBy: string;
  createdByName: string;
  createdAt: string;
  dueDate: string;
}

export interface TestAnswer {
  questionId: string;
  selectedOptionIndex: number | null; // null if unattempted
  isMarkedForReview?: boolean;
}

export interface TestAttempt {
  id: string;
  testId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  timeTakenSeconds: number;
  answers: TestAnswer[];
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  score: number;
  percentage: number;
  rank?: number;
  passed: boolean;
}

export interface ResultRecord {
  id: string;
  studentId: string;
  studentName: string;
  examName: string; // e.g. "JEE Advanced Mock 4", "NEET All-India Test 2"
  courseName: string;
  examDate: string;
  score: number;
  totalMarks: number;
  percentage: number;
  rank: number;
  totalCandidates: number;
  year: number;
  remarks?: string;
}

export interface FeeStructure {
  id: string;
  studentId: string;
  courseId: string;
  totalAmount: number;
  paidAmount: number;
  discount: number;
  dueAmount: number;
  dueDate: string;
  status: 'PAID' | 'PARTIAL' | 'OVERDUE' | 'PENDING';
}

export interface FeePayment {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'UPI' | 'NET_BANKING' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH' | 'CHEQUE';
  transactionRef: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  notes?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'ANNOUNCEMENT' | 'EXAM' | 'HOLIDAY' | 'SCHEDULE' | 'ACHIEVEMENT';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  targetRole: 'ALL' | 'STUDENT' | 'TEACHER';
  batchId?: string;
  date: string;
  publishedBy: string;
  publishedByName: string;
  attachmentName?: string;
}

export interface Enquiry {
  id: string;
  studentName: string;
  email: string;
  mobile: string;
  courseInterested: string;
  currentClass: string;
  message: string;
  date: string;
  status: 'NEW' | 'CONTACTED' | 'FOLLOW_UP' | 'CONVERTED' | 'CLOSED';
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classrooms' | 'Events' | 'Seminars' | 'Achievements' | 'Campus';
  imageUrl: string;
  caption: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Student' | 'Parent' | 'Alumnus';
  course: string;
  year: string;
  achievement: string; // e.g. "AIR 142 - JEE Advanced", "NEET 685/720"
  content: string;
  rating: number;
  avatar: string;
  published: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  read: boolean;
  createdAt: string;
  link?: string;
}
