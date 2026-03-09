export interface HistoryEntry {
  id: string;            // unique ID for this history snapshot
  timestamp: number;     // when the snapshot was created
  label: string;         // human-readable action label ("Changed Text", "Updated Style", etc.)
  tree: any[];           // full tree snapshot
}