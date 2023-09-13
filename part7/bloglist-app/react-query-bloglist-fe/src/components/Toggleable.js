import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'

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
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{btnLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
})
Toggleable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}
Toggleable.displayName = 'Toggleable'

export default Toggleable
