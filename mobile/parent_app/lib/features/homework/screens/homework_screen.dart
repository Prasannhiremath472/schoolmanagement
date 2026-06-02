import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:intl/intl.dart';

class HomeworkScreen extends StatefulWidget {
  const HomeworkScreen({super.key});
  @override State<HomeworkScreen> createState() => _HomeworkScreenState();
}

class _HomeworkScreenState extends State<HomeworkScreen> {
  List<dynamic> _homework = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      const storage = FlutterSecureStorage();
      final token = await storage.read(key: 'access_token');
      final slug = await storage.read(key: 'tenant_slug');
      final dio = Dio(BaseOptions(
        baseUrl: 'https://api.schoolerp.com/api/v1',
        headers: {'Authorization': 'Bearer $token', 'x-tenant-id': slug},
      ));
      final res = await dio.get('/lms/homework', queryParameters: {'limit': 30});
      setState(() { _homework = res.data['data'] ?? []; _loading = false; });
    } catch (_) { setState(() => _loading = false); }
  }

  Color _dueDateColor(String dueDate) {
    final due = DateTime.tryParse(dueDate);
    if (due == null) return Colors.grey;
    final diff = due.difference(DateTime.now()).inDays;
    if (diff < 0) return Colors.red;
    if (diff <= 1) return Colors.orange;
    return Colors.green;
  }

  String _dueDateLabel(String dueDate) {
    final due = DateTime.tryParse(dueDate);
    if (due == null) return '—';
    final diff = due.difference(DateTime.now()).inDays;
    if (diff < 0) return 'Overdue';
    if (diff == 0) return 'Due Today';
    if (diff == 1) return 'Due Tomorrow';
    return 'Due ${DateFormat('dd MMM').format(due)}';
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Homework')),
    body: _loading
        ? const Center(child: CircularProgressIndicator())
        : RefreshIndicator(
            onRefresh: _load,
            child: _homework.isEmpty
                ? const Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                    Icon(Icons.assignment_rounded, size: 64, color: Colors.grey),
                    SizedBox(height: 12),
                    Text('No homework assigned', style: TextStyle(color: Colors.grey, fontSize: 16)),
                  ]))
                : ListView.separated(
                    padding: const EdgeInsets.all(12),
                    itemCount: _homework.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 8),
                    itemBuilder: (ctx, i) {
                      final hw = _homework[i];
                      final due = hw['dueDate'] as String? ?? '';
                      final color = _dueDateColor(due);
                      return Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                          side: BorderSide(color: color.withOpacity(0.3), width: 1.5),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                              Expanded(child: Text(hw['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15))),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),
                                child: Text(_dueDateLabel(due), style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w700)),
                              ),
                            ]),
                            const SizedBox(height: 6),
                            Row(children: [
                              Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3), decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(8)), child: Text(hw['subject']?['name'] ?? 'General', style: TextStyle(color: Colors.blue.shade700, fontSize: 11, fontWeight: FontWeight.w600))),
                            ]),
                            if (hw['description'] != null) ...[
                              const SizedBox(height: 8),
                              Text(hw['description'], maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 13, color: Colors.black54)),
                            ],
                            if ((hw['attachments'] as List?)?.isNotEmpty ?? false) ...[
                              const SizedBox(height: 8),
                              Row(children: [const Icon(Icons.attach_file_rounded, size: 14, color: Colors.grey), const SizedBox(width: 4), Text('${(hw['attachments'] as List).length} attachment(s)', style: const TextStyle(fontSize: 12, color: Colors.grey))]),
                            ],
                          ]),
                        ),
                      );
                    }),
          ),
  );
}
