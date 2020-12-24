import React, { useState, useEffect, TextareaHTMLAttributes, useRef } from 'react'
import { StyledTextArea, Wrapper } from './AutoTextArea.styled'

interface IProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string
  className?: string
  onChange?: (value: string) => void
}

const AutoTextArea = ({ onChange, label, rows, className, ...rest }: IProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null!)
  const [textAreaHeight, setTextAreaHeight] = useState('auto')
  const [parentHeight, setParentHeight] = useState('auto')

  const text = textAreaRef.current?.value

  useEffect(() => {
    if (!text) {
      setParentHeight('auto')
      setTextAreaHeight('auto')
      return
    }

    setParentHeight(`${textAreaRef.current!.scrollHeight}px`)
    setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`)
  }, [text, textAreaRef])

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight('auto')
    setParentHeight(`${textAreaRef.current!.scrollHeight}px`)

    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <Wrapper className={className}>
      <label>{label}</label>
      <div
        style={{
          minHeight: parentHeight,
        }}
      >
        <StyledTextArea
          {...rest}
          ref={textAreaRef}
          rows={rows || 1}
          style={{
            height: textAreaHeight,
          }}
          onChange={onChangeHandler}
        />
      </div>
    </Wrapper>
  )
}

export default AutoTextArea
