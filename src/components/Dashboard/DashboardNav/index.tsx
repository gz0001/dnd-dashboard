import * as React from 'react'
import cx from 'classnames'
import { Box, Text } from 'tt-react-ui-2'

// Context:
import { DashboardContext } from 'context/dashboard'
import { dragging } from 'context/dashboard/actions'

// Components:
import { Icon } from 'components/Icon'

// Styles:
import './style.css'

// ================================================================================================

export interface DasboardNavProps {
  open: boolean
}

export const DasboardNav: React.FunctionComponent<DasboardNavProps> = ({ open }) => {
  const {
    state: { full, layout },
    dispatch
  } = React.useContext(DashboardContext)

  const items = ["a", "b", "c", "d"]


  return (
    <Box className={cx('DashboardNav', open && 'open')} h="full">
      <Box className={cx('DashboardNav__content')} flex="col" h="full" pt="8" type="nav">
        {items.map(value => {
          const active = layout.find((val: any) => value === val.i)
          return (
            <Box
              className={cx('DashboardNav__item', !full && !active && 'grabbable')}
              divProps={{
                draggable: !full && !active,
                onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
                  e.dataTransfer.setData('type', value)
                  dispatch(dragging())
                },
                onDragEnd: () => {
                  dispatch(dragging())
                }
              }}
              bg="fourth"
              flex="col"
              items="center"
              justify="center"
              key={value}
              px="2"
              mt="6"
            >
              {active && (
                <Icon
                  bg="white"
                  className="DashboardNav__check"
                  color="third"
                  display="flex"
                  h="5"
                  items="center"
                  justify="center"
                  name="check"
                  pin="t, r"
                  position="absolute"
                  rounded="1/2"
                  size="xs"
                  w="5"
                />
              )}
              <Text bold center className="DashboardNav__label"  uppercase>
                {value}
              </Text>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
