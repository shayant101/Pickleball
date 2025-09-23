import { Router, Request, Response } from 'express';
import { MessageService, CreateConversationData, CreateMessageData, CreateMessageTemplateData, UpdateMessageTemplateData } from '../services/messageService';
import { authenticateToken } from '../middleware/auth';

const router: Router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Store SSE connections
const sseConnections = new Map<number, Response[]>();

// CONVERSATION ROUTES

// GET /api/messages/conversations - Get all conversations for the authenticated user
router.get('/conversations', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const conversations = await MessageService.getConversationsForUser(userId);

    res.status(200).json({
      success: true,
      data: conversations,
      count: conversations.length
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch conversations'
    });
  }
});

// GET /api/messages/conversations/:id - Get a specific conversation
router.get('/conversations/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    const userId = req.user?.id;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid conversation ID'
      });
    }

    const conversation = await MessageService.getConversationById(id, userId);
    
    if (!conversation) {
      return res.status(404).json({
        success: false,
        error: 'Conversation not found or access denied'
      });
    }

    // Mark messages as read
    if (userId) {
      await MessageService.markMessagesAsRead(id, userId);
    }

    res.status(200).json({
      success: true,
      data: conversation
    });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch conversation'
    });
  }
});

// POST /api/messages/conversations - Create a new conversation
router.post('/conversations', async (req: Request, res: Response) => {
  try {
    const { title, type, participantIds, studentParticipantIds } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    // Validate required fields
    if (!participantIds || !Array.isArray(participantIds)) {
      return res.status(400).json({
        success: false,
        error: 'participantIds is required and must be an array'
      });
    }

    // Add current user to participants if not already included
    const allParticipantIds = participantIds.includes(userId) 
      ? participantIds 
      : [...participantIds, userId];

    const conversationData: CreateConversationData = {
      title,
      type: type || 'direct',
      participantIds: allParticipantIds,
      studentParticipantIds: studentParticipantIds || []
    };

    const conversation = await MessageService.createConversation(conversationData);

    res.status(201).json({
      success: true,
      data: conversation,
      message: 'Conversation created successfully'
    });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create conversation'
    });
  }
});

// PATCH /api/messages/conversations/:id - Update a conversation
router.patch('/conversations/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    const { title, status } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid conversation ID'
      });
    }

    const conversation = await MessageService.updateConversation(id, { title, status });
    
    if (!conversation) {
      return res.status(404).json({
        success: false,
        error: 'Conversation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: conversation,
      message: 'Conversation updated successfully'
    });
  } catch (error) {
    console.error('Error updating conversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update conversation'
    });
  }
});

// MESSAGE ROUTES

// GET /api/messages/conversations/:id/messages - Get messages for a conversation
router.get('/conversations/:id/messages', async (req: Request, res: Response) => {
  try {
    const conversationId = parseInt(req.params.id!);
    const { limit, offset } = req.query;
    const userId = req.user?.id;

    if (isNaN(conversationId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid conversation ID'
      });
    }

    const options: any = {
      limit: limit ? parseInt(limit as string) : 50,
      offset: offset ? parseInt(offset as string) : 0,
      userId
    };

    const messages = await MessageService.getMessagesForConversation(conversationId, options);

    res.status(200).json({
      success: true,
      data: messages,
      count: messages.length
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    if (error instanceof Error && error.message === 'Access denied to conversation') {
      return res.status(403).json({
        success: false,
        error: 'Access denied to conversation'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
});

// POST /api/messages/conversations/:id/messages - Send a message
router.post('/conversations/:id/messages', async (req: Request, res: Response) => {
  try {
    const conversationId = parseInt(req.params.id!);
    const { content, type } = req.body;
    const userId = req.user?.id;

    if (isNaN(conversationId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid conversation ID'
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Message content is required'
      });
    }

    // Verify user has access to conversation
    if (userId) {
      const hasAccess = await MessageService.userHasAccessToConversation(userId, conversationId);
      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          error: 'Access denied to conversation'
        });
      }
    }

    const messageData: CreateMessageData = {
      content,
      type: type || 'text',
      conversationId,
      senderId: userId
    };

    const message = await MessageService.sendMessage(messageData);

    // Broadcast to SSE connections
    broadcastToConversation(conversationId, {
      type: 'new_message',
      data: message
    });

    res.status(201).json({
      success: true,
      data: message,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message'
    });
  }
});

// PATCH /api/messages/:id - Update a message
router.patch('/messages/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    const { content } = req.body;
    const userId = req.user?.id;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid message ID'
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Message content is required'
      });
    }

    const message = await MessageService.updateMessage(id, content, userId);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found or access denied'
      });
    }

    // Broadcast to SSE connections
    broadcastToConversation(message.conversationId, {
      type: 'message_updated',
      data: message
    });

    res.status(200).json({
      success: true,
      data: message,
      message: 'Message updated successfully'
    });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update message'
    });
  }
});

