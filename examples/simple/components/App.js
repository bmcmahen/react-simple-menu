import React, { Component } from 'react';
import Dropdown from 'react-simple-menu';

var listItemStyle = {
  padding: '10px 15px',
  display: 'block',
  textDecoration: 'none',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '#08c',
  fontFamily: 'helvetica'
}

export default class App extends Component {

  state = {
    showing: false
  }

  render() {
    const trigger = (
      <button style={{
        outline: 'none',
        padding: '15px',
        border: '1px solid #bbb',
        backgroundColor: 'white'
      }}>Toggle Menu</button>
    )

    return (
      <div style={{padding: '150px'}}>
        <Dropdown
          trigger={trigger}
          onRequestHide={() => this.setState({ showing: false })}
          onRequestShow={() => this.setState({ showing: true })}
          autoHideOnClick={true}
          align='right'
          uniqueId='user-menu-trigger'
          showing={this.state.showing}>
            <div>
              <a
                role='menuitem'
                style={listItemStyle}
                href='#'
                onClick={(e) => e.preventDefault()}>
                  View Profile
              </a>
            </div>
            <div>
              <a role='menuitem' style={listItemStyle} href='#'>Help</a>
            </div>
            <div>
              <a role='menuitem' style={listItemStyle} href='#'>Logout</a>
            </div>
        </Dropdown>
      </div>
    );
  }
}
