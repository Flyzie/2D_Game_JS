import * as fs from 'fs';
var output = fs.readFileSync('map.txt')

export function doOut(vari){
    console.log(vari);
}


export default doOut;
