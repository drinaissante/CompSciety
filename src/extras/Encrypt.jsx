// base62 alphabet (URL-safe)
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function bytesToBase62(bytes) {
  // Convert byte array to a BigInt, then encode in base62
  let value = 0n;
  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8n) + BigInt(bytes[i]);
  }

  // Encode BigInt to base62
  let out = '';
  while (value > 0n) {
    const rem = value % 62n;
    out = BASE62[Number(rem)] + out;
    value = value / 62n;
  }

  // Pad to predictable length: ceil(bytes*8 / log2(62))
  const expectedLength = Math.ceil((bytes.length * 8) / Math.log2(62));
  return out.padStart(expectedLength, '0');
}

async function secureShortId(byteLen = 12) {
  // byteLen = 12 -> ~96 bits -> ~16 base62 chars
  const bytes = new Uint8Array(byteLen);

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes); // browser / Deno
  } else if (typeof require !== 'undefined') {
    randomFillSync(bytes);
  } else {
    // Last resort — not cryptographically secure
    for (let i = 0; i < byteLen; i++) bytes[i] = Math.floor(Math.random() * 256);
  }

  return bytesToBase62(bytes);
}

function sanitize(input) {
    return String(input).replace(/[^a-zA-Z0-9-_]/g, '').slice(0, 32);
}

// Integrate into your existing function
async function shortImageKey(filename = '', userId = null) {
  const ext = (filename && filename.includes('.')) ? `.${filename.split('.').pop().toLowerCase()}` : '';
  const userPart = userId ? `${sanitize(userId)}_` : '';
  const id = await secureShortId(12); // 12 bytes => ~16 chars base62
  return `${userPart}${id}${ext}`;
}


export { shortImageKey };