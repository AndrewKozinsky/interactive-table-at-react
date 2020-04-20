// Адреса картинок
import catImage from "./images/cat.svg";
import dogImage from "./images/dog.svg";
import foxImage from "./images/fox.svg";
import koalaImage from "./images/koala.svg";
import lionImage from "./images/lion.svg";
import owlImage from "./images/owl.svg";
import penguinImage from "./images/penguin.svg";
import pigImage from "./images/pig.svg";
import raccoonImage from "./images/raccoon.svg";
import sheepImage from "./images/sheep.svg";

// Адреса видео
import boyVideo from './videos/boy.mp4';
import shoeVideo from './videos/shoe.mp4';


/**
 * Функция принимает имя картинки и возвращает её адрес.
 * @param {String} name — имя картинки.
 */
function getImageAdress(name) {
    switch (name) {
        case 'cat': return catImage;
        case 'dog': return dogImage;
        case 'fox': return foxImage;
        case 'koala': return koalaImage;
        case 'lion': return lionImage;
        case 'owl': return owlImage;
        case 'penguin': return penguinImage;
        case 'pig': return pigImage;
        case 'raccoon': return raccoonImage;
        case 'sheep': return sheepImage;
        default: return catImage;
    }
}


/**
 * Функция принимает имя видео и возвращает его адрес.
 * @param {String} name — имя видео.
 */
function getVideoAdress(name) {
    switch (name) {
        case 'boy': return boyVideo;
        case 'shoe': return shoeVideo;
        default: return boyVideo;
    }
}


export {
    getImageAdress,
    getVideoAdress
}