import { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { ChatMessage, Message } from './ChatMessage';
import { ChatInput } from './ChatInput';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    timestamp: new Date(),
  },
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string, attachments: File[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a simulated response. In a real implementation, this would connect to an AI service.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'hsl(var(--background))',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          bgcolor: 'hsl(var(--card))',
          borderRadius: 0,
          borderBottom: '1px solid hsl(var(--border))',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'hsl(var(--foreground))',
            }}
          >
            Chat Interface
          </Typography>
        </Container>
      </Paper>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </Container>
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          borderTop: '1px solid hsl(var(--border))',
          bgcolor: 'hsl(var(--background))',
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <ChatInput onSendMessage={handleSendMessage} />
        </Container>
      </Box>
    </Box>
  );
};
