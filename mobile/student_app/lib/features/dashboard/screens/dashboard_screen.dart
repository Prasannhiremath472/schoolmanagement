import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
    body: SafeArea(child: CustomScrollView(slivers: [
      SliverAppBar(
        expandedHeight: 140, pinned: true,
        flexibleSpace: FlexibleSpaceBar(background: Container(
          decoration: BoxDecoration(gradient: LinearGradient(colors: [Theme.of(context).colorScheme.primary, Theme.of(context).colorScheme.primary.withOpacity(0.7)], begin: Alignment.topLeft, end: Alignment.bottomRight)),
          padding: const EdgeInsets.fromLTRB(20, 50, 20, 20),
          child: const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('Good Morning! 👋', style: TextStyle(color: Colors.white70, fontSize: 13)),
            SizedBox(height: 4),
            Text('Student Name', style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w700)),
            Text('Class 10 - A | Roll No: 05', style: TextStyle(color: Colors.white70, fontSize: 13)),
          ]),
        )),
      ),
      SliverPadding(padding: const EdgeInsets.all(16), sliver: SliverList(delegate: SliverChildListDelegate([
        Row(children: [
          _StatCard(label: 'Attendance', value: '91%', icon: Icons.how_to_reg_rounded, color: Colors.green),
          const SizedBox(width: 12),
          _StatCard(label: 'CGPA', value: '8.7', icon: Icons.grade_rounded, color: Colors.blue),
        ]),
        const SizedBox(height: 20),
        const Text('Quick Access', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
        const SizedBox(height: 12),
        GridView.count(shrinkWrap: true, physics: const NeverScrollableScrollPhysics(), crossAxisCount: 3, crossAxisSpacing: 12, mainAxisSpacing: 12, childAspectRatio: 1.0, children: [
          _ActionCard(icon: Icons.menu_book_rounded, label: 'Study Material', color: Colors.blue, onTap: () => context.go('/lms')),
          _ActionCard(icon: Icons.assignment_rounded, label: 'Assignments', color: Colors.orange, onTap: () {}),
          _ActionCard(icon: Icons.quiz_rounded, label: 'Quizzes', color: Colors.purple, onTap: () {}),
          _ActionCard(icon: Icons.grade_rounded, label: 'Results', color: Colors.green, onTap: () => context.go('/results')),
          _ActionCard(icon: Icons.video_call_rounded, label: 'Live Class', color: Colors.red, onTap: () {}),
          _ActionCard(icon: Icons.schedule_rounded, label: 'Timetable', color: Colors.teal, onTap: () {}),
        ]),
      ]))),
    ])),
  );
}

class _StatCard extends StatelessWidget {
  final String label, value;
  final IconData icon;
  final Color color;
  const _StatCard({required this.label, required this.value, required this.icon, required this.color});
  @override
  Widget build(BuildContext context) => Expanded(child: Card(child: Padding(padding: const EdgeInsets.all(16), child: Row(children: [
    Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(8)), child: Icon(icon, color: color, size: 22)),
    const SizedBox(width: 10),
    Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(label, style: const TextStyle(fontSize: 11, color: Colors.grey)), Text(value, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: color))]),
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
    Container(padding: const EdgeInsets.all(10), decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle), child: Icon(icon, color: color, size: 24)),
    const SizedBox(height: 6),
    Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600), textAlign: TextAlign.center, maxLines: 2, overflow: TextOverflow.ellipsis),
  ])));
}
