import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LibraryScreen extends StatefulWidget {
  const LibraryScreen({super.key});
  @override State<LibraryScreen> createState() => _LibraryScreenState();
}

class _LibraryScreenState extends State<LibraryScreen> with SingleTickerProviderStateMixin {
  late TabController _tc;
  List<dynamic> _books = [], _activeIssues = [];
  bool _loading = true;
  String _search = '';

  @override
  void initState() { super.initState(); _tc = TabController(length: 2, vsync: this); _load(); }

  Future<void> _load() async {
    try {
      const storage = FlutterSecureStorage();
      final token = await storage.read(key: 'access_token');
      final slug = await storage.read(key: 'tenant_slug');
      final dio = Dio(BaseOptions(baseUrl: 'https://api.schoolerp.com/api/v1', headers: {'Authorization': 'Bearer $token', 'x-tenant-id': slug}));
      final results = await Future.wait([
        dio.get('/library/books', queryParameters: {'limit': 30}),
        dio.get('/library/active-issues', queryParameters: {'limit': 20}),
      ]);
      setState(() { _books = results[0].data['data'] ?? []; _activeIssues = results[1].data['data'] ?? []; _loading = false; });
    } catch (_) { setState(() => _loading = false); }
  }

  List<dynamic> get _filteredBooks => _search.isEmpty ? _books : _books.where((b) => (b['title'] as String? ?? '').toLowerCase().contains(_search.toLowerCase()) || (b['author'] as String? ?? '').toLowerCase().contains(_search.toLowerCase())).toList();

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Library'), bottom: TabBar(controller: _tc, tabs: const [Tab(text: 'Books'), Tab(text: 'My Issues')])),
    body: _loading ? const Center(child: CircularProgressIndicator()) :
      TabBarView(controller: _tc, children: [
        Column(children: [
          Padding(padding: const EdgeInsets.all(12), child: TextField(onChanged: (v) => setState(() => _search = v), decoration: InputDecoration(hintText: 'Search books...', prefixIcon: const Icon(Icons.search_rounded), border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), filled: true, fillColor: Colors.grey.shade100, contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8)))),
          Expanded(child: _filteredBooks.isEmpty ? const Center(child: Text('No books found', style: TextStyle(color: Colors.grey))) :
            ListView.separated(padding: const EdgeInsets.symmetric(horizontal: 12), itemCount: _filteredBooks.length, separatorBuilder: (_, __) => const Divider(height: 1),
              itemBuilder: (ctx, i) {
                final b = _filteredBooks[i];
                final available = (b['availableCopies'] as int? ?? 0) > 0;
                return ListTile(
                  leading: Container(width: 44, height: 58, decoration: BoxDecoration(color: Colors.primaries[i % Colors.primaries.length].shade100, borderRadius: BorderRadius.circular(6)), child: Icon(Icons.menu_book_rounded, color: Colors.primaries[i % Colors.primaries.length].shade700)),
                  title: Text(b['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14), maxLines: 2, overflow: TextOverflow.ellipsis),
                  subtitle: Text(b['author'] ?? '', style: const TextStyle(fontSize: 12)),
                  trailing: Chip(label: Text(available ? 'Available' : 'Issued', style: const TextStyle(fontSize: 10, color: Colors.white)), backgroundColor: available ? Colors.green : Colors.red, padding: EdgeInsets.zero),
                );
              })),
        ]),
        _activeIssues.isEmpty ? Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Icon(Icons.library_books_rounded, size: 64, color: Colors.grey.shade300),
          const SizedBox(height: 12),
          const Text('No books currently issued', style: TextStyle(color: Colors.grey)),
        ])) :
        ListView.separated(padding: const EdgeInsets.all(12), itemCount: _activeIssues.length, separatorBuilder: (_, __) => const SizedBox(height: 8),
          itemBuilder: (ctx, i) {
            final issue = _activeIssues[i];
            final due = DateTime.tryParse(issue['dueDate'] ?? '');
            final isOverdue = due != null && due.isBefore(DateTime.now());
            return Card(shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: isOverdue ? Colors.red.shade200 : Colors.green.shade200, width: 1.5)),
              child: Padding(padding: const EdgeInsets.all(12), child: Row(children: [
                Container(width: 44, height: 58, decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(6)), child: Icon(Icons.book_rounded, color: Colors.blue.shade700)),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(issue['book']?['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14), maxLines: 2),
                  Text('Issued: ${issue['issueDate']?.toString().split('T')[0] ?? '—'}', style: const TextStyle(fontSize: 11, color: Colors.grey)),
                  Row(children: [
                    Icon(isOverdue ? Icons.warning_rounded : Icons.calendar_today_rounded, size: 14, color: isOverdue ? Colors.red : Colors.grey),
                    const SizedBox(width: 4),
                    Text('Due: ${issue['dueDate']?.toString().split('T')[0] ?? '—'}', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: isOverdue ? Colors.red : Colors.grey)),
                  ]),
                ])),
                if (isOverdue) Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: Colors.red.shade50, borderRadius: BorderRadius.circular(8)), child: Text('Fine: ₹${issue['fine'] ?? 0}', style: const TextStyle(color: Colors.red, fontSize: 11, fontWeight: FontWeight.w700))),
              ])),
            );
          }),
      ]),
  );

  @override void dispose() { _tc.dispose(); super.dispose(); }
}
