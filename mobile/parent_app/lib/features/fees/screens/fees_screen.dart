import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/fees_bloc.dart';

class FeesScreen extends StatelessWidget {
  const FeesScreen({super.key});

  Color _statusColor(bool isOverdue, double due) {
    if (due <= 0) return Colors.green;
    if (isOverdue) return Colors.red;
    return Colors.orange;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Fee Details')),
      body: BlocBuilder<FeesBloc, FeesState>(
        builder: (ctx, state) {
          if (state is FeesLoading) return const Center(child: CircularProgressIndicator());
          if (state is FeesError) return Center(child: Text('Error: ${state.message}'));

          if (state is FeesLoaded) {
            final summary = state.data['summary'] as Map<String, dynamic>? ?? {};
            final installments = (state.data['feeStructure']?['feeInstallments'] as List<dynamic>?) ?? [];

            return ListView(
              padding: const EdgeInsets.all(16),
              children: [
                // Summary Card
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(gradient: LinearGradient(colors: [Theme.of(context).colorScheme.primary, Theme.of(context).colorScheme.primary.withOpacity(0.7)]), borderRadius: BorderRadius.circular(16)),
                  child: Column(children: [
                    const Text('Total Fees', style: TextStyle(color: Colors.white70, fontSize: 14)),
                    Text('₹${(summary['totalFees'] as num? ?? 0).toStringAsFixed(0)}', style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w800)),
                    const SizedBox(height: 16),
                    Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
                      _SummaryCol(label: 'Paid', value: '₹${(summary['totalPaid'] as num? ?? 0).toStringAsFixed(0)}', color: Colors.greenAccent),
                      _SummaryCol(label: 'Pending', value: '₹${(summary['totalDue'] as num? ?? 0).toStringAsFixed(0)}', color: Colors.redAccent),
                    ]),
                  ]),
                ),
                const SizedBox(height: 24),
                const Text('Installments', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                const SizedBox(height: 12),
                ...installments.map((inst) {
                  final due = (inst['dueAmount'] as num? ?? 0).toDouble();
                  final isOverdue = inst['isOverdue'] as bool? ?? false;
                  final color = _statusColor(isOverdue, due);

                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                          Text(inst['name'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
                          Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(20)), child: Text(due <= 0 ? 'PAID' : isOverdue ? 'OVERDUE' : 'DUE', style: TextStyle(color: color, fontWeight: FontWeight.w600, fontSize: 12))),
                        ]),
                        const SizedBox(height: 8),
                        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                          Text('Amount: ₹${inst['amount']}', style: const TextStyle(color: Colors.grey)),
                          Text('Due: ${inst['dueDate']?.toString().split('T')[0]}', style: TextStyle(color: isOverdue ? Colors.red : Colors.grey, fontSize: 13)),
                        ]),
                        if (due > 0) ...[
                          const SizedBox(height: 12),
                          ElevatedButton(onPressed: () {}, style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(40)), child: Text('Pay ₹${due.toStringAsFixed(0)}')),
                        ],
                      ]),
                    ),
                  );
                }).toList(),
              ],
            );
          }

          return Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            const Icon(Icons.account_balance_wallet_rounded, size: 64, color: Colors.grey),
            const SizedBox(height: 16),
            const Text('No fee information available', style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 16),
            ElevatedButton(onPressed: () => ctx.read<FeesBloc>().add(FeesLoadRequested(studentId: 'student-id', academicYearId: 'current')), child: const Text('Load Fee Details')),
          ]));
        },
      ),
    );
  }
}

class _SummaryCol extends StatelessWidget {
  final String label, value;
  final Color color;
  const _SummaryCol({required this.label, required this.value, required this.color});

  @override
  Widget build(BuildContext context) => Column(children: [
    Text(label, style: TextStyle(color: color.withOpacity(0.8), fontSize: 13)),
    Text(value, style: TextStyle(color: color, fontSize: 22, fontWeight: FontWeight.w800)),
  ]);
}
