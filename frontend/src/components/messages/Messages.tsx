import React, { useState } from 'react';
import { Search, Plus, MessageSquare, Send, Users, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ConversationList from './ConversationList';
import MessageThread from './MessageThread';
import ComposeMessageModal from './ComposeMessageModal';
import MessageTemplatesModal from './MessageTemplatesModal';
import { conversations, messageStats } from '@/data/messagesData';
import { Conversation } from '@/types/messages';

const Messages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'unread' && conversation.unreadCount > 0) ||
                         (filterType === 'archived' && conversation.archived);
    return matchesSearch && matchesFilter;
  });

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="space-y-6">
      {/* Messages Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageStats.totalConversations}</div>
            <p className="text-xs text-muted-foreground">Active threads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{messageStats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{messageStats.messagesThisWeek}</div>
            <p className="text-xs text-muted-foreground">Messages sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageStats.responseRate}%</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversation List */}
        <div className={`lg:col-span-1 ${selectedConversation ? 'hidden lg:block' : 'block'}`}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Messages</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setShowTemplatesModal(true)}>
                    Templates
                  </Button>
                  <Button size="sm" onClick={() => setShowComposeModal(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Messages</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ConversationList
                conversations={filteredConversations}
                selectedConversation={selectedConversation}
                onConversationSelect={handleConversationSelect}
              />
            </CardContent>
          </Card>
        </div>

        {/* Message Thread */}
        <div className={`lg:col-span-2 ${selectedConversation ? 'block' : 'hidden lg:block'}`}>
          <Card className="h-full">
            {selectedConversation ? (
              <MessageThread
                conversation={selectedConversation}
                onBack={handleBackToList}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-500 mb-4">
                    Choose a conversation from the list to start messaging
                  </p>
                  <Button onClick={() => setShowComposeModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Conversation
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common messaging tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col space-y-2" onClick={() => setShowComposeModal(true)}>
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm">New Message</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Send Reminders</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline" onClick={() => setShowTemplatesModal(true)}>
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm">Templates</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline">
              <Users className="h-5 w-5" />
              <span className="text-sm">Bulk Message</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ComposeMessageModal
        isOpen={showComposeModal}
        onClose={() => setShowComposeModal(false)}
      />
      
      <MessageTemplatesModal
        isOpen={showTemplatesModal}
        onClose={() => setShowTemplatesModal(false)}
      />
    </div>
  );
};

export default Messages;