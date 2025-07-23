// Signature setting schema for PDF signature placement and metadata

export interface SignatureSetting {
  /**
   * The page number (1-based) where the signature should be placed
   */
  page: number;

  /**
   * X coordinate (in PDF points) from the left of the page
   */
  x: number;

  /**
   * Y coordinate (in PDF points) from the bottom of the page
   */
  y: number;

  /**
   * Width of the signature (in PDF points)
   */
  width: number;

  /**
   * Height of the signature (in PDF points)
   */
  height: number;

  /**
   * Optional prefix text to display before the signature image
   */
  prefixText?: string;

  /**
   * The image data for the signature (base64-encoded PNG or JPEG)
   */
  imageData: string;

  /**
   * Optional suffix text to display after the signature image
   */
  suffixText?: string;

  /**
   * Name of the signer
   */
  signerName?: string;

  /**
   * Date/time of signing (ISO string)
   */
  signedAt?: string;

  /**
   * Optional reason or description for the signature
   */
  reason?: string;
} 
