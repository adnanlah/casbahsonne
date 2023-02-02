import {forwardRef, ReactNode} from 'react'
import {ButtonStyled} from './style'

type ButtonProps = {
  color?: 'dark' | 'light'
  disabled?: boolean
  type?: 'submit' | 'button' | 'reset'
  children: ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
}

const CFButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({color, disabled = false, type, children, onClick, ...restProps}, ref) => {
    return (
      <ButtonStyled
        ref={ref}
        color={color}
        disabled={disabled}
        onClick={onClick}
        type={type}
        {...restProps}
      >
        {children}
      </ButtonStyled>
    )
  },
)

export default CFButton
