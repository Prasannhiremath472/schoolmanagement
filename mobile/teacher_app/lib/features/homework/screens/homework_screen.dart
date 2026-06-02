import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class HomeworkScreen extends StatelessWidget {
  const HomeworkScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Homework')),
    body: ListView(padding: const EdgeInsets.all(16), children: [
      ...['Mathematics: Solve ex 3.4', 'Science: Draw diagram', 'English: Write essay'].asMap().entries.map((e) => Card(margin: const EdgeInsets.only(bottom: 10), child: ListTile(
        leading: const CircleAvatar(child: Icon(Icons.assignment_rounded)),
        title: Text(e.value, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text('Due: ${DateFormat('dd MMM yyyy').format(DateTime.now().add(Duration(days: e.key + 1)))}'),
        trailing: Chip(label: Text('${3 + e.key} subs'), backgroundColor: Colors.blue.shade50),
      ))),
    ]),
    floatingActionButton: FloatingActionButton.extended(onPressed: () => _showAddHomework(context), icon: const Icon(Icons.add), label: const Text('Assign')),
  );

  void _showAddHomework(BuildContext context) => showModalBottomSheet(context: context, isScrollControlled: true, shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))), builder: (_) => Padding(padding: EdgeInsets.fromLTRB(16, 16, 16, MediaQuery.of(context).viewInsets.bottom + 16), child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
    const Text('Assign Homework', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
    const SizedBox(height: 16),
    const TextField(decoration: InputDecoration(labelText: 'Title', border: OutlineInputBorder())),
    const SizedBox(height: 12),
    const TextField(decoration: InputDecoration(labelText: 'Description', border: OutlineInputBorder()), maxLines: 3),
    const SizedBox(height: 12),
    const TextField(decoration: InputDecoration(labelText: 'Due Date', border: OutlineInputBorder(), suffixIcon: Icon(Icons.calendar_today))),
    const SizedBox(height: 16),
    SizedBox(width: double.infinity, child: ElevatedButton(onPressed: () => Navigator.pop(context), child: const Text('Assign'))),
  ])));
}
