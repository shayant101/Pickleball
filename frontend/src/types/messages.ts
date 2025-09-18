export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  senderType: 'coach' | 'student' | 'parent';
  content: string;
  timestamp: string;
  read: boolean;
  messageType: 'text' | 'lesson-reminder' | 'progress-update' | 'schedule-change' | 'payment-reminder';
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: number;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface Conversation {
  id: number;
  studentId: number;
  studentName: string;
  participants: Participant[];
  lastMessage: Message;
  unreadCount: number;
  lastActivity: string;
  archived: boolean;
}

export interface Participant {
  id: number;
  name: string;
  type: 'coach' | 'student' | 'parent';
  email: string;
  phone?: string;
}

export interface MessageTemplate {
  id: number;
  title: string;
  content: string;
  category: 'lesson-reminder' | 'progress-update' | 'schedule-change' | 'payment-reminder' | 'general';
  variables: string[]; // e.g., ['studentName', 'lessonDate', 'lessonTime']
}

export interface MessageStats {
  totalConversations: number;
  unreadMessages: number;
  messagesThisWeek: number;
  responseRate: number;
}