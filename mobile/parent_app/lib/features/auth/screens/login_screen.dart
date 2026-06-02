import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import '../bloc/auth_bloc.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _identifierCtrl = TextEditingController();
  final _passwordCtrl = TextEditingController();
  final _slugCtrl = TextEditingController();
  bool _obscurePassword = true;
  bool _useOtp = false;

  @override
  void dispose() {
    _identifierCtrl.dispose();
    _passwordCtrl.dispose();
    _slugCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      body: BlocListener<AuthBloc, AuthState>(
        listener: (context, state) {
          if (state is AuthAuthenticated) context.go('/dashboard');
          if (state is AuthOtpSent) context.go('/otp?phone=${Uri.encodeComponent(_identifierCtrl.text)}');
          if (state is AuthError) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(state.message), backgroundColor: Colors.red),
            );
          }
        },
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 48),
                Icon(Icons.school_rounded, size: 72, color: colorScheme.primary),
                const SizedBox(height: 16),
                Text('School ERP', textAlign: TextAlign.center, style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800, color: colorScheme.primary)),
                Text('Parent Portal', textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.grey.shade600)),
                const SizedBox(height: 40),

                // Toggle OTP/Password
                Container(
                  decoration: BoxDecoration(color: colorScheme.surfaceVariant, borderRadius: BorderRadius.circular(10)),
                  child: Row(
                    children: [
                      Expanded(child: GestureDetector(onTap: () => setState(() => _useOtp = false), child: Container(padding: const EdgeInsets.symmetric(vertical: 10), decoration: BoxDecoration(color: !_useOtp ? colorScheme.primary : Colors.transparent, borderRadius: BorderRadius.circular(10)), child: Text('Password', textAlign: TextAlign.center, style: TextStyle(color: !_useOtp ? Colors.white : Colors.grey, fontWeight: FontWeight.w600))))),
                      Expanded(child: GestureDetector(onTap: () => setState(() => _useOtp = true), child: Container(padding: const EdgeInsets.symmetric(vertical: 10), decoration: BoxDecoration(color: _useOtp ? colorScheme.primary : Colors.transparent, borderRadius: BorderRadius.circular(10)), child: Text('OTP Login', textAlign: TextAlign.center, style: TextStyle(color: _useOtp ? Colors.white : Colors.grey, fontWeight: FontWeight.w600))))),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        controller: _slugCtrl,
                        decoration: const InputDecoration(labelText: 'School ID', hintText: 'e.g. springdale-school', prefixIcon: Icon(Icons.corporate_fare_rounded)),
                        validator: (v) => v?.isEmpty == true ? 'Required' : null,
                      ),
                      const SizedBox(height: 16),
                      TextFormField(
                        controller: _identifierCtrl,
                        decoration: InputDecoration(labelText: _useOtp ? 'Phone Number' : 'Email or Phone', prefixIcon: const Icon(Icons.person_rounded)),
                        keyboardType: _useOtp ? TextInputType.phone : TextInputType.emailAddress,
                        validator: (v) => v?.isEmpty == true ? 'Required' : null,
                      ),
                      if (!_useOtp) ...[
                        const SizedBox(height: 16),
                        TextFormField(
                          controller: _passwordCtrl,
                          obscureText: _obscurePassword,
                          decoration: InputDecoration(
                            labelText: 'Password',
                            prefixIcon: const Icon(Icons.lock_rounded),
                            suffixIcon: IconButton(icon: Icon(_obscurePassword ? Icons.visibility : Icons.visibility_off), onPressed: () => setState(() => _obscurePassword = !_obscurePassword)),
                          ),
                          validator: (v) => (v?.length ?? 0) < 6 ? 'Min 6 characters' : null,
                        ),
                      ],
                    ],
                  ),
                ),
                const SizedBox(height: 32),

                BlocBuilder<AuthBloc, AuthState>(
                  builder: (context, state) {
                    return ElevatedButton(
                      onPressed: state is AuthLoading ? null : _onLogin,
                      child: state is AuthLoading
                          ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                          : Text(_useOtp ? 'Send OTP' : 'Sign In'),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _onLogin() {
    if (!_formKey.currentState!.validate()) return;
    if (_useOtp) {
      context.read<AuthBloc>().add(AuthOtpRequested(phone: _identifierCtrl.text.trim(), tenantSlug: _slugCtrl.text.trim()));
    } else {
      context.read<AuthBloc>().add(AuthLoginRequested(identifier: _identifierCtrl.text.trim(), password: _passwordCtrl.text, tenantSlug: _slugCtrl.text.trim()));
    }
  }
}
