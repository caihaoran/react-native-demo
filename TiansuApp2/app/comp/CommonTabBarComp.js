import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonTouchableComp from './CommonTouchableComp';

const CommonTabBarComp = React.createClass({
    tabIcons: [],
    tabTexts: [],

    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
    },

    // componentDidMount() {
    //     this.setAnimationValue({value: this.props.activeTab,});
    //     this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
    // },
    //
    // setAnimationValue({value,}) {
    //     this.tabIcons.forEach((icon, i) => {
    //         const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
    //         icon.setNativeProps({
    //             style: {
    //                 color: this.iconColor(progress),
    //             },
    //         });
    //     });
    // },

    //color between rgb(59,89,152) and rgb(204,204,204)
    iconColor(progress) {
        const red = 48 + (122 - 48) * progress;
        const green = 201 + (122 - 201) * progress;
        const blue = 240 + (122 - 240) * progress;
        return `rgb(${red}, ${green}, ${blue})`;
    },

    render() {
        const tabWidth = this.props.containerWidth / this.props.tabs.length;
        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1,], outputRange: [0, tabWidth,],
        });

        return <View>
            <View style={[styles.tabs, this.props.style, ]}>
                {this.props.tabs.map((tab, i) => {
                    return <CommonTouchableComp key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                        <View style={styles.bothBtnContainer}>
                            <Icon
                                name={((tab)=>{switch (tab){
                                    case '驾驶舱':
                                        return this.props.activeTab == i ? 'ios-home' : 'ios-home-outline';
                                    case '能耗分析':
                                        return this.props.activeTab == i ? 'ios-analytics' : 'ios-analytics-outline';
                                    case '定额管理':
                                        return this.props.activeTab == i ? 'ios-speedometer' : 'ios-speedometer-outline';
                                    case '告警管理':
                                        return this.props.activeTab == i ? 'ios-paper' : 'ios-paper-outline';
                                    case '更多':
                                        return this.props.activeTab == i ? 'ios-more' : 'ios-more-outline';
                                    default:
                                        return this.props.activeTab == i ? 'ios-more' : 'ios-more-outline';
                                    }
                                })(tab)}
                                size={26}
                                color={this.props.activeTab == i ? 'rgb(48,201,240)' : 'rgb(122,122,122)'}
                                ref={(icon) => { this.tabIcons[i] = icon; }}
                            />
                            <Text  style={[styles.tabsText, { color: this.props.activeTab == i ? 'rgb(48,201,240)' : 'rgb(122,122,122)' }]}>
                                {tab}
                            </Text>
                        </View>
                    </CommonTouchableComp>;
                })}
            </View>
            <Animated.View style={[styles.tabUnderlineStyle, { width: tabWidth }, { left, }, ]}/>
        </View>;
    },
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
    },
    tabsText: {
        fontSize: 12,
    },
    bothBtnContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        paddingTop: 0,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopColor: 'rgba(0,0,0,0.05)',
        //backgroundColor: 'red',
    },
    tabUnderlineStyle: {
        position: 'absolute',
        height: 3,
        backgroundColor: 'rgb(48,201,240)',
        top: 0,
    },
});

export default CommonTabBarComp;