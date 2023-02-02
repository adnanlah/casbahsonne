import {Box, BoxesList} from './style'

type BoxesSelectProps = {
  options: number[]
  selected: number
  onSelect: (value: number) => void
}

function BoxesSelect({options, selected, onSelect}: BoxesSelectProps) {
  return (
    <BoxesList>
      {options.map(o => (
        <Box key={o} selected={selected === o} onClick={() => onSelect(o)}>
          {o}
        </Box>
      ))}
    </BoxesList>
  )
}

export default BoxesSelect
