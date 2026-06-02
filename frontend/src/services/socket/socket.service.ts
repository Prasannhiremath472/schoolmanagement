import { io, Socket } from 'socket.io-client';
import { store } from '../../app/store';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || '';

class SocketService {
  private notificationSocket: Socket | null = null;
  private attendanceSocket: Socket | null = null;
  private chatSocket: Socket | null = null;

  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    const tenantSlug = localStorage.getItem('tenantSlug');
    return { token, tenantSlug };
  }

  // ─── Notification Socket ──────────────────────────────────────────────────

  connectNotifications() {
    if (this.notificationSocket?.connected) return;

    const { token, tenantSlug } = this.getAuthHeaders();
    if (!token) return;

    this.notificationSocket = io(`${BASE_URL}/notifications`, {
      auth: { token, tenantSlug },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    this.notificationSocket.on('connect', () => {
      console.log('Notification socket connected');
    });

    this.notificationSocket.on('disconnect', (reason) => {
      console.log('Notification socket disconnected:', reason);
    });

    this.notificationSocket.on('new-announcement', (data: any) => {
      toast(data.title, { icon: '📢', duration: 5000 });
    });

    this.notificationSocket.on('absence-alert', (data: any) => {
      toast.error(`Attendance Alert: ${data.studentName} was absent on ${data.date}`, { duration: 8000 });
    });

    this.notificationSocket.on('fee-reminder', (data: any) => {
      toast(`Fee Reminder: ₹${data.amount} due for ${data.studentName}`, { icon: '💰', duration: 6000 });
    });

    this.notificationSocket.on('result-published', (data: any) => {
      toast.success(`Results published: ${data.examName}`, { duration: 5000 });
    });

    this.notificationSocket.on('report-cards-ready', (data: any) => {
      toast.success(data.message, { duration: 8000 });
    });

    this.notificationSocket.on('system-message', (data: any) => {
      toast(data.content, { duration: 5000 });
    });

    return this.notificationSocket;
  }

  disconnectNotifications() {
    this.notificationSocket?.disconnect();
    this.notificationSocket = null;
  }

  // ─── Attendance Socket ────────────────────────────────────────────────────

  connectAttendance() {
    if (this.attendanceSocket?.connected) return;

    const { token, tenantSlug } = this.getAuthHeaders();
    if (!token) return;

    this.attendanceSocket = io(`${BASE_URL}/attendance`, {
      auth: { token, tenantSlug },
      transports: ['websocket'],
    });

    this.attendanceSocket.on('connect', () => console.log('Attendance socket connected'));
    this.attendanceSocket.on('attendance-updated', (data: any) => {
      console.log('Attendance updated:', data);
    });

    return this.attendanceSocket;
  }

  joinSection(sectionId: string, date: string) {
    this.attendanceSocket?.emit('join-section', { sectionId, date });
  }

  leaveSection(sectionId: string, date: string) {
    this.attendanceSocket?.emit('leave-section', { sectionId, date });
  }

  onAttendanceUpdate(callback: (data: any) => void) {
    this.attendanceSocket?.on('attendance-updated', callback);
    return () => this.attendanceSocket?.off('attendance-updated', callback);
  }

  // ─── Chat Socket ──────────────────────────────────────────────────────────

  connectChat() {
    if (this.chatSocket?.connected) return;

    const { token, tenantSlug } = this.getAuthHeaders();
    if (!token) return;

    this.chatSocket = io(`${BASE_URL}/chat`, {
      auth: { token, tenantSlug },
      transports: ['websocket'],
    });

    this.chatSocket.on('connect', () => console.log('Chat socket connected'));

    this.chatSocket.on('new-message', (data: any) => {
      toast(`New message from ${data.fromUserId}`, { icon: '💬' });
    });

    return this.chatSocket;
  }

  sendMessage(toUserId: string, content: string, subject?: string) {
    this.chatSocket?.emit('send-message', { toUserId, content, subject });
  }

  onNewMessage(callback: (data: any) => void) {
    this.chatSocket?.on('new-message', callback);
    return () => this.chatSocket?.off('new-message', callback);
  }

  // ─── Cleanup ──────────────────────────────────────────────────────────────

  disconnectAll() {
    this.notificationSocket?.disconnect();
    this.attendanceSocket?.disconnect();
    this.chatSocket?.disconnect();
    this.notificationSocket = null;
    this.attendanceSocket = null;
    this.chatSocket = null;
  }
}

export const socketService = new SocketService();
