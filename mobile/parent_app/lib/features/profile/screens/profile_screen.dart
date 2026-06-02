import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../../auth/bloc/auth_bloc.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});
  @override State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Map<String, dynamic> _profile = {};
  bool _loading = true;

  @override
  void initState() { super.initState(); _load(); }

  Future<void> _load() async {
    try {
      const storage = FlutterSecureStorage();
      final token = await storage.read(key: 'access_token');
      final slug = await storage.read(key: 'tenant_slug');
      final dio = Dio(BaseOptions(baseUrl: 'https://api.schoolerp.com/api/v1', headers: {'Authorization': 'Bearer $token', 'x-tenant-id': slug}));
      final res = await dio.get('/auth/me');
      setState(() { _profile = res.data['data'] ?? {}; _loading = false; });
    } catch (_) { setState(() => _loading = false); }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final student = _profile['student'] as Map<String, dynamic>?;
    final parent = _profile['parent'] as Map<String, dynamic>?;
    final name = student != null ? '${student['firstName']} ${student['lastName']}' : parent != null ? '${parent['firstName']} ${parent['lastName']}' : _profile['email'] ?? '';

    return Scaffold(
      body: _loading ? const Center(child: CircularProgressIndicator()) :
      CustomScrollView(slivers: [
        SliverAppBar(
          expandedHeight: 220,
          pinned: true,
          flexibleSpace: FlexibleSpaceBar(
            background: Container(
              decoration: BoxDecoration(gradient: LinearGradient(colors: [theme.colorScheme.primary, theme.colorScheme.primary.withOpacity(0.7)], begin: Alignment.topLeft, end: Alignment.bottomRight)),
              child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                const SizedBox(height: 40),
                CircleAvatar(radius: 45, backgroundColor: Colors.white.withOpacity(0.3), child: Text(name.isNotEmpty ? name[0].toUpperCase() : 'U', style: const TextStyle(fontSize: 40, color: Colors.white, fontWeight: FontWeight.w800))),
                const SizedBox(height: 10),
                Text(name, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)),
                Text(_profile['role'] ?? '', style: const TextStyle(color: Colors.white70, fontSize: 13)),
              ]),
            ),
          ),
          actions: [IconButton(icon: const Icon(Icons.edit_rounded, color: Colors.white), onPressed: () {})],
        ),
        SliverPadding(
          padding: const EdgeInsets.all(16),
          sliver: SliverList(delegate: SliverChildListDelegate([
            if (student != null) ...[
              _sectionTitle('Student Information'),
              _infoCard([
                _infoRow(Icons.badge_rounded, 'Admission No', student['admissionNo'] ?? '—'),
                _infoRow(Icons.cake_rounded, 'Date of Birth', student['dateOfBirth']?.toString().split('T')[0] ?? '—'),
                _infoRow(Icons.wc_rounded, 'Gender', student['gender'] ?? '—'),
                _infoRow(Icons.bloodtype_rounded, 'Blood Group', student['bloodGroup'] ?? '—'),
                _infoRow(Icons.category_rounded, 'Category', student['category'] ?? '—'),
              ]),
              const SizedBox(height: 16),
            ],
            _sectionTitle('Contact Information'),
            _infoCard([
              _infoRow(Icons.email_rounded, 'Email', _profile['email'] ?? '—'),
              _infoRow(Icons.phone_rounded, 'Phone', _profile['phone'] ?? '—'),
            ]),
            const SizedBox(height: 16),
            _sectionTitle('Account'),
            _infoCard([
              _infoRow(Icons.verified_user_rounded, 'Account Type', _profile['role'] ?? '—'),
              _infoRow(Icons.circle, 'Status', _profile['isActive'] == true ? 'Active' : 'Inactive'),
            ]),
            const SizedBox(height: 24),
            OutlinedButton.icon(
              icon: const Icon(Icons.lock_outline_rounded),
              label: const Text('Change Password'),
              onPressed: () => _showChangePassword(context),
              style: OutlinedButton.styleFrom(minimumSize: const Size.fromHeight(48)),
            ),
            const SizedBox(height: 12),
            ElevatedButton.icon(
              icon: const Icon(Icons.logout_rounded),
              label: const Text('Logout'),
              onPressed: () => context.read<AuthBloc>().add(AuthLogoutRequested()),
              style: ElevatedButton.styleFrom(backgroundColor: Colors.red, foregroundColor: Colors.white, minimumSize: const Size.fromHeight(48)),
            ),
          ])),
        ),
      ]),
    );
  }

  Widget _sectionTitle(String title) => Padding(
    padding: const EdgeInsets.only(bottom: 8),
    child: Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.grey, letterSpacing: 0.8)),
  );

  Widget _infoCard(List<Widget> children) => Card(
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    child: Column(children: children),
  );

  Widget _infoRow(IconData icon, String label, String value) => ListTile(
    leading: Icon(icon, color: Theme.of(context).colorScheme.primary, size: 20),
    title: Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
    subtitle: Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.black87)),
    dense: true,
  );

  void _showChangePassword(BuildContext context) {
    showModalBottomSheet(context: context, isScrollControlled: true, shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => Padding(
        padding: EdgeInsets.fromLTRB(16, 20, 16, MediaQuery.of(context).viewInsets.bottom + 20),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          const Text('Change Password', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
          const SizedBox(height: 16),
          const TextField(obscureText: true, decoration: InputDecoration(labelText: 'Current Password', border: OutlineInputBorder())),
          const SizedBox(height: 12),
          const TextField(obscureText: true, decoration: InputDecoration(labelText: 'New Password', border: OutlineInputBorder())),
          const SizedBox(height: 12),
          const TextField(obscureText: true, decoration: InputDecoration(labelText: 'Confirm New Password', border: OutlineInputBorder())),
          const SizedBox(height: 16),
          SizedBox(width: double.infinity, child: ElevatedButton(onPressed: () => Navigator.pop(context), child: const Text('Update Password'))),
        ]),
      ),
    );
  }
}
