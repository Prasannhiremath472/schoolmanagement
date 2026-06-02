import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/screens/login_screen.dart';
import '../../features/auth/screens/otp_screen.dart';
import '../../features/dashboard/screens/dashboard_screen.dart';
import '../../features/attendance/screens/attendance_screen.dart';
import '../../features/fees/screens/fees_screen.dart';
import '../../features/notifications/screens/notifications_screen.dart';
import '../../features/timetable/screens/timetable_screen.dart';
import '../../features/circulars/screens/circulars_screen.dart';
import '../../features/results/screens/results_screen.dart';
import '../../features/homework/screens/homework_screen.dart';
import '../../features/chat/screens/chat_screen.dart';
import '../../features/profile/screens/profile_screen.dart';
import '../../features/library/screens/library_screen.dart';
import '../../features/live_classes/screens/live_classes_screen.dart';
import '../../features/more/more_screen.dart';
import '../screens/main_screen.dart';
import '../../features/auth/bloc/auth_bloc.dart';

class AppRouter {
  static GoRouter router(AuthState authState) {
    return GoRouter(
      initialLocation: authState is AuthAuthenticated ? '/dashboard' : '/login',
      redirect: (context, state) {
        final isLoggedIn = authState is AuthAuthenticated;
        final isAuthRoute = state.matchedLocation.startsWith('/login') ||
            state.matchedLocation.startsWith('/otp');
        if (!isLoggedIn && !isAuthRoute) return '/login';
        if (isLoggedIn && isAuthRoute) return '/dashboard';
        return null;
      },
      routes: [
        GoRoute(path: '/login', builder: (ctx, _) => const LoginScreen()),
        GoRoute(
          path: '/otp',
          builder: (ctx, state) => OtpScreen(phone: state.uri.queryParameters['phone'] ?? ''),
        ),
        ShellRoute(
          builder: (ctx, state, child) => MainScreen(child: child),
          routes: [
            GoRoute(path: '/dashboard',     builder: (_, __) => const DashboardScreen()),
            GoRoute(path: '/attendance',    builder: (_, __) => const AttendanceScreen()),
            GoRoute(path: '/fees',          builder: (_, __) => const FeesScreen()),
            GoRoute(path: '/timetable',     builder: (_, __) => const TimetableScreen()),
            GoRoute(path: '/notifications', builder: (_, __) => const NotificationsScreen()),
            GoRoute(path: '/more',          builder: (_, __) => const MoreScreen()),
            GoRoute(path: '/circulars',     builder: (_, __) => const CircularsScreen()),
            GoRoute(path: '/results',       builder: (_, __) => const ResultsScreen()),
            GoRoute(path: '/homework',      builder: (_, __) => const HomeworkScreen()),
            GoRoute(path: '/chat',          builder: (_, __) => const ChatScreen()),
            GoRoute(path: '/profile',       builder: (_, __) => const ProfileScreen()),
            GoRoute(path: '/library',       builder: (_, __) => const LibraryScreen()),
            GoRoute(path: '/live-classes',  builder: (_, __) => const LiveClassesScreen()),
          ],
        ),
      ],
      errorBuilder: (ctx, state) => Scaffold(
        body: Center(child: Text('Page not found: ${state.error}')),
      ),
    );
  }
}
