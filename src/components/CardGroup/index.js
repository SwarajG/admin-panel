import React, { Component } from 'react';
import { getImageFromCardText } from '../../utils/helper';
import s from './styles';

export default class CardGroup extends Component {
  render() {
    const { list, name, color } = this.props;
    if (list.length === 0) {
      return null;
    }
    return list.map((cards) => {
      return (
        <div className={s.cardImageWrapper} key={cards}>
          {
            cards.map(card => {
              const image = getImageFromCardText(card);
              return (
                <div className={s.cardImage(image)} />
              )
            })
          }
          <div className={s.groupName(color)}>{name}</div>
        </div>
      )
    })
  }
}