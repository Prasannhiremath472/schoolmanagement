import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../auth/bloc/auth_bloc.dart';

class MoreScreen extends StatelessWidget {
  const MoreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('More')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildSection('Academic', [
            _MenuItem(Icons.schedule_rounded, 'Timetable', Colors.teal, () => context.go('/timetable')),
            _MenuItem(Icons.grade_rounded, 'Results', Colors.purple, () => context.go('/results')),
            _MenuItem(Icons.assignment_rounded, 'Homework', Colors.orange, () => context.go('/homework')),
            _MenuItem(Icons.video_call_rounded, 'Live Classes', Colors.red, () => context.go('/live-classes')),
          ]),
          const SizedBox(height: 16),
          _buildSection('School', [
            _MenuItem(Icons.article_rounded, 'Circulars & Notices', Colors.blue, () => context.go('/circulars')),
            _MenuItem(Icons.library_books_rounded, 'Library', Colors.brown, () => context.go('/library')),
          ]),
          const SizedBox(height: 16),
          _buildSection('Account', [
            _MenuItem(Icons.person_rounded, 'My Profile', Colors.indigo, () => context.go('/profile')),
            _MenuItem(Icons.chat_rounded, 'Messages', Colors.green, () => context.go('/chat')),
            _MenuItem(Icons.settings_rounded, 'Settings', Colors.grey, () {}),
          ]),
          const SizedBox(height: 16),
          _buildSection('', [
            _MenuItem(Icons.logout_rounded, 'Logout', Colors.red, () {
              showDialog(
                context: context,
                builder: (_) => AlertDialog(
                  title: const Text('Logout'),
                  content: const Text('Are you sure you want to logout?'),
                  actions: [
                    TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.red, foregroundColor: Colors.white),
                      onPressed: () { Navigator.pop(context); context.read<AuthBloc>().add(AuthLogoutRequested()); },
                      child: const Text('Logout'),
                    ),
                  ],
                ),
              );
            }),
          ]),
        ],
      ),
    );
  }

  Widget _buildSection(String title, List<_MenuItem> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (title.isNotEmpty) Padding(
          padding: const EdgeInsets.only(bottom: 8, left: 4),
          child: Text(title.toUpperCase(), style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Colors.grey, letterSpacing: 1)),
        ),
        Card(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          child: Column(
            children: items.asMap().entries.map((e) {
              final i = e.key;
              final item = e.value;
              return Column(children: [
                ListTile(
                  leading: Container(
                    width: 40, height: 40,
                    decoration: BoxDecoration(color: item.color.withOpacity(0.12), borderRadius: BorderRadius.circular(10)),
                    child: Icon(item.icon, color: item.color, size: 22),
                  ),
                  title: Text(item.label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                  trailing: const Icon(Icons.chevron_right_rounded, color: Colors.grey),
                  onTap: item.onTap,
                ),
                if (i < items.length - 1) const Divider(height: 1, indent: 60),
              ]);
            }).toList(),
          ),
        ),
      ],
    );
  }
}

class _MenuItem {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;
  const _MenuItem(this.icon, this.label, this.color, this.onTap);
}
