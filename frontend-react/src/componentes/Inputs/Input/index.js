import styled from "styled-components"

const Input = styled.input.attrs(props => ({
  type: 'text',         // Se quiser forçar tipo 'text'
  id: props.id,
  value: props.value,
  onChange: props.onChange,
  placeholder: props.placeholder || ''
}))`
  background-color: #CACACA;
  backdrop-filter: blur(10px);
  border: 1px solid rgb(3, 48, 116);
  padding: 10px;
  border-radius: 25px;
  width: 100%;
  height: 15px;
  color: rgb(3, 48, 116);
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  align-items: flex-start;
  font-family: "Bookochi";
  letter-spacing: 0.22em;

  &::placeholder {
    color: rgb(3, 48, 116);
    font-size: 16px;
  }

  &:focus {
    border: 2px solid rgb(3, 48, 116); 
    box-shadow: 0px 0px 5px rgb(59, 208, 245); 
  }
`

export default Input;
