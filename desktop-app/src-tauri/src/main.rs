#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;

use commands::*;
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

fn ensure_dirs() {
    let base = tauri::api::path::app_data_dir(&tauri::Config::default()).unwrap();

    let uploads = base.join("data/images/uploads");
    let templates = base.join("data/templates");

    if !uploads.exists() {
        fs::create_dir_all(&uploads).unwrap();
    }

    if !templates.exists() {
        fs::create_dir_all(&templates).unwrap();
    }
}

fn main() {
    ensure_dirs();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            list_files,
            upload_file,
            delete_file,
            rename_file,
            list_template_folders,
            write_template_file,
            delete_template_folder
        ])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}