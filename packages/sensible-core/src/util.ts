export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * creates an enum object from a readonly const array so you don't have to
 * ------
 * const taskNames = ["a","b","c"] as const;
 * type TaskNames = typeof taskNames[number];
 * const enummm = createEnum(taskNames);
 * (value of enummm: { a: "a", b: "b", c: "c" })
 */
export const createEnum = <T extends readonly string[]>(
  array: T
): { [K in typeof array[number]]: K } =>
  array.reduce((previous, current) => {
    return { ...previous, [current]: current };
  }, {} as any);

export function earthDistance(
  lat1: number,
  long1: number,
  lat2: number,
  long2: number,
  response?: string
) {
  const m = Math.PI / 180;

  lat1 = lat1 * m;
  long1 = long1 * m;
  lat2 = lat2 * m;
  long2 = long2 * m;

  var R = 6371e3; // metres of earth radius

  var x = (long2 - long1) * Math.cos((lat1 + lat2) / 2);
  var y = lat2 - lat1;

  var d = Math.sqrt(x * x + y * y) * R;

  return response === "m" ? Math.round(d / 10) * 10 : Math.round(d / 1000); //in kilometers!
}

export function slugify(string: string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export const mergeObjectsArray = (
  objectsArray: object[]
): { [key: string]: any } =>
  objectsArray.reduce((previous, current) => {
    return { ...previous, ...current };
  }, {});

export function isEmail(email: string) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const makeArrayString = (array: string[]) => "," + array.join(",") + ",";

export function generatePassword(passwordLength: number) {
  var numberChars = "0123456789";
  var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerChars = "abcdefghijklmnopqrstuvwxyz";
  var allChars = numberChars + upperChars + lowerChars;
  var randPasswordArray = Array<string>(passwordLength);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray = randPasswordArray.fill(allChars, 3);
  return shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
  ).join("");
}

export function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
