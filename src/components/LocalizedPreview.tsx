import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { LocalizationChange } from '@/pages/Workspace';
import _ from 'lodash';

interface LocalizedPreviewProps {
  html: string;
  changes: LocalizationChange[];
}

export const LocalizedPreview = ({ html, changes }: LocalizedPreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [highlightedHtml, setHighlightedHtml] = useState(html);

  useEffect(() => {
    // Apply highlighting to changed elements
    let modifiedHtml = html;

    changes.forEach((change) => {
      if (change.type === 'modification' && change.newValue) {
        // Highlight modifications with yellow background
        const highlightStyle = 'background-color: #fef3c7; padding: 2px 4px; border-radius: 2px; transition: all 0.3s;';
        modifiedHtml = modifiedHtml.replace(
          new RegExp(_.escapeRegExp(change.newValue), 'g'),
          `<span style="${highlightStyle}">${change.newValue}</span>`
        );
      } else if (change.type === 'addition' && change.newValue) {
        // Highlight additions with green background
        const highlightStyle = 'background-color: #d1fae5; padding: 2px 4px; border-radius: 2px; transition: all 0.3s;';
        modifiedHtml = modifiedHtml.replace(
          new RegExp(_.escapeRegExp(change.newValue), 'g'),
          `<span style="${highlightStyle}">${change.newValue}</span>`
        );
      } else if (change.type === 'deletion' && change.oldValue) {
        // Show deletions with red background and strikethrough
        const highlightStyle = 'background-color: #fee2e2; padding: 2px 4px; border-radius: 2px; text-decoration: line-through; transition: all 0.3s;';
        modifiedHtml = modifiedHtml.replace(
          new RegExp(_.escapeRegExp(change.oldValue), 'g'),
          `<span style="${highlightStyle}">${change.oldValue}</span>`
        );
      }
    });

    setHighlightedHtml(modifiedHtml);
  }, [html, changes]);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(highlightedHtml);
        iframeDoc.close();
      }
    }
  }, [highlightedHtml]);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'hsl(var(--background))',
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: 'hsl(var(--card))',
          borderBottom: '1px solid hsl(var(--border))',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'hsl(var(--foreground))',
            fontSize: '1rem',
          }}
        >
          Localized Preview
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: '#fef3c7',
                border: '1px solid #fbbf24',
                borderRadius: '2px',
              }}
            />
            <Typography variant="caption" sx={{ color: 'hsl(var(--muted-foreground))' }}>
              Modified
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: '#d1fae5',
                border: '1px solid #10b981',
                borderRadius: '2px',
              }}
            />
            <Typography variant="caption" sx={{ color: 'hsl(var(--muted-foreground))' }}>
              Added
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: '#fee2e2',
                border: '1px solid #ef4444',
                borderRadius: '2px',
              }}
            />
            <Typography variant="caption" sx={{ color: 'hsl(var(--muted-foreground))' }}>
              Deleted
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Preview iframe */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflow: 'auto',
          bgcolor: 'hsl(var(--muted))',
        }}
      >
        <Paper
          elevation={2}
          sx={{
            height: '100%',
            bgcolor: '#ffffff',
            overflow: 'hidden',
          }}
        >
          <iframe
            ref={iframeRef}
            title="Localized Preview"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            sandbox="allow-same-origin"
          />
        </Paper>
      </Box>
    </Box>
  );
};
