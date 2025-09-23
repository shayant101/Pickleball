import { PrismaClient, Conversation, Message, MessageTemplate, ConversationParticipant } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateConversationData {
  title?: string;
  type?: string;
  participantIds: number[];
  studentParticipantIds?: number[];
}

export interface CreateMessageData {
  content: string;
  type?: string;
  conversationId: number;
  senderId?: number | undefined;
  studentSenderId?: number | undefined;
}

export interface CreateMessageTemplateData {
  title: string;
  content: string;
  category: string;
  isActive?: boolean;
  createdById: number;
}

export interface UpdateMessageTemplateData {
  title?: string;
  content?: string;
  category?: string;
  isActive?: boolean;
}

export interface ConversationWithDetails extends Conversation {
  participants: (ConversationParticipant & {
    user?: {
      id: number;
      name: string | null;
      email: string;
    } | null;
    student?: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    } | null;
  })[];
  messages: (Message & {
    sender?: {
      id: number;
      name: string | null;
      email: string;
    } | null;
    studentSender?: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    } | null;
  })[];
  _count: {
    messages: number;
  };
}

export interface MessageWithSender extends Message {
  sender?: {
    id: number;
    name: string | null;
    email: string;
  } | null;
  studentSender?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  conversation: {
    id: number;
    title: string | null;
    type: string;
  };
}

export interface MessageTemplateWithCreator extends MessageTemplate {
  createdBy: {
    id: number;
    name: string | null;
    email: string;
  };
}

export class MessageService {
  // CONVERSATION METHODS

