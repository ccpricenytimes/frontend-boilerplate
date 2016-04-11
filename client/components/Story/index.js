
import React, { Component } from 'react'
import classnames from 'classnames'
import style from './style.css'

class Story extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    //const {todo, completeTodo, deleteTodo} = this.props
    let element = <article className={classnames(style.story, this.props.storyType === "featured-story" ? style.featuredStory : "")}>
                    <h2 className={style.headline}>
                    "Bacon Ipsum Dolor amet Prosciutto"</h2>
                    <p className={style.summary}>
                    "Bacon ipsum dolor amet prosciutto ball tip chuck shankle corned beef pig tail pastrami, ground round andouille shoulder drumstick landjaeger. Biltong jowl frankfurter ball tip shoulder landjaeger leberkas tri-tip. Rump alcatra beef jerky doner venison pork chop. Tenderloin alcatra ball tip, t-bone rump beef chuck.

Pork loin kielbasa turkey tongue jowl ham filet mignon chuck swine bacon prosciutto jerky. Doner shank brisket porchetta sausage. Turkey pork tenderloin ball tip shankle. Tenderloin ribeye shankle ball tip.

Beef ribs pig ham hock, tri-tip ball tip meatloaf kevin bresaola pork belly shank swine spare ribs chicken short loin bacon. Leberkas ham t-bone beef, hamburger frankfurter pancetta rump pork loin doner kevin cupim shank pork chop filet mignon. Chicken short ribs t-bone kielbasa prosciutto. Short loin pig swine ball tip spare ribs, filet mignon boudin. Ham cupim jerky tail.

Pork belly pastrami capicola, pork cow chicken cupim. Ham hock meatloaf porchetta, tri-tip landjaeger pancetta pork. Beef ball tip jowl tenderloin short ribs sausage. Pastrami ham turducken pancetta tail capicola. Meatloaf cupim shoulder, pig biltong beef tri-tip filet mignon ribeye pork chop pastrami rump.

Corned beef porchetta doner pastrami strip steak venison pig. Beef ribs shoulder salami pork belly pancetta ball tip tail ribeye flank doner tenderloin. Venison pork chop ham hock filet mignon strip steak. Tongue alcatra cow, sirloin meatloaf tenderloin shoulder porchetta spare ribs tail."
                    </p>
                  </article>
    return (
        element
    );
  }
}

export default Story;