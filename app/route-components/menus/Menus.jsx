import React from 'react';
import { Router, Route, Link } from 'react-router';
import styles from './Menus.scss';
import classNames from 'classnames';

export default class Menus extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuType: 'all',
      menusList: [{
        icon: '&#xe60f;',
        type: 'all',
        name: '所有文件',
        route: 'all',
        num: 0
      },{
        icon: '&#xe601;',
        type: 'picture',
        name: '图片',
        route: 'picture',
        num: 0
      },{
        icon: '&#xe602;',
        type: 'music',
        name: '音乐',
        route: 'music',
        num: 0
      },{
        icon: '&#xe608;',
        type: 'other',
        name: '其他',
        route: 'other',
        num: 0
      }]
    };
  }

  createIcon(icon) {
    return {__html: icon};
  }

  changeRoute(toHash) {
    let self = this;
    return () => {
      window.location.hash = `/${toHash}`;
      self.setState({
        selectedMenuType: toHash
      });
    }
  }

  render(){

    let Meuns = this.state.menusList.map(menu => {
      let SelectedClass = this.state.selectedMenuType == menu.type? ' selected' : '';
      return (
        <li key={menu.type} className={`main-menu-item ${SelectedClass}`} onClick={this.changeRoute(menu.route)}>
            <i className="iconfont icon" dangerouslySetInnerHTML={this.createIcon(menu.icon)}></i>
            <span className="title">{menu.name}</span>
            {(() =>{
              if(menu.num > 0) {
                return (<span className="num">{menu.num}</span>);
              } else {
                return null
              }
            })()}

        </li>
      )
    })

  
    return (
        <ul className="main-menu">
          {Meuns}
        </ul>
    )
  }
}
