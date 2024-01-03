import styled from 'styled-components';
import { Card, CardContent, CardMedia, Button } from '@mui/material';

export const StyledCard = styled(Card)`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

export const StyledCardMedia = styled(CardMedia)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

export const StyledCardContent = styled(CardContent)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

export const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