// DELETE /api/messages/:id - Delete a message
router.delete('/messages/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    const userId = req.user?.id;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid message ID'
      });
    }

    const success = await MessageService.deleteMessage(id, userId);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Message not found or access denied'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete message'
    });
  }
});

// MESSAGE TEMPLATE ROUTES

// GET /api/messages/templates - Get all message templates
router.get('/templates', async (req: Request, res: Response) => {
  try {
    const { category, isActive } = req.query;
    const userId = req.user?.id;

    const options: any = {};
    if (category) options.category = category as string;
    if (isActive !== undefined) options.isActive = isActive === 'true';
    if (userId) options.createdById = userId;

    const templates = await MessageService.getMessageTemplates(options);

    res.status(200).json({
      success: true,
      data: templates,
      count: templates.length
    });
  } catch (error) {
    console.error('Error fetching message templates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch message templates'
    });
  }
});

// GET /api/messages/templates/:id - Get a specific message template
router.get('/templates/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid template ID'
      });
    }

    const template = await MessageService.getMessageTemplateById(id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Message template not found'
      });
    }

    res.status(200).json({
      success: true,
      data: template
    });
  } catch (error) {
    console.error('Error fetching message template:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch message template'
    });
  }
});

// POST /api/messages/templates - Create a new message template
router.post('/templates', async (req: Request, res: Response) => {
  try {
    const { title, content, category, isActive } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, content, category'
      });
    }

    const templateData: CreateMessageTemplateData = {
      title,
      content,
      category,
      isActive: isActive !== undefined ? isActive : true,
      createdById: userId
    };

    const template = await MessageService.createMessageTemplate(templateData);

    res.status(201).json({
      success: true,
      data: template,
      message: 'Message template created successfully'
    });
  } catch (error) {
    console.error('Error creating message template:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create message template'
    });
  }
});

// PATCH /api/messages/templates/:id - Update a message template
router.patch('/templates/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid template ID'
      });
    }

    const updateData: UpdateMessageTemplateData = req.body;

    const template = await MessageService.updateMessageTemplate(id, updateData);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Message template not found'
      });
    }

    res.status(200).json({
      success: true,
      data: template,
      message: 'Message template updated successfully'
    });
  } catch (error) {
    console.error('Error updating message template:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update message template'
    });
  }
});

// DELETE /api/messages/templates/:id - Delete a message template
router.delete('/templates/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid template ID'
      });
    }

    const success = await MessageService.deleteMessageTemplate(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Message template not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message template deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message template:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete message template'
    });
  }
});

// UTILITY ROUTES

// GET /api/messages/unread-count - Get unread message count for user
router.get('/unread-count', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const count = await MessageService.getUnreadMessageCount(userId);

    res.status(200).json({
      success: true,
      data: { count }
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch unread count'
    });
  }
});

// SSE ROUTE

// GET /api/messages/stream - Server-Sent Events stream for real-time messages
router.get('/stream', async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: 'User not authenticated'
    });
  }

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  // Add connection to the map
  if (!sseConnections.has(userId)) {
    sseConnections.set(userId, []);
  }
  sseConnections.get(userId)!.push(res);

  // Send initial connection message
  res.write(`data: ${JSON.stringify({
    type: 'connected',
    message: 'Connected to message stream'
  })}\n\n`);

  // Handle client disconnect
  req.on('close', () => {
    const connections = sseConnections.get(userId);
    if (connections) {
      const index = connections.indexOf(res);
      if (index !== -1) {
        connections.splice(index, 1);
      }
      if (connections.length === 0) {
        sseConnections.delete(userId);
      }
    }
  });

  // Keep connection alive with periodic heartbeat
  const heartbeat = setInterval(() => {
    res.write(`data: ${JSON.stringify({
      type: 'heartbeat',
      timestamp: new Date().toISOString()
    })}\n\n`);
  }, 30000); // 30 seconds

  req.on('close', () => {
    clearInterval(heartbeat);
  });
});

// HELPER FUNCTIONS

// Broadcast message to all participants in a conversation
async function broadcastToConversation(conversationId: number, data: any) {
  try {
    // Get conversation participants
    const conversation = await MessageService.getConversationById(conversationId);
    if (!conversation) return;

    // Send to all connected participants
    for (const participant of conversation.participants) {
      if (participant.userId) {
        const connections = sseConnections.get(participant.userId);
        if (connections) {
          const message = `data: ${JSON.stringify(data)}\n\n`;
          connections.forEach(connection => {
            try {
              connection.write(message);
            } catch (error) {
              console.error('Error broadcasting to SSE connection:', error);
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('Error broadcasting to conversation:', error);
  }
}

export default router;