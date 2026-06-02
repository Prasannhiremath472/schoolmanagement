import 'package:dio/dio.dart';

class ApiService {
  final Dio _dio;

  ApiService(this._dio);

  // ─── AUTH ────────────────────────────────────────────────────────────────

  Future<Map<String, dynamic>> login({
    required String identifier,
    required String password,
  }) async {
    final res = await _dio.post('/auth/login', data: {
      'identifier': identifier,
      'password': password,
    });
    return res.data;
  }

  Future<Map<String, dynamic>> sendOtp({required String phone}) async {
    final res = await _dio.post('/auth/send-otp', data: {'phone': phone});
    return res.data;
  }

  Future<Map<String, dynamic>> verifyOtp({
    required String phone,
    required String otp,
  }) async {
    final res = await _dio.post('/auth/verify-otp', data: {'phone': phone, 'otp': otp});
    return res.data;
  }

  Future<Map<String, dynamic>> getProfile() async {
    final res = await _dio.get('/auth/me');
    return res.data;
  }

  // ─── DASHBOARD ───────────────────────────────────────────────────────────

  Future<Map<String, dynamic>> getParentDashboard(String parentId) async {
    final res = await _dio.get('/parents/$parentId');
    return res.data;
  }

  // ─── ATTENDANCE ──────────────────────────────────────────────────────────

  Future<Map<String, dynamic>> getStudentAttendance({
    required String studentId,
    required String fromDate,
    required String toDate,
  }) async {
    final res = await _dio.get(
      '/attendance/student/$studentId',
      queryParameters: {'fromDate': fromDate, 'toDate': toDate},
    );
    return res.data;
  }

  // ─── FEES ────────────────────────────────────────────────────────────────

  Future<Map<String, dynamic>> getStudentFees({
    required String studentId,
    required String academicYearId,
  }) async {
    final res = await _dio.get(
      '/fees/student/$studentId',
      queryParameters: {'academicYearId': academicYearId},
    );
    return res.data;
  }

  // ─── HOMEWORK ────────────────────────────────────────────────────────────

  Future<Map<String, dynamic>> getHomework({int page = 1}) async {
    final res = await _dio.get('/lms/homework', queryParameters: {'page': page, 'limit': 20});
    return res.data;
  }

  // ─── ASSIGNMENTS ─────────────────────────────────────────────────────────

  Future<Map<String, dynamic>> getAssignments({int page = 1}) async {
    final res = await _dio.get('/lms/assignments', queryParameters: {'page': page, 'limit': 20});
    return res.data;
  }

  // ─── EXAM RESULTS ────────────────────────────────────────────────────────

  Future<Map<String, dynamic>> getStudentResults({
    required String studentId,
    required String examScheduleId,
  }) async {
    final res = await _dio.get('/examinations/results/student/$studentId', queryParameters: {'examScheduleId': examScheduleId});
    return res.data;
  }

  // ─── NOTIFICATIONS ───────────────────────────────────────────────────────

  Future<Map<String, dynamic>> getNotifications({int page = 1}) async {
    final res = await _dio.get('/communication/notifications', queryParameters: {'page': page, 'limit': 20});
    return res.data;
  }

  Future<void> markNotificationRead(String id) async {
    await _dio.patch('/communication/notifications/$id/read');
  }

  // ─── ANNOUNCEMENTS ───────────────────────────────────────────────────────

  Future<Map<String, dynamic>> getAnnouncements({int page = 1}) async {
    final res = await _dio.get('/communication/announcements', queryParameters: {'page': page, 'limit': 20});
    return res.data;
  }

  // ─── TIMETABLE ───────────────────────────────────────────────────────────

  Future<Map<String, dynamic>> getTimetable(String sectionId) async {
    final res = await _dio.get('/academic/timetable/$sectionId');
    return res.data;
  }

  // ─── LIVE CLASSES ────────────────────────────────────────────────────────

  Future<Map<String, dynamic>> getLiveClasses() async {
    final res = await _dio.get('/lms/live-classes');
    return res.data;
  }
}
