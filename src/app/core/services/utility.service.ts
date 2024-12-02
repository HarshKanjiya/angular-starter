import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  /**
 * Encrypts data to a base64 encoded string
 * @param data Data to encrypt (can be object or string)
 * @returns Encrypted base64 string
 */
  encrypt(data: any): string {
    try {
      // Convert to string if not already
      const dataStr = typeof data === 'object'
        ? JSON.stringify(data)
        : data.toString();

      return CryptoJS.AES.encrypt(dataStr, environment.encryptionKey).toString();
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypts base64 encoded encrypted string
   * @param encryptedData Base64 encrypted string
   * @param parseJson Whether to parse result as JSON
   * @returns Decrypted data (object or string)
   */
  decrypt(encryptedData: string, parseJson: boolean = true): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, environment.encryptionKey);
      const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);

      return parseJson ? JSON.parse(decryptedStr) : decryptedStr;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Generate a secure random encryption key
   * @param length Key length (default 32 characters)
   * @returns Randomly generated key
   */
  generateKey(length: number = 32): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint32Array(length)))
      .map((x) => charset[x % charset.length])
      .join('');
  }
}
