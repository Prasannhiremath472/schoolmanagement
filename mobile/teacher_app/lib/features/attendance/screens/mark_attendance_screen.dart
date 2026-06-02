import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:intl/intl.dart';

class MarkAttendanceScreen extends StatefulWidget {
  const MarkAttendanceScreen({super.key});
  @override State<MarkAttendanceScreen> createState() => _MarkAttendanceScreenState();
}

class _MarkAttendanceScreenState extends State<MarkAttendanceScreen> {
  String _date = DateFormat('yyyy-MM-dd').format(DateTime.now());
  String _selectedSection = '';
  bool _loading = false;
  List<Map<String, dynamic>> _students = [];
  Map<String, String> _attendance = {};

  Color _statusColor(String s) {
    switch (s) {
      case 'PRESENT': return Colors.green;
      case 'ABSENT': return Colors.red;
      case 'LATE': return Colors.orange;
      default: return Colors.blue;
    }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Mark Attendance'), actions: [
      IconButton(icon: const Icon(Icons.save_rounded), onPressed: _saveAttendance),
    ]),
    body: Column(children: [
      Padding(padding: const EdgeInsets.all(12), child: Row(children: [
        Expanded(child: DropdownButtonFormField<String>(decoration: const InputDecoration(labelText: 'Section', border: OutlineInputBorder()), items: const [], onChanged: (v) {})),
        const SizedBox(width: 8),
        Expanded(child: GestureDetector(onTap: _pickDate, child: InputDecorator(decoration: const InputDecoration(labelText: 'Date', border: OutlineInputBorder()), child: Text(_date)))),
      ])),
      Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
        TextButton(onPressed: () => setState(() => _students.forEach((s) => _attendance[s['studentId']] = 'PRESENT')), child: const Text('All Present', style: TextStyle(color: Colors.green))),
        TextButton(onPressed: () => setState(() => _students.forEach((s) => _attendance[s['studentId']] = 'ABSENT')), child: const Text('All Absent', style: TextStyle(color: Colors.red))),
      ]),
      Expanded(child: _loading ? const Center(child: CircularProgressIndicator()) : ListView.separated(
        itemCount: _students.length,
        separatorBuilder: (_, __) => const Divider(height: 1),
        itemBuilder: (ctx, i) {
          final student = _students[i];
          final status = _attendance[student['studentId']] ?? 'PRESENT';
          return ListTile(
            leading: CircleAvatar(child: Text(student['name']?[0] ?? '?')),
            title: Text(student['name'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600)),
            subtitle: Text(student['rollNo'] ?? '', style: const TextStyle(fontSize: 12)),
            trailing: DropdownButton<String>(
              value: status,
              underline: const SizedBox(),
              items: ['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY'].map((s) => DropdownMenuItem(value: s, child: Text(s, style: TextStyle(color: _statusColor(s), fontSize: 12, fontWeight: FontWeight.w600)))).toList(),
              onChanged: (v) => setState(() => _attendance[student['studentId']] = v!),
            ),
          );
        },
      )),
    ]),
    floatingActionButton: FloatingActionButton.extended(onPressed: _saveAttendance, icon: const Icon(Icons.save_rounded), label: const Text('Save')),
  );

  Future<void> _pickDate() async {
    final d = await showDatePicker(context: context, initialDate: DateTime.now(), firstDate: DateTime(2024), lastDate: DateTime.now());
    if (d != null) setState(() => _date = DateFormat('yyyy-MM-dd').format(d));
  }

  Future<void> _saveAttendance() async {
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Attendance saved!'), backgroundColor: Colors.green));
  }
}
