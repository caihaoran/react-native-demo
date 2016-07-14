/**
 * Android版主页面
 *    1. 实现主界面布局，Android版本使用的是侧边(DrawerLayoutAndroid)切换Tab Pgae的风格
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, DrawerLayoutAndroid, Navigator,} from 'react-native';
import {connect} from 'react-redux';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import CommonTabBarComp from '../comp/CommonTabBarComp';
import HomePage from './HomePage'
import EnergyPage from './EnergyPage'
import KpiPage from './KpiPage'
import AlarmPage from './AlarmPage'
import MorePage from './MorePage'
//import CollectListPage from './CollectListPage'
//import GirlPage from './GirlPage'
//import DrawerMenuComp from '../comp/DrawerMenuComp';
import {HOME_TABS} from '../actions/types';
import {switchTab} from '../actions/navigator';


class MainPage extends Component {

    static contextTypes = {
        addBackButtonListener: React.PropTypes.func,
        removeBackButtonListener: React.PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);

        this.renderDrawerMenuView = this._renderDrawerMenuView.bind(this);
        this.onDrawerOpen = this._onDrawerOpen.bind(this);
        this.onDrawerClose = this._onDrawerClose.bind(this);
        this.onBackButton = this._onBackButton.bind(this);
        this.onDrawerMenuToggle = this._onDrawerMenuToggle.bind(this);

        this.state = {
            curSelTag: HOME_TABS.HOME,
        };

        /*this.ROUTE_STACKS = [
         { component: HomePage },
         { component: GankRecommendPage },
         { component: GirlPage },
         { component: CollectListPage },
         ];*/
    }

    render() {
        return (
            <ScrollableTabView
                locked={true}
                //scrollWithoutAnimation={true}
                tabBarPosition='bottom'
                initialPage={0}
                renderTabBar={() => <CommonTabBarComp />}
            >
                <ScrollView tabLabel="驾驶舱" style={styles.tabView}>
                    <HomePage/>
                </ScrollView>
                <ScrollView tabLabel="能耗分析" style={styles.tabView}>
                    <EnergyPage/>
                </ScrollView>
                <ScrollView tabLabel="定额管理" style={styles.tabView}>
                    <KpiPage/>
                </ScrollView>
                <ScrollView tabLabel="告警管理" style={styles.tabView}>
                    <AlarmPage/>
                </ScrollView>
                <ScrollView tabLabel="更多" style={styles.tabView}>
                    <MorePage/>
                </ScrollView>
            </ScrollableTabView>
            /**<DrawerLayoutAndroid
             ref="drawer"
             drawerWidth={290}
             drawerPosition={DrawerLayoutAndroid.positions.Left}
             renderNavigationView={this.renderDrawerMenuView}
             onDrawerOpen={this.onDrawerOpen}
             onDrawerClose={this.onDrawerClose} >
             <Navigator
             ref={component => this.navigator = component}
             navigator={this.props.navigator}
             configureScene={() => {
              return {
                ...Navigator.SceneConfigs.FadeAndroid,
                defaultTransitionVelocity: 1000,
                gestures: {}
              };
          }}
             initialRoute={this.ROUTE_STACKS[0]}
             initialRouteStack={this.ROUTE_STACKS}
             renderScene={this._renderScene.bind(this)}
             />
             </DrawerLayoutAndroid>**/
        );
    }

    _renderScene(route, navigator) {
        var {component:Component, ...route} = route;
        return <Component navigator={this.props.navigator} {...route} onDrawerMenuToggle={this.onDrawerMenuToggle}
                          curSelTag={this.state.curSelTag}/>;
    }

    _onDrawerOpen() {
        this.context.addBackButtonListener(this.onBackButton);
    }

    _onDrawerClose() {
        this.context.removeBackButtonListener(this.onBackButton);
    }

    _onTabSelect(tab) {
        this.refs.drawer.closeDrawer();

        if (this.props.tab !== tab) {
            this.props.dispatch(switchTab(tab));
            this.setState({curSelTag: tab});

            switch (tab) {
                case HOME_TABS.HOME:
                    this.navigator.jumpTo(this.ROUTE_STACKS[0]);
                    break;
                case HOME_TABS.GANK_DAY:
                    this.navigator.jumpTo(this.ROUTE_STACKS[1]);
                    break;
                case HOME_TABS.GIRL:
                    this.navigator.jumpTo(this.ROUTE_STACKS[2]);
                    break;
                case HOME_TABS.COLLECT:
                    this.navigator.jumpTo(this.ROUTE_STACKS[3]);
                    break;
            }
        }
    }

    _onDrawerMenuToggle() {
        this.refs.drawer.openDrawer();
    }

    _onBackButton() {
        this.refs.drawer.closeDrawer();
        return true;
    }

    _renderDrawerMenuView() {
        return <DrawerMenuComp tab={this.props.tab} onTabSelect={(tab) => this._onTabSelect.bind(this, tab)}/>;
    }

}


const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    tabView: {
        flex: 1,
        //padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});

function select(store) {
    return {
        tab: store.navigatorStore.tab,
    }
}

export default connect(select)(MainPage);
