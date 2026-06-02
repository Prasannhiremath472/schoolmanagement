import { createTheme, Theme } from '@mui/material/styles';

const fontFamily = '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif';

const commonTypography = {
  fontFamily,
  h1: { fontWeight: 700 },
  h2: { fontWeight: 700 },
  h3: { fontWeight: 700 },
  h4: { fontWeight: 700 },
  h5: { fontWeight: 700 },
  h6: { fontWeight: 700 },
  button: { fontFamily, fontWeight: 600, textTransform: 'none' as const },
};

const commonComponents = {
  MuiCssBaseline: {
    styleOverrides: {
      '*, *::before, *::after': { boxSizing: 'border-box' },
      html: { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 8, textTransform: 'none' as const, fontWeight: 600, boxShadow: 'none' },
      contained: { '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' } },
    },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.06)',
      },
    },
  },
  MuiCardContent: {
    styleOverrides: { root: { padding: 20, '&:last-child': { paddingBottom: 20 } } },
  },
  MuiTextField: {
    styleOverrides: {
      root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: { root: { borderRadius: 8 } },
  },
  MuiPaper: {
    styleOverrides: { root: { borderRadius: 12 } },
  },
  MuiChip: {
    styleOverrides: { root: { fontWeight: 600 } },
  },
  MuiTableCell: {
    styleOverrides: { head: { fontWeight: 700 } },
  },
  MuiTooltip: {
    defaultProps: { arrow: true },
  },
  MuiAppBar: {
    defaultProps: { elevation: 0 },
  },
  MuiDrawer: {
    styleOverrides: { paper: { backgroundImage: 'none' } },
  },
  MuiDialog: {
    styleOverrides: { paper: { borderRadius: 16 } },
  },
  MuiSelect: {
    styleOverrides: { outlined: { borderRadius: 8 } },
  },
  MuiTab: {
    styleOverrides: { root: { textTransform: 'none', fontWeight: 600, minHeight: 44 } },
  },
};

// ─── Light Theme ─────────────────────────────────────────────────────────────
export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#1976d2', light: '#42a5f5', dark: '#1565c0', contrastText: '#fff' },
    secondary:  { main: '#9c27b0', light: '#ba68c8', dark: '#7b1fa2', contrastText: '#fff' },
    success:    { main: '#2e7d32', light: '#4caf50', dark: '#1b5e20' },
    warning:    { main: '#ed6c02', light: '#ff9800', dark: '#e65100' },
    error:      { main: '#d32f2f', light: '#ef5350', dark: '#c62828' },
    info:       { main: '#0288d1' },
    background: { default: '#f0f2f5', paper: '#ffffff' },
    text:       { primary: '#111827', secondary: '#6b7280', disabled: '#9ca3af' },
    divider:    'rgba(0,0,0,0.08)',
  },
  typography: commonTypography,
  components: commonComponents,
  shape: { borderRadius: 8 },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.08)',
    '0 2px 8px rgba(0,0,0,0.08)',
    '0 4px 16px rgba(0,0,0,0.08)',
    '0 8px 24px rgba(0,0,0,0.08)',
    '0 12px 32px rgba(0,0,0,0.08)',
    ...Array(19).fill('0 16px 40px rgba(0,0,0,0.10)'),
  ] as any,
});

// ─── Dark Theme ──────────────────────────────────────────────────────────────
export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary:    { main: '#60a5fa', light: '#93c5fd', dark: '#3b82f6' },
    secondary:  { main: '#c084fc', light: '#e9d5ff', dark: '#a855f7' },
    success:    { main: '#4ade80', light: '#86efac', dark: '#22c55e' },
    warning:    { main: '#fb923c', light: '#fdba74', dark: '#f97316' },
    error:      { main: '#f87171', light: '#fca5a5', dark: '#ef4444' },
    info:       { main: '#38bdf8' },
    background: { default: '#0f172a', paper: '#1e293b' },
    text:       { primary: '#f1f5f9', secondary: '#94a3b8', disabled: '#64748b' },
    divider:    'rgba(255,255,255,0.08)',
  },
  typography: commonTypography,
  components: {
    ...commonComponents,
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none', borderRadius: 12 } },
    },
  },
  shape: { borderRadius: 8 },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.3)',
    '0 2px 8px rgba(0,0,0,0.3)',
    '0 4px 16px rgba(0,0,0,0.3)',
    '0 8px 24px rgba(0,0,0,0.3)',
    '0 12px 32px rgba(0,0,0,0.3)',
    ...Array(19).fill('0 16px 40px rgba(0,0,0,0.4)'),
  ] as any,
});
