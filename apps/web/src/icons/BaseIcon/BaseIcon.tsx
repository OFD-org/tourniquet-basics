import { SVGProps } from 'react'
import { Box } from '@mui/material'
import { TIcon } from '../types'

type TProps = {
  size?: TIcon['size']
  width?: TIcon['width']
  height?: TIcon['height']
  direction?: 'left' | 'right' | 'up' | 'down'
  transition?: TIcon['transition']
} & SVGProps<SVGSVGElement>

const TRANSITION_DURATION = '200ms'

const icon = (props: {
  direction: TProps['direction']
  transition: TProps['transition']
}) => {
  const direction = () => {
    switch (props.direction) {
      case 'left':
        return ' rotate(90deg)'
      case 'right':
        return 'rotate(270deg)'
      case 'up':
        return 'rotate(0deg)'

      case 'down':
        return 'rotate(180deg)'
      default:
        return 'rotate(0deg)'
    }
  }
  return {
    display: 'inline-flex',
    position: 'relative',
    transition: props.transition || 'transform 150ms',
    path: {
      transition: `fill ${TRANSITION_DURATION} linear, stroke ${TRANSITION_DURATION} linear`,
    },
    transform: direction(),
  }
}

export const getSize = (size: TIcon['size']): number => {
  if (size === 'xxs') return 10
  if (size === 'xs') return 14
  if (size === 's') return 24
  if (size === 'm') return 32
  return 24
}

export const BaseIcon: React.FC<TProps> = ({
  size = 's',
  width,
  height,
  children,
  direction,
  transition,
  ...props
}) => (
  <Box sx={icon({ direction, transition })}>
    <svg width={width || getSize(size)} height={height || getSize(size)} {...props}>
      {children}
    </svg>
  </Box>
)
