import { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { ChatMessage, Message } from './ChatMessage';
import { ChatInput } from './ChatInput';

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: messages.length === 0 ? 'center' : 'flex-start',
        }}
      >
        <Container maxWidth="md" sx={{ width: '100%', py: 3 }}>
          {messages.length === 0 ? (
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h4"
                sx={{
                  color: 'hsl(var(--muted-foreground))',
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                How can I help you today?
              </Typography>
            </Box>
          ) : (
            <>
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </Container>
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          borderTop: messages.length > 0 ? '1px solid hsl(var(--border))' : 'none',
          bgcolor: 'hsl(var(--background))',
          py: 2,
          position: messages.length === 0 ? 'relative' : 'sticky',
          bottom: 0,
        }}
      >
        <Container maxWidth="md">
          <ChatInput onSendMessage={handleSendMessage} />
        </Container>
      </Box>
    </Box>
  );
};
