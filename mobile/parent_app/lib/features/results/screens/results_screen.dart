import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:intl/intl.dart';

class ResultsScreen extends StatefulWidget {
  const ResultsScreen({super.key});
  @override State<ResultsScreen> createState() => _ResultsScreenState();
}

class _ResultsScreenState extends State<ResultsScreen> {
  List<dynamic> _exams = [];
  Map<String, dynamic>? _selectedResult;
  bool _loading = false;
  String? _selectedExamId;

  @override
  void initState() {
    super.initState();
    _loadExams();
  }

  Future<void> _loadExams() async {
    setState(() => _loading = true);
    try {
      const storage = FlutterSecureStorage();
      final token = await storage.read(key: 'access_token');
      final slug = await storage.read(key: 'tenant_slug');
      final dio = Dio(BaseOptions(baseUrl: 'https://api.schoolerp.com/api/v1', headers: {'Authorization': 'Bearer $token', 'x-tenant-id': slug}));
      final res = await dio.get('/examinations/schedules', queryParameters: {'isPublished': true});
      setState(() { _exams = res.data['data'] ?? []; _loading = false; });
    } catch (_) { setState(() => _loading = false); }
  }

  Future<void> _loadResult(String examId, String studentId) async {
    setState(() { _loading = true; _selectedExamId = examId; });
    try {
      const storage = FlutterSecureStorage();
      final token = await storage.read(key: 'access_token');
      final slug = await storage.read(key: 'tenant_slug');
      final dio = Dio(BaseOptions(baseUrl: 'https://api.schoolerp.com/api/v1', headers: {'Authorization': 'Bearer $token', 'x-tenant-id': slug}));
      final res = await dio.get('/examinations/results/student/$studentId', queryParameters: {'examScheduleId': examId});
      setState(() { _selectedResult = res.data['data']; _loading = false; });
    } catch (_) { setState(() => _loading = false); }
  }

  Color _gradeColor(String grade) {
    if (grade.startsWith('A')) return Colors.green;
    if (grade.startsWith('B')) return Colors.blue;
    if (grade.startsWith('C')) return Colors.orange;
    return Colors.red;
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Results')),
    body: _loading
        ? const Center(child: CircularProgressIndicator())
        : _selectedResult != null
            ? _buildResultDetail()
            : _buildExamList(),
  );

  Widget _buildExamList() => Column(children: [
    Container(padding: const EdgeInsets.all(16), color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
      child: const Text('Select an exam to view results', style: TextStyle(fontWeight: FontWeight.w600))),
    Expanded(child: _exams.isEmpty
        ? const Center(child: Text('No exam results available', style: TextStyle(color: Colors.grey)))
        : ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: _exams.length,
            separatorBuilder: (_, __) => const SizedBox(height: 8),
            itemBuilder: (ctx, i) {
              final exam = _exams[i];
              return Card(child: ListTile(
                leading: const CircleAvatar(child: Icon(Icons.grade_rounded)),
                title: Text(exam['name'] ?? '', style: const TextStyle(fontWeight: FontWeight.w700)),
                subtitle: Text('${exam['examType']?['name'] ?? ''} | Class ${exam['class']?['name'] ?? ''}'),
                trailing: const Icon(Icons.chevron_right_rounded),
                onTap: () => _loadResult(exam['id'], 'STUDENT_ID'), // Replace with actual student ID from state
              ));
            })),
  ]);

  Widget _buildResultDetail() {
    final summary = _selectedResult?['summary'] as Map<String, dynamic>? ?? {};
    final results = (_selectedResult?['results'] as List<dynamic>?) ?? [];

    return Column(children: [
      // Summary header
      Container(
        width: double.infinity,
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(gradient: LinearGradient(colors: [Theme.of(context).colorScheme.primary, Theme.of(context).colorScheme.primary.withOpacity(0.7)])),
        child: Column(children: [
          Text('${summary['percentage']?.toStringAsFixed(1) ?? '—'}%', style: const TextStyle(color: Colors.white, fontSize: 48, fontWeight: FontWeight.w800)),
          Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
            _summaryCol('Marks', '${summary['totalMarks']}/${summary['maxMarks']}'),
            _summaryCol('CGPA', '${double.tryParse(summary['cgpa']?.toString() ?? '0')?.toStringAsFixed(2) ?? '—'}'),
            _summaryCol('Grade', '${summary['grade'] ?? '—'}'),
            _summaryCol('Result', summary['overallPass'] == true ? 'PASS' : 'FAIL'),
          ]),
        ]),
      ),
      // Subject list
      Expanded(child: ListView.separated(
        padding: const EdgeInsets.all(12),
        itemCount: results.length,
        separatorBuilder: (_, __) => const Divider(height: 1),
        itemBuilder: (ctx, i) {
          final r = results[i];
          final grade = r['grade'] as String? ?? '—';
          return ListTile(
            leading: CircleAvatar(backgroundColor: _gradeColor(grade).withOpacity(0.1), child: Text(grade, style: TextStyle(color: _gradeColor(grade), fontWeight: FontWeight.w800, fontSize: 13))),
            title: Text(r['subject']?['name'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
            subtitle: LinearProgressIndicator(value: double.parse(r['marksObtained'].toString()) / double.parse(r['maxMarks'].toString()), backgroundColor: Colors.grey.shade200, valueColor: AlwaysStoppedAnimation(_gradeColor(grade))),
            trailing: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Text('${r['marksObtained']}/${r['maxMarks']}', style: const TextStyle(fontWeight: FontWeight.w700)),
              Text(r['isPass'] == true ? 'PASS' : 'FAIL', style: TextStyle(fontSize: 10, color: r['isPass'] == true ? Colors.green : Colors.red)),
            ]),
          );
        },
      )),
      Padding(padding: const EdgeInsets.all(12), child: OutlinedButton.icon(icon: const Icon(Icons.arrow_back_rounded), label: const Text('Back to Exams'), onPressed: () => setState(() { _selectedResult = null; _selectedExamId = null; }))),
    ]);
  }

  Widget _summaryCol(String label, String value) => Column(children: [
    Text(value, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
    Text(label, style: const TextStyle(color: Colors.white70, fontSize: 11)),
  ]);
}
