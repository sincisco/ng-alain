import {IRectangle} from "../tile/IRectangle";


type Offset = {
  offsetX: number,
  offsetY: number
}

type StrategyItem = {
  "tile-type": string,
  "offsetX": number,
  "offsetY": number
}

type Space = {
  offsetX,
  offsetY,
  width,
  height
};

export class LayoutProcessor {
  map: { [index: string]: Array<IRectangle> } = {
    "tile": [],
    "tile-small": [],
    "tile-wide": [],
    "tile-large": []
  };
  groupWidth: number;
  area:number;

  constructor(array: Array<IRectangle>) {
    //对tile进行分组
    array.forEach((rectangle: IRectangle) => {
      this.map[rectangle.getType()].push(rectangle);
    });
    this._calculateGroupWidth(array);
    this.doHandleByLine({
      offsetX: 0,
      offsetY: 0
    });
  }

  /**
   * group的最终宽度为2的整数倍
   */
  private _calculateGroupWidth(array: Array<IRectangle>) {
    var area: number = 0, maxTileWidth: number = 0;
    array.forEach((rectangle: IRectangle, index) => {
      area = area + rectangle.width() * rectangle.height();
      if (rectangle.width() > maxTileWidth)
        maxTileWidth = rectangle.width();
    });
    this.area=area;
    area = Math.ceil(area / 8);
    if((this.area>6)&&(area===2)){
      area=4;
    }
    (area % 2 === 1) && (area++);
    //maxTileWidth有可能奇数为1 而groupWidth必须为2的整数倍
    (maxTileWidth % 2 === 1) && (maxTileWidth++);
    this.groupWidth = area > maxTileWidth ? area : maxTileWidth;
  }

  gridMap: any = {
    "2*2": findA,
    "4*2": findB,
    "6*2": findC,
    "8*2": findD,
    "4*4": findE,
    "6*4": findF,
    "8*4": findG
  };

  doHandleByLine(base: Offset) {
    var totalArea = this.getTotalArea();
    if (totalArea == 0)
      return;

    var maxTileHeight = this.getMaxTileHeight(),
      requireArea = maxTileHeight * this.groupWidth;

    // 只剩下最小的tile-small
    maxTileHeight = maxTileHeight == 1 ? 2 : maxTileHeight;
    if (requireArea > totalArea) {
      if (maxTileHeight > 2) {
        maxTileHeight = maxTileHeight / 2;
        requireArea = maxTileHeight * this.groupWidth;
        if (requireArea > totalArea) {
          this.createFreeSpaceList(base);
          return;
        }
      } else {
        this.createFreeSpaceList(base);
        return;
      }
    }

    var problem = this.gridMap[`${this.groupWidth}*${maxTileHeight}`];

    var strategy = this._handle(problem(base.offsetX, base.offsetY)());

    if (strategy) {
      this.calculatePosition(strategy);
    } else {
      this.createFreeSpaceList(base);
      return;
    }

    this.doHandleByLine({
      offsetX: 0,
      offsetY: base.offsetY + maxTileHeight
    });

  }

  createFreeSpaceList(offset: Offset) {
    var height = this.getMaxTileHeight();
    this.fillSpace([{
      offsetX: offset.offsetX,
      offsetY: offset.offsetY,
      width: this.groupWidth,
      height: height
    }], {
      offsetX: offset.offsetX,
      offsetY: offset.offsetY + height
    });
  }

  count = 0;

  fillSpace(freeSpaceList: Array<Space>, nextOffset: Offset) {
    if (this.count++ > 50) {
      return;
    }
    var minArea = 100, minSpaceIndex, minSpace;
    // 1、找到最小的空闲空间
    freeSpaceList.forEach((item: Space, index: number) => {
      var product = item.width * item.height;
      if (product < minArea) {
        minArea = product;
        minSpaceIndex = index;
      }
    });

    // 从空闲区列表中删除最小项
    minSpace = freeSpaceList.splice(minSpaceIndex, 1)[0];

    var totalTiles = [], keyArray = ["tile-large", "tile-wide", "tile", "tile-small"];
    keyArray.forEach((key: string) => {
      (this.map[key].length > 0) && (totalTiles = totalTiles.concat(this.map[key]));
    });

    for (let i = 0, length = totalTiles.length; i < length; i++) {
      let tile = totalTiles[i];
      //找到最小空闲space的最大可用tile
      if ((tile.width() <= minSpace.width) && (tile.height() <= minSpace.height)) {
        var tileArray = this.map[tile.getType()];
        tileArray.splice(tileArray.indexOf(tile), 1);

        tile.offset(minSpace.offsetX, minSpace.offsetY);
        var width1 = minSpace.width - tile.width(),
          height1 = minSpace.height - tile.height();
        if (width1 > 0) {
          freeSpaceList.push({
            offsetX: minSpace.offsetX + tile.width(),
            offsetY: minSpace.offsetY,
            width: width1,
            height: tile.height()
          });
        }
        if (height1 > 0) {
          freeSpaceList.push({
            offsetX: minSpace.offsetX,
            offsetY: minSpace.offsetY + tile.height(),
            width: minSpace.width,
            height: height1
          });
        }
        break;
      }
    }

    if (this.hasResidualTile()) {
      if (freeSpaceList.length > 0) {
        this.fillSpace(freeSpaceList, nextOffset);
      } else {
        this.createFreeSpaceList(nextOffset);
      }
    }
  }

