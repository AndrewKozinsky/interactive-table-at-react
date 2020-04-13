export default function (lang, textObj) {

    let resObj = {};

    for(let key in textObj) {
        resObj[key] = textObj[key][lang]
    }

    return resObj
}