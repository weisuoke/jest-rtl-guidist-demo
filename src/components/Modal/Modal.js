import React, { useState } from 'react'
import PropTypes from 'prop-types'
import "../theme/theme.less"
import "./modal.less"

import { createPortal } from "react-dom"

const Modal = (props) => {
  const { children, visible, closeModal, title, footer } = props;
  const [showModal, setShowModal] = useState(visible)

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const toCloseModal = () => {
    setShowModal(false)
  }

  const modal = createPortal(
    <div className="wuxiao-modal-root" onClick={handleClick}>
      <div className="wuxiaoio-modal-mask" />
      <div className="wuxiaoio-modal-wrap wuxiaoio-modal-centered">
        <div className="wuxiaoio-modal">
          <div className="wuxiaoio-modal-content">
            <button className="wuxiaoio-modal-close" onClick={toCloseModal}>
              <span className="wuxiaoio-modal-close-x">x</span>
            </button>
            <div className="wuxiaoio-modal-header">
              {title}
            </div>
            <div className="wuxiaoio-modal-body">
              {children}
            </div>
            {
              footer !== null &&  (
                <div className="wuxiaoio-modal-footer">
                  { footer ? footer : 'defaultFooter' }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>,
    document.body
  )

  return <div>{showModal ? modal : null}</div>
}

Modal.defaultProps = {
  visible: false,
  closeModal: () => {},
  footer: ''
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  footer: PropTypes.oneOfType([PropTypes.element, PropTypes.shape()])
}

export default Modal