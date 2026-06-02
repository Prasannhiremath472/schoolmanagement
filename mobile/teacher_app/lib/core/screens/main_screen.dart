import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class MainScreen extends StatelessWidget {
  final Widget child;
  const MainScreen({super.key, required this.child});

  int _selectedIndex(BuildContext context) {
    final location = GoRouterState.of(context).matchedLocation;
    if (location.startsWith('/attendance')) return 0;
    if (location.startsWith('/marks')) return 1;
    if (location.startsWith('/homework')) return 2;
    return 0;
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    body: child,
    bottomNavigationBar: BottomNavigationBar(
      currentIndex: _selectedIndex(context),
      onTap: (i) => context.go(['/attendance', '/marks', '/homework'][i]),
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.how_to_reg_rounded), label: 'Attendance'),
        BottomNavigationBarItem(icon: Icon(Icons.grade_rounded), label: 'Marks'),
        BottomNavigationBarItem(icon: Icon(Icons.assignment_rounded), label: 'Homework'),
      ],
    ),
  );
}
