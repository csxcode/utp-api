export class Utils {

    static randomFromArr(array) {
        const random = Math.floor(Math.random() * array.length);
        return array[random];
    }

}