type ActionHandler<T = any> = (payload: T) => Promise<void> | void;

const actionRegistry = new Map<string, ActionHandler>();

export const registerAction = <T = any>(
  id: string,
  handler: ActionHandler<T>,
) => {
  if (!id) {
    throw new Error('registerAction: id is required');
  }

  if (actionRegistry.has(id)) {
    console.warn(`Action with id "${id}" is being overwritten`);
  }

  actionRegistry.set(id, handler);
};

export const getActionFromRegistry = <T = any>(
  id?: string,
): ActionHandler<T> | undefined => {
  if (!id) return undefined;
  return actionRegistry.get(id) as ActionHandler<T> | undefined;
};

export const removeActionFromRegistry = (id?: string) => {
  if (!id) return;
  actionRegistry.delete(id);
};

export const runActionFromRegistry = async <T = any>(id: string, payload: T) => {
  const handler = getActionFromRegistry<T>(id);

  if (!handler) {
    console.warn(`No action found for id "${id}"`);
    return;
  }

  return handler(payload);
};

// Example usage
// registerAction('delete-user', async ({ userId }: { userId: string }) => {
//   await api.deleteUser(userId);
// });

// await runAction('delete-user', { userId: '123' });

// removeAction('delete-user');
