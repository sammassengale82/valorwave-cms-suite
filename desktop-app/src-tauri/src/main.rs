mod commands;

use tauri::Manager;

#[tokio::main]
async fn main() {
    // Start local API server in background
    tokio::spawn(async {
        commands::start_api_server().await;
    });

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error running tauri app");
}