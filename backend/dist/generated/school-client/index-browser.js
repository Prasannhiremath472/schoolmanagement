
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  phone: 'phone',
  passwordHash: 'passwordHash',
  role: 'role',
  isActive: 'isActive',
  isEmailVerified: 'isEmailVerified',
  isPhoneVerified: 'isPhoneVerified',
  lastLoginAt: 'lastLoginAt',
  otpSecret: 'otpSecret',
  otpExpiry: 'otpExpiry',
  fcmToken: 'fcmToken',
  profilePhoto: 'profilePhoto',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserRefreshTokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  expiresAt: 'expiresAt',
  isRevoked: 'isRevoked',
  createdAt: 'createdAt'
};

exports.Prisma.UserAuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  action: 'action',
  entity: 'entity',
  entityId: 'entityId',
  oldValues: 'oldValues',
  newValues: 'newValues',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.AcademicYearScalarFieldEnum = {
  id: 'id',
  name: 'name',
  startDate: 'startDate',
  endDate: 'endDate',
  isCurrent: 'isCurrent',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ClassScalarFieldEnum = {
  id: 'id',
  name: 'name',
  displayName: 'displayName',
  academicYearId: 'academicYearId',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SectionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  classId: 'classId',
  classTeacherId: 'classTeacherId',
  capacity: 'capacity',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubjectScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  classId: 'classId',
  subjectType: 'subjectType',
  maxMarks: 'maxMarks',
  passMarks: 'passMarks',
  isElective: 'isElective',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  admissionNo: 'admissionNo',
  rollNo: 'rollNo',
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  bloodGroup: 'bloodGroup',
  religion: 'religion',
  caste: 'caste',
  category: 'category',
  nationality: 'nationality',
  motherTongue: 'motherTongue',
  aadhaarNo: 'aadhaarNo',
  address: 'address',
  city: 'city',
  state: 'state',
  pincode: 'pincode',
  admissionDate: 'admissionDate',
  previousSchool: 'previousSchool',
  transferCertNo: 'transferCertNo',
  isRTE: 'isRTE',
  medicalConditions: 'medicalConditions',
  allergies: 'allergies',
  emergencyContact: 'emergencyContact',
  photo: 'photo',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudentSectionScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  sectionId: 'sectionId',
  rollNo: 'rollNo',
  isActive: 'isActive',
  joinedAt: 'joinedAt',
  leftAt: 'leftAt'
};

exports.Prisma.StudentDocumentScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  type: 'type',
  fileName: 'fileName',
  fileUrl: 'fileUrl',
  uploadedAt: 'uploadedAt'
};

exports.Prisma.ParentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  firstName: 'firstName',
  lastName: 'lastName',
  relation: 'relation',
  occupation: 'occupation',
  qualification: 'qualification',
  annualIncome: 'annualIncome',
  aadhaarNo: 'aadhaarNo',
  phone: 'phone',
  alternatePhone: 'alternatePhone',
  email: 'email',
  address: 'address',
  photo: 'photo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudentParentScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  parentId: 'parentId',
  isPrimary: 'isPrimary'
};

exports.Prisma.TeacherScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  employeeId: 'employeeId',
  firstName: 'firstName',
  lastName: 'lastName',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  qualification: 'qualification',
  experience: 'experience',
  specialization: 'specialization',
  joiningDate: 'joiningDate',
  designation: 'designation',
  department: 'department',
  phone: 'phone',
  alternatePhone: 'alternatePhone',
  email: 'email',
  aadhaarNo: 'aadhaarNo',
  pan: 'pan',
  address: 'address',
  city: 'city',
  state: 'state',
  bankAccount: 'bankAccount',
  bankName: 'bankName',
  ifscCode: 'ifscCode',
  photo: 'photo',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TeacherSubjectScalarFieldEnum = {
  id: 'id',
  teacherId: 'teacherId',
  subjectId: 'subjectId',
  isPrimary: 'isPrimary'
};

