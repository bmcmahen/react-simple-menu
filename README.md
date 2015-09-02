react-simple-menu
=========================

A simple, accessible menu component for react that can be used to implement widgets like dropdown menus.

## Example Usage

```javascript
import React, {Component} from 'react'
import Dropdown from 'react-simple-menu'

export default class Dropdown extends Component {

  state = {
    showing: false
  }

  render() {
    const trigger = <button>Toggle Menu</button>

    return (
      <div>
        <Dropdown
          trigger={trigger}
          onRequestHide={() => this.setState({ showing: false })}
          onRequestShow={() => this.setState({ showing: true })}
          align='left'
          uniqueId='user-menu-trigger'
          showing={this.state.showing}>
              <a
                role='menuitem'
                href='#'
                onClick={(e) => e.preventDefault()}>
                  View Profile
              </a>
              <a role='menuitem' style={listItemStyle} href='#'>Help</a>
              <a role='menuitem' style={listItemStyle} href='#'>Logout</a>
        </Dropdown>
      </div>
    );
  }
}
```

Check the source for full details of usage.
