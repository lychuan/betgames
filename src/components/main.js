import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

import GameMenu from './blocks/game-menu'

class Main extends Component {
  render() {
    return (
      <div>
        <GameMenu />
      </div>
    )
  }
}

export default Main