exports.Prisma.StaffScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  employeeId: 'employeeId',
  firstName: 'firstName',
  lastName: 'lastName',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  designation: 'designation',
  department: 'department',
  joiningDate: 'joiningDate',
  phone: 'phone',
  email: 'email',
  aadhaarNo: 'aadhaarNo',
  pan: 'pan',
  address: 'address',
  bankAccount: 'bankAccount',
  bankName: 'bankName',
  ifscCode: 'ifscCode',
  photo: 'photo',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TimetableScalarFieldEnum = {
  id: 'id',
  name: 'name',
  sectionId: 'sectionId',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.TimetableSlotScalarFieldEnum = {
  id: 'id',
  timetableId: 'timetableId',
  sectionId: 'sectionId',
  subjectId: 'subjectId',
  teacherId: 'teacherId',
  dayOfWeek: 'dayOfWeek',
  startTime: 'startTime',
  endTime: 'endTime',
  roomNo: 'roomNo'
};

exports.Prisma.AttendanceScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  sectionId: 'sectionId',
  academicYearId: 'academicYearId',
  date: 'date',
  status: 'status',
  markedById: 'markedById',
  remarks: 'remarks',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StaffAttendanceScalarFieldEnum = {
  id: 'id',
  teacherId: 'teacherId',
  staffId: 'staffId',
  date: 'date',
  checkIn: 'checkIn',
  checkOut: 'checkOut',
  status: 'status',
  remarks: 'remarks',
  createdAt: 'createdAt'
};

exports.Prisma.LeaveApplicationScalarFieldEnum = {
  id: 'id',
  teacherId: 'teacherId',
  staffId: 'staffId',
  leaveType: 'leaveType',
  fromDate: 'fromDate',
  toDate: 'toDate',
  days: 'days',
  reason: 'reason',
  status: 'status',
  approvedBy: 'approvedBy',
  remarks: 'remarks',
  appliedAt: 'appliedAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FeeCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.FeeStructureScalarFieldEnum = {
  id: 'id',
  name: 'name',
  classId: 'classId',
  academicYearId: 'academicYearId',
  totalAmount: 'totalAmount',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FeeItemScalarFieldEnum = {
  id: 'id',
  feeStructureId: 'feeStructureId',
  feeCategoryId: 'feeCategoryId',
  amount: 'amount',
  isMandatory: 'isMandatory'
};

exports.Prisma.FeeInstallmentScalarFieldEnum = {
  id: 'id',
  feeStructureId: 'feeStructureId',
  installmentNo: 'installmentNo',
  name: 'name',
  dueDate: 'dueDate',
  amount: 'amount',
  lateFinePerDay: 'lateFinePerDay'
};

exports.Prisma.FeePaymentScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  installmentId: 'installmentId',
  amount: 'amount',
  discount: 'discount',
  fine: 'fine',
  payableAmount: 'payableAmount',
  paidAmount: 'paidAmount',
  dueAmount: 'dueAmount',
  paymentMode: 'paymentMode',
  receiptNo: 'receiptNo',
  receiptUrl: 'receiptUrl',
  transactionId: 'transactionId',
  gatewayResponse: 'gatewayResponse',
  paymentDate: 'paymentDate',
  remarks: 'remarks',
  collectedBy: 'collectedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ScholarshipScalarFieldEnum = {
  id: 'id',
  name: 'name',
  percentage: 'percentage',
  criteria: 'criteria',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.ExamTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  shortName: 'shortName',
  sortOrder: 'sortOrder',
  isActive: 'isActive'
};

exports.Prisma.ExamScheduleScalarFieldEnum = {
  id: 'id',
  examTypeId: 'examTypeId',
  classId: 'classId',
  academicYearId: 'academicYearId',
  name: 'name',
  startDate: 'startDate',
  endDate: 'endDate',
  isPublished: 'isPublished',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExamTimetableScalarFieldEnum = {
  id: 'id',
  examScheduleId: 'examScheduleId',
  subjectId: 'subjectId',
  examDate: 'examDate',
  startTime: 'startTime',
  endTime: 'endTime',
  venue: 'venue',
  maxMarks: 'maxMarks',
  passMarks: 'passMarks'
};

exports.Prisma.ExamResultScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  examScheduleId: 'examScheduleId',
  subjectId: 'subjectId',
  sectionId: 'sectionId',
  marksObtained: 'marksObtained',
  maxMarks: 'maxMarks',
  grade: 'grade',
  gradePoint: 'gradePoint',
  remarks: 'remarks',
  isAbsent: 'isAbsent',
  isPass: 'isPass',
  enteredBy: 'enteredBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GradeScaleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  minPercent: 'minPercent',
  maxPercent: 'maxPercent',
  gradePoint: 'gradePoint',
  remark: 'remark'
};

exports.Prisma.AssignmentScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  subjectId: 'subjectId',
  teacherId: 'teacherId',
  dueDate: 'dueDate',
  maxMarks: 'maxMarks',
  attachments: 'attachments',
  isPublished: 'isPublished',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AssignmentSubmissionScalarFieldEnum = {
  id: 'id',
  assignmentId: 'assignmentId',
  studentId: 'studentId',
  files: 'files',
  remarks: 'remarks',
  marksGiven: 'marksGiven',
  feedback: 'feedback',
  status: 'status',
  submittedAt: 'submittedAt',
  evaluatedAt: 'evaluatedAt'
};

exports.Prisma.HomeworkScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  subjectId: 'subjectId',
  teacherId: 'teacherId',
  dueDate: 'dueDate',
  attachments: 'attachments',
  createdAt: 'createdAt'
};

