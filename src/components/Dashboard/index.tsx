import * as React from 'react'
import cx from 'classnames'
import { Box, Button } from 'tt-react-ui-2'

// Context:
import { DashboardContext, initialState, reducer } from 'context/dashboard'
import { toggleNav } from 'context/dashboard/actions'

// Components:
import { Icon } from 'components/Icon'

// Styles:
import './style.css'

// ================================================================================================

export const Dashboard: React.FunctionComponent = props => {
  // Hooks:
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { open } = state

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      <Box className={cx('Dashboard')} bg="first-dark" flex="col" h="screen" text="white" w="full">
        <Box className="Dashboard__header" items="end" justify="between" px="12">
          <Button
            className="Dashboard__toggle-nav"
            bg="transparent"
            onClick={() => dispatch(toggleNav())}
            text="xl"
          >
            <span
              className={cx(
                'Dashboard__toggle-navIcon icon icon-indent mr-4 text-lg inline-block',
                open && 'open'
              )}
            />
            <span>Widgets</span>
          </Button>
        </Box>
      </Box>
    </DashboardContext.Provider>
  )
}
