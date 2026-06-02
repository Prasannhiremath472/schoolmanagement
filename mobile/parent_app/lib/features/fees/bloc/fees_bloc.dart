import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import '../../../core/api/api_service.dart';

abstract class FeesEvent extends Equatable { @override List<Object?> get props => []; }
class FeesLoadRequested extends FeesEvent {
  final String studentId, academicYearId;
  FeesLoadRequested({required this.studentId, required this.academicYearId});
}

abstract class FeesState extends Equatable { @override List<Object?> get props => []; }
class FeesInitial extends FeesState {}
class FeesLoading extends FeesState {}
class FeesLoaded extends FeesState {
  final Map<String, dynamic> data;
  FeesLoaded(this.data);
}
class FeesError extends FeesState { final String message; FeesError(this.message); }

class FeesBloc extends Bloc<FeesEvent, FeesState> {
  final ApiService apiService;
  FeesBloc({required this.apiService}) : super(FeesInitial()) {
    on<FeesLoadRequested>((event, emit) async {
      emit(FeesLoading());
      try {
        final res = await apiService.getStudentFees(studentId: event.studentId, academicYearId: event.academicYearId);
        emit(FeesLoaded(res['data'] ?? {}));
      } catch (e) { emit(FeesError(e.toString())); }
    });
  }
}
