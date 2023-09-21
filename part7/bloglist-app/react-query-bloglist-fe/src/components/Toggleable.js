import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button } from 'react-bootstrap'

const Toggleable = forwardRef(({ btnLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible((prevValue) => !prevValue)
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div className="pb-3">
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{btnLabel}</Button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <Button variant="warning" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})
Toggleable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}
Toggleable.displayName = 'Toggleable'

export default Toggleable
