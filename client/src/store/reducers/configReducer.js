//region imports
import { CHANGE_CONFIG } from "../../utils/constants";
//endregion

export const getInitialConfigState = () => {
    return { restricted: true };
};

const configReducer = (configState, action) => {
    switch (action.type) {
        case CHANGE_CONFIG:
            return Object.assign({}, configState, action.config);
        default:
            return configState;
    }
};

export default configReducer;