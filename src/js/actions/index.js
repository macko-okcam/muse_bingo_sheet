import { CLICK_CELL, REBUILD_GAMEBOARD, UPDATE_DIMENSIONS, UPDATE_NEXTCYCLE } from "../constants/action-types";

export function clickCell(payload) {
    return { type: CLICK_CELL, payload }
};

export function rebuildGameBoard(payload) {
    return { type: REBUILD_GAMEBOARD, payload }
};

export function updateDimensions(payload) {
    return { type: UPDATE_DIMENSIONS, payload }
};

export function updateNextCycle(payload) {
    return { type: UPDATE_NEXTCYCLE, payload }
};