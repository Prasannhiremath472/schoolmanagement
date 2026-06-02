import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../../../core/api/api_service.dart';

// ─── Events ───────────────────────────────────────────────────────────────────

abstract class AuthEvent extends Equatable {
  const AuthEvent();
  @override List<Object?> get props => [];
}

class AuthLoginRequested extends AuthEvent {
  final String identifier;
  final String password;
  final String tenantSlug;
  const AuthLoginRequested({required this.identifier, required this.password, required this.tenantSlug});
  @override List<Object?> get props => [identifier, password, tenantSlug];
}

class AuthOtpRequested extends AuthEvent {
  final String phone;
  final String tenantSlug;
  const AuthOtpRequested({required this.phone, required this.tenantSlug});
}

class AuthOtpVerified extends AuthEvent {
  final String phone;
  final String otp;
  const AuthOtpVerified({required this.phone, required this.otp});
}

class AuthCheckRequested extends AuthEvent {}
class AuthLogoutRequested extends AuthEvent {}

// ─── States ───────────────────────────────────────────────────────────────────

abstract class AuthState extends Equatable {
  const AuthState();
  @override List<Object?> get props => [];
}

class AuthInitial extends AuthState {}
class AuthLoading extends AuthState {}
class AuthAuthenticated extends AuthState {
  final Map<String, dynamic> user;
  const AuthAuthenticated({required this.user});
  @override List<Object?> get props => [user];
}
class AuthUnauthenticated extends AuthState {}
class AuthOtpSent extends AuthState {
  final String phone;
  const AuthOtpSent({required this.phone});
}
class AuthError extends AuthState {
  final String message;
  const AuthError({required this.message});
  @override List<Object?> get props => [message];
}

// ─── BLoC ─────────────────────────────────────────────────────────────────────

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final ApiService apiService;
  final FlutterSecureStorage storage;

  AuthBloc({required this.apiService, required this.storage}) : super(AuthInitial()) {
    on<AuthCheckRequested>(_onCheckRequested);
    on<AuthLoginRequested>(_onLoginRequested);
    on<AuthOtpRequested>(_onOtpRequested);
    on<AuthOtpVerified>(_onOtpVerified);
    on<AuthLogoutRequested>(_onLogoutRequested);

    add(AuthCheckRequested());
  }

  Future<void> _onCheckRequested(AuthCheckRequested event, Emitter<AuthState> emit) async {
    final token = await storage.read(key: 'access_token');
    if (token != null) {
      try {
        final profile = await apiService.getProfile();
        emit(AuthAuthenticated(user: profile['data'] ?? {}));
      } catch (_) {
        emit(AuthUnauthenticated());
      }
    } else {
      emit(AuthUnauthenticated());
    }
  }

  Future<void> _onLoginRequested(AuthLoginRequested event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    try {
      await storage.write(key: 'tenant_slug', value: event.tenantSlug);
      final response = await apiService.login(identifier: event.identifier, password: event.password);
      final data = response['data'];
      await storage.write(key: 'access_token', value: data['accessToken']);
      await storage.write(key: 'refresh_token', value: data['refreshToken']);
      emit(AuthAuthenticated(user: data['user'] ?? {}));
    } catch (e) {
      emit(AuthError(message: e.toString()));
    }
  }

  Future<void> _onOtpRequested(AuthOtpRequested event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    try {
      await storage.write(key: 'tenant_slug', value: event.tenantSlug);
      await apiService.sendOtp(phone: event.phone);
      emit(AuthOtpSent(phone: event.phone));
    } catch (e) {
      emit(AuthError(message: e.toString()));
    }
  }

  Future<void> _onOtpVerified(AuthOtpVerified event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    try {
      final response = await apiService.verifyOtp(phone: event.phone, otp: event.otp);
      final data = response['data'];
      await storage.write(key: 'access_token', value: data['accessToken']);
      await storage.write(key: 'refresh_token', value: data['refreshToken']);
      emit(AuthAuthenticated(user: data['user'] ?? {}));
    } catch (e) {
      emit(AuthError(message: e.toString()));
    }
  }

  Future<void> _onLogoutRequested(AuthLogoutRequested event, Emitter<AuthState> emit) async {
    await storage.deleteAll();
    emit(AuthUnauthenticated());
  }
}
