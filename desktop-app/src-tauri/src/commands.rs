use serde::Serialize;
use std::fs;
use std::path::PathBuf;
use tauri::api::file;

#[derive(Serialize)]
pub struct FileEntry {
    pub filename: String,
    pub size: u64,
}

fn uploads_dir() -> PathBuf {
    tauri::api::path::app_data_dir(&tauri::Config::default())
        .unwrap()
        .join("data/images/uploads")
}

#[tauri::command]
pub fn list_files() -> Result<Vec<FileEntry>, String> {
    let dir = uploads_dir();

    if !dir.exists() {
        fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    }

    let mut entries = vec![];

    for entry in fs::read_dir(&dir).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let metadata = entry.metadata().map_err(|e| e.to_string())?;

        if metadata.is_file() {
            entries.push(FileEntry {
                filename: entry
                    .file_name()
                    .into_string()
                    .unwrap_or("unknown".into()),
                size: metadata.len(),
            });
        }
    }

    Ok(entries)
}

#[tauri::command]
pub fn upload_file(filename: String, bytes: Vec<u8>) -> Result<(), String> {
    let dir = uploads_dir();

    if !dir.exists() {
        fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    }

    let path = dir.join(filename);
    fs::write(path, bytes).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn delete_file(filename: String) -> Result<(), String> {
    let path = uploads_dir().join(filename);

    if path.exists() {
        fs::remove_file(path).map_err(|e| e.to_string())?;
    }

    Ok(())
}

#[tauri::command]
pub fn rename_file(old_name: String, new_name: String) -> Result<(), String> {
    let dir = uploads_dir();
    let old_path = dir.join(old_name);
    let new_path = dir.join(new_name);

    if old_path.exists() {
        fs::rename(old_path, new_path).map_err(|e| e.to_string())?;
    }

    Ok(())
}