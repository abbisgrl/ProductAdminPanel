export const refinedBlueTheme = {
  primary: {
    100: '#B3D9FF',
    200: '#A3D1FF',
    300: '#6DB6FF',
    400: '#3D9AFF',
    500: '#007bff',
    600: '#0069D3',
    700: '#0055A6',
    800: '#004079',
    900: '#00284D',
  },
  secondary: {
    100: '#FFE6E6',
    200: '#FFB3B3',
    300: '#FF8080',
    400: '#FF4D4D',
    500: '#FF1A1A',
    600: '#CC1515',
    700: '#991010',
    800: '#660B0B',
    900: '#330505',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F4F5F7',
    100: '#E8EAED',
    200: '#D1D5DB',
    300: '#B8BDC3',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
}

export const refinedLightTheme = {
  primary: {
    100: '#CCE5FF',
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007bff',
    600: '#0066CC',
    700: '#0052A3',
    800: '#003D7A',
    900: '#002652',
  },
  secondary: {
    100: '#FFE6E6',
    200: '#FFCCCC',
    300: '#FF9999',
    400: '#FF6666',
    500: '#FF3333',
    600: '#CC2929',
    700: '#991F1F',
    800: '#661414',
    900: '#330A0A',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F2F4F6',
    200: '#E5E8EB',
    300: '#D1D5DB',
    400: '#B0B7C3',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
}
// Applying the refinedLightTheme for light mode in themeSettings

export const themeSettings = (mode) => ({
  palette: {
    mode: mode,
    ...(mode === 'dark'
      ? {
          primary: {
            ...refinedBlueTheme.primary,
            main: refinedBlueTheme.primary[300],
            light: refinedBlueTheme.primary[100],
          },
          secondary: {
            ...refinedBlueTheme.secondary,
            main: refinedBlueTheme.secondary[400],
          },
          neutral: {
            ...refinedBlueTheme.neutral,
            main: refinedBlueTheme.neutral[300],
          },
          background: {
            default: refinedBlueTheme.primary[900],
            alt: refinedBlueTheme.primary[800],
          },
        }
      : {
          primary: {
            ...refinedLightTheme.primary,
            main: refinedLightTheme.primary[500],
            light: refinedLightTheme.primary[100],
          },
          secondary: {
            ...refinedLightTheme.secondary,
            main: refinedLightTheme.secondary[500],
            light: refinedLightTheme.secondary[200],
          },
          neutral: {
            ...refinedLightTheme.neutral,
            main: refinedLightTheme.neutral[500],
          },
          background: {
            default: refinedLightTheme.neutral[50],
            alt: refinedLightTheme.neutral[100],
          },
        }),
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
    fontSize: 14,
    h1: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: 36,
      fontWeight: 700,
    },
    h2: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: 30,
      fontWeight: 600,
    },
    h3: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: 26,
      fontWeight: 500,
    },
    h4: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: 22,
      fontWeight: 500,
    },
    h5: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: 18,
      fontWeight: 400,
    },
    h6: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: 16,
      fontWeight: 400,
    },
  },
})
