"use strict";
function $uniqueId(name) {
    return name + new Date().getTime().toString() + Math.random().toString().substr(1, 3);
}
exports.$uniqueId = $uniqueId;
