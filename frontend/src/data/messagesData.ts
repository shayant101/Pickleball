import { Message, Conversation, Participant, MessageTemplate, MessageStats } from '@/types/messages';

export const participants: Participant[] = [
  { id: 1, name: 'Emma Johnson', type: 'student', email: 'emma.johnson@email.com', phone: '(555) 123-4567' },
  { id: 2, name: 'Sarah Johnson', type: 'parent', email: 'sarah.johnson@email.com', phone: '(555) 123-4567' },
  { id: 3, name: 'Michael Chen', type: 'student', email: 'michael.chen@email.com', phone: '(555) 234-5678' },
  { id: 4, name: 'Lisa Chen', type: 'parent', email: 'lisa.chen@email.com', phone: '(555) 234-5678' },
  { id: 5, name: 'Sarah Williams', type: 'student', email: 'sarah.williams@email.com', phone: '(555) 345-6789' },
];

export const messages: Message[] = [
  {
    id: 1,
    conversationId: 1,
    senderId: 2,
    senderName: 'Sarah Johnson',
    senderType: 'parent',
    content: 'Hi! Emma has been practicing really hard this week. She\'s excited about her lesson tomorrow.',
    timestamp: '2024-01-24T14:30:00Z',
    read: false,
    messageType: 'text'
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 0, // Coach
    senderName: 'Coach',
    senderType: 'coach',
    content: 'That\'s wonderful to hear! Emma has been making great progress. Tomorrow we\'ll work on the Bach Invention and some new scales.',
    timestamp: '2024-01-24T15:15:00Z',
    read: true,
    messageType: 'text'
  },
  {
    id: 3,
    conversationId: 2,
    senderId: 0,
    senderName: 'Coach',
    senderType: 'coach',
    content: 'Hi Michael! Just a reminder about your guitar lesson tomorrow at 3:30 PM. Don\'t forget to bring your music book!',
    timestamp: '2024-01-24T16:00:00Z',
    read: true,
    messageType: 'lesson-reminder'
  },
  {
    id: 4,
    conversationId: 3,
    senderId: 5,
    senderName: 'Sarah Williams',
    senderType: 'student',
    content: 'Hi! I wanted to let you know I\'ve been working on the audition pieces. Could we schedule an extra practice session before the audition?',
    timestamp: '2024-01-23T19:45:00Z',
    read: false,
    messageType: 'text'
  },
  {
    id: 5,
    conversationId: 1,
    senderId: 0,
    senderName: 'Coach',
    senderType: 'coach',
    content: 'Emma did excellent work in today\'s lesson! She mastered the first section of Bach Invention No. 1. For homework: practice measures 9-16 slowly, and work on C major scale hands together.',
    timestamp: '2024-01-23T15:30:00Z',
    read: true,
    messageType: 'progress-update'
  }
];

export const conversations: Conversation[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emma Johnson',
    participants: [
      { id: 1, name: 'Emma Johnson', type: 'student', email: 'emma.johnson@email.com', phone: '(555) 123-4567' },
      { id: 2, name: 'Sarah Johnson', type: 'parent', email: 'sarah.johnson@email.com', phone: '(555) 123-4567' }
    ],
    lastMessage: messages[0],
    unreadCount: 1,
    lastActivity: '2024-01-24T14:30:00Z',
    archived: false
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Michael Chen',
    participants: [
      { id: 3, name: 'Michael Chen', type: 'student', email: 'michael.chen@email.com', phone: '(555) 234-5678' },
      { id: 4, name: 'Lisa Chen', type: 'parent', email: 'lisa.chen@email.com', phone: '(555) 234-5678' }
    ],
    lastMessage: messages[2],
    unreadCount: 0,
    lastActivity: '2024-01-24T16:00:00Z',
    archived: false
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Sarah Williams',
    participants: [
      { id: 5, name: 'Sarah Williams', type: 'student', email: 'sarah.williams@email.com', phone: '(555) 345-6789' }
    ],
    lastMessage: messages[3],
    unreadCount: 1,
    lastActivity: '2024-01-23T19:45:00Z',
    archived: false
  }
];

export const messageTemplates: MessageTemplate[] = [
  {
    id: 1,
    title: 'Lesson Reminder',
    content: 'Hi {{studentName}}! Just a reminder about your {{instrument}} lesson {{lessonDate}} at {{lessonTime}}. See you then!',
    category: 'lesson-reminder',
    variables: ['studentName', 'instrument', 'lessonDate', 'lessonTime']
  },
  {
    id: 2,
    title: 'Progress Update',
    content: '{{studentName}} did great work in today\'s lesson! We worked on {{topics}}. For homework: {{homework}}',
    category: 'progress-update',
    variables: ['studentName', 'topics', 'homework']
  },
  {
    id: 3,
    title: 'Schedule Change',
    content: 'Hi {{studentName}}! I need to reschedule your lesson from {{originalTime}} to {{newTime}} on {{date}}. Please let me know if this works for you.',
    category: 'schedule-change',
    variables: ['studentName', 'originalTime', 'newTime', 'date']
  },
  {
    id: 4,
    title: 'Payment Reminder',
    content: 'Hi {{studentName}}! This is a friendly reminder that your payment of ${{amount}} for {{description}} is due on {{dueDate}}.',
    category: 'payment-reminder',
    variables: ['studentName', 'amount', 'description', 'dueDate']
  },
  {
    id: 5,
    title: 'Lesson Cancellation',
    content: 'Hi {{studentName}}! Unfortunately, I need to cancel your lesson on {{date}} due to {{reason}}. Let\'s reschedule for {{alternativeDate}}.',
    category: 'schedule-change',
    variables: ['studentName', 'date', 'reason', 'alternativeDate']
  }
];

export const messageStats: MessageStats = {
  totalConversations: 3,
  unreadMessages: 2,
  messagesThisWeek: 12,
  responseRate: 85
};