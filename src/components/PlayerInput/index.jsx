import styled from "styled-components";

const PlayerInputContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-left: 10px;
  width: 50px;
  
`;

const PlayerInput = ({ player, index, handleRatingChange }) => (
  <PlayerInputContainer>
    <Label>
      {player}:
      <Input
        type="number"
        min="0"
        max="150"
        onChange={(e) => handleRatingChange(index, e.target.value)}
      />
    </Label>
  </PlayerInputContainer>
);


export default PlayerInput;
