//@ts-check

const del = require("del");

function removeIndex() {
    return del("output/dist/index.html");
}

exports.removeIndex = removeIndex;
