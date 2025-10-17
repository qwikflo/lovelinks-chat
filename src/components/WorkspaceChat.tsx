import { Box, TextField, IconButton, Paper, Typography } from '@mui/material';
import { Send, Home } from '@mui/icons-material';
import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceChatMessage } from './WorkspaceChatMessage';
import { ChatMessage } from '@/pages/Workspace';

interface WorkspaceChatProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  onSuggestionClick: (suggestion: string) => void;
  url: string;
}

export const WorkspaceChat = ({
  messages,
  onSendMessage,
  onSuggestionClick,
  url,
}: WorkspaceChatProps) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: 'hsl(var(--card))',
          borderBottom: '1px solid hsl(var(--border))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'hsl(var(--foreground))',
              fontSize: '1rem',
            }}
          >
            Localizing: {url}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'hsl(var(--muted-foreground))',
            }}
          >
            AU → US English
          </Typography>
        </Box>
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            color: 'hsl(var(--foreground))',
            '&:hover': {
              bgcolor: 'hsl(var(--muted))',
            },
          }}
          aria-label="Return to home"
        >
          <Home />
        </IconButton>
      </Paper>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
        }}
      >
        {messages.map((message) => (
          <WorkspaceChatMessage
            key={message.id}
            message={message}
            onSuggestionClick={onSuggestionClick}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid hsl(var(--border))',
          bgcolor: 'hsl(var(--background))',
        }}
      >
        <Box
          sx={{
            bgcolor: 'hsl(var(--card))',
            borderRadius: '16px',
            border: '1px solid hsl(var(--border))',
            p: 1.5,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe changes to make..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: 'hsl(var(--foreground))',
                fontSize: '0.9rem',
                '& textarea::placeholder': {
                  color: 'hsl(var(--muted-foreground))',
                  opacity: 1,
                },
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 1,
            }}
          >
            <IconButton
              onClick={handleSend}
              disabled={!input.trim()}
              size="small"
              sx={{
                color: input.trim() ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                bgcolor: input.trim() ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                borderRadius: '8px',
                '&:hover': {
                  bgcolor: input.trim() ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                  opacity: input.trim() ? 0.9 : 1,
                },
                '&:disabled': {
                  color: 'hsl(var(--muted-foreground))',
                  bgcolor: 'hsl(var(--muted))',
                },
              }}
              aria-label="Send message"
            >
              <Send fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
