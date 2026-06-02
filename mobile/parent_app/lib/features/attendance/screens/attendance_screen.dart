import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/attendance_bloc.dart';
import 'package:intl/intl.dart';

class AttendanceScreen extends StatefulWidget {
  const AttendanceScreen({super.key});
  @override State<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends State<AttendanceScreen> {
  final now = DateTime.now();
  late DateTime fromDate;
  late DateTime toDate;

  @override
  void initState() {
    super.initState();
    fromDate = DateTime(now.year, now.month, 1);
    toDate = DateTime(now.year, now.month + 1, 0);
    _loadAttendance();
  }

  void _loadAttendance() {
    context.read<AttendanceBloc>().add(AttendanceLoadRequested(
      studentId: 'student-id-from-state',
      fromDate: DateFormat('yyyy-MM-dd').format(fromDate),
      toDate: DateFormat('yyyy-MM-dd').format(toDate),
    ));
  }

  Color _statusColor(String status) {
    switch (status) {
      case 'PRESENT': return Colors.green;
      case 'ABSENT': return Colors.red;
      case 'LATE': return Colors.orange;
      case 'HALF_DAY': return Colors.yellow.shade700;
      default: return Colors.grey;
    }
  }

  IconData _statusIcon(String status) {
    switch (status) {
      case 'PRESENT': return Icons.check_circle;
      case 'ABSENT': return Icons.cancel;
      case 'LATE': return Icons.watch_later;
      default: return Icons.help_outline;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Attendance')),
      body: BlocBuilder<AttendanceBloc, AttendanceState>(
        builder: (ctx, state) {
          if (state is AttendanceLoading) return const Center(child: CircularProgressIndicator());
          if (state is AttendanceError) return Center(child: Text('Error: ${state.message}'));
          if (state is AttendanceLoaded) {
            final present = (state.meta['present'] ?? 0);
            final absent = (state.meta['absent'] ?? 0);
            final total = (state.meta['total'] ?? 0);
            final percentage = state.meta['percentage'] ?? 0;

            return Column(
              children: [
                Container(
                  margin: const EdgeInsets.all(16),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(color: Theme.of(context).colorScheme.primary, borderRadius: BorderRadius.circular(12)),
                  child: Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
                    _SummaryItem(label: 'Present', value: '$present', color: Colors.greenAccent),
                    _SummaryItem(label: 'Absent', value: '$absent', color: Colors.redAccent),
                    _SummaryItem(label: 'Total', value: '$total', color: Colors.white),
                    _SummaryItem(label: 'Rate', value: '$percentage%', color: Colors.yellowAccent),
                  ]),
                ),
                Expanded(
                  child: ListView.separated(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: state.records.length,
                    separatorBuilder: (_, __) => const Divider(height: 1),
                    itemBuilder: (ctx, i) {
                      final record = state.records[i];
                      final status = record['status'] as String? ?? 'UNKNOWN';
                      return ListTile(
                        leading: CircleAvatar(backgroundColor: _statusColor(status).withOpacity(0.15), child: Icon(_statusIcon(status), color: _statusColor(status), size: 20)),
                        title: Text(DateFormat('EEEE, MMM d, yyyy').format(DateTime.parse(record['date'])), style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                        trailing: Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: _statusColor(status).withOpacity(0.1), borderRadius: BorderRadius.circular(20)), child: Text(status, style: TextStyle(color: _statusColor(status), fontSize: 12, fontWeight: FontWeight.w600))),
                      );
                    },
                  ),
                ),
              ],
            );
          }
          return const Center(child: Text('Select a student to view attendance'));
        },
      ),
    );
  }
}

class _SummaryItem extends StatelessWidget {
  final String label, value;
  final Color color;
  const _SummaryItem({required this.label, required this.value, required this.color});

  @override
  Widget build(BuildContext context) => Column(children: [
    Text(value, style: TextStyle(color: color, fontSize: 24, fontWeight: FontWeight.w800)),
    const SizedBox(height: 4),
    Text(label, style: TextStyle(color: color.withOpacity(0.8), fontSize: 12)),
  ]);
}
