import { Box, Typography } from '@mui/material';

interface LocalizedPreviewProps {
  content: string;
}

export const LocalizedPreview = ({ content }: LocalizedPreviewProps) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'hsl(var(--background))',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid hsl(var(--border))',
          bgcolor: 'hsl(var(--card))',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: 'hsl(var(--foreground))',
          }}
        >
          Localized Preview
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 3,
        }}
      >
        {content ? (
          <Box
            sx={{
              bgcolor: 'hsl(var(--card))',
              borderRadius: 2,
              border: '1px solid hsl(var(--border))',
              overflow: 'hidden',
            }}
          >
            <iframe
              srcDoc={content}
              style={{
                width: '100%',
                height: '600px',
                border: 'none',
              }}
              title="Localized Content Preview"
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'hsl(var(--muted-foreground))',
            }}
          >
            <Typography>Loading preview...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
