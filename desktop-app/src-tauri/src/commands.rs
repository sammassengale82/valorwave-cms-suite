use warp::Filter;
use serde_json::json;
use std::sync::Arc;

use shared_backend::{
    config::{createGitHubConfig, createStorageConfig},
    storage::CMSStorage,
    sync::CMSSync,
    github::GitHubSync,
    api_router::CMSApiRouter
};

pub async fn start_api_server() {
    let root = std::env::current_dir().unwrap();
    let root_str = root.to_string_lossy().to_string();

    let storage_config = createStorageConfig(&root_str);
    let github_config = createGitHubConfig(&std::env::vars().collect());

    let storage = Arc::new(CMSStorage::new(storage_config));
    let github = Arc::new(GitHubSync::new(github_config));
    let sync = Arc::new(CMSSync::new(storage.clone(), github.clone()));
    let api = Arc::new(CMSApiRouter::new(storage.clone(), sync.clone()));

    // GET /draft.json
    let get_draft = warp::path!("draft.json")
        .and(warp::get())
        .map(move || warp::reply::json(&api.getDraft()));

    // PUT /draft.json
    let api_clone = api.clone();
    let put_draft = warp::path!("draft.json")
        .and(warp::put())
        .and(warp::body::json())
        .map(move |body| {
            api_clone.setDraft(body);
            warp::reply::json(&json!({ "saved": true }))
        });

    // GET /publish.json
    let get_publish = warp::path!("publish.json")
        .and(warp::get())
        .map(move || warp::reply::json(&api.getPublish()));

    // POST /publish
    let api_clone = api.clone();
    let publish = warp::path!("publish")
        .and(warp::post())
        .map(move || {
            api_clone.publish();
            warp::reply::json(&json!({ "published": true }))
        });

    // GET /preview.json
    let get_preview = warp::path!("preview.json")
        .and(warp::get())
        .map(move || warp::reply::json(&api.getPreview()));

    // POST /sync/pull
    let api_clone = api.clone();
    let sync_pull = warp::path!("sync" / "pull")
        .and(warp::post())
        .and_then(move || {
            let api = api_clone.clone();
            async move {
                api.syncPull().await.unwrap();
                Ok::<_, warp::Rejection>(warp::reply::json(&json!({ "pulled": true })))
            }
        });

    // POST /sync/push
    let api_clone = api.clone();
    let sync_push = warp::path!("sync" / "push")
        .and(warp::post())
        .and_then(move || {
            let api = api_clone.clone();
            async move {
                api.syncPush().await.unwrap();
                Ok::<_, warp::Rejection>(warp::reply::json(&json!({ "pushed": true })))
            }
        });

    let routes = get_draft
        .or(put_draft)
        .or(get_publish)
        .or(publish)
        .or(get_preview)
        .or(sync_pull)
        .or(sync_push);

    warp::serve(routes).run(([127, 0, 0, 1], 1818)).await;
}