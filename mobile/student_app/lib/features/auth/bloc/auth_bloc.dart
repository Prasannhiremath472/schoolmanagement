import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

abstract class AuthEvent extends Equatable { @override List<Object?> get props => []; }
class AuthLoginRequested extends AuthEvent { final String identifier, password, tenantSlug; const AuthLoginRequested({required this.identifier, required this.password, required this.tenantSlug}); }
class AuthLogoutRequested extends AuthEvent {}

abstract class AuthState extends Equatable { @override List<Object?> get props => []; }
class AuthInitial extends AuthState {}
class AuthLoading extends AuthState {}
class AuthAuthenticated extends AuthState { final Map user; const AuthAuthenticated(this.user); }
class AuthUnauthenticated extends AuthState {}
class AuthError extends AuthState { final String message; const AuthError(this.message); }

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final Dio dio;
  final FlutterSecureStorage storage;
  AuthBloc({required this.dio, required this.storage}) : super(AuthInitial()) {
    on<AuthLoginRequested>((e, emit) async {
      emit(AuthLoading());
      try {
        await storage.write(key: 'tenant_slug', value: e.tenantSlug);
        final res = await dio.post('/auth/login', data: {'identifier': e.identifier, 'password': e.password});
        await storage.write(key: 'access_token', value: res.data['data']['accessToken']);
        emit(AuthAuthenticated(res.data['data']['user']));
      } catch (ex) { emit(AuthError(ex.toString())); }
    });
    on<AuthLogoutRequested>((_, emit) async { await storage.deleteAll(); emit(AuthUnauthenticated()); });
  }
}
