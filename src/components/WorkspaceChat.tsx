import { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Chip } from '@mui/material';
import { Send } from '@mui/icons-material';
import { WorkspaceChatMessage } from './WorkspaceChatMessage';
import { LocalizationMessage } from '@/pages/Workspace';

interface WorkspaceChatProps {
  messages: LocalizationMessage[];
  onSendMessage: (content: string) => void;
  onSuggestionClick: (suggestion: string) => void;
  disabled?: boolean;
}

export const WorkspaceChat = ({
  messages,
  onSendMessage,
  onSuggestionClick,
  disabled,
}: WorkspaceChatProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
        bgcolor: 'hsl(var(--background))',
      }}
    >
      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
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

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid hsl(var(--border))',
          bgcolor: 'hsl(var(--card))',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Describe the changes you want to make..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'hsl(var(--background))',
                '& fieldset': {
                  borderColor: 'hsl(var(--border))',
                },
                '&:hover fieldset': {
                  borderColor: 'hsl(var(--primary))',
                },
              },
            }}
          />
          <IconButton
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            sx={{
              bgcolor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              '&:hover': {
                bgcolor: 'hsl(var(--primary) / 0.9)',
              },
              '&.Mui-disabled': {
                bgcolor: 'hsl(var(--muted))',
                color: 'hsl(var(--muted-foreground))',
              },
            }}
          >
            <Send />
          </IconButton>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label="Show HTML changes"
            size="small"
            onClick={() => onSuggestionClick('Show me all the HTML changes you made')}
            sx={{
              bgcolor: 'hsl(var(--secondary))',
              color: 'hsl(var(--secondary-foreground))',
              '&:hover': {
                bgcolor: 'hsl(var(--secondary) / 0.8)',
              },
            }}
          />
          <Chip
            label="Explain changes"
            size="small"
            onClick={() => onSuggestionClick('Explain all the changes in detail')}
            sx={{
              bgcolor: 'hsl(var(--secondary))',
              color: 'hsl(var(--secondary-foreground))',
              '&:hover': {
                bgcolor: 'hsl(var(--secondary) / 0.8)',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
