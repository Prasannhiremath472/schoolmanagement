import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'core/api/api_client.dart';
import 'core/api/api_service.dart';
import 'core/theme/app_theme.dart';
import 'core/router/app_router.dart';
import 'features/auth/bloc/auth_bloc.dart';
import 'features/dashboard/bloc/dashboard_bloc.dart';
import 'features/attendance/bloc/attendance_bloc.dart';
import 'features/fees/bloc/fees_bloc.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const SchoolERPParentApp());
}

class SchoolERPParentApp extends StatelessWidget {
  const SchoolERPParentApp({super.key});

  @override
  Widget build(BuildContext context) {
    const storage = FlutterSecureStorage();
    final apiClient = ApiClient(storage: storage);
    final apiService = ApiService(apiClient.dio);

    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (_) => AuthBloc(apiService: apiService, storage: storage)),
        BlocProvider(create: (_) => DashboardBloc(apiService: apiService)),
        BlocProvider(create: (_) => AttendanceBloc(apiService: apiService)),
        BlocProvider(create: (_) => FeesBloc(apiService: apiService)),
      ],
      child: BlocBuilder<AuthBloc, AuthState>(
        builder: (context, state) {
          return MaterialApp.router(
            title: 'School ERP - Parent',
            debugShowCheckedModeBanner: false,
            theme: AppTheme.lightTheme,
            darkTheme: AppTheme.darkTheme,
            themeMode: ThemeMode.system,
            routerConfig: AppRouter.router(state),
            locale: const Locale('en', 'IN'),
          );
        },
      ),
    );
  }
}