exports.Prisma.HomeworkSubmissionScalarFieldEnum = {
  id: 'id',
  homeworkId: 'homeworkId',
  studentId: 'studentId',
  files: 'files',
  submittedAt: 'submittedAt',
  isChecked: 'isChecked'
};

exports.Prisma.StudyMaterialScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  subjectId: 'subjectId',
  type: 'type',
  fileUrl: 'fileUrl',
  fileSize: 'fileSize',
  isPublished: 'isPublished',
  uploadedBy: 'uploadedBy',
  createdAt: 'createdAt'
};

exports.Prisma.QuizScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  subjectId: 'subjectId',
  duration: 'duration',
  maxMarks: 'maxMarks',
  startAt: 'startAt',
  endAt: 'endAt',
  isPublished: 'isPublished',
  createdAt: 'createdAt'
};

exports.Prisma.QuizQuestionScalarFieldEnum = {
  id: 'id',
  quizId: 'quizId',
  questionText: 'questionText',
  questionType: 'questionType',
  options: 'options',
  marks: 'marks',
  explanation: 'explanation',
  sortOrder: 'sortOrder'
};

exports.Prisma.QuizAttemptScalarFieldEnum = {
  id: 'id',
  quizId: 'quizId',
  studentId: 'studentId',
  answers: 'answers',
  score: 'score',
  startedAt: 'startedAt',
  submittedAt: 'submittedAt',
  timeTaken: 'timeTaken'
};

exports.Prisma.LiveClassScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  teacherId: 'teacherId',
  platform: 'platform',
  meetingId: 'meetingId',
  meetingUrl: 'meetingUrl',
  meetingPass: 'meetingPass',
  scheduledAt: 'scheduledAt',
  duration: 'duration',
  status: 'status',
  recordingUrl: 'recordingUrl',
  createdAt: 'createdAt'
};

exports.Prisma.AnnouncementScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  targetRole: 'targetRole',
  attachments: 'attachments',
  isPublished: 'isPublished',
  publishedAt: 'publishedAt',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.CircularScalarFieldEnum = {
  id: 'id',
  circularNo: 'circularNo',
  title: 'title',
  content: 'content',
  fileUrl: 'fileUrl',
  issuedDate: 'issuedDate',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  fromUserId: 'fromUserId',
  toUserId: 'toUserId',
  subject: 'subject',
  content: 'content',
  isRead: 'isRead',
  readAt: 'readAt',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  body: 'body',
  type: 'type',
  data: 'data',
  isRead: 'isRead',
  channel: 'channel',
  createdAt: 'createdAt'
};

