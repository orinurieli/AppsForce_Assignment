import styled from 'styled-components';
import { Card, CardContent, CardMedia, Button } from '@mui/material';

export const StyledCard = styled(Card)`
  display: flex;
  margin-bottom: 16px;
`;

export const StyledCardMedia = styled(CardMedia)`
  width: 80px;
  height: 80px;
  margin-top: 20px;
  margin-left: 5px;
  object-fit: cover;
  border-radius: 50%;
`;

export const StyledCardContent = styled(CardContent)`
  margin-left: 16px;
`;

export const StyledButton = styled(Button)`
  margin-top: 16px;
  margin-right: 16px;

  &.delete {
        background-color: red;
        color: white;
    }
`;


