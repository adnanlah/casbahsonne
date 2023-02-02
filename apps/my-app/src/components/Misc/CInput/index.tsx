import {forwardRef, InputHTMLAttributes} from 'react'

const CInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({...props}, ref) => {
  return <input {...props} autoComplete="off" spellCheck="false" ref={ref} />
})

export default CInput