exports.Prisma.VehicleScalarFieldEnum = {
  id: 'id',
  vehicleNo: 'vehicleNo',
  vehicleType: 'vehicleType',
  model: 'model',
  capacity: 'capacity',
  driverName: 'driverName',
  driverPhone: 'driverPhone',
  driverLicense: 'driverLicense',
  insuranceExpiry: 'insuranceExpiry',
  fcExpiry: 'fcExpiry',
  gpsDeviceId: 'gpsDeviceId',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.RouteScalarFieldEnum = {
  id: 'id',
  routeNo: 'routeNo',
  name: 'name',
  vehicleId: 'vehicleId',
  startPoint: 'startPoint',
  endPoint: 'endPoint',
  morningTime: 'morningTime',
  afternoonTime: 'afternoonTime',
  monthlyFare: 'monthlyFare',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.PickupPointScalarFieldEnum = {
  id: 'id',
  routeId: 'routeId',
  name: 'name',
  address: 'address',
  landmark: 'landmark',
  morningTime: 'morningTime',
  eveningTime: 'eveningTime',
  latitude: 'latitude',
  longitude: 'longitude',
  sortOrder: 'sortOrder'
};

exports.Prisma.TransportAllocationScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  routeId: 'routeId',
  pickupAddress: 'pickupAddress',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.HostelScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  address: 'address',
  capacity: 'capacity',
  wardenName: 'wardenName',
  wardenPhone: 'wardenPhone',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.HostelRoomScalarFieldEnum = {
  id: 'id',
  hostelId: 'hostelId',
  roomNo: 'roomNo',
  floor: 'floor',
  roomType: 'roomType',
  capacity: 'capacity',
  monthlyFare: 'monthlyFare',
  isActive: 'isActive'
};

exports.Prisma.HostelAllocationScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  roomId: 'roomId',
  joinDate: 'joinDate',
  leaveDate: 'leaveDate',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.BookCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.BookScalarFieldEnum = {
  id: 'id',
  isbn: 'isbn',
  title: 'title',
  author: 'author',
  publisher: 'publisher',
  edition: 'edition',
  categoryId: 'categoryId',
  totalCopies: 'totalCopies',
  availableCopies: 'availableCopies',
  shelfNo: 'shelfNo',
  price: 'price',
  coverImage: 'coverImage',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.LibraryCardScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  cardNo: 'cardNo',
  validTill: 'validTill',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.BookIssueScalarFieldEnum = {
  id: 'id',
  bookId: 'bookId',
  libraryCardId: 'libraryCardId',
  issueDate: 'issueDate',
  dueDate: 'dueDate',
  returnDate: 'returnDate',
  fine: 'fine',
  finePerDay: 'finePerDay',
  isReturned: 'isReturned',
  remarks: 'remarks',
  createdAt: 'createdAt'
};

exports.Prisma.SalaryStructureScalarFieldEnum = {
  id: 'id',
  name: 'name',
  basic: 'basic',
  hra: 'hra',
  da: 'da',
  ta: 'ta',
  otherAllowance: 'otherAllowance',
  pf: 'pf',
  esi: 'esi',
  tds: 'tds',
  grossSalary: 'grossSalary',
  netSalary: 'netSalary',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.SalaryScalarFieldEnum = {
  id: 'id',
  teacherId: 'teacherId',
  staffId: 'staffId',
  salaryStructureId: 'salaryStructureId',
  month: 'month',
  year: 'year',
  workingDays: 'workingDays',
  presentDays: 'presentDays',
  leaveDays: 'leaveDays',
  basicPaid: 'basicPaid',
  allowances: 'allowances',
  deductions: 'deductions',
  grossSalary: 'grossSalary',
  netSalary: 'netSalary',
  status: 'status',
  paymentDate: 'paymentDate',
  payslipUrl: 'payslipUrl',
  remarks: 'remarks',
  createdAt: 'createdAt'
};

exports.Prisma.AccountHeadScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  type: 'type',
  parentId: 'parentId',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  accountHeadId: 'accountHeadId',
  date: 'date',
  type: 'type',
  amount: 'amount',
  description: 'description',
  reference: 'reference',
  voucherNo: 'voucherNo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.ExpenseScalarFieldEnum = {
  id: 'id',
  category: 'category',
  amount: 'amount',
  description: 'description',
  date: 'date',
  paymentMode: 'paymentMode',
  receipt: 'receipt',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  SCHOOL_ADMIN: 'SCHOOL_ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
  STAFF: 'STAFF',
  ACCOUNTANT: 'ACCOUNTANT',
  LIBRARIAN: 'LIBRARIAN',
  TRANSPORT_MANAGER: 'TRANSPORT_MANAGER',
  HOSTEL_WARDEN: 'HOSTEL_WARDEN'
};

exports.SubjectType = exports.$Enums.SubjectType = {
  THEORY: 'THEORY',
  PRACTICAL: 'PRACTICAL',
  PROJECT: 'PROJECT',
  SPORTS: 'SPORTS',
  LANGUAGE: 'LANGUAGE'
};

exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

exports.StudentCategory = exports.$Enums.StudentCategory = {
  GENERAL: 'GENERAL',
  OBC: 'OBC',
  SC: 'SC',
  ST: 'ST',
  EWS: 'EWS',
  OTHER: 'OTHER'
};

exports.StudentStatus = exports.$Enums.StudentStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  TRANSFERRED: 'TRANSFERRED',
  ALUMNI: 'ALUMNI',
  DROPPED: 'DROPPED'
};

exports.ParentRelation = exports.$Enums.ParentRelation = {
  FATHER: 'FATHER',
  MOTHER: 'MOTHER',
  GUARDIAN: 'GUARDIAN',
  SIBLING: 'SIBLING',
  OTHER: 'OTHER'
};

exports.StaffStatus = exports.$Enums.StaffStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ON_LEAVE: 'ON_LEAVE',
  TERMINATED: 'TERMINATED',
  RESIGNED: 'RESIGNED'
};

exports.DayOfWeek = exports.$Enums.DayOfWeek = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

exports.AttendanceStatus = exports.$Enums.AttendanceStatus = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  HALF_DAY: 'HALF_DAY',
  EXCUSED: 'EXCUSED'
};

