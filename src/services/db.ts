export async function healthcheckDb(): Promise<{ status: 'ok' }> {
  return Promise.resolve({ status: 'ok' })
}
