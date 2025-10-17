import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper 
} from '@mui/material';
import { Language, ArrowForward } from '@mui/icons-material';

const Landing = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateUrl = (input: string): boolean => {
    try {
      new URL(input.startsWith('http') ? input : `https://${input}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    const encodedUrl = encodeURIComponent(url);
    navigate(`/workspace?url=${encodedUrl}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.05))',
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 3,
            bgcolor: 'hsl(var(--card))',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Language
              sx={{
                fontSize: 64,
                color: 'hsl(var(--primary))',
                mb: 2,
              }}
            />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'hsl(var(--foreground))',
                mb: 2,
              }}
            >
              AU → US Localizer
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'hsl(var(--muted-foreground))',
                fontWeight: 400,
              }}
            >
              Transform Australian English content to US English with AI
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Enter website URL (e.g., example.com.au)"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                error={!!error}
                helperText={error}
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
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'hsl(var(--primary) / 0.9)',
                },
              }}
            >
              Localize Website
            </Button>
          </form>

          <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid hsl(var(--border))' }}>
            <Typography
              variant="body2"
              sx={{
                color: 'hsl(var(--muted-foreground))',
                textAlign: 'center',
              }}
            >
              Our AI will analyze and convert Australian English terminology, spelling, and expressions to US English equivalents
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Landing;
