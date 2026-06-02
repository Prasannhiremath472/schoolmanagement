import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:intl/intl.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});
  @override State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  List<dynamic> _conversations = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadConversations();
  }

  Future<void> _loadConversations() async {
    try {
      const storage = FlutterSecureStorage();
      final token = await storage.read(key: 'access_token');
      final slug = await storage.read(key: 'tenant_slug');
      final dio = Dio(BaseOptions(
        baseUrl: 'https://api.schoolerp.com/api/v1',
        headers: {'Authorization': 'Bearer $token', 'x-tenant-id': slug},
      ));
      final res = await dio.get('/communication/messages', queryParameters: {'limit': 20});
      setState(() { _conversations = res.data['data'] ?? []; _loading = false; });
    } catch (_) { setState(() => _loading = false); }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Text('Messages'),
      actions: [IconButton(icon: const Icon(Icons.edit_rounded), onPressed: () => _showNewMessageDialog(context))],
    ),
    body: _loading
        ? const Center(child: CircularProgressIndicator())
        : _conversations.isEmpty
            ? Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                Icon(Icons.chat_bubble_outline_rounded, size: 72, color: Colors.grey.shade300),
                const SizedBox(height: 16),
                const Text('No messages yet', style: TextStyle(color: Colors.grey, fontSize: 16)),
                const SizedBox(height: 8),
                const Text('Contact your teacher or school admin', style: TextStyle(color: Colors.grey, fontSize: 13)),
                const SizedBox(height: 20),
                ElevatedButton.icon(icon: const Icon(Icons.add_comment_rounded), label: const Text('New Message'), onPressed: () => _showNewMessageDialog(context)),
              ]))
            : ListView.separated(
                itemCount: _conversations.length,
                separatorBuilder: (_, __) => const Divider(height: 1, indent: 72),
                itemBuilder: (ctx, i) {
                  final msg = _conversations[i];
                  final isRead = msg['isRead'] as bool? ?? true;
                  return ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                      child: Text((msg['fromUserId'] as String? ?? 'T')[0].toUpperCase(),
                          style: TextStyle(color: Theme.of(context).colorScheme.primary, fontWeight: FontWeight.w700)),
                    ),
                    title: Row(children: [
                      Expanded(child: Text(msg['subject'] ?? 'No Subject',
                          style: TextStyle(fontWeight: isRead ? FontWeight.w500 : FontWeight.w800, fontSize: 14),
                          maxLines: 1, overflow: TextOverflow.ellipsis)),
                      Text(msg['createdAt'] != null ? DateFormat('hh:mm a').format(DateTime.parse(msg['createdAt'])) : '',
                          style: TextStyle(fontSize: 11, color: isRead ? Colors.grey : Theme.of(context).colorScheme.primary)),
                    ]),
                    subtitle: Text(msg['content'] ?? '', maxLines: 1, overflow: TextOverflow.ellipsis,
                        style: TextStyle(fontWeight: isRead ? FontWeight.w400 : FontWeight.w600, fontSize: 12)),
                    trailing: !isRead ? Container(width: 10, height: 10, decoration: BoxDecoration(color: Theme.of(context).colorScheme.primary, shape: BoxShape.circle)) : null,
                    onTap: () => _openConversation(ctx, msg),
                  );
                }),
    floatingActionButton: FloatingActionButton(
      onPressed: () => _showNewMessageDialog(context),
      child: const Icon(Icons.edit_rounded),
    ),
  );

  void _openConversation(BuildContext context, Map<String, dynamic> msg) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => _ConversationScreen(message: msg)));
  }

  void _showNewMessageDialog(BuildContext context) {
    final subjectCtrl = TextEditingController();
    final contentCtrl = TextEditingController();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => Padding(
        padding: EdgeInsets.fromLTRB(16, 20, 16, MediaQuery.of(context).viewInsets.bottom + 20),
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text('New Message', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
          const SizedBox(height: 16),
          TextField(controller: subjectCtrl, decoration: const InputDecoration(labelText: 'Subject', border: OutlineInputBorder()), ),
          const SizedBox(height: 12),
          TextField(controller: contentCtrl, decoration: const InputDecoration(labelText: 'Message', border: OutlineInputBorder()), maxLines: 4),
          const SizedBox(height: 16),
          SizedBox(width: double.infinity, child: ElevatedButton.icon(
            icon: const Icon(Icons.send_rounded),
            label: const Text('Send Message'),
            onPressed: () => Navigator.pop(context),
          )),
        ]),
      ),
    );
  }
}

class _ConversationScreen extends StatefulWidget {
  final Map<String, dynamic> message;
  const _ConversationScreen({required this.message});
  @override State<_ConversationScreen> createState() => _ConversationScreenState();
}

class _ConversationScreenState extends State<_ConversationScreen> {
  final _ctrl = TextEditingController();
  final _messages = <Map<String, dynamic>>[];

  @override
  void initState() {
    super.initState();
    _messages.add(widget.message);
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: Text(widget.message['subject'] ?? 'Conversation')),
    body: Column(children: [
      Expanded(child: ListView.builder(
        padding: const EdgeInsets.all(12),
        itemCount: _messages.length,
        itemBuilder: (ctx, i) {
          final m = _messages[i];
          final isMe = false; // Determine from user ID
          return Align(
            alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
            child: Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
              decoration: BoxDecoration(
                color: isMe ? Theme.of(context).colorScheme.primary : Colors.grey.shade200,
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(16), topRight: const Radius.circular(16),
                  bottomLeft: Radius.circular(isMe ? 16 : 4), bottomRight: Radius.circular(isMe ? 4 : 16),
                ),
              ),
              child: Text(m['content'] ?? '', style: TextStyle(color: isMe ? Colors.white : Colors.black87, fontSize: 14)),
            ),
          );
        },
      )),
      Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(color: Colors.white, boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 4, offset: const Offset(0, -1))]),
        child: Row(children: [
          Expanded(child: TextField(controller: _ctrl, decoration: InputDecoration(hintText: 'Type a message...', filled: true, fillColor: Colors.grey.shade100, border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: BorderSide.none), contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10)))),
          const SizedBox(width: 8),
          CircleAvatar(backgroundColor: Theme.of(context).colorScheme.primary, child: IconButton(icon: const Icon(Icons.send_rounded, color: Colors.white, size: 18), onPressed: () { if (_ctrl.text.isNotEmpty) { setState(() => _messages.add({'content': _ctrl.text})); _ctrl.clear(); } })),
        ]),
      ),
    ]),
  );
}
