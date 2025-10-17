import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { WorkspaceChat } from '@/components/WorkspaceChat';
import { LocalizedPreview } from '@/components/LocalizedPreview';
import _ from 'lodash';

export interface LocalizationChange {
  type: 'modification' | 'addition' | 'deletion';
  selector: string;
  oldValue?: string;
  newValue?: string;
  path?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeSnippets?: { language: string; code: string }[];
  suggestions?: string[];
  changes?: LocalizationChange[];
}

export const Workspace = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url') || '';
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [localizedHtml, setLocalizedHtml] = useState<string>('');
  const [changes, setChanges] = useState<LocalizationChange[]>([]);

  useEffect(() => {
    // Initial localization simulation
    const initialMessage: ChatMessage = {
      id: '1',
      role: 'assistant',
      content: `I've localized ${url} from Australian to US English. Here are the main changes:`,
      timestamp: new Date(),
      suggestions: [
        'Change "colour" to "color"',
        'Update date formats to MM/DD/YYYY',
        'Convert measurements to imperial',
        'Adjust spelling: "organise" to "organize"',
      ],
      changes: [
        {
          type: 'modification',
          selector: 'h1',
          oldValue: 'Welcome to our organisation',
          newValue: 'Welcome to our organization',
        },
        {
          type: 'modification',
          selector: '.hero-text',
          oldValue: 'Our favourite colours',
          newValue: 'Our favorite colors',
        },
      ],
    };
    
    setMessages([initialMessage]);
    setChanges(initialMessage.changes || []);
    
    // Simulate localized HTML
    setLocalizedHtml(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Localized Website</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .hero-text { font-size: 18px; margin: 20px 0; }
            .content { line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>Welcome to our organization</h1>
          <p class="hero-text">Our favorite colors are blue and green.</p>
          <div class="content">
            <p>We organize events every month to showcase our favorite items.</p>
            <p>Check out our catalog for more information.</p>
          </div>
        </body>
      </html>
    `);
  }, [url]);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response with suggestions and code
    setTimeout(() => {
      const newChanges: LocalizationChange[] = [
        {
          type: 'modification',
          selector: '.content p:first-child',
          oldValue: 'organize events',
          newValue: 'schedule events',
        },
      ];

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've updated the text as requested. Here's what changed:`,
        timestamp: new Date(),
        codeSnippets: [
          {
            language: 'html',
            code: '<p>We schedule events every month to showcase our favorite items.</p>',
          },
        ],
        suggestions: [
          'Update "catalog" to "catalogue"',
          'Change font to sans-serif',
          'Add more spacing between sections',
        ],
        changes: newChanges,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setChanges(prev => [...prev, ...newChanges]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        bgcolor: 'hsl(var(--background))',
      }}
    >
      {/* Chat Panel - 35% */}
      <Box
        sx={{
          width: '35%',
          borderRight: '1px solid hsl(var(--border))',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <WorkspaceChat
          messages={messages}
          onSendMessage={handleSendMessage}
          onSuggestionClick={handleSuggestionClick}
          url={url}
        />
      </Box>

      {/* Preview Panel - 65% */}
      <Box
        sx={{
          width: '65%',
          overflow: 'hidden',
        }}
      >
        <LocalizedPreview html={localizedHtml} changes={changes} />
      </Box>
    </Box>
  );
};
