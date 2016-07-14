/**
 * Tab_干货页面
 *    1. 干货列表ViewPager（使用自定义组件的ViewPagerComp）
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text , ScrollView} from 'react-native';
import { connect } from 'react-redux';
import Chart from 'react-native-chart';

//import AboutPage from './AboutPage';
import CommonTitleBarComp from '../comp/CommonTitleBarComp';
//import ViewPagerComp from '../comp/ViewPagerComp';
//import GankListComp from './comppages/GankListComp';
//import { switchTitleBarTab } from '../actions/titleBarTab';
import { COMMON_BACKGROUND_COLOR ,DEBUG_BACKGROUND_COLOR ,DEBUG_BACKGROUND_COLOR2 } from '../GlobalConst';


class HomePage extends Component {

  constructor(props) {
    super(props);

    this.onViewPageScroll = this._onViewPageScroll.bind(this);
  }

  render() {
    const color = ['#ff8492', '#4edbff', '#FDC67E', '#43D9CD', '#FD8391', '#44f1be', '#e6ea82', '#ff90d4', '#a6a7f1', '#99c2e7'];
    const data = [
      [200, 200],
      [100, 200],
    ];

    return (
      <View style={styles.container}>
        <CommonTitleBarComp
          ref="titleBar"
          title="能耗总览"
          //onLeftBtnClick={this.props.onDrawerMenuToggle}
          isMainPage={true}
          rightText="关于"
          /*onRightBtnClick={() => this.props.navigator.push({component: AboutPage})}*/ >
        </CommonTitleBarComp>

          <View style={styles.chart_container}>
            <Chart
              sliceColors={color}
              style={styles.chart}
              data={data}
              showAxis={false}
              showGrid={false}
              type="pie"
            />
          </View>
          <View style={styles.list_container}>
            <View style={styles.item_container}>
              <Text style={styles.text_container}>
                月能耗累计
              </Text>
              <Text style={styles.text_container}>
                月能耗同比
              </Text>
            </View>
            <View style={styles.item_container}>
              <Text style={styles.text_container}>
                电能耗
              </Text>
              <Text style={styles.text_container}>
                100KWH
              </Text>
              <Text style={styles.text_container}>
                10%
              </Text>
            </View>
            <View style={styles.item_container}>
              <Text style={styles.text_container}>
                电能耗
              </Text>
              <Text style={styles.text_container}>
                100KWH
              </Text>
              <Text style={styles.text_container}>
                10%
              </Text>
            </View>
            <View style={styles.item_container}>
              <Text style={styles.text_container}>
                电能耗
              </Text>
              <Text style={styles.text_container}>
                100KWH
              </Text>
              <Text style={styles.text_container}>
                10%
              </Text>
            </View>
            <View style={styles.item_container}>
              <Text style={styles.text_container}>
                电能耗
              </Text>
              <Text style={styles.text_container}>
                100KWH
              </Text>
              <Text style={styles.text_container}>
                10%
              </Text>
            </View>
            <View style={styles.item_container}>
              <Text style={styles.text_container}>
                电能耗
              </Text>
              <Text style={styles.text_container}>
                100KWH
              </Text>
              <Text style={styles.text_container}>
                10%
              </Text>
            </View>
          </View>
  
       
      </View>
    );
  }

  _switchTitleBarTab(selIndex) {
    if (this.props.selectedTabIndex !== selIndex) {
      this.props.dispatch(switchTitleBarTab(selIndex));
    }
  }

  _onViewPageScroll(offset) {
    this.refs.titleBar.onPageScroll(offset);
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEBUG_BACKGROUND_COLOR2,
  },
  chart_container: {
    flex: 1,
    height: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DEBUG_BACKGROUND_COLOR,
  },
  chart: {
    width:230,
    height:230,
  },
  list_container: {
    flex: 1,
    flexDirection: 'column',
  },
  item_container: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
  },
  text_container: {
    flex: 1,
  },
});

function select(store) {
  return {
    selectedTabIndex: store.homePageStore.selectedTabIndex,
  }
}

export default connect(select)(HomePage);