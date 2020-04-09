import React, { InputHTMLAttributes } from 'react';
import { FieldType } from 'redux-form';
import styled from 'styled-components';

interface DecoratorProps {
  isActive?: boolean;
  isValid?: boolean;
}

const InputWrapper = styled.div`
  position: relative;
  margin-top: 35px;
`;

const UserInput = styled.input`
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 18px;
  color: #555555;
  line-height: 1.2;
  display: block;
  width: 100%;
  height: 52px;
  background: transparent;
  padding: 0 5px;
  border: none;
  outline: none;
  box-sizing: border-box;
`;

const Decorator = styled.span`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  &::before {
    content: '';
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    transition: all 0.4s;
    background: #57b846;
    ${({ isActive, isValid }: DecoratorProps) =>
      (isActive || isValid) &&
      `
        width: 100%; !important;
    `}
    ${({ isValid }: DecoratorProps) =>
      isValid &&
      `
        background: red !important;
    `}
  }
  &::after {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 18px;
    color: #999999;
    line-height: 1.2;
    content: attr(placeholder);
    display: block;
    width: 100%;
    position: absolute;
    top: 15px;
    left: 0px;
    padding-left: 5px;
    transition: all 0.4s;
    text-align: left;
    ${({ isActive }: DecoratorProps) =>
      isActive &&
      `
        top: -20px !important;
        font-size: 15px !important;
    `}
  }
`;

const ErrorMessage = styled.span`
  position: absolute;
  top: 100%;
  right: 0;
  text-align: right;
  margin: 5px;
  font-size: 0.75em;
  color: red;
`;

interface OwnProps {}

const Input: React.FC<any> = (props) => {
  // console.log(props);
  return (
    <InputWrapper>
      <UserInput {...props.input} type={props.type} />
      <Decorator
        placeholder={props.placeholder}
        isActive={props.meta.active || props.input.value}
        isValid={props.meta.touched && props.meta.error}
      />
      {props.meta.touched && props.meta.error && <ErrorMessage>{props.meta?.error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default React.memo(Input);
