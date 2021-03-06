//region actions
export const CHOOSE_CHECKER = "CHOOSE_CHECKER";
export const CHOOSE_SPACE = "CHOOSE_SPACE";
export const TOGGLE_FORCE_JUMP = "TOGGLE_FORCE_JUMP";
export const CHANGE_PLAYER_COLOR = "CHANGE_PLAYER_COLOR";
export const SKIP_TURN = "SKIP_TURN";
export const RESTART_GAME = "RESTART_GAME";
//endregion

//region configurations
export const ALL_PLAYER_COLORS = ["white", "black", "red"];
export const COMPLEMENTARY_COLORS = {
    "white": "black",
    "black": "white",
    "red": "black"
};
export const PLAYER_ONE = 0;
export const PLAYER_TWO = 1;
export const SPACE_COLORS = ["white", "black"];
export const NUMBER_OF_COLUMNS = 8;
export const NUMBER_OF_ROWS = 8;
export const NUMBER_OF_CHECKERS = 12;
export const BOARD_ROW_0_OFFSET = 1;
export const PLAYER_1_DIRECTION = -1;
export const PLAYER_2_DIRECTION = 1;
//endregion

//region draggable types
export const DRAGGABLE_ITEM_TYPE = {
    CHECKER: "checker"
};
//endregion