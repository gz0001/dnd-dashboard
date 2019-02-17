import * as React from 'react'
import cx from 'classnames'
import { Box, Button, Headline } from 'tt-react-ui-2'

// Contexts:
import { DashboardContext } from 'context/dashboard'

// Component:
import { Icon } from 'components/Icon'

// Styles:
import './style.css'

// ================================================================================================

export interface DashboardItemProps {
  className?: string
  i: string
  label: string
  onClose: (i: string) => void
  onFullScreen: (i: string) => void
}

export const DashboardItem: React.FunctionComponent<DashboardItemProps> = ({
  className,
  i,
  label,
  onClose,
  onFullScreen
}) => {
  // context:
  const {
    state: { full }
  } = React.useContext(DashboardContext)
  return (
    <Box className={cx('DashboardItem', i === 'pl' && 'pl')} bg="second" display="block" h="full" w="full">
      {i !== 'pl' && (
        <Box
          className={cx('DashboardItem__header')}
          items="center"
          justify="between"
          pl="8"
          pr="4"
          py="2"
        >
          <Headline className="DashboardItem__headline" font="bold" size="xl" uppercase>
            {label}
          </Headline>
          <Box w="auto">
            <Icon className="draghandler" mr="3" name="arrows" cursor="hover:move" />
            <Icon btn mr="3" name="trash" hover="third" textProps={{ onClick: () => onClose(i) }} />
            <Icon
              btn
              name={full ? 'compress' : 'expand'}
              hover="third"
              textProps={{ onClick: () => onFullScreen(i) }}
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}
