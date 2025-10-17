import { Box, Typography, Chip, Paper } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LocalizationMessage } from '@/pages/Workspace';

interface WorkspaceChatMessageProps {
  message: LocalizationMessage;
  onSuggestionClick: (suggestion: string) => void;
}

export const WorkspaceChatMessage = ({
  message,
  onSuggestionClick,
}: WorkspaceChatMessageProps) => {
  const isUser = message.role === 'user';
  
  // Check if dark mode (you can implement actual dark mode detection)
  const isDark = false; // You can connect this to your theme

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        gap: 1,
      }}
    >
      {/* Message Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexDirection: isUser ? 'row-reverse' : 'row',
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isUser ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
            color: isUser ? 'hsl(var(--primary-foreground))' : 'hsl(var(--secondary-foreground))',
          }}
        >
          {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: 'hsl(var(--muted-foreground))',
            fontWeight: 500,
          }}
        >
          {isUser ? 'You' : 'AI Assistant'}
        </Typography>
      </Box>

      {/* Message Content */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '85%',
          bgcolor: isUser ? 'hsl(var(--primary))' : 'hsl(var(--card))',
          color: isUser ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
          borderRadius: 2,
          border: isUser ? 'none' : '1px solid hsl(var(--border))',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message.content}
        </Typography>

        {/* Code Snippets */}
        {message.codeSnippets && message.codeSnippets.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {message.codeSnippets.map((snippet, index) => (
              <Box key={index}>
                {snippet.label && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mb: 1,
                      color: 'hsl(var(--muted-foreground))',
                      fontWeight: 600,
                    }}
                  >
                    {snippet.label}
                  </Typography>
                )}
                <Box
                  sx={{
                    borderRadius: 1,
                    overflow: 'hidden',
                    '& pre': {
                      margin: 0,
                      fontSize: '0.875rem',
                    },
                  }}
                >
                  <SyntaxHighlighter
                    language={snippet.language}
                    style={isDark ? oneDark : oneLight}
                    customStyle={{
                      margin: 0,
                      borderRadius: '4px',
                    }}
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Suggestion Chips */}
        {message.suggestions && message.suggestions.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {message.suggestions.map((suggestion, index) => (
              <Chip
                key={index}
                label={suggestion}
                size="small"
                onClick={() => onSuggestionClick(suggestion)}
                sx={{
                  bgcolor: 'hsl(var(--accent))',
                  color: 'hsl(var(--accent-foreground))',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'hsl(var(--accent) / 0.8)',
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* Timestamp */}
      <Typography
        variant="caption"
        sx={{
          color: 'hsl(var(--muted-foreground))',
          px: 1,
        }}
      >
        {message.timestamp.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Typography>
    </Box>
  );
};
