import { Box, Container, Typography, TextField, IconButton, Chip } from '@mui/material';
import { AttachFile, Search, MenuBook, Mic } from '@mui/icons-material';
import { useState, KeyboardEvent, ChangeEvent, useRef } from 'react';

interface WelcomeScreenProps {
  onSendMessage: (content: string, attachments: File[]) => void;
}

export const WelcomeScreen = ({ onSendMessage }: WelcomeScreenProps) => {
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'hsl(222 47% 11%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              color: 'hsl(0 0% 95%)',
              fontWeight: 400,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            What can I help with?
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: 'hsl(222 47% 18%)',
            borderRadius: '24px',
            p: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: 'hsl(0 0% 95%)',
                fontSize: '1rem',
                px: 2,
                py: 1,
                '& input::placeholder': {
                  color: 'hsl(0 0% 60%)',
                  opacity: 1,
                },
                '& textarea::placeholder': {
                  color: 'hsl(0 0% 60%)',
                  opacity: 1,
                },
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 1,
              pt: 1,
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                hidden
                onChange={handleFileSelect}
                aria-label="Attach files"
              />
              
              <Chip
                icon={<AttachFile sx={{ fontSize: '1rem' }} />}
                label="Attach"
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  bgcolor: 'transparent',
                  color: 'hsl(0 0% 80%)',
                  border: '1px solid hsl(0 0% 30%)',
                  borderRadius: '12px',
                  '&:hover': {
                    bgcolor: 'hsl(0 0% 20%)',
                  },
                  '& .MuiChip-icon': {
                    color: 'hsl(0 0% 80%)',
                  },
                }}
              />
              
              <Chip
                icon={<Search sx={{ fontSize: '1rem' }} />}
                label="Search"
                sx={{
                  bgcolor: 'transparent',
                  color: 'hsl(0 0% 80%)',
                  border: '1px solid hsl(0 0% 30%)',
                  borderRadius: '12px',
                  '&:hover': {
                    bgcolor: 'hsl(0 0% 20%)',
                  },
                  '& .MuiChip-icon': {
                    color: 'hsl(0 0% 80%)',
                  },
                }}
              />
              
              <Chip
                icon={<MenuBook sx={{ fontSize: '1rem' }} />}
                label="Study"
                sx={{
                  bgcolor: 'transparent',
                  color: 'hsl(0 0% 80%)',
                  border: '1px solid hsl(0 0% 30%)',
                  borderRadius: '12px',
                  '&:hover': {
                    bgcolor: 'hsl(0 0% 20%)',
                  },
                  '& .MuiChip-icon': {
                    color: 'hsl(0 0% 80%)',
                  },
                }}
              />
            </Box>

            <IconButton
              sx={{
                color: 'hsl(0 0% 80%)',
                bgcolor: 'transparent',
                border: '1px solid hsl(0 0% 30%)',
                borderRadius: '12px',
                '&:hover': {
                  bgcolor: 'hsl(0 0% 20%)',
                },
              }}
              aria-label="Voice input"
            >
              <Mic />
            </IconButton>
          </Box>

          {attachments.length > 0 && (
            <Box sx={{ mt: 2, px: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {attachments.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  size="small"
                  sx={{
                    bgcolor: 'hsl(0 0% 25%)',
                    color: 'hsl(0 0% 90%)',
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};
