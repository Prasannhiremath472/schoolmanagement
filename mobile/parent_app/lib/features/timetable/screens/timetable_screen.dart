import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class TimetableScreen extends StatefulWidget {
  const TimetableScreen({super.key});
  @override State<TimetableScreen> createState() => _TimetableScreenState();
}

class _TimetableScreenState extends State<TimetableScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List<dynamic> _slots = [];
  bool _loading = true;
  int _selectedDay = DateTime.now().weekday - 1; // 0=Mon, 4=Fri

  final _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  final _dayKeys = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  final _colors = [Colors.blue, Colors.purple, Colors.green, Colors.orange, Colors.red, Colors.teal, Colors.indigo];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _days.length, vsync: this, initialIndex: _selectedDay);
    _loadTimetable();
  }

  Future<void> _loadTimetable() async {
    try {
      const storage = FlutterSecureStorage();
      final token = await storage.read(key: 'access_token');
      final slug = await storage.read(key: 'tenant_slug');
      final sectionId = await storage.read(key: 'section_id'); // Stored during login

      if (sectionId == null) { setState(() => _loading = false); return; }

      final dio = Dio(BaseOptions(
        baseUrl: 'https://api.schoolerp.com/api/v1',
        headers: {'Authorization': 'Bearer $token', 'x-tenant-id': slug},
      ));

      final res = await dio.get('/academic/timetable/$sectionId');
      setState(() { _slots = res.data['data'] ?? []; _loading = false; });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  List<dynamic> _slotsForDay(String dayKey) {
    final daySlots = _slots.where((s) => s['dayOfWeek'] == dayKey).toList();
    daySlots.sort((a, b) => (a['startTime'] as String).compareTo(b['startTime'] as String));
    return daySlots;
  }

  Color _subjectColor(String subjectName) {
    final hash = subjectName.hashCode;
    return _colors[hash.abs() % _colors.length];
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Text('Timetable'),
      bottom: TabBar(
        controller: _tabController,
        isScrollable: true,
        tabs: _days.map((d) => Tab(text: d.substring(0, 3))).toList(),
      ),
    ),
    body: _loading
        ? const Center(child: CircularProgressIndicator())
        : _slots.isEmpty
            ? Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                Icon(Icons.schedule_rounded, size: 64, color: Colors.grey.shade400),
                const SizedBox(height: 16),
                const Text('No timetable found', style: TextStyle(color: Colors.grey, fontSize: 16)),
              ]))
            : TabBarView(
                controller: _tabController,
                children: _dayKeys.map((dayKey) {
                  final daySlots = _slotsForDay(dayKey);
                  if (daySlots.isEmpty) return const Center(child: Text('No classes', style: TextStyle(color: Colors.grey)));

                  return ListView.separated(
                    padding: const EdgeInsets.all(16),
                    itemCount: daySlots.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 8),
                    itemBuilder: (ctx, i) {
                      final slot = daySlots[i];
                      final subjectName = slot['subject']?['name'] ?? 'Unknown';
                      final teacherName = slot['teacher'] != null ? '${slot['teacher']['firstName']} ${slot['teacher']['lastName']}' : '—';
                      final color = _subjectColor(subjectName);

                      return Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                          side: BorderSide(color: color.withOpacity(0.3), width: 1.5),
                        ),
                        child: ListTile(
                          leading: Container(
                            width: 50,
                            padding: const EdgeInsets.symmetric(vertical: 4),
                            decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
                            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                              Text(slot['startTime'] ?? '', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: color)),
                              Text(slot['endTime'] ?? '', style: TextStyle(fontSize: 9, color: color.withOpacity(0.8))),
                            ]),
                          ),
                          title: Text(subjectName, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                          subtitle: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            Text(teacherName, style: const TextStyle(fontSize: 12)),
                            if (slot['roomNo'] != null) Text('Room: ${slot['roomNo']}', style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
                          ]),
                          trailing: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(12)),
                            child: Text(subjectName.substring(0, subjectName.length.clamp(0, 3)), style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700)),
                          ),
                        ),
                      );
                    },
                  );
                }).toList(),
              ),
  );

  @override
  void dispose() { _tabController.dispose(); super.dispose(); }
}
