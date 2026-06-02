import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class MainScreen extends StatelessWidget {
  final Widget child;
  const MainScreen({super.key, required this.child});

  int _selectedIndex(BuildContext context) {
    final loc = GoRouterState.of(context).matchedLocation;
    if (loc.startsWith('/dashboard'))     return 0;
    if (loc.startsWith('/attendance'))    return 1;
    if (loc.startsWith('/fees'))          return 2;
    if (loc.startsWith('/timetable'))     return 3;
    if (loc.startsWith('/notifications')) return 4;
    if (loc.startsWith('/more'))          return 5;
    // Sub-pages opened from More — keep "More" tab active
    return 5;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex(context),
        onTap: (idx) {
          switch (idx) {
            case 0: context.go('/dashboard');     break;
            case 1: context.go('/attendance');    break;
            case 2: context.go('/fees');          break;
            case 3: context.go('/timetable');     break;
            case 4: context.go('/notifications'); break;
            case 5: context.go('/more');          break;
          }
        },
        selectedFontSize: 11,
        unselectedFontSize: 10,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard_rounded),              label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.how_to_reg_rounded),             label: 'Attendance'),
          BottomNavigationBarItem(icon: Icon(Icons.account_balance_wallet_rounded), label: 'Fees'),
          BottomNavigationBarItem(icon: Icon(Icons.schedule_rounded),               label: 'Timetable'),
          BottomNavigationBarItem(icon: Icon(Icons.notifications_rounded),          label: 'Alerts'),
          BottomNavigationBarItem(icon: Icon(Icons.grid_view_rounded),              label: 'More'),
        ],
      ),
    );
  }
}
