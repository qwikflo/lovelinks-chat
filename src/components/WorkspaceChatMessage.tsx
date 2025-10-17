import { Box, Typography, Chip, Paper } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChatMessage } from '@/pages/Workspace';
import { Person, SmartToy } from '@mui/icons-material';

interface WorkspaceChatMessageProps {
  message: ChatMessage;
  onSuggestionClick: (suggestion: string) => void;
}

export const WorkspaceChatMessage = ({
  message,
  onSuggestionClick,
}: WorkspaceChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        mb: 3,
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      {/* Avatar */}
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          bgcolor: isUser ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {isUser ? (
          <Person sx={{ fontSize: 18, color: 'hsl(var(--primary-foreground))' }} />
        ) : (
          <SmartToy sx={{ fontSize: 18, color: 'hsl(var(--secondary-foreground))' }} />
        )}
      </Box>

      {/* Message Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'hsl(var(--foreground))',
            mb: 1.5,
            lineHeight: 1.6,
          }}
        >
          {message.content}
        </Typography>

        {/* Code Snippets */}
        {message.codeSnippets && message.codeSnippets.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {message.codeSnippets.map((snippet, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  mb: 1,
                  overflow: 'hidden',
                  borderRadius: '8px',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'hsl(var(--muted))',
                    px: 2,
                    py: 0.5,
                    borderBottom: '1px solid hsl(var(--border))',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'hsl(var(--muted-foreground))',
                      fontFamily: 'monospace',
                    }}
                  >
                    {snippet.language}
                  </Typography>
                </Box>
                <SyntaxHighlighter
                  language={snippet.language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    fontSize: '0.75rem',
                    background: 'hsl(var(--card))',
                  }}
                >
                  {snippet.code}
                </SyntaxHighlighter>
              </Paper>
            ))}
          </Box>
        )}

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {message.suggestions.map((suggestion, index) => (
              <Chip
                key={index}
                label={suggestion}
                size="small"
                onClick={() => onSuggestionClick(suggestion)}
                sx={{
                  bgcolor: 'hsl(var(--muted))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  '&:hover': {
                    bgcolor: 'hsl(var(--accent))',
                    borderColor: 'hsl(var(--primary))',
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            color: 'hsl(var(--muted-foreground))',
            display: 'block',
            mt: 1,
          }}
        >
          {message.timestamp.toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};
