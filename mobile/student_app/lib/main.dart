import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:go_router/go_router.dart';
import 'package:dio/dio.dart';
import 'core/api/api_client.dart';
import 'features/auth/screens/login_screen.dart';
import 'features/auth/bloc/auth_bloc.dart';
import 'features/dashboard/screens/dashboard_screen.dart';
import 'features/lms/screens/lms_screen.dart';
import 'features/results/screens/results_screen.dart';
import 'core/screens/main_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const SchoolERPStudentApp());
}

class SchoolERPStudentApp extends StatelessWidget {
  const SchoolERPStudentApp({super.key});

  @override
  Widget build(BuildContext context) {
    const storage = FlutterSecureStorage();
    final apiClient = ApiClient(storage: storage);
    final router = GoRouter(initialLocation: '/login', routes: [
      GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
      ShellRoute(builder: (_, __, child) => MainScreen(child: child), routes: [
        GoRoute(path: '/dashboard', builder: (_, __) => const DashboardScreen()),
        GoRoute(path: '/lms', builder: (_, __) => const LmsScreen()),
        GoRoute(path: '/results', builder: (_, __) => const ResultsScreen()),
      ]),
    ]);
    return BlocProvider(
      create: (_) => AuthBloc(storage: storage, dio: apiClient.dio),
      child: MaterialApp.router(
        title: 'School ERP - Student',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(useMaterial3: true, colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF1976D2))),
        routerConfig: router,
      ),
    );
  }
}
