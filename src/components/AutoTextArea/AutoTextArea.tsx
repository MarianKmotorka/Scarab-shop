import React, {
  useState,
  useEffect,
  TextareaHTMLAttributes,
  useRef,
  forwardRef,
} from 'react'
import { mergeRefs } from '../../utils/utils'
import { StyledTextArea, Wrapper, Error } from './AutoTextArea.styled'

export interface IAutoTextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string
  className?: string
  error?: string
  onChange?: (value: string) => void
}

const AutoTextArea = forwardRef<HTMLTextAreaElement, IAutoTextAreaProps>(
  ({ onChange, label, rows, className, error, ...rest }, forwardRef) => {
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
            ref={mergeRefs(textAreaRef, forwardRef)}
            rows={rows || 1}
            style={{
              height: textAreaHeight,
            }}
            onChange={onChangeHandler}
          />
        </div>

        {error && <Error>{error}</Error>}
      </Wrapper>
    )
  }
)

export default AutoTextArea
