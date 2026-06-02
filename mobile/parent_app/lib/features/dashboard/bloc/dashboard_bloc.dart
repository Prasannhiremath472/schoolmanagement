import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import '../../../core/api/api_service.dart';

abstract class DashboardEvent extends Equatable {
  @override List<Object?> get props => [];
}
class DashboardLoadRequested extends DashboardEvent { final String parentId; DashboardLoadRequested(this.parentId); @override List<Object?> get props => [parentId]; }

abstract class DashboardState extends Equatable {
  @override List<Object?> get props => [];
}
class DashboardInitial extends DashboardState {}
class DashboardLoading extends DashboardState {}
class DashboardLoaded extends DashboardState {
  final Map<String, dynamic> data;
  DashboardLoaded(this.data);
  @override List<Object?> get props => [data];
}
class DashboardError extends DashboardState {
  final String message;
  DashboardError(this.message);
}

class DashboardBloc extends Bloc<DashboardEvent, DashboardState> {
  final ApiService apiService;
  DashboardBloc({required this.apiService}) : super(DashboardInitial()) {
    on<DashboardLoadRequested>((event, emit) async {
      emit(DashboardLoading());
      try {
        final data = await apiService.getParentDashboard(event.parentId);
        emit(DashboardLoaded(data['data'] ?? {}));
      } catch (e) {
        emit(DashboardError(e.toString()));
      }
    });
  }
}
