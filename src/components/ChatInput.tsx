import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Chip,
} from '@mui/material';
import { Send, AttachFile, Close } from '@mui/icons-material';

interface ChatInputProps {
  onSendMessage: (content: string, attachments: File[]) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        bgcolor: 'hsl(var(--chat-input-bg))',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {attachments.length > 0 && (
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {attachments.map((file, index) => (
            <Chip
              key={index}
              label={file.name}
              onDelete={() => removeAttachment(index)}
              deleteIcon={<Close />}
              size="small"
              sx={{
                bgcolor: 'hsl(var(--muted))',
                color: 'hsl(var(--muted-foreground))',
                '& .MuiChip-deleteIcon': {
                  color: 'hsl(var(--muted-foreground))',
                },
              }}
            />
          ))}
        </Box>
      )}
      
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={handleFileSelect}
          aria-label="Attach files"
        />
        
        <IconButton
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          sx={{
            color: 'hsl(var(--muted-foreground))',
            '&:hover': {
              bgcolor: 'hsl(var(--muted))',
              color: 'hsl(var(--primary))',
            },
            transition: 'var(--transition-smooth)',
          }}
          aria-label="Attach file"
        >
          <AttachFile />
        </IconButton>

        <TextField
          fullWidth
          multiline
          maxRows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'hsl(var(--background))',
              borderRadius: 'var(--radius)',
              '& fieldset': {
                borderColor: 'hsl(var(--border))',
              },
              '&:hover fieldset': {
                borderColor: 'hsl(var(--ring))',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'hsl(var(--ring))',
                borderWidth: 2,
              },
            },
            '& .MuiInputBase-input': {
              color: 'hsl(var(--foreground))',
            },
          }}
        />

        <IconButton
          onClick={handleSend}
          disabled={disabled || (!message.trim() && attachments.length === 0)}
          sx={{
            bgcolor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            '&:hover': {
              bgcolor: 'hsl(var(--primary))',
              opacity: 0.9,
            },
            '&:disabled': {
              bgcolor: 'hsl(var(--muted))',
              color: 'hsl(var(--muted-foreground))',
            },
            transition: 'var(--transition-smooth)',
          }}
          aria-label="Send message"
        >
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
};
