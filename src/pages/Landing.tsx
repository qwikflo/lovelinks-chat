import { Box, Container, Typography, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (url.trim()) {
      navigate(`/workspace?url=${encodeURIComponent(url)}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'hsl(var(--background))',
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
              color: 'hsl(var(--foreground))',
              fontWeight: 400,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Website Localizer
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'hsl(var(--muted-foreground))',
              fontSize: { xs: '0.9rem', md: '1rem' },
            }}
          >
            Enter a website URL to localize from AU to US English
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: 'hsl(var(--card))',
            borderRadius: '24px',
            p: 2,
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <TextField
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter website URL (e.g., example.com)"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: 'hsl(var(--foreground))',
                fontSize: '1rem',
                px: 2,
                py: 1,
                '& input::placeholder': {
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
              alignItems: 'center',
              px: 1,
              pt: 1,
            }}
          >
            <IconButton
              onClick={handleSubmit}
              disabled={!url.trim()}
              sx={{
                color: url.trim() ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                bgcolor: url.trim() ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                borderRadius: '12px',
                '&:hover': {
                  bgcolor: url.trim() ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                  opacity: url.trim() ? 0.9 : 1,
                },
                '&:disabled': {
                  color: 'hsl(var(--muted-foreground))',
                  bgcolor: 'hsl(var(--muted))',
                },
              }}
              aria-label="Submit URL"
            >
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
