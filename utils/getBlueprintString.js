import {deflate} from "pako/lib/deflate";
import * as qr from "qr-image";


export default function getBlueprintString(text, scale= 2, tileMaterial= false){
  try{
    return "0" + window.btoa(String.fromCharCode(...getDeflatedData(text,scale,tileMaterial))
    );
  }
  catch(e){
    // alert("ERROR: Blueprint is too large");
    return (`ERROR: Blueprint is too large \n${e.toString()}`);

  }
}

const getDeflatedData = (text,scale,tileMaterial) => {
  return deflate(
    new TextEncoder("utf-8").encode(getFactorioBlueprintObjectString(text,scale,tileMaterial)));
};

const getFactorioBlueprintObjectString = (text,scale,tileMaterial) => {
  const matrix = qr.matrix(text);

  const matrixSize = matrix.length;
  let entities = new Array(Math.pow(matrixSize+4,2));
  let entityIndex = 0;

  //drawing borders
  for (let i=0;i<matrixSize+4;i++){
    for (let j=0;j<matrixSize+4;j++){
      if (i==0||j==0||i==matrixSize+3||j==matrixSize+3){
        for(let ix=0; ix<scale;ix++){
          for(let jx=0; jx<scale;jx++){
            entities[entityIndex] = {
              "entity_number": ++entityIndex, //silly LUA
              "name": "stone-wall",
              "position": {
                "x": j*scale+jx,
                "y": i*scale+ix
              }
            };
          }

        }
      }
    }
  }

  for (let i=0;i<matrixSize;i++){
    for (let j=0;j<matrixSize;j++) {
      if (matrix[i][j]) {
        for(let ix=0; ix<scale;ix++){
          for(let jx=0; jx<scale;jx++){
            entities[entityIndex] = {
              "entity_number": ++entityIndex,
              "name": "stone-wall",
              "position": {
                "x": j*scale+scale*2+jx,
                "y": i*scale+scale*2+ix
              }
            };
          }
        }
      }
    }
  }

  let tiles = new Array(Math.pow(matrixSize+4,2));
  if (tileMaterial){
    let tileIndex=0;
    for (let i=0;i<(matrixSize+4)*scale;i++){
      for (let j=0;j<(matrixSize+4)*scale;j++){
        tiles[tileIndex] = {
          "position": {
            "x": j,
            "y": i
          },
          "name": tileMaterial
        };
        tileIndex++;
      }
    }
  }


  entities.length = entityIndex;

  let bluepringObject = {
    "blueprint":
        {
          "item": "blueprint",
          "label": `${text}`,
          "icons": [{"signal":{"type":"virtual","name":"signal-Q"},"index":1},
            {"signal":{"type":"virtual","name":"signal-R"},"index":2},
            {"signal":{"type":"virtual","name":"signal-C"},"index":3},
            {"signal":{"type":"virtual","name":"signal-D"},"index":4}],
          "version": 77311246337,
          "entities": entities

        }
  };
  if(tileMaterial)
    bluepringObject.blueprint.tiles = tiles;

  return JSON.stringify(bluepringObject);
};
