import React from 'react'

interface FormTitle {
  className?: string;
  title: string
}

const FormTitle: React.FC<FormTitle> = (props) => {
  return (
    <h1 className={`form-title ${props.className ? props.className : ''}`}>{props.title}</h1>
  )
}

export default FormTitle
