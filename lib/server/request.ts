export class RequestError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export async function readJson(
  request: Request,
  maxBytes: number,
): Promise<unknown> {
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  ) {
    throw new RequestError("Content-Type must be application/json.", 415);
  }
  if (Number(request.headers.get("content-length")) > maxBytes) {
    throw new RequestError("Request body is too large.", 413);
  }
  if (!request.body) throw new RequestError("Request body is required.", 400);
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let body = "";
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RequestError("Request body is too large.", 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } finally {
    reader.releaseLock();
  }
  try {
    return JSON.parse(body);
  } catch {
    throw new RequestError("Invalid JSON request.", 400);
  }
}
