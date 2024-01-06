import { getSession } from 'next-auth/react'

export class NotesClientBase {
  protected async transformOptions(options: RequestInit) {
    const session = await getSession();
    options.headers = {
      ...options.headers,
      Authorization: "Bearer " + session?.accessToken,
    };
    return options;
  }
}
