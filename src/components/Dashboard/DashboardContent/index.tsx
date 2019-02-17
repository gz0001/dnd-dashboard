import * as React from 'react'
import cx from 'classnames'
import { Box, createState } from 'tt-react-ui-2'

const GridLayout = require('react-grid-layout')
const { SizeMe } = require('react-sizeme')

// Contexts:
import { DashboardContext } from 'context/dashboard'
import { toggleFullScreen, updateLayout } from 'context/dashboard/actions'

// Components:
import { DashboardItem } from '../DashboardItem'

// Utils:
import { clone, isEqual } from 'utils/objUtils'

// Styles:
import '../../../../node_modules/react-grid-layout/css/styles.css'
import './style.css'

// Util function:
const reorder = (layout: any) => {
  const position = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]
  let newLayout = []
  for (let i = 0; i < position.length; i++) {
    const item = layout.find((item: any) => item.x === position[i].x && item.y === position[i].y)
    item && newLayout.push(item)
  }
  return newLayout
}

// ================================================================================================

export interface DashboardContentProps {}

export const DashboardContent: React.FunctionComponent<DashboardContentProps> = ({}) => {
  // Items:
  const items = ['a', 'b', 'c', 'd']

  // Contexts:
  const {
    state: { dragging, full },
    dispatch
  } = React.useContext(DashboardContext)

  // Hooks:
  const [state, setState] = createState({
    layout: [
      { i: 'a', x: 0, y: 0, w: 1, h: 1 },
      { i: 'b', x: 1, y: 0, w: 1, h: 1 },
      { i: 'c', x: 0, y: 1, w: 1, h: 1 },
      { i: 'd', x: 1, y: 1, w: 1, h: 1 }
    ]
  })

  const { layout } = state

  const prevLayout = React.useRef(null)

  let grid = document.getElementsByClassName('DashboardContent__wrapper')[0]

  React.useEffect(() => {
    const plIndex = layout.findIndex(item => item.i === 'pl')
    !dragging && plIndex >= 0 && handleClose('pl')
  })

  // Handlers:
  const handleLayoutChange = (changedLayout: any) => {
    let newLayout = clone(changedLayout)
    const index = newLayout.findIndex((item: any) => item.y > 1)
    if (index > -1) {
      switch (newLayout.length) {
        case 4:
          newLayout[index].y--
          newLayout[index].x > 0 ? newLayout[index].x-- : newLayout[index].x++
          newLayout = reorder(newLayout)
          break
        case 3:
          let upIndex = newLayout.findIndex((item: any) => item.y === 0)
          let downIndex = newLayout.findIndex((item: any) => item.y === 1)
          if (newLayout[index].w > 1) {
            newLayout[index].y = 0
            newLayout[index].w = 1
            newLayout[index].x = newLayout[upIndex].x === 1 ? 0 : 1
            newLayout[downIndex].w = 2
          } else {
            if (newLayout[downIndex].w < 2) {
              newLayout[index].y--
              newLayout[index].x > 0 ? newLayout[index].x-- : newLayout[index].x++
            } else {
              let upIndex = newLayout.findIndex((item: any) => item.y === 0)
              newLayout[upIndex].x = 0
              newLayout[upIndex].w = 2
              newLayout[downIndex].w = 1
              newLayout[downIndex].x = 1
              newLayout[index].y = 1
              newLayout[index].x = 0
            }
          }
          break
        default:
          break
      }
    }
    !isEqual(newLayout, layout) && setState({ layout: newLayout })
  }

  const handleClose = (i: string) => {
    const newLayout = clone(layout)
    const index = newLayout.findIndex((item: any) => item.i === i)
    const curPosition = [newLayout[index].x, newLayout[index].y]
    newLayout.splice(index, 1)
    switch (newLayout.length) {
      case 3:
        let fullIndex = layout.findIndex(item => item.y === curPosition[1])
        newLayout[fullIndex].x = 0
        newLayout[fullIndex].w = 2
        break
      case 2:
        newLayout[0].x = 0
        newLayout[0].y = 0
        newLayout[0].w = 2
        newLayout[1].x = 1
        newLayout[1].y = 0
        newLayout[1].w = 2
        break
      case 1:
        newLayout[0].x = 0
        newLayout[0].y = 0
        newLayout[0].w = 2
        newLayout[0].h = 2
    }
    setState({ layout: newLayout })
    i !== 'pl' && dispatch(updateLayout(newLayout))
  }

  const handleFullScreen = (i: string) => {
    if (full) {
      const oldPos = prevLayout.current.filter((item: any) => item.i === i)
      setState({ layout: oldPos })
      setTimeout(() => {
        setState({ layout: prevLayout.current })
        dispatch(toggleFullScreen())
      }, 600)
    } else {
      prevLayout.current = clone(layout)
      const fullLayout = [{ i, x: 0, y: 0, w: 2, h: 2 }]
      setState({ layout: fullLayout })
      dispatch(toggleFullScreen())
    }
  }

  const getPosition = (e: React.DragEvent<HTMLDivElement>) => {
    const clientRect = grid.getBoundingClientRect()
    const left = e.clientX - clientRect.left
    const top = e.clientY - clientRect.top
    const x = top <= clientRect.height / 2 ? 0 : 1
    const y = left <= clientRect.width / 2 ? 0 : 1
    return [x, y]
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const [_x, _y] = getPosition(e)
    let newLayout
    const plIndex = layout.findIndex(item => item.i === 'pl')
    if (plIndex < 0) {
      switch (layout.length) {
        case 1:
          const curItem = layout[0]
          newLayout = [
            { i: 'pl', x: 0, y: _x, w: 2, h: 1 },
            { i: curItem.i, x: 0, y: _x === 0 ? 1 : 0, w: 2, h: 1 }
          ]
          setState({ layout: newLayout })
          break
        case 2:
          newLayout = reorder(
            layout.map(item => ({
              i: item.i,
              x: item.x,
              y: item.y,
              w: 2,
              h: 1
            }))
          )
          newLayout[0].y = _x === 0 ? 1 : 0
          newLayout[0].w = _x === 0 ? 1 : 2
          newLayout[1].x = 1
          newLayout[1].y = 1
          newLayout[1].w = 1
          newLayout.push({ i: 'pl', x: 0, y: _x < 1 ? 0 : 1, w: _x > 0 ? 1 : 2, h: 1 })
          setState({ layout: newLayout })
          break
        case 3:
          newLayout = layout.map(item => ({
            i: item.i,
            x: item.x,
            y: item.y,
            w: 1,
            h: 1
          }))
          newLayout.unshift({ i: 'pl', x: 0, y: _y, w: 1, h: 1 })
          setState({ layout: newLayout })
        default:
          break
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    let [_x, _y] = getPosition(e)
    let newLayout = clone(layout)
    const plIndex = newLayout.findIndex((item: any) => item.i === 'pl')
    if (plIndex > -1) {
      switch (newLayout.length) {
        case 2:
          newLayout[0].y = _x
          newLayout[1].y = _x === 0 ? 1 : 0
          break
        case 3:
          if (_x < 1) {
            let full = newLayout.findIndex((item: any) => item.w === 2)
            if (full !== plIndex) {
              newLayout[full].x = newLayout[plIndex].x
              newLayout[full].y = newLayout[plIndex].y
              newLayout[full].w = 1
              newLayout[plIndex].x = 0
              newLayout[plIndex].y = 0
              newLayout[plIndex].w = 2
            }
          } else {
            if (newLayout[plIndex].w === 2) {
              newLayout = reorder(newLayout)
              let cIndex = _y < 1 ? 1 : 2
              newLayout[plIndex].x = newLayout[cIndex].x
              newLayout[plIndex].y = newLayout[cIndex].y
              newLayout[cIndex].x = 0
              newLayout[cIndex].y = 0
              newLayout[cIndex].w = 2
            } else {
              let cIndex = -1
              if (_y < 1) {
                if (newLayout[plIndex].x > 0) {
                  cIndex = newLayout.findIndex((item: any) => item.i !== 'pl' && item.w === 1)
                }
              } else {
                if (newLayout[plIndex].x < 1) {
                  cIndex = newLayout.findIndex((item: any) => item.i !== 'pl' && item.w === 1)
                }
              }
              if (cIndex > -1) {
                newLayout[cIndex].x = newLayout[plIndex].x
                newLayout[plIndex].x = _y
              }
            }
            newLayout[plIndex].w = 1
          }
          break
        case 4:
          if (_x !== _y) {
            const c = _x
            _x = _y
            _y = c
          }
          if (newLayout[plIndex].x !== _x || newLayout[plIndex].y !== _y) {
            let cIndex = newLayout.findIndex((item: any) => item.x === _x && item.y === _y)
            newLayout[cIndex].x = newLayout[plIndex].x
            newLayout[cIndex].y = newLayout[plIndex].y
            newLayout[plIndex].x = _x
            newLayout[plIndex].y = _y
          }
        default:
          break
      }
      !isEqual(newLayout, layout) && setState({ layout: newLayout })
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const type = e.dataTransfer.getData('type')
    let newLayout = clone(layout)
    const index = newLayout.findIndex((item: any) => item.i === 'pl')
    if (items.includes(type)) {
      switch (newLayout.length) {
        case 0:
          newLayout = [{ i: type, x: 0, y: 0, w: 2, h: 1 }]
          setState({ layout: newLayout })
          setTimeout(() => {
            newLayout[0].h = 2
            setState({ layout: newLayout })
          }, 200)
          break
        case 2:
        case 3:
        case 4:
          if (index > -1) {
            newLayout[index].i = type
            setState({ layout: newLayout })
          }
          break
        default:
          break
      }
      dispatch(updateLayout(newLayout))
    }
  }

  return (
    <SizeMe monitorHeight refreshRate={200} refreshMode="debounce">
      {({ size }: any) => (
        <Box
          divProps={{
            onDragEnter: handleDragEnter,
            onDragOver: handleDragOver,
            onDrop: handleDrop
          }}
          className={cx('DashboardContent')}
          flex="1"
          items="center"
          h="full"
          justify="center"
        >
          <GridLayout
            className="DashboardContent__wrapper"
            layout={layout}
            cols={2}
            margin={[0, 0]}
            rowHeight={(size.height * 0.97) / 2}
            width={size.width * 0.95}
            autoSize={false}
            draggableHandle=".draghandler"
            useCSSTransforms={true}
            isResizable={false}
            onLayoutChange={handleLayoutChange}
          >
            {layout.map((item: any) => (
              <div
                className={cx('DashboardContent__item p-2', item.i === 'pl' && 'placeholder')}
                key={item.i}
              >
                <DashboardItem
                  i={item.i}
                  label={item.i}
                  onClose={handleClose}
                  onFullScreen={handleFullScreen}
                />
              </div>
            ))}
          </GridLayout>
        </Box>
      )}
    </SizeMe>
  )
}
