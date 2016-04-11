import React, { Component } from 'react'
import classnames from 'classnames'
import Story from '../Story'
import style from './style.css'

class StoryList extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    //const {todo, completeTodo, deleteTodo} = this.props
    let element = <ul className={style.list}>
                    <li><Story storyType={"featured-story"} /></li>
                    <li><Story /></li>
                    <li><Story /></li>
                    <li><Story /></li>
                    <li><Story /></li>
                  </ul>
    return (
        element
    );
  }
}

export default StoryList;