  calculatePosition(strategy: Array<StrategyItem>) {
    strategy.forEach((item: StrategyItem) => {
      var tileType = item["tile-type"];
      switch (tileType) {
        case "tile-small":
          var tileSmallArray = this.map["tile-small"];
          var tempArray = tileSmallArray.splice(0, 4);
          this._calculatePositionForTileSmall({
            offsetX: item.offsetX,
            offsetY: item.offsetY
          }, tempArray);
          break;
        case "tile":
        case "tile-wide":
        case "tile-large":
          this.map[tileType]
            .shift()
            .offset(item.offsetX, item.offsetY);
          break;
      }
    });
  }


  _calculatePositionForTileSmall(base: Offset, tileSmallArray: Array<IRectangle>) {
    tileSmallArray.forEach((rectangle: IRectangle, index) => {
      rectangle.offset(base.offsetX + (index > 1 ? 1 : 0), base.offsetY + (index % 2));
    });
  }

  private getMaxTileHeight() {
    var array: Array<IRectangle> = [];
    ["tile-large", "tile-wide", "tile", "tile-small"].forEach((tileType: string) => {
      array = array.concat(this.map[tileType]);
    });

    return array[0].height();
  }

  private getTotalArea() {
    let totalArea = 0, array = [];
    for (let key in this.map) {
      if (this.map.hasOwnProperty(key)) {
        array = array.concat(this.map[key]);
      }
    }
    array.forEach((item: IRectangle) => {
      totalArea += (item.width() * item.height());
    });
    return totalArea;
  }

  private hasResidualTile() {
    const map = this.map;
    for (const key in map) {
      if (map.hasOwnProperty(key) && (map[key].length > 0)) {
        return true;
      }
    }
    return false;
  }


  private _handle(array: Array<Array<any>>): any {
    let count = 0, flag: boolean, strategy;
    while (array.length > 0 && ++count < 100) {
      strategy = array.pop();
      flag = true;
      //判断当前策略中是否包含函数,如果存在函数就展开   否则就判断当前策略是否可行
      for (let i = 0, length = strategy.length; i < length; i++) {
        if ($.isFunction(strategy[i])) {
          const insertedArray = strategy[i]();
          insertedArray.forEach((item) => {
            const temp = Array.from(strategy);
            temp.splice(i, 1,...item);
            array.push(temp);
          });
          flag = false;
          break;
        }
      }

      if (flag && this.isOk(strategy)) {
        return strategy;
      }

    }
    return false;
  }

  /**
   * 判断该策略是否可行
   * @param strategy
   * @returns {boolean}
   */
  private isOk(strategy: Array<any>) {
    const map=strategy.reduce((previousValue,currentValue)=>{
      const tileType = currentValue["tile-type"];
      previousValue[tileType] += (tileType === "tile-small" ? 4 : 1);
      return previousValue;
    },{
      "tile": 0,
      "tile-small": 0,
      "tile-wide": 0,
      "tile-large": 0
    });

    for (const key in map) {
      if (map.hasOwnProperty(key) && (map[key] > this.map[key].length)) {
        return false;
      }
    }
    return true;
  }
}

function findA(offsetX, offsetY) {
  return () => [
    [
      {
        "tile-type": "tile-small",
        "offsetX": offsetX,
        "offsetY": offsetY
      }
    ],
    [
      {
        "tile-type": "tile",
        "offsetX": offsetX,
        "offsetY": offsetY
      }
    ]
  ];
}

function findB(offsetX, offsetY) {
  return () => [
    [findA(offsetX, offsetY), findA(offsetX + 2, offsetY)],
    [{
      "tile-type": "tile-wide",
      "offsetX": offsetX,
      "offsetY": offsetY
    }]];
}

function findC(offsetX, offsetY) {
  return () => [
    [findA(offsetX, offsetY), findB(offsetX + 2, offsetY + 0)],
    [findB(offsetX, offsetY), findA(offsetX + 4, offsetY)]];
}

function findD(offsetX, offsetY) {
  return () => [[findC(offsetX, offsetY), findA(offsetX + 6, offsetY)],
    [findA(offsetX, offsetY), findC(offsetX + 2, offsetY)],
    [findB(offsetX, offsetY), findB(offsetX + 4, offsetY)]];
}

function findE(offsetX, offsetY) {
  return () => [[{
    "tile-type": "tile-large",
    "offsetX": offsetX,
    "offsetY": offsetY
  }]];
}

function findF(offsetX, offsetY) {
  return () => [
    [
      findE(offsetX, offsetY),
      findA(offsetX + 4, offsetY),
      findA(offsetX + 4, offsetY + 2)
    ],
    [
      findA(offsetX, offsetY),
      findA(offsetX, offsetY + 2),
      findE(offsetX + 2, offsetY)]];
}

function findG(offsetX, offsetY) {
  return () => [[
    findE(offsetX, offsetY),
    findE(offsetX + 4, offsetY)],
    [
      findE(offsetX, offsetY),
      findB(offsetX + 4, offsetY),
      findB(offsetX + 4, offsetY + 2)]];
}
