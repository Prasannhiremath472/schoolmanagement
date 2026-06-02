import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import '../bloc/auth_bloc.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _idCtrl = TextEditingController();
  final _pwCtrl = TextEditingController();
  final _slugCtrl = TextEditingController();

  @override
  Widget build(BuildContext context) => Scaffold(
    body: BlocListener<AuthBloc, AuthState>(
      listener: (ctx, state) {
        if (state is AuthAuthenticated) ctx.go('/dashboard');
        if (state is AuthError) ScaffoldMessenger.of(ctx).showSnackBar(SnackBar(content: Text(state.message), backgroundColor: Colors.red));
      },
      child: SafeArea(child: Padding(padding: const EdgeInsets.all(24), child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        const Icon(Icons.school_rounded, size: 72, color: Color(0xFF1976D2)),
        const SizedBox(height: 8),
        const Text('Student Portal', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: Color(0xFF1976D2))),
        const SizedBox(height: 40),
        TextField(controller: _slugCtrl, decoration: const InputDecoration(labelText: 'School ID', prefixIcon: Icon(Icons.corporate_fare_rounded), border: OutlineInputBorder())),
        const SizedBox(height: 16),
        TextField(controller: _idCtrl, decoration: const InputDecoration(labelText: 'Email or Admission No', prefixIcon: Icon(Icons.badge_rounded), border: OutlineInputBorder())),
        const SizedBox(height: 16),
        TextField(controller: _pwCtrl, obscureText: true, decoration: const InputDecoration(labelText: 'Password', prefixIcon: Icon(Icons.lock_rounded), border: OutlineInputBorder())),
        const SizedBox(height: 24),
        BlocBuilder<AuthBloc, AuthState>(builder: (ctx, state) => SizedBox(width: double.infinity, child: ElevatedButton(
          onPressed: state is AuthLoading ? null : () => ctx.read<AuthBloc>().add(AuthLoginRequested(identifier: _idCtrl.text, password: _pwCtrl.text, tenantSlug: _slugCtrl.text)),
          style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 16)),
          child: state is AuthLoading ? const CircularProgressIndicator(color: Colors.white) : const Text('Sign In', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
        ))),
      ]))),
    ),
  );
}
