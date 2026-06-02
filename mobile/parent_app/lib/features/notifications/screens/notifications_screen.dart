import 'package:flutter/material.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  final List<Map<String, dynamic>> _notifications = const [
    {'title': 'Attendance Alert', 'body': 'Rahul was absent today', 'time': '10:30 AM', 'type': 'attendance', 'isRead': false},
    {'title': 'Fee Reminder', 'body': 'Term 2 fee due on 31 Oct', 'time': 'Yesterday', 'type': 'fee', 'isRead': false},
    {'title': 'Exam Result', 'body': 'Unit Test results published', 'time': '2 days ago', 'type': 'exam', 'isRead': true},
    {'title': 'Holiday Notice', 'body': 'School holiday on Diwali', 'time': '3 days ago', 'type': 'general', 'isRead': true},
  ];

  Color _typeColor(String type) {
    switch (type) {
      case 'attendance': return Colors.orange;
      case 'fee': return Colors.red;
      case 'exam': return Colors.blue;
      default: return Colors.purple;
    }
  }

  IconData _typeIcon(String type) {
    switch (type) {
      case 'attendance': return Icons.how_to_reg_rounded;
      case 'fee': return Icons.account_balance_wallet_rounded;
      case 'exam': return Icons.grade_rounded;
      default: return Icons.notifications_rounded;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        actions: [TextButton(onPressed: () {}, child: const Text('Mark all read'))],
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: _notifications.length,
        separatorBuilder: (_, __) => const SizedBox(height: 8),
        itemBuilder: (ctx, i) {
          final notif = _notifications[i];
          final color = _typeColor(notif['type'] as String);
          final isRead = notif['isRead'] as bool;

          return Container(
            decoration: BoxDecoration(
              color: isRead ? Theme.of(context).cardColor : color.withOpacity(0.05),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: isRead ? Colors.transparent : color.withOpacity(0.2)),
            ),
            child: ListTile(
              leading: Stack(
                clipBehavior: Clip.none,
                children: [
                  CircleAvatar(backgroundColor: color.withOpacity(0.15), child: Icon(_typeIcon(notif['type'] as String), color: color, size: 22)),
                  if (!isRead) Positioned(top: -2, right: -2, child: Container(width: 10, height: 10, decoration: BoxDecoration(color: color, shape: BoxShape.circle))),
                ],
              ),
              title: Text(notif['title'] as String, style: TextStyle(fontWeight: isRead ? FontWeight.w500 : FontWeight.w700, fontSize: 14)),
              subtitle: Text(notif['body'] as String, style: const TextStyle(fontSize: 13)),
              trailing: Text(notif['time'] as String, style: const TextStyle(fontSize: 11, color: Colors.grey)),
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            ),
          );
        },
      ),
    );
  }
}
