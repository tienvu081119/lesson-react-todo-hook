import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body {
    background: ${({ theme }) => theme.body};
    color: white;
    min-height: 100vh;
    margin-bottom: 2rem;
}`;