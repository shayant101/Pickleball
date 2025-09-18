import React, { useState } from 'react';
import { ArrowLeft, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Conversation } from '@/types/messages';
import { messages } from '@/data/messagesData';

interface MessageThreadProps {
  conversation: Conversation;
  onBack: () => void;
}

const MessageThread: React.FC<MessageThreadProps> = ({ conversation, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  
  // Filter messages for this conversation
  const conversationMessages = messages.filter(msg => msg.conversationId === conversation.id);
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const getMessageTypeLabel = (messageType: string) => {
    switch (messageType) {
      case 'lesson-reminder': return 'Lesson Reminder';
      case 'progress-update': return 'Progress Update';
      case 'schedule-change': return 'Schedule Change';
      case 'payment-reminder': return 'Payment Reminder';
      default: return null;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group messages by date
  const groupedMessages = conversationMessages.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, typeof conversationMessages>);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="lg:hidden">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {conversation.studentName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{conversation.studentName}</h3>
              <p className="text-sm text-muted-foreground">
                {conversation.participants.map(p => p.name).join(', ')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Student Profile</DropdownMenuItem>
                <DropdownMenuItem>Schedule Lesson</DropdownMenuItem>
                <DropdownMenuItem>Send Payment Reminder</DropdownMenuItem>
                <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Date separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-gray-100 px-3 py-1 rounded-full text-xs text-muted-foreground">
                {date}
              </div>
            </div>
            
            {/* Messages for this date */}
            {dateMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderType === 'coach' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`max-w-xs lg:max-w-md ${
                  message.senderType === 'coach' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                } rounded-lg px-4 py-2`}>
                  {message.senderType !== 'coach' && (
                    <div className="text-xs font-medium mb-1 opacity-75">
                      {message.senderName}
                    </div>
                  )}
                  
                  {getMessageTypeLabel(message.messageType) && (
                    <Badge 
                      variant="secondary" 
                      className={`mb-2 text-xs ${
                        message.senderType === 'coach' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {getMessageTypeLabel(message.messageType)}
                    </Badge>
                  )}
                  
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  <div className={`text-xs mt-1 ${
                    message.senderType === 'coach' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;