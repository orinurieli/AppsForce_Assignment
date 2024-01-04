import styled from 'styled-components';
import { Card, CardContent, CardMedia, Button } from '@mui/material';

export const StyledCard = styled(Card)`
  display: flex;
  margin-bottom: 16px;
`;

export const StyledCardMedia = styled(CardMedia)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

export const StyledCardContent = styled(CardContent)`
  margin-left: 16px;
`;

export const StyledButton = styled(Button)`
  margin-top: 16px;
`;

