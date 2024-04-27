import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Montserrat', sans-serif",
  },
  colors: {
    primary: {
      50: '#f2f6ff',
      100: '#d9e4ff',
      200: '#a6c1ff',
      300: '#598bff',
      400: '#3366ff',
      500: '#274bdb',
      600: '#1a34b8',
      700: '#102694',
      800: '#091a7a',
      900: '#040f4f',
    },
    secondary: {
      50: '#f2fcf9',
      100: '#d9f6ee',
      200: '#a6e4cd',
      300: '#5cdba7',
      400: '#36d68e',
      500: '#2fb37d',
      600: '#279c6b',
      700: '#1c7250',
      800: '#124c39',
      900: '#082a21',
    },
    accent: {
      50: '#ffeff2',
      100: '#ffd6df',
      200: '#ffaac1',
      300: '#ff7394',
      400: '#ff4771',
      500: '#e62e58',
      600: '#bf1f45',
      700: '#981636',
      800: '#73102c',
      900: '#4e0a20',
    },
    gray: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
  },
});

export default theme;
