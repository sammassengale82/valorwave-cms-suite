export interface Asset {
  id: string;            // unique ID (uuid or timestamp)
  filename: string;      // original filename
  url: string;           // resolved URL for <img src="">
  size: number;          // file size in bytes
  width?: number;        // optional metadata
  height?: number;       // optional metadata
  type?: string;         // mime type (image/png, image/jpeg, etc.)
  createdAt?: number;    // timestamp
}
