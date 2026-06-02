import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:intl/intl.dart';

class LiveClassesScreen extends StatefulWidget {
  const LiveClassesScreen({super.key});
  @override State<LiveClassesScreen> createState() => _LiveClassesScreenState();
}

class _LiveClassesScreenState extends State<LiveClassesScreen> {
  List<dynamic> _classes = [];
  bool _loading = true;

  @override
  void initState() { super.initState(); _load(); }

  Future<void> _load() async {
    try {
      const storage = FlutterSecureStorage();
      final token = await storage.read(key: 'access_token');
      final slug = await storage.read(key: 'tenant_slug');
      final dio = Dio(BaseOptions(baseUrl: 'https://api.schoolerp.com/api/v1', headers: {'Authorization': 'Bearer $token', 'x-tenant-id': slug}));
      final res = await dio.get('/lms/live-classes');
      setState(() { _classes = res.data['data'] ?? []; _loading = false; });
    } catch (_) { setState(() => _loading = false); }
  }

  Color _statusColor(String status) {
    switch (status) {
      case 'LIVE': return Colors.red;
      case 'SCHEDULED': return Colors.blue;
      case 'COMPLETED': return Colors.green;
      default: return Colors.grey;
    }
  }

  Future<void> _join(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) await launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Live Classes')),
    body: _loading ? const Center(child: CircularProgressIndicator()) :
      RefreshIndicator(onRefresh: _load, child: _classes.isEmpty ?
        const Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Icon(Icons.video_call_rounded, size: 72, color: Colors.grey),
          SizedBox(height: 12),
          Text('No live classes scheduled', style: TextStyle(color: Colors.grey, fontSize: 16)),
        ])) :
        ListView.separated(
          padding: const EdgeInsets.all(12),
          itemCount: _classes.length,
          separatorBuilder: (_, __) => const SizedBox(height: 10),
          itemBuilder: (ctx, i) {
            final lc = _classes[i];
            final status = lc['status'] as String? ?? 'SCHEDULED';
            final isLive = status == 'LIVE';
            final scheduled = DateTime.tryParse(lc['scheduledAt'] ?? '');
            return Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
                side: BorderSide(color: _statusColor(status).withOpacity(0.4), width: isLive ? 2 : 1),
              ),
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                    Expanded(child: Text(lc['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15), maxLines: 2)),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(color: _statusColor(status), borderRadius: BorderRadius.circular(20)),
                      child: Row(mainAxisSize: MainAxisSize.min, children: [
                        if (isLive) Container(width: 8, height: 8, margin: const EdgeInsets.only(right: 4), decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle)),
                        Text(status, style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700)),
                      ]),
                    ),
                  ]),
                  const SizedBox(height: 8),
                  Row(children: [
                    const Icon(Icons.person_rounded, size: 14, color: Colors.grey),
                    const SizedBox(width: 4),
                    Text('${lc['teacher']?['firstName']} ${lc['teacher']?['lastName']}', style: const TextStyle(fontSize: 12, color: Colors.grey)),
                    const SizedBox(width: 16),
                    const Icon(Icons.videocam_rounded, size: 14, color: Colors.grey),
                    const SizedBox(width: 4),
                    Text(lc['platform']?.toString().toUpperCase() ?? '', style: const TextStyle(fontSize: 12, color: Colors.grey)),
                  ]),
                  if (scheduled != null) ...[
                    const SizedBox(height: 4),
                    Row(children: [
                      const Icon(Icons.schedule_rounded, size: 14, color: Colors.grey),
                      const SizedBox(width: 4),
                      Text(DateFormat('dd MMM yyyy, hh:mm a').format(scheduled), style: const TextStyle(fontSize: 12, color: Colors.grey)),
                      const SizedBox(width: 8),
                      Text('• ${lc['duration']} min', style: const TextStyle(fontSize: 12, color: Colors.grey)),
                    ]),
                  ],
                  if ((status == 'LIVE' || status == 'SCHEDULED') && lc['meetingUrl'] != null) ...[
                    const SizedBox(height: 12),
                    SizedBox(width: double.infinity, child: ElevatedButton.icon(
                      icon: Icon(isLive ? Icons.sensors_rounded : Icons.video_call_rounded, size: 18),
                      label: Text(isLive ? '🔴  Join Live Now' : 'Join Class'),
                      onPressed: () => _join(lc['meetingUrl']),
                      style: ElevatedButton.styleFrom(backgroundColor: _statusColor(status), foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
                    )),
                  ],
                  if (status == 'COMPLETED' && lc['recordingUrl'] != null) ...[
                    const SizedBox(height: 8),
                    OutlinedButton.icon(icon: const Icon(Icons.play_circle_outline_rounded), label: const Text('Watch Recording'), onPressed: () => _join(lc['recordingUrl'])),
                  ],
                ]),
              ),
            );
          }),
    ),
  );
}
