export default function http(rootUrl: string) {
  let loading = false;

  let chunks: Uint8Array[] = [];
  let results = null;
  let error = null;

  let controller: AbortController | null = null;

  const json = async (path: string, options?: RequestInit) => {
    _resetLocals();
    const signal: AbortSignal | undefined = controller?.signal;
    loading = true

    try {
      const response = await fetch(rootUrl + path, { signal, ...options });

      if (response.status >= 200 && response.status < 300) {
        results = await _readBody(response)
        return JSON.parse(results)
      } else {
        throw new Error(response.statusText)
      }
    } catch (err) {
      error = err
      results = null
      return error
    } finally {
      loading = false
    }
  }

  const _readBody = async (response: Response) => {
    const reader = response.body?.getReader();
    const length = Number(response.headers?.get('content-length')) ?? 0;
    let received = 0;

    if (!reader) {
      throw new Error('No reader');
    }

    // Loop through the response stream and extract data chunks
    while (loading) {
      const { done, value } = await reader.read();
      const payload = { detail: { received, length, loading } };
      const onProgress = new CustomEvent('fetch-progress', payload);
      const onFinished = new CustomEvent('fetch-finished', payload)

      if (done) {
        // Finish loading
        loading = false;
        window.dispatchEvent(onFinished)
      } else {
        // Push values to the chunk array
        chunks.push(value);
        received += value.length;
        window.dispatchEvent(onProgress)
      }
    }

    // Concat the chinks into a single array
    const body = new Uint8Array(received);
    let position = 0;

    // Order the chunks by their respective position
    for (const chunk of chunks) {
      body.set(chunk, position);
      position += chunk.length;
    }

    // Decode the response and return it
    return new TextDecoder('utf-8').decode(body);
  }

  const _resetLocals = () => {
    loading = false;

    chunks = [];
    results = null;
    error = null;

    controller = new AbortController();
  }

  const cancel = () => {
    _resetLocals();
    controller?.abort();
  };

  return { json, cancel }
}