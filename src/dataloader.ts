import DataLoader from 'dataloader';
export function createBatchLoader() {
  return new DataLoader(async (keys: readonly string[]) => {
    return keys.map(id => ({ id, loadedAt: new Date().toISOString() }));
  });
}
