import * as React from 'react'
import cx from 'classnames'
import { Box } from 'tt-react-ui-2'

// Components:
import { Icon } from 'components/Icon'

// Styles:
import './style.css'

// ================================================================================================

export interface DashboardProps {}

export const Dashboard: React.FunctionComponent<DashboardProps> = ({}) => {
  return (
    <Box className={cx('Dashboard')} h="screen" w="full">
      Dashboard
      <Icon name="plus" />
    </Box>
  )
}
