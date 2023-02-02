import {CheckIcon} from '@heroicons/react/24/solid'
import {StyledCheckbox, StyledIndicator} from './style'

type CCheckboxProps = {
  checked: boolean
  onCheckedChange: () => void
  id: string
}

function CCheckbox({id, checked, onCheckedChange}: CCheckboxProps) {
  return (
    <StyledCheckbox checked={checked} onCheckedChange={onCheckedChange} id={id}>
      <StyledIndicator>
        <CheckIcon />
      </StyledIndicator>
    </StyledCheckbox>
  )
}

export default CCheckbox