exports.StaffAttendStatus = exports.$Enums.StaffAttendStatus = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  HALF_DAY: 'HALF_DAY',
  ON_LEAVE: 'ON_LEAVE',
  HOLIDAY: 'HOLIDAY'
};

exports.LeaveType = exports.$Enums.LeaveType = {
  CASUAL: 'CASUAL',
  MEDICAL: 'MEDICAL',
  EARNED: 'EARNED',
  MATERNITY: 'MATERNITY',
  PATERNITY: 'PATERNITY',
  UNPAID: 'UNPAID'
};

exports.LeaveStatus = exports.$Enums.LeaveStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

exports.PaymentMode = exports.$Enums.PaymentMode = {
  CASH: 'CASH',
  CHEQUE: 'CHEQUE',
  DD: 'DD',
  UPI: 'UPI',
  CARD: 'CARD',
  NETBANKING: 'NETBANKING',
  RAZORPAY: 'RAZORPAY',
  STRIPE: 'STRIPE',
  PHONEPAY: 'PHONEPAY',
  PAYU: 'PAYU'
};

exports.SubmitStatus = exports.$Enums.SubmitStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  LATE_SUBMITTED: 'LATE_SUBMITTED',
  EVALUATED: 'EVALUATED',
  RETURNED: 'RETURNED'
};

