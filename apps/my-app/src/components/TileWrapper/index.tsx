import {useLocalStorage} from '@mantine/hooks'
import {DivWrapper} from './style'

type TileWrapperProps = {
  children?: React.ReactNode
}

function TileWrapper({children}: TileWrapperProps) {
  const [zoom] = useLocalStorage({key: 'zoom', defaultValue: 1})
  return <DivWrapper css={{minSize: zoom * 100}}>{children}</DivWrapper>
}

export default TileWrapper
