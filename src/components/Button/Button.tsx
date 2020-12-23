import { ButtonHTMLAttributes } from 'react'
import Spinner from '../Loader/Spinner'
import { IStyledButtonProps, LoadingProgress, StyledPrimaryButton } from './Button.styled'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>, IStyledButtonProps {
  icon?: JSX.Element
  disabled?: boolean
  isLoading?: boolean
  loadingProgress?: number
  className?: string
}

const Button: React.FC<IProps> = ({
  children,
  isLoading,
  icon,
  disabled,
  loadingProgress,
  ...rest
}) => {
  return (
    <StyledPrimaryButton {...rest} disabled={isLoading || disabled}>
      {isLoading ? <Spinner /> : children}
      {isLoading && loadingProgress !== undefined && (
        <LoadingProgress>{loadingProgress.toFixed()}</LoadingProgress>
      )}
    </StyledPrimaryButton>
  )
}

export default Button
