
import * as React from 'react'
import cx from 'classnames'
import { Box } from 'tt-react-ui-2'

// Styles: 
import './style.css'

// ================================================================================================

export interface DashboardProps {

}


export const Dashboard: React.FunctionComponent<DashboardProps> = ({}) => {

  return (
    <Box className={cx('Dashboard')} h="screen" w="full">
      Dashboard
    </Box>
  )
}

