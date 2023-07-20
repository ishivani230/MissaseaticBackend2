import { Injectable } from "@nestjs/common";

@Injectable()
export class UtilsService {
  // async getFormatedDate(expirationDate): Promise<any> {
  async getFormatedDate(expirationDate): Promise<any> {
    const date = new Date(expirationDate);
    const dateFOrmat =
      date.getFullYear() +
      "/" +
      date.getMonth() +
      "/" +
      date.getDate() +
      " " +
      this.formatAMPM(date);
    return dateFOrmat;
  }
  formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, "0");
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };



  chunkIntoN = (arr, n) => {
    const size = Math.ceil(arr.length / n);
    return Array.from({ length: n }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }


  applBuildWhere = (data, relationsMap, where) => {
    let applRelationsKeys = Object.keys(relationsMap);
    for (let key in data) {
      let switchKey: any = key;
      let hasNestedKey = applRelationsKeys.includes(key)
        ;
      if (hasNestedKey) {
        switchKey = true;
      }
      switch (switchKey) {
        case "isActive":
          /**
           * need to consider the order and parent filter data
           */
          where = { ...where, IsActive: data[key] == "true" ? true : false };
          break;
        case true:
          let relationalCol = relationsMap[key];
          if (relationalCol) {
            let relation = this.compileNestedRelation(
              relationsMap[key],
              data[key]
            );
            let relationKey = Object.keys(relation)[0] || "";
            if (where.hasOwnProperty(relationKey)) {
              where[relationKey] = {
                ...where[relationKey],
                ...relation[relationKey],
              };
            } else {
              where = { ...where, ...relation };
            }
          }
          break;
        default:
          where = {
            ...where,
            [key]: {
              mode: "insensitive",
              contains: data[key],
            },
          };
          break;
      }
    }
    return where;
  };

  compileNestedRelation = (json, value) => {
    let keys = Object.keys(json);
    if (keys.some((x) => ["contains"].includes(x))) {
      if ("contains") {
        return {
          ...json,
          contains: value,
        };
      }
    }
    let key = keys[0]; // will always have one value
    if (typeof json[key] === "object") {
      json[key] = this.compileNestedRelation(json[key], value);
    } else {
      switch (key) {
        case "in":
          json[key] = [value];
          break;
        default:
          json[key] = value;
          break;
      }
    }
    return json;
  };



  pick = (object: {}, keys: Array<string>): {} => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = object[key];
      }
      return obj;
    }, {});
  };

  async constructFilename(id: string, fileName: string): Promise<string> {
    let ext = "";
    let extArray = fileName?.split(".");

    if (extArray?.length > 1) {
      ext = extArray?.pop();
    }
    return `${id}.${ext}`;
  }

  setZone(country, state) {
    let zone;

    if (country.toLowerCase() === 'india') {
      switch (state.toLowerCase()) {
        case 'haryana':
        case 'jammu and kashmir':
        case 'himachal pradesh':
        case 'delhi':
        case 'new delhi':
        case 'uttarakhand':
        case 'chandigarh':
        case 'punjab':
        case 'ladakh':
        case 'uttar pradesh':
          zone = 'north';
          break;

        case 'rajasthan':
        case 'maharashtra':
        case 'gujarat':
        case 'goa':
        case 'dadra and nagar haveli and daman and diu':
          zone = 'west';
          break;

        case 'bihar':
        case 'jharkhand':
        case 'odisha':
        case 'west bengal':
        case 'andaman and nicobar islands':
          zone = 'east';
          break;

        case 'karnataka':
        case 'andhra pradesh':
        case 'telangana':
        case 'tamil nadu':
        case 'kerala':
        case 'puducherry':
        case 'lakshadweep':
          zone = 'south';
          break;

        case 'chhattisgarh':
        case 'madhya pradesh':
          zone = 'central';
          break;

        case 'arunachal pradesh':
        case 'assam':
        case 'manipur':
        case 'meghalaya':
        case 'mizoram':
        case 'nagaland':
        case 'tripura':
        case 'sikkim':
          zone = 'northeast';
          break;

        default:
          zone = 'unknown';
          break;
      }
    } else {
      zone = 'unknown';
    }

    return zone;
  }

}
