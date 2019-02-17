import * as React from 'react'
import cx from 'classnames'
import { Text, TextProps } from 'tt-react-ui-2'

// ================================================================================================

export interface IconProps extends TextProps {
  btn?: boolean
  className?: string
  name: string
}

export const Icon: React.FunctionComponent<IconProps> = React.memo(
  ({ btn, className, cursor, name, ...rest }) => (
    <Text
      {...rest}
      className={cx(className && className, 'Icon', `icon-${name}`)}
      cursor={btn ? 'hover:pointer' : cursor}
    />
  )
)

Icon.defaultProps = {
  transition: true
}
