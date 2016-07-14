/**
 * Tab_干货页面
 *    1. 干货列表ViewPager（使用自定义组件的ViewPagerComp）
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

//import AboutPage from './AboutPage';
import CommonTitleBarComp from '../comp/CommonTitleBarComp';

//import { switchTitleBarTab } from '../actions/titleBarTab';
import { COMMON_BACKGROUND_COLOR } from '../GlobalConst';


class MorePage extends Component {

  constructor(props) {
    super(props);

    this.onViewPageScroll = this._onViewPageScroll.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <CommonTitleBarComp
          ref="titleBar"
          title="更多"
          //onLeftBtnClick={this.props.onDrawerMenuToggle}
          isMainPage={true}
          //rightText="关于"
          /*onRightBtnClick={() => this.props.navigator.push({component: AboutPage})}*/ >

        </CommonTitleBarComp>

      </View>
    );
  }

  _switchTitleBarTab(selIndex) {
    if (this.props.selectedTabIndex !== selIndex) {
      this.props.dispatch(switchTitleBarTab(selIndex));
    }
  }

  _onViewPageScroll(offset) {
    return;
    this.refs.titleBar.onPageScroll(offset);
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },
});

function select(store) {
  return {
    selectedTabIndex: store.homePageStore.selectedTabIndex,
  }
}

export default connect(select)(MorePage);