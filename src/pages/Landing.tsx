import { Box, Container, Typography, TextField, IconButton, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { Send, Upload } from '@mui/icons-material';
import { useState, KeyboardEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const Landing = () => {
  const [inputType, setInputType] = useState<'url' | 'html'>('url');
  const [url, setUrl] = useState('');
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [targetCountry, setTargetCountry] = useState('US');
  const [brandTone, setBrandTone] = useState('');
  const [audienceSegments, setAudienceSegments] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if ((inputType === 'url' && url.trim()) || (inputType === 'html' && htmlFile)) {
      const params = new URLSearchParams({
        url: inputType === 'url' ? url : htmlFile?.name || '',
        targetCountry,
        ...(brandTone && { brandTone }),
        ...(audienceSegments && { audienceSegments }),
        ...(campaignGoal && { campaignGoal }),
      });
      navigate(`/workspace?${params.toString()}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/html') {
      setHtmlFile(file);
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
            p: 3,
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid hsl(var(--border))',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Input Type Selection */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={() => setInputType('url')}
              variant={inputType === 'url' ? 'contained' : 'outlined'}
              sx={{
                flex: 1,
                bgcolor: inputType === 'url' ? 'hsl(var(--primary))' : 'transparent',
                color: inputType === 'url' ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
                '&:hover': {
                  bgcolor: inputType === 'url' ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
                  opacity: 0.9,
                },
              }}
            >
              Paste URL
            </Button>
            <Button
              onClick={() => setInputType('html')}
              variant={inputType === 'html' ? 'contained' : 'outlined'}
              sx={{
                flex: 1,
                bgcolor: inputType === 'html' ? 'hsl(var(--primary))' : 'transparent',
                color: inputType === 'html' ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
                '&:hover': {
                  bgcolor: inputType === 'html' ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
                  opacity: 0.9,
                },
              }}
            >
              Upload HTML
            </Button>
          </Box>

          {/* URL Input or File Upload */}
          {inputType === 'url' ? (
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
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  '& input::placeholder': {
                    color: 'hsl(var(--muted-foreground))',
                    opacity: 1,
                  },
                },
              }}
            />
          ) : (
            <Box>
              <input
                ref={fileInputRef}
                type="file"
                accept=".html"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outlined"
                startIcon={<Upload />}
                fullWidth
                sx={{
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                  justifyContent: 'flex-start',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'hsl(var(--accent))',
                  },
                }}
              >
                {htmlFile ? htmlFile.name : 'Choose HTML file'}
              </Button>
            </Box>
          )}

          {/* Target Country */}
          <FormControl fullWidth>
            <InputLabel sx={{ color: 'hsl(var(--muted-foreground))' }}>Target Country</InputLabel>
            <Select
              value={targetCountry}
              onChange={(e) => setTargetCountry(e.target.value)}
              label="Target Country"
              sx={{
                color: 'hsl(var(--foreground))',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--border))',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'hsl(var(--border))',
                },
              }}
            >
              <MenuItem value="US">United States (US English)</MenuItem>
              <MenuItem value="UK">United Kingdom (UK English)</MenuItem>
              <MenuItem value="AU">Australia (AU English)</MenuItem>
              <MenuItem value="CA">Canada (CA English)</MenuItem>
            </Select>
          </FormControl>

          {/* Brand Tone (Optional) */}
          <TextField
            fullWidth
            value={brandTone}
            onChange={(e) => setBrandTone(e.target.value)}
            placeholder="Brand tone (optional, e.g., professional, casual, friendly)"
            variant="outlined"
            label="Brand Tone"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'hsl(var(--foreground))',
                '& fieldset': {
                  borderColor: 'hsl(var(--border))',
                },
                '&:hover fieldset': {
                  borderColor: 'hsl(var(--border))',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'hsl(var(--muted-foreground))',
              },
            }}
          />

          {/* Audience Segments (Optional) */}
          <TextField
            fullWidth
            value={audienceSegments}
            onChange={(e) => setAudienceSegments(e.target.value)}
            placeholder="Target audience (optional, e.g., millennials, professionals)"
            variant="outlined"
            label="Audience Segments"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'hsl(var(--foreground))',
                '& fieldset': {
                  borderColor: 'hsl(var(--border))',
                },
                '&:hover fieldset': {
                  borderColor: 'hsl(var(--border))',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'hsl(var(--muted-foreground))',
              },
            }}
          />

          {/* Campaign Goal (Optional) */}
          <TextField
            fullWidth
            value={campaignGoal}
            onChange={(e) => setCampaignGoal(e.target.value)}
            placeholder="Campaign goal (optional, e.g., increase conversions, brand awareness)"
            variant="outlined"
            label="Campaign Goal"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'hsl(var(--foreground))',
                '& fieldset': {
                  borderColor: 'hsl(var(--border))',
                },
                '&:hover fieldset': {
                  borderColor: 'hsl(var(--border))',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'hsl(var(--muted-foreground))',
              },
            }}
          />

          {/* Submit Button */}
          <IconButton
            onClick={handleSubmit}
            disabled={(inputType === 'url' && !url.trim()) || (inputType === 'html' && !htmlFile)}
            sx={{
              color: ((inputType === 'url' && url.trim()) || (inputType === 'html' && htmlFile)) 
                ? 'hsl(var(--primary-foreground))' 
                : 'hsl(var(--muted-foreground))',
              bgcolor: ((inputType === 'url' && url.trim()) || (inputType === 'html' && htmlFile)) 
                ? 'hsl(var(--primary))' 
                : 'hsl(var(--muted))',
              borderRadius: '12px',
              alignSelf: 'flex-end',
              '&:hover': {
                bgcolor: ((inputType === 'url' && url.trim()) || (inputType === 'html' && htmlFile)) 
                  ? 'hsl(var(--primary))' 
                  : 'hsl(var(--muted))',
                opacity: ((inputType === 'url' && url.trim()) || (inputType === 'html' && htmlFile)) ? 0.9 : 1,
              },
              '&:disabled': {
                color: 'hsl(var(--muted-foreground))',
                bgcolor: 'hsl(var(--muted))',
              },
            }}
            aria-label="Submit"
          >
            <Send />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};