  // Get all conversations for a user
  static async getConversationsForUser(userId: number): Promise<ConversationWithDetails[]> {
    return await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: userId
          }
        }
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            studentSender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        _count: {
          select: {
            messages: true
          }
        }
      },
      orderBy: { lastMessageAt: 'desc' }
    });
  }

  // Get conversation by ID
  static async getConversationById(id: number, userId?: number): Promise<ConversationWithDetails | null> {
    const where: any = { id };
    
    // If userId provided, ensure user is a participant
    if (userId) {
      where.participants = {
        some: {
          userId: userId
        }
      };
    }

    return await prisma.conversation.findUnique({
      where,
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            studentSender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        _count: {
          select: {
            messages: true
          }
        }
      }
    });
  }

  // Create a new conversation
  static async createConversation(data: CreateConversationData): Promise<ConversationWithDetails> {
    const createData: any = {
      type: data.type || 'direct',
      participants: {
        create: [
          ...data.participantIds.map(userId => ({ userId })),
          ...(data.studentParticipantIds || []).map(studentId => ({ studentId }))
        ]
      }
    };

    if (data.title !== undefined) {
      createData.title = data.title;
    }

    const conversation = await prisma.conversation.create({
      data: createData,
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            studentSender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        _count: {
          select: {
            messages: true
          }
        }
      }
    });

    return conversation;
  }

  // Update conversation
  static async updateConversation(id: number, data: { title?: string; status?: string }): Promise<ConversationWithDetails | null> {
    try {
      return await prisma.conversation.update({
        where: { id },
        data,
        include: {
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              },
              student: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true
                }
              }
            }
          },
          messages: {
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              },
              studentSender: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true
                }
              }
            }
          },
          _count: {
            select: {
              messages: true
            }
          }
        }
      });
    } catch (error) {
      return null;
    }
  }

  // MESSAGE METHODS

  // Get messages for a conversation
  static async getMessagesForConversation(
    conversationId: number, 
    options?: { limit?: number; offset?: number; userId?: number }
  ): Promise<MessageWithSender[]> {
    const { limit = 50, offset = 0, userId } = options || {};

    // Verify user has access to conversation if userId provided
    if (userId) {
      const hasAccess = await this.userHasAccessToConversation(userId, conversationId);
      if (!hasAccess) {
        throw new Error('Access denied to conversation');
      }
    }

    return await prisma.message.findMany({
      where: { conversationId },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        studentSender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        conversation: {
          select: {
            id: true,
            title: true,
            type: true
          }
        }
      }
    });
  }

  // Send a message
  static async sendMessage(data: CreateMessageData): Promise<MessageWithSender> {
    const createData: any = {
      content: data.content,
      type: data.type || 'text',
      conversationId: data.conversationId
    };

    if (data.senderId !== undefined) {
      createData.senderId = data.senderId;
    }
    if (data.studentSenderId !== undefined) {
      createData.studentSenderId = data.studentSenderId;
    }

    const message = await prisma.message.create({
      data: createData,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        studentSender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        conversation: {
          select: {
            id: true,
            title: true,
            type: true
          }
        }
      }
    });

    // Update conversation's lastMessageAt
    await prisma.conversation.update({
      where: { id: data.conversationId },
      data: { lastMessageAt: new Date() }
    });

    return message;
  }

  // Update message
  static async updateMessage(id: number, content: string, userId?: number): Promise<MessageWithSender | null> {
    try {
      const where: any = { id };
      
      // If userId provided, ensure user owns the message
      if (userId) {
        where.senderId = userId;
      }

      return await prisma.message.update({
        where,
        data: { 
          content,
          editedAt: new Date()
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          studentSender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          conversation: {
            select: {
              id: true,
              title: true,
              type: true
            }
          }
        }
      });
    } catch (error) {
      return null;
    }
  }

  // Delete message
  static async deleteMessage(id: number, userId?: number): Promise<boolean> {
    try {
      const where: any = { id };
      
      // If userId provided, ensure user owns the message
      if (userId) {
        where.senderId = userId;
      }

      await prisma.message.delete({ where });
      return true;
    } catch (error) {
      return false;
    }
  }

  // MESSAGE TEMPLATE METHODS

  // Get all message templates
  static async getMessageTemplates(options?: {
    category?: string;
    isActive?: boolean;
    createdById?: number;
  }): Promise<MessageTemplateWithCreator[]> {
    const { category, isActive, createdById } = options || {};

    const where: any = {};
    if (category) where.category = category;
    if (isActive !== undefined) where.isActive = isActive;
    if (createdById) where.createdById = createdById;

    return await prisma.messageTemplate.findMany({
      where,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Get message template by ID
  static async getMessageTemplateById(id: number): Promise<MessageTemplateWithCreator | null> {
    return await prisma.messageTemplate.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  // Create message template
  static async createMessageTemplate(data: CreateMessageTemplateData): Promise<MessageTemplateWithCreator> {
    return await prisma.messageTemplate.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        isActive: data.isActive !== undefined ? data.isActive : true,
        createdById: data.createdById
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  // Update message template
  static async updateMessageTemplate(id: number, data: UpdateMessageTemplateData): Promise<MessageTemplateWithCreator | null> {
    try {
      return await prisma.messageTemplate.update({
        where: { id },
        data,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
    } catch (error) {
      return null;
    }
  }

  // Delete message template
  static async deleteMessageTemplate(id: number): Promise<boolean> {
    try {
      await prisma.messageTemplate.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // UTILITY METHODS

  // Check if user has access to conversation
  static async userHasAccessToConversation(userId: number, conversationId: number): Promise<boolean> {
    const participant = await prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        userId
      }
    });

    return !!participant;
  }

  // Mark messages as read
  static async markMessagesAsRead(conversationId: number, userId: number): Promise<void> {
    await prisma.conversationParticipant.updateMany({
      where: {
        conversationId,
        userId
      },
      data: {
        lastReadAt: new Date()
      }
    });
  }

  // Get unread message count for user
  static async getUnreadMessageCount(userId: number): Promise<number> {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: userId
          }
        }
      },
      include: {
        participants: {
          where: {
            userId: userId
          }
        },
        messages: {
          where: {
            createdAt: {
              gt: new Date(0) // Will be filtered by lastReadAt
            }
          }
        }
      }
    });

    let unreadCount = 0;
    for (const conversation of conversations) {
      const participant = conversation.participants[0];
      const lastReadAt = participant?.lastReadAt || new Date(0);
      
      const unreadInConversation = conversation.messages.filter(
        message => message.createdAt > lastReadAt && message.senderId !== userId
      ).length;
      
      unreadCount += unreadInConversation;
    }

    return unreadCount;
  }
}