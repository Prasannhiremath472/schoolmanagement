import 'package:flutter/material.dart';

class LmsScreen extends StatefulWidget {
  const LmsScreen({super.key});
  @override State<LmsScreen> createState() => _LmsScreenState();
}

class _LmsScreenState extends State<LmsScreen> with SingleTickerProviderStateMixin {
  late TabController _tc;
  @override void initState() { super.initState(); _tc = TabController(length: 4, vsync: this); }
  @override void dispose() { _tc.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Learning'), bottom: TabBar(controller: _tc, isScrollable: true, tabs: const [Tab(text: 'Materials'), Tab(text: 'Assignments'), Tab(text: 'Live Classes'), Tab(text: 'Quizzes')])),
    body: TabBarView(controller: _tc, children: [
      // Materials
      ListView(padding: const EdgeInsets.all(16), children: [
        ...['Chapter 3: Algebra', 'Physics Notes', 'English Grammar'].asMap().entries.map((e) => Card(margin: const EdgeInsets.only(bottom: 8), child: ListTile(
          leading: CircleAvatar(backgroundColor: Colors.blue.shade50, child: const Icon(Icons.picture_as_pdf_rounded, color: Colors.blue)),
          title: Text(e.value, style: const TextStyle(fontWeight: FontWeight.w600)),
          subtitle: const Text('Mathematics | PDF'),
          trailing: IconButton(icon: const Icon(Icons.download_rounded), onPressed: () {}),
        ))),
      ]),
      // Assignments
      ListView(padding: const EdgeInsets.all(16), children: [
        ...['Write essay on Climate Change', 'Draw solar system', 'Solve 10 problems'].asMap().entries.map((e) => Card(margin: const EdgeInsets.only(bottom: 8), child: ListTile(
          leading: CircleAvatar(backgroundColor: Colors.orange.shade50, child: const Icon(Icons.assignment_rounded, color: Colors.orange)),
          title: Text(e.value, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
          subtitle: Text('Due: ${DateTime.now().add(Duration(days: e.key + 1)).day} Oct'),
          trailing: ElevatedButton(onPressed: () {}, style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), textStyle: const TextStyle(fontSize: 12)), child: const Text('Submit')),
        ))),
      ]),
      // Live Classes
      ListView(padding: const EdgeInsets.all(16), children: [
        ...['Math - Quadratic Equations', 'Physics - Optics', 'Chemistry Lab'].asMap().entries.map((e) => Card(margin: const EdgeInsets.only(bottom: 8), child: ListTile(
          leading: const CircleAvatar(backgroundColor: Color(0x1FFF0000), child: Icon(Icons.video_call_rounded, color: Colors.red)),
          title: Text(e.value, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
          subtitle: Text('${DateTime.now().add(Duration(hours: e.key + 1)).hour}:00 PM Today'),
          trailing: ElevatedButton(onPressed: () {}, style: ElevatedButton.styleFrom(backgroundColor: Colors.red, foregroundColor: Colors.white, padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4), textStyle: const TextStyle(fontSize: 12)), child: const Text('Join')),
        ))),
      ]),
      // Quizzes
      ListView(padding: const EdgeInsets.all(16), children: [
        ...['Algebra Quiz', 'Grammar Test', 'Science MCQ'].asMap().entries.map((e) => Card(margin: const EdgeInsets.only(bottom: 8), child: ListTile(
          leading: const CircleAvatar(backgroundColor: Color(0x1F9C27B0), child: Icon(Icons.quiz_rounded, color: Colors.purple)),
          title: Text(e.value, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
          subtitle: Text('${10 + e.key * 5} questions | ${20 + e.key * 10} min'),
          trailing: ElevatedButton(onPressed: () {}, style: ElevatedButton.styleFrom(backgroundColor: Colors.purple, foregroundColor: Colors.white, padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4), textStyle: const TextStyle(fontSize: 12)), child: const Text('Start')),
        ))),
      ]),
    ]),
  );
}
