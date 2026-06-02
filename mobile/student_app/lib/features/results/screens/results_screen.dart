import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class ResultsScreen extends StatelessWidget {
  const ResultsScreen({super.key});

  final List<Map<String, dynamic>> _results = const [
    {'subject': 'Mathematics', 'marks': 88, 'max': 100, 'grade': 'A'},
    {'subject': 'Science', 'marks': 92, 'max': 100, 'grade': 'A+'},
    {'subject': 'English', 'marks': 78, 'max': 100, 'grade': 'B+'},
    {'subject': 'Hindi', 'marks': 85, 'max': 100, 'grade': 'A'},
    {'subject': 'Social Studies', 'marks': 76, 'max': 100, 'grade': 'B+'},
  ];

  Color _gradeColor(String grade) {
    if (grade.startsWith('A')) return Colors.green;
    if (grade.startsWith('B')) return Colors.blue;
    if (grade.startsWith('C')) return Colors.orange;
    return Colors.red;
  }

  @override
  Widget build(BuildContext context) {
    final total = _results.fold<int>(0, (sum, r) => sum + (r['marks'] as int));
    final max = _results.fold<int>(0, (sum, r) => sum + (r['max'] as int));
    final pct = (total / max * 100).toStringAsFixed(1);

    return Scaffold(
      appBar: AppBar(title: const Text('My Results')),
      body: ListView(padding: const EdgeInsets.all(16), children: [
        Card(color: Theme.of(context).colorScheme.primary, child: Padding(padding: const EdgeInsets.all(20), child: Column(children: [
          const Text('Unit Test 1 | Class 10-A', style: TextStyle(color: Colors.white70, fontSize: 13)),
          const SizedBox(height: 8),
          Text('$pct%', style: const TextStyle(color: Colors.white, fontSize: 40, fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
            Column(children: [Text('$total', style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)), const Text('Marks', style: TextStyle(color: Colors.white70, fontSize: 12))]),
            Column(children: [Text('$max', style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)), const Text('Total', style: TextStyle(color: Colors.white70, fontSize: 12))]),
            Column(children: [Text(_results.length == _results.where((r) => r['marks'] >= 33).length ? 'PASS' : 'FAIL', style: const TextStyle(color: Colors.greenAccent, fontSize: 20, fontWeight: FontWeight.w700)), const Text('Status', style: TextStyle(color: Colors.white70, fontSize: 12))]),
          ]),
        ]))),
        const SizedBox(height: 16),
        const Text('Subject-wise Performance', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
        const SizedBox(height: 12),
        ..._results.map((r) {
          final pct = (r['marks'] as int) / (r['max'] as int);
          return Card(margin: const EdgeInsets.only(bottom: 10), child: Padding(padding: const EdgeInsets.all(12), child: Column(children: [
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
              Text(r['subject'] as String, style: const TextStyle(fontWeight: FontWeight.w700)),
              Row(children: [
                Text('${r['marks']}/${r['max']}', style: const TextStyle(fontWeight: FontWeight.w600)),
                const SizedBox(width: 8),
                Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: _gradeColor(r['grade'] as String).withOpacity(0.1), borderRadius: BorderRadius.circular(20)), child: Text(r['grade'] as String, style: TextStyle(color: _gradeColor(r['grade'] as String), fontWeight: FontWeight.w700, fontSize: 12))),
              ]),
            ]),
            const SizedBox(height: 8),
            ClipRRect(borderRadius: BorderRadius.circular(4), child: LinearProgressIndicator(value: pct, backgroundColor: Colors.grey.shade200, valueColor: AlwaysStoppedAnimation(_gradeColor(r['grade'] as String)), minHeight: 8)),
          ])));
        }).toList(),
      ]),
    );
  }
}
