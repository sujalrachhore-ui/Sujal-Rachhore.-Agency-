import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  StudentProfile,
  TeacherProfile,
  Course,
  Batch,
  TimetableEntry,
  AttendanceRecord,
  StudyMaterial,
  OnlineTest,
  TestAttempt,
  ResultRecord,
  FeeStructure,
  FeePayment,
  Notice,
  Enquiry,
  GalleryItem,
  Testimonial,
  AppNotification,
  Role,
  UserLoginLog,
  LoginProvider,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_BATCHES,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_TIMETABLE,
  INITIAL_ATTENDANCE,
  INITIAL_STUDY_MATERIALS,
  INITIAL_TESTS,
  INITIAL_TEST_ATTEMPTS,
  INITIAL_RESULTS,
  INITIAL_FEES,
  INITIAL_PAYMENTS,
  INITIAL_NOTICES,
  INITIAL_ENQUIRIES,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
  INITIAL_NOTIFICATIONS,
  INITIAL_LOGIN_LOGS,
} from '../data/seedData';

export interface AcademicOnboardingData {
  name: string;
  mobile: string;
  targetExam: string;
  currentClass: string;
  targetYear: string;
  city: string;
  schoolCollege: string;
  previousPercentage: number;
  parentName: string;
  parentMobile: string;
  preferredTiming: string;
  email?: string;
  avatar?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface InstituteInfo {
  name: string;
  tagline: string;
  director: string;
  academicHead: string;
  facultyCount: string;
  studentCount: string;
  successRate: string;
  experience: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  officeHours: string;
  instagram: string;
  youtube: string;
}

interface AppContextType {
  // Auth & Session
  currentUser: User | null;
  currentRole: Role | null;
  currentStudentProfile: StudentProfile | null;
  currentTeacherProfile: TeacherProfile | null;
  login: (credential: string, roleHint?: Role) => boolean;
  loginWithGoogle: (email?: string, name?: string, avatar?: string) => boolean;
  loginWithMobile: (mobile: string, name?: string) => boolean;
  loginWithEmail: (email: string, password?: string, name?: string) => boolean;
  logout: () => void;
  switchDemoUser: (role: Role) => void;
  
  // Onboarding
  showOnboardingModal: boolean;
  setShowOnboardingModal: (show: boolean) => void;
  completeOnboarding: (data: AcademicOnboardingData) => void;
  
  // Navigation
  currentView: 'public' | 'dashboard';
  setCurrentView: (view: 'public' | 'dashboard') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Data State
  instituteInfo: InstituteInfo;
  updateInstituteInfo: (info: Partial<InstituteInfo>) => void;
  users: User[];
  loginLogs: UserLoginLog[];
  students: StudentProfile[];
  teachers: TeacherProfile[];
  courses: Course[];
  batches: Batch[];
  timetable: TimetableEntry[];
  attendance: AttendanceRecord[];
  studyMaterials: StudyMaterial[];
  tests: OnlineTest[];
  testAttempts: TestAttempt[];
  results: ResultRecord[];
  fees: FeeStructure[];
  payments: FeePayment[];
  notices: Notice[];
  enquiries: Enquiry[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  notifications: AppNotification[];

  // Mutators
  addStudent: (data: Omit<StudentProfile, 'id'>) => StudentProfile;
  updateStudent: (id: string, data: Partial<StudentProfile>) => void;
  deleteStudent: (id: string) => void;

  addTeacher: (data: Omit<TeacherProfile, 'id'>) => TeacherProfile;
  updateTeacher: (id: string, data: Partial<TeacherProfile>) => void;
  deleteTeacher: (id: string) => void;

  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  addBatch: (batch: Omit<Batch, 'id'>) => void;
  updateBatch: (id: string, batch: Partial<Batch>) => void;

  markAttendanceBatch: (records: Omit<AttendanceRecord, 'id'>[]) => void;

  uploadStudyMaterial: (material: Omit<StudyMaterial, 'id' | 'uploadedAt' | 'downloadCount'>) => void;
  deleteStudyMaterial: (id: string) => void;

  createTest: (test: Omit<OnlineTest, 'id' | 'createdAt'>) => void;
  updateTest: (id: string, test: Partial<OnlineTest>) => void;
  deleteTest: (id: string) => void;
  submitTestAttempt: (attempt: Omit<TestAttempt, 'id' | 'submittedAt'>) => TestAttempt;

  addResult: (result: Omit<ResultRecord, 'id'>) => void;

  recordFeePayment: (payment: Omit<FeePayment, 'id' | 'receiptNumber' | 'status'>) => FeePayment;
  updateFeeStructure: (studentId: string, updates: Partial<FeeStructure>) => void;

  createNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;

  createEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => Enquiry;
  updateEnquiryStatus: (id: string, status: Enquiry['status'], notes?: string) => void;

  addTimetableEntry: (entry: Omit<TimetableEntry, 'id'>) => void;
  deleteTimetableEntry: (id: string) => void;

  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'date'>) => void;
  deleteGalleryItem: (id: string) => void;

