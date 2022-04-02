import React, { Fragment, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  condition: boolean;
}

const RenderIf = (props: IProps) => {
  const { children, condition } = props;

  if (!condition) return null;

  return <Fragment>{children}</Fragment>;
};

export default RenderIf;
