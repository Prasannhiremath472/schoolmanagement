import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiClient {
  late Dio dio;
  final FlutterSecureStorage storage;

  ApiClient({required this.storage}) {
    dio = Dio(BaseOptions(
      baseUrl: const String.fromEnvironment('API_BASE_URL', defaultValue: 'https://api.schoolerp.com/api/v1'),
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {'Content-Type': 'application/json'},
    ));
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await storage.read(key: 'access_token');
        final slug = await storage.read(key: 'tenant_slug');
        if (token != null) options.headers['Authorization'] = 'Bearer $token';
        if (slug != null) options.headers['x-tenant-id'] = slug;
        handler.next(options);
      },
    ));
  }
}
