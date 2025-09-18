import React from 'react';
import { MessageSquare, User, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from '@/types/messages';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onConversationSelect: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onConversationSelect
}) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const truncateMessage = (content: string, maxLength: number = 60) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getMessageTypeIcon = (messageType: string) => {
    switch (messageType) {
      case 'lesson-reminder':
        return '🔔';
      case 'progress-update':
        return '📈';
      case 'schedule-change':
        return '📅';
      case 'payment-reminder':
        return '💰';
      default:
        return '';
    }
  };

  return (
    <div className="h-[500px] overflow-y-auto">
      {conversations.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No conversations found</p>
        </div>
      ) : (
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onConversationSelect(conversation)}
              className={`p-3 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {conversation.studentName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.participants.length > 1 && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                      <Users className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium truncate ${
                      conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {conversation.studentName}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {conversation.unreadCount > 0 && (
                        <Badge variant="default" className="bg-blue-600">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation.lastActivity)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mt-1">
                    {getMessageTypeIcon(conversation.lastMessage.messageType) && (
                      <span className="text-sm">
                        {getMessageTypeIcon(conversation.lastMessage.messageType)}
                      </span>
                    )}
                    <p className={`text-sm truncate ${
                      conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-muted-foreground'
                    }`}>
                      {conversation.lastMessage.senderType === 'coach' ? 'You: ' : ''}
                      {truncateMessage(conversation.lastMessage.content)}
                    </p>
                  </div>
                  
                  {conversation.participants.length > 1 && (
                    <div className="flex items-center mt-1">
                      <Users className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className="text-xs text-muted-foreground">
                        {conversation.participants.map(p => p.name).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationList;