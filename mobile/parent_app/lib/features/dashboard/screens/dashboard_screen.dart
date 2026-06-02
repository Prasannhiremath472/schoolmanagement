import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import '../../auth/bloc/auth_bloc.dart';
import '../bloc/dashboard_bloc.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA),
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverAppBar(
              expandedHeight: 160,
              pinned: true,
              flexibleSpace: FlexibleSpaceBar(
                background: Container(
                  decoration: BoxDecoration(gradient: LinearGradient(colors: [colorScheme.primary, colorScheme.primary.withOpacity(0.8)], begin: Alignment.topLeft, end: Alignment.bottomRight)),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 50, 20, 20),
                    child: BlocBuilder<AuthBloc, AuthState>(
                      builder: (ctx, state) {
                        final user = state is AuthAuthenticated ? state.user : {};
                        return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text('Good Morning! 👋', style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 14)),
                          const SizedBox(height: 4),
                          Text(user['email'] ?? 'Parent', style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w700)),
                        ]);
                      },
                    ),
                  ),
                ),
              ),
              actions: [
                IconButton(icon: const Icon(Icons.notifications_rounded, color: Colors.white), onPressed: () => context.go('/notifications')),
                IconButton(icon: const Icon(Icons.logout_rounded, color: Colors.white), onPressed: () => context.read<AuthBloc>().add(AuthLogoutRequested())),
              ],
            ),

            SliverPadding(
              padding: const EdgeInsets.all(16),
              sliver: SliverList(
                delegate: SliverChildListDelegate([
                  // Quick Stats
                  Row(children: [
                    _StatCard(title: 'Attendance', value: '87%', icon: Icons.how_to_reg_rounded, color: Colors.green),
                    const SizedBox(width: 12),
                    _StatCard(title: 'Due Fees', value: '₹2,500', icon: Icons.account_balance_wallet_rounded, color: Colors.red),
                  ]),
                  const SizedBox(height: 16),

                  // Quick Actions
                  const Text('Quick Actions', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 12),
                  GridView.count(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    crossAxisCount: 3,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    childAspectRatio: 1.1,
                    children: [
                      _ActionCard(icon: Icons.how_to_reg_rounded, label: 'Attendance', color: Colors.blue, onTap: () => context.go('/attendance')),
                      _ActionCard(icon: Icons.payment_rounded, label: 'Fees', color: Colors.green, onTap: () => context.go('/fees')),
                      _ActionCard(icon: Icons.assignment_rounded, label: 'Homework', color: Colors.orange, onTap: () {}),
                      _ActionCard(icon: Icons.grade_rounded, label: 'Results', color: Colors.purple, onTap: () {}),
                      _ActionCard(icon: Icons.schedule_rounded, label: 'Timetable', color: Colors.teal, onTap: () {}),
                      _ActionCard(icon: Icons.announcement_rounded, label: 'Circulars', color: Colors.red, onTap: () {}),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Recent Notifications
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                    const Text('Recent Alerts', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                    TextButton(onPressed: () => context.go('/notifications'), child: const Text('See All')),
                  ]),
                  ...[
                    _NotifCard(title: 'Attendance Alert', body: 'Rahul was absent today (24 Oct)', time: '10:30 AM', color: Colors.orange),
                    _NotifCard(title: 'Fee Reminder', body: 'Term 2 fee due on 31 Oct', time: 'Yesterday', color: Colors.red),
                    _NotifCard(title: 'Exam Schedule', body: 'Unit Test scheduled from 5 Nov', time: '2 days ago', color: Colors.blue),
                  ],
                ]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title, value;
  final IconData icon;
  final Color color;
  const _StatCard({required this.title, required this.value, required this.icon, required this.color});

  @override
  Widget build(BuildContext context) => Expanded(child: Card(child: Padding(padding: const EdgeInsets.all(16), child: Row(children: [
    Container(padding: const EdgeInsets.all(10), decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(10)), child: Icon(icon, color: color, size: 24)),
    const SizedBox(width: 12),
    Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(title, style: const TextStyle(fontSize: 12, color: Colors.grey)), Text(value, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: color))]),
  ]))));
}

class _ActionCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;
  const _ActionCard({required this.icon, required this.label, required this.color, required this.onTap});

  @override
  Widget build(BuildContext context) => GestureDetector(onTap: onTap, child: Card(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
    Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle), child: Icon(icon, color: color, size: 26)),
    const SizedBox(height: 8),
    Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600), textAlign: TextAlign.center),
  ])));
}

class _NotifCard extends StatelessWidget {
  final String title, body, time;
  final Color color;
  const _NotifCard({required this.title, required this.body, required this.time, required this.color});

  @override
  Widget build(BuildContext context) => Card(margin: const EdgeInsets.only(bottom: 8), child: ListTile(leading: CircleAvatar(backgroundColor: color.withOpacity(0.1), child: Icon(Icons.notification_important_rounded, color: color, size: 20)), title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)), subtitle: Text(body, style: const TextStyle(fontSize: 13)), trailing: Text(time, style: const TextStyle(fontSize: 11, color: Colors.grey))));
}
