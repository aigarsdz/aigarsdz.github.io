import { BunkerSigner, parseBunkerInput } from '@nostr/tools/nip46'
import { generateSecretKey } from '@nostr/tools/pure'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils.js'
import { parseJSONString } from './json_parser'

export async function getBunkerPointerFromBunkerURI(bunkerURI, pool) {
  const bunkerPointer = await parseBunkerInput(bunkerURI)

  if (!bunkerPointer) {
    throw new Error('Invalid bunker URI')
  }

  return bunkerPointer
}

export function getStoredBunkerPointer() {
  let bunkerPointerValue = localStorage.getItem('bunker_pointer')
  let bunkerPointer = parseJSONString(bunkerPointerValue)

  return bunkerPointer
}

export function getClientSecretKey() {
  let key = localStorage.getItem('client_secret_key');

  if (!key) {
    key = generateSecretKey();

    localStorage.setItem('local_nostr_key', bytesToHex(key));
  } else {
    key = hexToBytes(key);
  }

  return key
}
