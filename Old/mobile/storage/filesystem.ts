import * as FileSystem from "expo-file-system";

export async function saveImage(name: string, base64: string) {
  const path = `${FileSystem.documentDirectory}${name}`;
  await FileSystem.writeAsStringAsync(path, base64, {
    encoding: FileSystem.EncodingType.Base64
  });
  return path;
}

export async function loadImage(name: string) {
  const path = `${FileSystem.documentDirectory}${name}`;
  const exists = await FileSystem.getInfoAsync(path);
  if (!exists.exists) return null;
  return path;
}