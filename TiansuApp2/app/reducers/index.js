import {combineReducers} from 'redux';
import navigatorReducer from './navigator';
import homePageReducer from './homePage';
import alarmListCompReducer from './alarmListComp';
/*import girlPageReducer from './girlPage';
 import gankRecommendPageReducer from './gankRecommendPage';
 import collectReducer from './collect';*/

export default combineReducers({
    navigatorStore: navigatorReducer,
    homePageStore: homePageReducer,
    alarmListCompStore: alarmListCompReducer,
    /*girlPageStore: girlPageReducer,
     gankRecommendPageStore: gankRecommendPageReducer,
     collectStore: collectReducer,*/
});