exports.MaterialType = exports.$Enums.MaterialType = {
  PDF: 'PDF',
  VIDEO: 'VIDEO',
  PPT: 'PPT',
  DOC: 'DOC',
  LINK: 'LINK',
  IMAGE: 'IMAGE'
};

exports.QuestionType = exports.$Enums.QuestionType = {
  MCQ: 'MCQ',
  MULTI_SELECT: 'MULTI_SELECT',
  TRUE_FALSE: 'TRUE_FALSE',
  SHORT_ANSWER: 'SHORT_ANSWER',
  DESCRIPTIVE: 'DESCRIPTIVE'
};

exports.LiveStatus = exports.$Enums.LiveStatus = {
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  GENERAL: 'GENERAL',
  ATTENDANCE: 'ATTENDANCE',
  FEE: 'FEE',
  EXAM: 'EXAM',
  ASSIGNMENT: 'ASSIGNMENT',
  HOMEWORK: 'HOMEWORK',
  CIRCULAR: 'CIRCULAR',
  TRANSPORT: 'TRANSPORT',
  EMERGENCY: 'EMERGENCY'
};

exports.SalaryStatus = exports.$Enums.SalaryStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  FAILED: 'FAILED'
};

exports.AccountType = exports.$Enums.AccountType = {
  ASSET: 'ASSET',
  LIABILITY: 'LIABILITY',
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
  EQUITY: 'EQUITY'
};

exports.TransType = exports.$Enums.TransType = {
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT'
};

exports.Prisma.ModelName = {
  User: 'User',
  UserRefreshToken: 'UserRefreshToken',
  UserAuditLog: 'UserAuditLog',
  AcademicYear: 'AcademicYear',
  Class: 'Class',
  Section: 'Section',
  Subject: 'Subject',
  Student: 'Student',
  StudentSection: 'StudentSection',
  StudentDocument: 'StudentDocument',
  Parent: 'Parent',
  StudentParent: 'StudentParent',
  Teacher: 'Teacher',
  TeacherSubject: 'TeacherSubject',
  Staff: 'Staff',
  Timetable: 'Timetable',
  TimetableSlot: 'TimetableSlot',
  Attendance: 'Attendance',
  StaffAttendance: 'StaffAttendance',
  LeaveApplication: 'LeaveApplication',
  FeeCategory: 'FeeCategory',
  FeeStructure: 'FeeStructure',
  FeeItem: 'FeeItem',
  FeeInstallment: 'FeeInstallment',
  FeePayment: 'FeePayment',
  Scholarship: 'Scholarship',
  ExamType: 'ExamType',
  ExamSchedule: 'ExamSchedule',
  ExamTimetable: 'ExamTimetable',
  ExamResult: 'ExamResult',
  GradeScale: 'GradeScale',
  Assignment: 'Assignment',
  AssignmentSubmission: 'AssignmentSubmission',
  Homework: 'Homework',
  HomeworkSubmission: 'HomeworkSubmission',
  StudyMaterial: 'StudyMaterial',
  Quiz: 'Quiz',
  QuizQuestion: 'QuizQuestion',
  QuizAttempt: 'QuizAttempt',
  LiveClass: 'LiveClass',
  Announcement: 'Announcement',
  Circular: 'Circular',
  Message: 'Message',
  Notification: 'Notification',
  Vehicle: 'Vehicle',
  Route: 'Route',
  PickupPoint: 'PickupPoint',
  TransportAllocation: 'TransportAllocation',
  Hostel: 'Hostel',
  HostelRoom: 'HostelRoom',
  HostelAllocation: 'HostelAllocation',
  BookCategory: 'BookCategory',
  Book: 'Book',
  LibraryCard: 'LibraryCard',
  BookIssue: 'BookIssue',
  SalaryStructure: 'SalaryStructure',
  Salary: 'Salary',
  AccountHead: 'AccountHead',
  Transaction: 'Transaction',
  Expense: 'Expense'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
