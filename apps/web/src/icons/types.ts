import { CSSProperties } from 'react'

export type TIcon = {
  color?: string
  size?: 's' | 'm' | 'l' | 'xs'| 'xxs'
  width?: number | string
  height?: number | string
  direction?: 'left' | 'right' | 'up' | 'down'
  transition?: CSSProperties['transition']
}