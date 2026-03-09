#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;

use commands::*;
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

fn ensure_upload_dir() {
    let base = tauri::api::path::app_data_dir(&tauri::Config::default())
        .unwrap()
        .join("data/images/uploads");

    if !base.exists() {
        fs::create_dir_all(&base).unwrap();
    }
}

fn main() {
    ensure_upload_dir();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            list_files,
            upload_file,
            delete_file,
            rename_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}