  addTestimonial: (item: Omit<Testimonial, 'id'>) => void;
  toggleTestimonialPublished: (id: string) => void;

  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // System UI
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  resetToDemoData: () => void;
}

const DEFAULT_INSTITUTE: InstituteInfo = {
  name: 'MENTORA INSTITUTE',
  tagline: 'Learn Better. Achieve More.',
  director: 'Dr. Arjun Mehta',
  academicHead: 'Priya Sharma',
  facultyCount: '25+ Expert Educators',
  studentCount: '5,000+ Students',
  successRate: '92%+ Results',
  experience: '10+ Years of Excellence',
  phone: '+91 98765 43210',
  whatsapp: '+919876543210',
  email: 'info@mentoraacademy.demo',
  address: 'Plot 42, West High Court Road, Dharampeth, Nagpur, Maharashtra, India - 440010',
  officeHours: 'Monday – Saturday: 08:00 AM – 07:00 PM',
  instagram: '@mentoraacademy',
  youtube: 'Mentora Institute',
};

const STORAGE_KEY = 'mentora_cims_data_v2';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted or initial state
  const [instituteInfo, setInstituteInfo] = useState<InstituteInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_info');
      return saved ? JSON.parse(saved) : DEFAULT_INSTITUTE;
    } catch {
      return DEFAULT_INSTITUTE;
    }
  });

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [batches, setBatches] = useState<Batch[]>(INITIAL_BATCHES);
  const [students, setStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<TeacherProfile[]>(INITIAL_TEACHERS);
  const [timetable, setTimetable] = useState<TimetableEntry[]>(INITIAL_TIMETABLE);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [tests, setTests] = useState<OnlineTest[]>(INITIAL_TESTS);
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>(INITIAL_TEST_ATTEMPTS);
  const [results, setResults] = useState<ResultRecord[]>(INITIAL_RESULTS);
  const [fees, setFees] = useState<FeeStructure[]>(INITIAL_FEES);
  const [payments, setPayments] = useState<FeePayment[]>(INITIAL_PAYMENTS);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [loginLogs, setLoginLogs] = useState<UserLoginLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_logs');
      return saved ? JSON.parse(saved) : INITIAL_LOGIN_LOGS;
    } catch {
      return INITIAL_LOGIN_LOGS;
    }
  });

  // Authentication State
  // Default to public view; when logged in, can be student, teacher, or admin
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'public' | 'dashboard'>('public');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);

  // Initialize from localStorage if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.users) setUsers(parsed.users);
        if (parsed.students) setStudents(parsed.students);
        if (parsed.teachers) setTeachers(parsed.teachers);
        if (parsed.courses) setCourses(parsed.courses);
        if (parsed.batches) setBatches(parsed.batches);
        if (parsed.attendance) setAttendance(parsed.attendance);
        if (parsed.studyMaterials) setStudyMaterials(parsed.studyMaterials);
        if (parsed.tests) setTests(parsed.tests);
        if (parsed.testAttempts) setTestAttempts(parsed.testAttempts);
        if (parsed.results) setResults(parsed.results);
        if (parsed.fees) setFees(parsed.fees);
        if (parsed.payments) setPayments(parsed.payments);
        if (parsed.notices) setNotices(parsed.notices);
        if (parsed.enquiries) setEnquiries(parsed.enquiries);
        if (parsed.gallery) setGallery(parsed.gallery);
        if (parsed.testimonials) setTestimonials(parsed.testimonials);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.timetable) setTimetable(parsed.timetable);
      }
    } catch (e) {
      console.error('Failed to load local storage data', e);
    }
  }, []);

  // Save changes to localStorage
  const persistData = () => {
    try {
      const dataToSave = {
        users,
        students,
        teachers,
        courses,
        batches,
        attendance,
        studyMaterials,
        tests,
        testAttempts,
        results,
        fees,
        payments,
        notices,
        enquiries,
        gallery,
        testimonials,
        notifications,
        timetable,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      localStorage.setItem(STORAGE_KEY + '_logs', JSON.stringify(loginLogs));
    } catch (e) {
      console.error('Failed to persist to localStorage', e);
    }
  };

  useEffect(() => {
    persistData();
  }, [
    users,
    students,
    teachers,
    courses,
    batches,
    attendance,
    studyMaterials,
    tests,
    testAttempts,
    results,
    fees,
    payments,
    notices,
    enquiries,
    gallery,
    testimonials,
    notifications,
    timetable,
    loginLogs,
  ]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateInstituteInfo = (info: Partial<InstituteInfo>) => {
    setInstituteInfo((prev) => {
      const updated = { ...prev, ...info };
      localStorage.setItem(STORAGE_KEY + '_info', JSON.stringify(updated));
      return updated;
    });
    addToast('Institute settings saved successfully.', 'success');
  };

  // Auth helpers
  const currentRole = currentUser ? currentUser.role : null;
  const currentStudentProfile =
    currentRole === 'STUDENT'
      ? students.find((s) => s.userId === currentUser?.id || s.email === currentUser?.email) || students[0]
      : null;
  const currentTeacherProfile =
    currentRole === 'TEACHER'
      ? teachers.find((t) => t.userId === currentUser?.id || t.email === currentUser?.email) || teachers[0]
      : null;

  const recordLoginLog = (user: User, provider: LoginProvider) => {
    const assignedLoginId = user.loginId || `MI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLog: UserLoginLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      userId: user.id,
      loginId: assignedLoginId,
      userName: user.name,
      email: user.email,
      mobile: user.mobile,
      loginProvider: provider,
      loginTimestamp: new Date().toISOString(),
      device: typeof navigator !== 'undefined' && navigator.userAgent.includes('Mobile') ? 'Mobile Smartphone' : 'Desktop Chrome Browser',
      location: user.city || 'Nagpur, Maharashtra, IN',
      status: 'ONLINE',
      profileCompleted: !!user.profileCompleted,
      targetExam: user.targetExam,
      currentClass: user.currentClass,
      city: user.city,
      schoolCollege: user.schoolCollege,
      parentName: user.parentName,
      parentMobile: user.parentMobile,
      previousPercentage: user.previousPercentage,
      preferredTiming: user.preferredTiming,
    };

    setLoginLogs((prev) => [newLog, ...prev]);

    // Send owner notification
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: 'user-admin-1',
      title: `New Login Session: ${user.name}`,
      message: `${user.name} logged in with Student ID ${assignedLoginId} via ${provider}.`,
      type: 'INFO',
      read: false,
      createdAt: new Date().toISOString(),
      link: 'login-logs',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const loginWithGoogle = (emailParam?: string, nameParam?: string, avatarParam?: string): boolean => {
    const email = (emailParam || 'student.google@mentora.com').toLowerCase().trim();
    let user = users.find((u) => u.email.toLowerCase() === email);

    if (!user) {
      // Create new user account with a unique login ID
      const newLoginId = `MI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      user = {
        id: 'user-g-' + Date.now(),
        loginId: newLoginId,
        name: nameParam || 'Google Student User',
        email: email,
        mobile: '98' + Math.floor(10000000 + Math.random() * 90000000),
        role: 'STUDENT',
        avatar: avatarParam || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        createdAt: new Date().toISOString(),
        loginProvider: 'GOOGLE',
        profileCompleted: false,
      };
      setUsers((prev) => [user!, ...prev]);
    }

    setCurrentUser(user);
    recordLoginLog(user, 'GOOGLE');
    setCurrentView('dashboard');
    setActiveTab('dashboard');

    if (!user.profileCompleted && user.role === 'STUDENT') {
      setShowOnboardingModal(true);
      addToast(`Signed in with Google! Your Login ID is ${user.loginId}. Please complete your academic details.`, 'info');
    } else {
      addToast(`Welcome back, ${user.name}! (Login ID: ${user.loginId})`, 'success');
    }

    return true;
  };

  const loginWithMobile = (mobileParam: string, nameParam?: string): boolean => {
    const cleanMobile = mobileParam.trim();
    let user = users.find((u) => u.mobile === cleanMobile);

    if (!user) {
      const newLoginId = `MI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      user = {
        id: 'user-m-' + Date.now(),
        loginId: newLoginId,
        name: nameParam || `Student (${cleanMobile.slice(-4)})`,
        email: `student_${cleanMobile}@mentora.com`,
        mobile: cleanMobile,
        role: 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        createdAt: new Date().toISOString(),
        loginProvider: 'MOBILE',
        profileCompleted: false,
      };
      setUsers((prev) => [user!, ...prev]);
    }

    setCurrentUser(user);
    recordLoginLog(user, 'MOBILE');
    setCurrentView('dashboard');
    setActiveTab('dashboard');

    if (!user.profileCompleted && user.role === 'STUDENT') {
      setShowOnboardingModal(true);
      addToast(`OTP verified! Your Login ID is ${user.loginId}. Please provide your academic target.`, 'info');
    } else {
      addToast(`Welcome back, ${user.name}! (Login ID: ${user.loginId})`, 'success');
    }

    return true;
  };

  const loginWithEmail = (emailParam: string, passwordParam?: string, nameParam?: string): boolean => {
    const cleanEmail = emailParam.toLowerCase().trim();
    let user = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      const newLoginId = `MI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      user = {
        id: 'user-e-' + Date.now(),
        loginId: newLoginId,
        name: nameParam || cleanEmail.split('@')[0],
        email: cleanEmail,
        mobile: '98' + Math.floor(10000000 + Math.random() * 90000000),
        role: 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
        createdAt: new Date().toISOString(),
        loginProvider: 'EMAIL',
        profileCompleted: false,
      };
      setUsers((prev) => [user!, ...prev]);
    }

    setCurrentUser(user);
    recordLoginLog(user, 'EMAIL');
    setCurrentView('dashboard');
    setActiveTab('dashboard');

    if (!user.profileCompleted && user.role === 'STUDENT') {
      setShowOnboardingModal(true);
      addToast(`Signed in successfully! Your Login ID is ${user.loginId}.`, 'info');
    } else {
      addToast(`Welcome back, ${user.name}! (Login ID: ${user.loginId})`, 'success');
    }

    return true;
  };

  const completeOnboarding = (data: AcademicOnboardingData) => {
    if (!currentUser) return;

    const assignedLoginId = currentUser.loginId || `MI-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const updatedUser: User = {
      ...currentUser,
      loginId: assignedLoginId,
      name: data.name || currentUser.name,
      mobile: data.mobile || currentUser.mobile,
      email: data.email || currentUser.email,
      targetExam: data.targetExam,
      currentClass: data.currentClass,
      targetYear: data.targetYear,
      city: data.city,
      schoolCollege: data.schoolCollege,
      previousPercentage: data.previousPercentage,
      parentName: data.parentName,
      parentMobile: data.parentMobile,
      preferredTiming: data.preferredTiming,
      profileCompleted: true,
      avatar: data.avatar || currentUser.avatar,
    };

    setCurrentUser(updatedUser);

    // Update in users collection
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );

    // Determine target course and batch
    let targetCourseId = 'course-jee';
    let targetBatchId = 'batch-jee-alpha';

    if (data.targetExam.includes('NEET')) {
      targetCourseId = 'course-neet';
      targetBatchId = 'batch-neet-elite';
    } else if (data.targetExam.includes('MHT-CET')) {
      targetCourseId = 'course-mhtcet';
      targetBatchId = 'batch-mhtcet-target';
    } else if (data.targetExam.includes('Foundation')) {
      targetCourseId = 'course-foundation';
      targetBatchId = 'batch-foundation-spark';
    } else if (data.targetExam.includes('Science')) {
      targetCourseId = 'course-science-12';
      targetBatchId = 'batch-jee-alpha';
    }

    // Upsert student profile
    setStudents((prev) => {
      const existing = prev.find((s) => s.userId === updatedUser.id || s.email === updatedUser.email);
      if (existing) {
        return prev.map((s) =>
          s.id === existing.id
            ? {
                ...s,
                admissionId: assignedLoginId,
                name: updatedUser.name,
                mobile: updatedUser.mobile,
                courseId: targetCourseId,
                batchId: targetBatchId,
                parentName: data.parentName,
                parentMobile: data.parentMobile,
                address: `${data.city}, Maharashtra`,
              }
            : s
        );
      } else {
        const newStudentProfile: StudentProfile = {
          id: 'student-' + Date.now(),
          userId: updatedUser.id,
          admissionId: assignedLoginId,
          name: updatedUser.name,
          email: updatedUser.email,
          mobile: updatedUser.mobile,
          courseId: targetCourseId,
          batchId: targetBatchId,
          dateOfJoining: new Date().toISOString().split('T')[0],
          parentName: data.parentName,
          parentMobile: data.parentMobile,
          address: `${data.city}, Maharashtra`,
          status: 'ACTIVE',
        };
        return [newStudentProfile, ...prev];
      }
    });

    // Update login logs with submitted academic data so the owner sees all their submitted data
    setLoginLogs((prev) =>
      prev.map((log) => {
        if (log.userId === updatedUser.id || log.loginId === assignedLoginId) {
          return {
            ...log,
            userName: updatedUser.name,
            mobile: updatedUser.mobile,
            profileCompleted: true,
            targetExam: data.targetExam,
            currentClass: data.currentClass,
            city: data.city,
            schoolCollege: data.schoolCollege,
            parentName: data.parentName,
            parentMobile: data.parentMobile,
            previousPercentage: data.previousPercentage,
            preferredTiming: data.preferredTiming,
          };
        }
        return log;
      })
    );

    // Notify owner / admin
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: 'user-admin-1',
      title: `Student Data Submitted: ${updatedUser.name}`,
      message: `${updatedUser.name} (ID: ${assignedLoginId}) enrolled for ${data.targetExam} (${data.currentClass}) from ${data.city}.`,
      type: 'SUCCESS',
      read: false,
      createdAt: new Date().toISOString(),
      link: 'login-logs',
    };
    setNotifications((prev) => [notif, ...prev]);

    setShowOnboardingModal(false);
    addToast(`🎉 Academic Onboarding Completed! Welcome ${updatedUser.name}! Your Student ID is ${assignedLoginId}.`, 'success');
  };

  const login = (credential: string, roleHint?: Role): boolean => {
    const trimmed = credential.trim().toLowerCase();
    let found = users.find(
      (u) => u.email.toLowerCase() === trimmed || u.mobile === trimmed || (u.loginId && u.loginId.toLowerCase() === trimmed)
    );

    if (!found && roleHint) {
      found = users.find((u) => u.role === roleHint);
    }

    if (found) {
      setCurrentUser(found);
      recordLoginLog(found, found.loginProvider || 'EMAIL');
      setCurrentView('dashboard');
      setActiveTab('dashboard');

      if (!found.profileCompleted && found.role === 'STUDENT') {
        setShowOnboardingModal(true);
      }

      addToast(`Welcome back, ${found.name}! (ID: ${found.loginId || 'N/A'}) Signed in as ${found.role}.`, 'success');
      return true;
    }

    addToast('Invalid credentials. Try Google Sign In or demo accounts below.', 'error');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('public');
    setActiveTab('dashboard');
    addToast('You have been logged out successfully.', 'info');
  };

  const switchDemoUser = (role: Role) => {
    const target = users.find((u) => u.role === role);
    if (target) {
      setCurrentUser(target);
      setCurrentView('dashboard');
      setActiveTab('dashboard');
      addToast(`Switched session to ${target.name} (${role})`, 'info');
    }
  };

  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY + '_info');
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setCourses(INITIAL_COURSES);
    setBatches(INITIAL_BATCHES);
    setAttendance(INITIAL_ATTENDANCE);
    setStudyMaterials(INITIAL_STUDY_MATERIALS);
    setTests(INITIAL_TESTS);
    setTestAttempts(INITIAL_TEST_ATTEMPTS);
    setResults(INITIAL_RESULTS);
    setFees(INITIAL_FEES);
    setPayments(INITIAL_PAYMENTS);
    setNotices(INITIAL_NOTICES);
    setEnquiries(INITIAL_ENQUIRIES);
    setGallery(INITIAL_GALLERY);
    setTestimonials(INITIAL_TESTIMONIALS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setTimetable(INITIAL_TIMETABLE);
    setInstituteInfo(DEFAULT_INSTITUTE);
    addToast('Data successfully reset to initial demo state.', 'success');
  };

  // Student CRUD
  const addStudent = (data: Omit<StudentProfile, 'id'>): StudentProfile => {
    const id = 'student-' + Date.now();
    const newStudent: StudentProfile = { ...data, id };
    
    // Also create matching User account if not exists
    const newUser: User = {
      id: data.userId || 'user-' + id,
      loginId: data.admissionId || ('MI-2026-' + Math.floor(1000 + Math.random() * 9000)),
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      role: 'STUDENT',
      createdAt: new Date().toISOString(),
      profileCompleted: true,
    };
    
    // Create initial fee record for course
    const course = courses.find((c) => c.id === data.courseId);
    const totalFees = course ? course.totalFees : 100000;
    const newFee: FeeStructure = {
      id: 'fee-' + id,
      studentId: id,
      courseId: data.courseId,
      totalAmount: totalFees,
      paidAmount: 0,
      discount: 0,
      dueAmount: totalFees,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'PENDING',
    };

    setUsers((prev) => [...prev, newUser]);
    setStudents((prev) => [newStudent, ...prev]);
    setFees((prev) => [newFee, ...prev]);

    // Update batch strength
    setBatches((prev) =>
      prev.map((b) => (b.id === data.batchId ? { ...b, currentStrength: b.currentStrength + 1 } : b))
    );

    addToast(`Student ${data.name} enrolled with ID ${data.admissionId}`, 'success');
    return newStudent;
  };

  const updateStudent = (id: string, data: Partial<StudentProfile>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    addToast('Student record updated successfully', 'success');
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    addToast('Student record deactivated', 'info');
  };

  // Teacher CRUD
  const addTeacher = (data: Omit<TeacherProfile, 'id'>): TeacherProfile => {
    const id = 'teacher-' + Date.now();
    const newTeacher: TeacherProfile = { ...data, id };
    const newUser: User = {
      id: data.userId || 'user-' + id,
      loginId: 'MI-FAC-' + Math.floor(100 + Math.random() * 900),
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      role: 'TEACHER',
      createdAt: new Date().toISOString(),
      profileCompleted: true,
    };
    setUsers((prev) => [...prev, newUser]);
    setTeachers((prev) => [newTeacher, ...prev]);
    addToast(`Teacher ${data.name} onboarded successfully`, 'success');
    return newTeacher;
  };

  const updateTeacher = (id: string, data: Partial<TeacherProfile>) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    addToast('Teacher profile updated', 'success');
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    addToast('Teacher record updated', 'info');
  };

  // Course CRUD
  const addCourse = (data: Omit<Course, 'id'>) => {
    const id = 'course-' + Date.now();
    setCourses((prev) => [{ ...data, id }, ...prev]);
    addToast(`New course ${data.name} created`, 'success');
  };

  const updateCourse = (id: string, data: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    addToast('Course details saved', 'success');
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    addToast('Course deleted', 'info');
  };

  // Batch CRUD
  const addBatch = (data: Omit<Batch, 'id'>) => {
    const id = 'batch-' + Date.now();
    setBatches((prev) => [{ ...data, id }, ...prev]);
    addToast(`Batch ${data.name} launched`, 'success');
  };

  const updateBatch = (id: string, data: Partial<Batch>) => {
    setBatches((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
    addToast('Batch settings updated', 'success');
  };

  // Attendance
  const markAttendanceBatch = (records: Omit<AttendanceRecord, 'id'>[]) => {
    const newRecords: AttendanceRecord[] = records.map((r, i) => ({
      ...r,
      id: `att-${Date.now()}-${i}`,
    }));
    // Replace any existing attendance for the same student on the same date
    setAttendance((prev) => {
      const datesAndStudents = new Set(newRecords.map((r) => `${r.studentId}_${r.date}`));
      const filtered = prev.filter((p) => !datesAndStudents.has(`${p.studentId}_${p.date}`));
      return [...newRecords, ...filtered];
    });
    addToast(`Attendance recorded for ${records.length} students`, 'success');
  };

  // Study Materials
  const uploadStudyMaterial = (data: Omit<StudyMaterial, 'id' | 'uploadedAt' | 'downloadCount'>) => {
    const id = 'mat-' + Date.now();
    const newMat: StudyMaterial = {
      ...data,
      id,
      uploadedAt: new Date().toISOString(),
      downloadCount: 0,
    };
    setStudyMaterials((prev) => [newMat, ...prev]);

    // Send in-app notification to students
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: 'user-student-1',
      title: 'New Study Material Published',
      message: `${data.title} (${data.subject}) is now available in your notes section.`,
      type: 'INFO',
      read: false,
      createdAt: new Date().toISOString(),
      link: 'notes',
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast('Study material published to students successfully!', 'success');
  };

  const deleteStudyMaterial = (id: string) => {
    setStudyMaterials((prev) => prev.filter((m) => m.id !== id));
    addToast('Material removed from repository', 'info');
  };

  // Tests
  const createTest = (data: Omit<OnlineTest, 'id' | 'createdAt'>) => {
    const id = 'test-' + Date.now();
    const newTest: OnlineTest = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
    };
    setTests((prev) => [newTest, ...prev]);

    // Alert students
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: 'user-student-1',
      title: 'New Online Test Scheduled!',
      message: `${data.title} (${data.durationMinutes} mins) has been published.`,
      type: 'INFO',
      read: false,
      createdAt: new Date().toISOString(),
      link: 'tests',
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast(`Test "${data.title}" created with ${data.questions.length} questions`, 'success');
  };

  const updateTest = (id: string, data: Partial<OnlineTest>) => {
    setTests((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    addToast('Test updated', 'success');
  };

  const deleteTest = (id: string) => {
    setTests((prev) => prev.filter((t) => t.id !== id));
    addToast('Test removed', 'info');
  };

  const submitTestAttempt = (data: Omit<TestAttempt, 'id' | 'submittedAt'>): TestAttempt => {
    const id = 'attempt-' + Date.now();
    const newAttempt: TestAttempt = {
      ...data,
      id,
      submittedAt: new Date().toISOString(),
    };

    setTestAttempts((prev) => [newAttempt, ...prev]);

    // Also auto-generate a ResultRecord for institute rankings
    const targetTest = tests.find((t) => t.id === data.testId);
    const newResult: ResultRecord = {
      id: 'res-' + Date.now(),
      studentId: data.studentId,
      studentName: data.studentName,
      examName: targetTest?.title || 'CBT Online Assessment',
      courseName: 'Mentora Comprehensive',
      examDate: new Date().toISOString().split('T')[0],
      score: data.score,
      totalMarks: targetTest?.totalMarks || 100,
      percentage: data.percentage,
      rank: data.rank || 1,
      totalCandidates: 45,
      year: new Date().getFullYear(),
      remarks: data.passed ? 'Passed with distinction' : 'Needs additional revision',
    };
    setResults((prev) => [newResult, ...prev]);

    // Create confirmation notification
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: currentUser?.id || 'user-student-1',
      title: 'Test Submitted Successfully!',
      message: `You scored ${data.score} (${data.percentage}%). Scorecard is now available.`,
      type: data.passed ? 'SUCCESS' : 'WARNING',
      read: false,
      createdAt: new Date().toISOString(),
      link: 'results',
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast(`Test Submitted! Score: ${data.score} (${data.percentage}%)`, 'success');
    return newAttempt;
  };

  const addResult = (data: Omit<ResultRecord, 'id'>) => {
    const id = 'res-' + Date.now();
    setResults((prev) => [{ ...data, id }, ...prev]);
    addToast('Result scorecard published', 'success');
  };

  // Fees & Payments
  const recordFeePayment = (data: Omit<FeePayment, 'id' | 'receiptNumber' | 'status'>): FeePayment => {
    const id = 'pay-' + Date.now();
    const receiptNumber = 'MI-REC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newPayment: FeePayment = {
      ...data,
      id,
      receiptNumber,
      status: 'SUCCESS',
    };

    setPayments((prev) => [newPayment, ...prev]);

    // Update FeeStructure for the student
    setFees((prev) =>
      prev.map((f) => {
        if (f.studentId === data.studentId) {
          const newPaid = f.paidAmount + data.amount;
          const newDue = Math.max(0, f.totalAmount - f.discount - newPaid);
          const newStatus = newDue <= 0 ? 'PAID' : 'PARTIAL';
          return {
            ...f,
            paidAmount: newPaid,
            dueAmount: newDue,
            status: newStatus,
          };
        }
        return f;
      })
    );

    // Send receipt notification
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: currentUser?.id || 'user-student-1',
      title: 'Fee Payment Received',
      message: `Receipt ${receiptNumber} generated for amount ₹${data.amount.toLocaleString('en-IN')}.`,
      type: 'SUCCESS',
      read: false,
      createdAt: new Date().toISOString(),
      link: 'fees',
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast(`Payment of ₹${data.amount.toLocaleString('en-IN')} recorded successfully! Receipt: ${receiptNumber}`, 'success');
    return newPayment;
  };

  const updateFeeStructure = (studentId: string, updates: Partial<FeeStructure>) => {
    setFees((prev) => prev.map((f) => (f.studentId === studentId ? { ...f, ...updates } : f)));
    addToast('Fee structure updated', 'success');
  };

  // Notices
  const createNotice = (data: Omit<Notice, 'id' | 'date'>) => {
    const id = 'not-' + Date.now();
    const newNotice: Notice = {
      ...data,
      id,
      date: new Date().toISOString().split('T')[0],
    };
    setNotices((prev) => [newNotice, ...prev]);

    // Broadcast notification
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: 'user-student-1',
      title: `Notice: ${data.title}`,
      message: data.content.substring(0, 80) + '...',
      type: data.priority === 'HIGH' ? 'ALERT' : 'INFO',
      read: false,
      createdAt: new Date().toISOString(),
      link: 'notices',
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast('Notice published successfully', 'success');
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    addToast('Notice removed', 'info');
  };

  // Enquiries
  const createEnquiry = (data: Omit<Enquiry, 'id' | 'date' | 'status'>): Enquiry => {
    const id = 'enq-' + Date.now();
    const newEnquiry: Enquiry = {
      ...data,
      id,
      date: new Date().toISOString(),
      status: 'NEW',
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);

    // Admin alert
    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      userId: 'user-admin-1',
      title: 'New Admission Enquiry',
      message: `${data.studentName} enquired about ${data.courseInterested}`,
      type: 'INFO',
      read: false,
      createdAt: new Date().toISOString(),
      link: 'enquiries',
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast(`Thank you ${data.studentName}! Your enquiry ID is #${id.slice(-5)}. Academic counselor will call you shortly.`, 'success');
    return newEnquiry;
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status'], notes?: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, notes: notes ?? e.notes } : e))
    );
    addToast(`Enquiry status updated to ${status}`, 'success');
  };

  // Timetable
  const addTimetableEntry = (data: Omit<TimetableEntry, 'id'>) => {
    const id = 'tt-' + Date.now();
    setTimetable((prev) => [...prev, { ...data, id }]);
    addToast('Timetable schedule updated', 'success');
  };

  const deleteTimetableEntry = (id: string) => {
    setTimetable((prev) => prev.filter((t) => t.id !== id));
    addToast('Slot removed from timetable', 'info');
  };

  // Gallery
  const addGalleryItem = (data: Omit<GalleryItem, 'id' | 'date'>) => {
    const id = 'gal-' + Date.now();
    setGallery((prev) => [
      { ...data, id, date: new Date().toISOString().split('T')[0] },
      ...prev,
    ]);
    addToast('Gallery item added', 'success');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    addToast('Gallery item removed', 'info');
  };

  // Testimonials
  const addTestimonial = (data: Omit<Testimonial, 'id'>) => {
    const id = 'testim-' + Date.now();
    setTestimonials((prev) => [{ ...data, id }, ...prev]);
    addToast('Testimonial submitted for publication', 'success');
  };

  const toggleTestimonialPublished = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, published: !t.published } : t))
    );
    addToast('Testimonial visibility updated', 'info');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentStudentProfile,
        currentTeacherProfile,
        login,
        loginWithGoogle,
        loginWithMobile,
        loginWithEmail,
        logout,
        switchDemoUser,
        showOnboardingModal,
        setShowOnboardingModal,
        completeOnboarding,
        loginLogs,
        currentView,
        setCurrentView,
        activeTab,
        setActiveTab,
        instituteInfo,
        updateInstituteInfo,
        users,
        students,
        teachers,
        courses,
        batches,
        timetable,
        attendance,
        studyMaterials,
        tests,
        testAttempts,
        results,
        fees,
        payments,
        notices,
        enquiries,
        gallery,
        testimonials,
        notifications,
        addStudent,
        updateStudent,
        deleteStudent,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addCourse,
        updateCourse,
        deleteCourse,
        addBatch,
        updateBatch,
        markAttendanceBatch,
        uploadStudyMaterial,
        deleteStudyMaterial,
        createTest,
        updateTest,
        deleteTest,
        submitTestAttempt,
        addResult,
        recordFeePayment,
        updateFeeStructure,
        createNotice,
        deleteNotice,
        createEnquiry,
        updateEnquiryStatus,
        addTimetableEntry,
        deleteTimetableEntry,
        addGalleryItem,
        deleteGalleryItem,
        addTestimonial,
        toggleTestimonialPublished,
        markNotificationRead,
        clearNotifications,
        toasts,
        addToast,
        removeToast,
        resetToDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
