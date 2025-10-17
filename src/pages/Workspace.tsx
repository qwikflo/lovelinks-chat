import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Container, IconButton, Typography, Paper, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { LocalizedPreview } from '@/components/LocalizedPreview';
import { WorkspaceChat } from '@/components/WorkspaceChat';

export interface LocalizationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  codeSnippets?: Array<{
    language: string;
    code: string;
    label?: string;
  }>;
}

const Workspace = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get('url');
  const [messages, setMessages] = useState<LocalizationMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [localizedContent, setLocalizedContent] = useState<string>('');

  useEffect(() => {
    if (!url) {
      navigate('/');
      return;
    }

    // Simulate initial localization
    setIsProcessing(true);
    setTimeout(() => {
      const initialContent = `
        <html>
          <head><title>Localized Content</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Welcome to Our American Store</h1>
            <p>We've localized your content from Australian to US English.</p>
            <p>Color instead of colour, center instead of centre, etc.</p>
          </body>
        </html>
      `;
      setLocalizedContent(initialContent);
      
      const welcomeMessage: LocalizationMessage = {
        id: '1',
        role: 'assistant',
        content: `I've successfully localized the content from ${decodeURIComponent(url)}. The main changes include spelling adjustments (colour → color, centre → center) and terminology updates.`,
        timestamp: new Date(),
        suggestions: [
          'Convert currency symbols',
          'Update date formats',
          'Localize measurements',
          'Adjust regional terminology',
        ],
        codeSnippets: [
          {
            language: 'html',
            code: '<p style="color: #333;">American spelling applied</p>',
            label: 'HTML Changes',
          },
        ],
      };
      
      setMessages([welcomeMessage]);
      setIsProcessing(false);
    }, 2000);
  }, [url, navigate]);

  const handleSendMessage = (content: string) => {
    const userMessage: LocalizationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: LocalizationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've processed your request: "${content}". The changes have been applied to the preview.`,
        timestamp: new Date(),
        suggestions: [
          'Apply these changes globally',
          'Revert this change',
          'Show more examples',
        ],
        codeSnippets: [
          {
            language: 'css',
            code: `.updated-class {\n  color: #1976d2;\n  font-size: 16px;\n}`,
            label: 'CSS Updates',
          },
        ],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!url) {
    return null;
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'hsl(var(--background))' }}>
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          py: 2,
          px: 3,
          borderRadius: 0,
          bgcolor: 'hsl(var(--card))',
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: 'hsl(var(--foreground))',
                '&:hover': {
                  bgcolor: 'hsl(var(--muted))',
                },
              }}
            >
              <ArrowBack />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'hsl(var(--foreground))',
                }}
              >
                Workspace
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'hsl(var(--muted-foreground))',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {decodeURIComponent(url)}
              </Typography>
            </Box>
            {isProcessing && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                  Processing...
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Paper>

      {/* Split Screen Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: Localized Preview */}
        <Box
          sx={{
            flex: 1,
            borderRight: '1px solid hsl(var(--border))',
            overflow: 'hidden',
          }}
        >
          <LocalizedPreview content={localizedContent} />
        </Box>

        {/* Right: Chat Interface */}
        <Box
          sx={{
            width: { xs: '100%', md: '45%' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <WorkspaceChat
            messages={messages}
            onSendMessage={handleSendMessage}
            onSuggestionClick={handleSuggestionClick}
            disabled={isProcessing}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Workspace;
