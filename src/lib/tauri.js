export function isTauri() {
  return typeof window !== 'undefined' && window.__TAURI__ !== undefined;
}

export async function showNotification(title, body) {
  if (!isTauri()) return;
  const { invoke } = await import('@tauri-apps/api/core');
  await invoke('show_notification', { title, body });
}
