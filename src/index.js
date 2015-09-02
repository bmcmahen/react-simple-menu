import React, {PropTypes} from 'react'
import assign from 'lodash.assign'

const defaultStyles = {
  menu: {
    position: 'absolute',
    top: '100%',
    padding: 0,
    width: '200px'
  },
  menuHidden: {
    display: 'none',
    zIndex: '-1'
  },
  menuVisible: {
    display: 'block',
    zIndex: 500
  },
  container: {
    position: 'relative',
    display: 'inline-block'
  },
  alignRight: {
    right: 0
  },
  alignLeft: {
    left: 0
  },
  alignCenter: {
    left: '50%',
    transform: 'translateX(-50%)'
  },
  arrow: {
    width: 0,
    height: 0,
    border: '5px solid transparent',
    borderTopWidth: 0,
    marginTop: '5px',
    padding: 0,
    position: 'absolute',
    top: '10px',
    left: '50%',
    marginLeft: '-5px',
    borderBottomColor: '#999'
  },
  list: {
    padding: 0,
    paddingTop: '5px',
    paddingBottom: '5px',
    margin: 0,
    backgroundColor: 'white',
    border: '1px solid #ddd',
    outline: 'none'
  }
}

export function createTemplate(styles = {}) {
  return assign({}, defaultStyles, styles)
}


export default class Dropdown extends React.Component {

  static propTypes = {
    showing: PropTypes.bool.isRequired,
    onRequestHide: PropTypes.func.isRequired,
    onRequestShow: PropTypes.func.isRequired,
    activeIndex: PropTypes.number,
    trigger: PropTypes.node.isRequired,
    autoHideOnClick: PropTypes.bool,
    arrow: PropTypes.bool,
    align: PropTypes.oneOf(['center', 'left', 'right']),
    uniqueId: PropTypes.string.isRequired,
    template: PropTypes.object
  }

  static defaultProps = {
    align: 'center',
    arrow: false,
    autoHideOnClick: true,
    template: defaultStyles
  }

  constructor() {
    super()
    this._onClick = this.onClick.bind(this)
  }

  render() {
    const {
      showing,
      arrow,
      uniqueId,
      align,
      trigger,
      template
    } = this.props

    const triggerClone = React.cloneElement(trigger, {
      onClick: ::this.onTriggerClick,
      'aria-haspopup': true,
      role: 'button',
      id: uniqueId,
      ref: 'trigger'
    })

    let positionStyle = template.alignCenter
    if (align === 'left') {
      positionStyle = template.alignLeft
    } else if (align === 'right') {
      positionStyle = template.alignRight
    }

    const menuStyle = assign(
      {},
      template.menu,
      (showing ? template.menuVisible : template.menuHidden),
      positionStyle
    )

    return (
      <div className='Menu' style={template.container}>
        {triggerClone}
        <div className='Menu__container' style={menuStyle}>
          {showing && <div tabIndex='0' /> }
          {arrow && <div style={template.arrow} />}
          <ul className='Menu__list' onKeyDown={::this.onKeyDown}
            ref='menu'
            role='menu'
            tabIndex='-1'
            aria-hidden={this.props.showing ? 'false' : 'true'}
            aria-describedby={uniqueId}
            style={template.list}>
              {React.Children.map(this.props.children, ::this.renderChild)}
          </ul>
          {showing && <div tabIndex='0' />}
        </div>
      </div>
    )
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      this.hideDropdown()
    }
  }

  onTriggerClick(e) {
    e.preventDefault()
    e.stopPropagation()
    if (this.props.showing) {
      this.hideDropdown()
    } else {
      this.showDropdown()
    }
  }

  showDropdown() {
    if (this.props.showing) return
    this.props.onRequestShow()
    setTimeout(() => {
      document.addEventListener('click', this._onClick)
      document.addEventListener('touch', this._onClick)
      this.refs.menu.focus()
    }, 0)
  }

  hideDropdown() {
    this.props.onRequestHide()
    document.removeEventListener('click', this._onClick)
    document.removeEventListener('touch', this._onClick)
    this.refs.trigger.focus()
  }

  onClick(e) {
    const el = this.refs.menu

    if (this.props.autoHideOnClick) {
      setTimeout(() => {
        this.hideDropdown()
      }, 0)
      return
    }

    if (!el.contains(e.target)) {
      this.hideDropdown()
      return
    }
  }

  renderChild(child) {
    // add ability to select item from parent element,
    // for example, using keyboard nav
    return React.cloneElement(child, {

    })
  }


}
