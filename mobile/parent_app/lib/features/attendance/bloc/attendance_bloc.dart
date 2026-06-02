import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import '../../../core/api/api_service.dart';

abstract class AttendanceEvent extends Equatable { @override List<Object?> get props => []; }
class AttendanceLoadRequested extends AttendanceEvent {
  final String studentId, fromDate, toDate;
  AttendanceLoadRequested({required this.studentId, required this.fromDate, required this.toDate});
}

abstract class AttendanceState extends Equatable { @override List<Object?> get props => []; }
class AttendanceInitial extends AttendanceState {}
class AttendanceLoading extends AttendanceState {}
class AttendanceLoaded extends AttendanceState {
  final List<dynamic> records;
  final Map<String, dynamic> meta;
  AttendanceLoaded({required this.records, required this.meta});
  @override List<Object?> get props => [records, meta];
}
class AttendanceError extends AttendanceState { final String message; AttendanceError(this.message); }

class AttendanceBloc extends Bloc<AttendanceEvent, AttendanceState> {
  final ApiService apiService;
  AttendanceBloc({required this.apiService}) : super(AttendanceInitial()) {
    on<AttendanceLoadRequested>((event, emit) async {
      emit(AttendanceLoading());
      try {
        final res = await apiService.getStudentAttendance(studentId: event.studentId, fromDate: event.fromDate, toDate: event.toDate);
        emit(AttendanceLoaded(records: res['data'] ?? [], meta: res['meta'] ?? {}));
      } catch (e) { emit(AttendanceError(e.toString())); }
    });
  }
}
