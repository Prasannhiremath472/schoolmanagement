import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:go_router/go_router.dart';
import 'package:dio/dio.dart';
import 'core/api/api_client.dart';
import 'features/auth/screens/login_screen.dart';
import 'features/attendance/screens/mark_attendance_screen.dart';
import 'features/marks/screens/marks_entry_screen.dart';
import 'features/homework/screens/homework_screen.dart';
import 'features/auth/bloc/auth_bloc.dart';
import 'core/screens/main_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const SchoolERPTeacherApp());
}

class SchoolERPTeacherApp extends StatelessWidget {
  const SchoolERPTeacherApp({super.key});

  @override
  Widget build(BuildContext context) {
    const storage = FlutterSecureStorage();
    final apiClient = ApiClient(storage: storage);

    final router = GoRouter(
      initialLocation: '/login',
      routes: [
        GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
        ShellRoute(
          builder: (_, __, child) => MainScreen(child: child),
          routes: [
            GoRoute(path: '/attendance', builder: (_, __) => const MarkAttendanceScreen()),
            GoRoute(path: '/marks', builder: (_, __) => const MarksEntryScreen()),
            GoRoute(path: '/homework', builder: (_, __) => const HomeworkScreen()),
          ],
        ),
      ],
    );

    return BlocProvider(
      create: (_) => AuthBloc(storage: storage, dio: apiClient.dio),
      child: MaterialApp.router(
        title: 'School ERP - Teacher',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(useMaterial3: true, colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF7B1FA2)), fontFamily: 'Roboto'),
        routerConfig: router,
      ),
    );
  }
}
