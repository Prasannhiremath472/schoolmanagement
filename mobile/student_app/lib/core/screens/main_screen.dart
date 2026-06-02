import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class MainScreen extends StatelessWidget {
  final Widget child;
  const MainScreen({super.key, required this.child});
  int _idx(BuildContext ctx) {
    final loc = GoRouterState.of(ctx).matchedLocation;
    if (loc.startsWith('/dashboard')) return 0;
    if (loc.startsWith('/lms')) return 1;
    if (loc.startsWith('/results')) return 2;
    return 0;
  }
  @override
  Widget build(BuildContext context) => Scaffold(
    body: child,
    bottomNavigationBar: BottomNavigationBar(
      currentIndex: _idx(context),
      onTap: (i) => context.go(['/dashboard', '/lms', '/results'][i]),
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.dashboard_rounded), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.menu_book_rounded), label: 'Learning'),
        BottomNavigationBarItem(icon: Icon(Icons.grade_rounded), label: 'Results'),
      ],
    ),
  );
}
