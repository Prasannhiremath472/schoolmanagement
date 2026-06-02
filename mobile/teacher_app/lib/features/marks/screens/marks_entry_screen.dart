import 'package:flutter/material.dart';

class MarksEntryScreen extends StatefulWidget {
  const MarksEntryScreen({super.key});
  @override State<MarksEntryScreen> createState() => _MarksEntryScreenState();
}

class _MarksEntryScreenState extends State<MarksEntryScreen> {
  final List<Map<String, dynamic>> _students = [
    {'id': '1', 'name': 'Aarav Sharma', 'rollNo': '01'},
    {'id': '2', 'name': 'Priya Patel', 'rollNo': '02'},
    {'id': '3', 'name': 'Rohan Gupta', 'rollNo': '03'},
  ];
  final Map<String, TextEditingController> _controllers = {};

  @override
  void initState() {
    super.initState();
    for (var s in _students) { _controllers[s['id']] = TextEditingController(); }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Marks Entry')),
    body: Column(children: [
      Padding(padding: const EdgeInsets.all(12), child: Row(children: [
        Expanded(child: DropdownButtonFormField<String>(decoration: const InputDecoration(labelText: 'Subject', border: OutlineInputBorder()), items: ['Mathematics', 'Science', 'English'].map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(), onChanged: (_) {})),
        const SizedBox(width: 8),
        Expanded(child: DropdownButtonFormField<String>(decoration: const InputDecoration(labelText: 'Exam', border: OutlineInputBorder()), items: ['Unit Test 1', 'Mid Term'].map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(), onChanged: (_) {})),
      ])),
      Expanded(child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 12),
        itemCount: _students.length,
        separatorBuilder: (_, __) => const SizedBox(height: 8),
        itemBuilder: (ctx, i) {
          final student = _students[i];
          return Card(child: Padding(padding: const EdgeInsets.all(12), child: Row(children: [
            CircleAvatar(child: Text(student['rollNo']!), radius: 20),
            const SizedBox(width: 12),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(student['name']!, style: const TextStyle(fontWeight: FontWeight.w600))])),
            SizedBox(width: 100, child: TextField(controller: _controllers[student['id']], keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Marks /100', border: OutlineInputBorder(), contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 8)), textAlign: TextAlign.center)),
            const SizedBox(width: 8),
            Checkbox(value: false, onChanged: (_) {}, tristate: false),
            const Text('A', style: TextStyle(fontSize: 12)),
          ])));
        },
      )),
    ]),
    floatingActionButton: FloatingActionButton.extended(onPressed: () => ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Marks saved!'), backgroundColor: Colors.green)), icon: const Icon(Icons.save_rounded), label: const Text('Save Marks')),
  );
}
