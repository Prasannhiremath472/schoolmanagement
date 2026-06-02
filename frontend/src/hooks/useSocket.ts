import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { socketService } from '../services/socket/socket.service';

/** Connects notification socket when user is authenticated, disconnects on logout */
export function useNotificationSocket() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      socketService.connectNotifications();
    } else {
      socketService.disconnectAll();
    }

    return () => {
      // Don't disconnect on unmount if still authenticated — keeps connection alive
    };
  }, [isAuthenticated]);
}

/** Hook to join and leave an attendance room */
export function useAttendanceRoom(sectionId: string | null, date: string) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!sectionId || !isAuthenticated) return;

    socketService.connectAttendance();
    socketService.joinSection(sectionId, date);

    return () => {
      socketService.leaveSection(sectionId, date);
    };
  }, [sectionId, date, isAuthenticated]);
}
