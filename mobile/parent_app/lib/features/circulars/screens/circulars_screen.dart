import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:intl/intl.dart';

class CircularsScreen extends StatefulWidget {
  const CircularsScreen({super.key});
  @override State<CircularsScreen> createState() => _CircularsScreenState();
}

class _CircularsScreenState extends State<CircularsScreen> {
  List<dynamic> _circulars = [];
  List<dynamic> _announcements = [];
  bool _loading = true;
  int _tab = 0;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      const storage = FlutterSecureStorage();
      final token = await storage.read(key: 'access_token');
      final slug = await storage.read(key: 'tenant_slug');

      final dio = Dio(BaseOptions(
        baseUrl: 'https://api.schoolerp.com/api/v1',
        headers: {'Authorization': 'Bearer $token', 'x-tenant-id': slug},
      ));

      final results = await Future.wait([
        dio.get('/communication/circulars', queryParameters: {'limit': 30}),
        dio.get('/communication/announcements', queryParameters: {'limit': 30}),
      ]);

      setState(() {
        _circulars = results[0].data['data'] ?? [];
        _announcements = results[1].data['data'] ?? [];
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  Future<void> _openFile(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) await launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  Widget _buildCircularCard(Map<String, dynamic> circular) => Card(
    margin: const EdgeInsets.only(bottom: 12),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    child: Padding(
      padding: const EdgeInsets.all(16),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3), decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(12)), child: Text(circular['circularNo'] ?? '', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Colors.blue.shade700))),
          Text(DateFormat('dd MMM yyyy').format(DateTime.parse(circular['issuedDate'] ?? DateTime.now().toIso8601String())), style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
        ]),
        const SizedBox(height: 8),
        Text(circular['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
        const SizedBox(height: 4),
        Text(circular['content'] ?? '', maxLines: 3, overflow: TextOverflow.ellipsis, style: TextStyle(color: Colors.grey.shade700, fontSize: 13)),
        if (circular['fileUrl'] != null) ...[
          const SizedBox(height: 8),
          TextButton.icon(
            icon: const Icon(Icons.attach_file_rounded, size: 16),
            label: const Text('View Attachment', style: TextStyle(fontSize: 13)),
            onPressed: () => _openFile(circular['fileUrl']),
          ),
        ],
      ]),
    ),
  );

  Widget _buildAnnouncementCard(Map<String, dynamic> ann) => Card(
    margin: const EdgeInsets.only(bottom: 12),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    child: Padding(
      padding: const EdgeInsets.all(16),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          CircleAvatar(backgroundColor: Colors.orange.shade100, radius: 18, child: Icon(Icons.announcement_rounded, color: Colors.orange.shade700, size: 18)),
          const SizedBox(width: 10),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(ann['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
            Text(ann['createdAt'] != null ? DateFormat('dd MMM yyyy').format(DateTime.parse(ann['createdAt'])) : '', style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
          ])),
          if (ann['targetRole'] != null) Container(padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2), decoration: BoxDecoration(color: Colors.purple.shade50, borderRadius: BorderRadius.circular(8)), child: Text(ann['targetRole'], style: TextStyle(fontSize: 9, color: Colors.purple.shade700, fontWeight: FontWeight.w600))),
        ]),
        const SizedBox(height: 8),
        Text(ann['content'] ?? '', style: TextStyle(color: Colors.grey.shade700, fontSize: 13), maxLines: 4, overflow: TextOverflow.ellipsis),
      ]),
    ),
  );

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Text('Notices & Circulars'),
      bottom: TabBar(
        onTap: (v) => setState(() => _tab = v),
        tabs: const [Tab(text: 'Circulars'), Tab(text: 'Announcements')],
      ),
    ),
    body: _loading
        ? const Center(child: CircularProgressIndicator())
        : RefreshIndicator(
            onRefresh: _loadData,
            child: _tab == 0
                ? _circulars.isEmpty
                    ? const Center(child: Text('No circulars', style: TextStyle(color: Colors.grey)))
                    : ListView(padding: const EdgeInsets.all(16), children: _circulars.map((c) => _buildCircularCard(c as Map<String, dynamic>)).toList())
                : _announcements.isEmpty
                    ? const Center(child: Text('No announcements', style: TextStyle(color: Colors.grey)))
                    : ListView(padding: const EdgeInsets.all(16), children: _announcements.map((a) => _buildAnnouncementCard(a as Map<String, dynamic>)).toList()),
          ),
  );
}
