import { IntegrationResult } from '../common/types';
import {
  CreateShiprocketOrderPayload,
  CreateShiprocketOrderResponse,
  ServiceabilityCheckParams,
  ServiceabilityResult,
  ShiprocketAuthResponse,
  ShiprocketTrackingResult,
} from './types';

const SHIPROCKET_BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

/**
 * Checks whether Shiprocket credentials are configured.
 */
export function isShiprocketConfigured(): boolean {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;
  return Boolean(email && password && email.trim().length > 0 && password.trim().length > 0);
}

/**
 * Retrieves an authentication token for Shiprocket API, caching in memory for ~8 days.
 * Returns null if service is not configured or auth fails.
 */
async function getAuthToken(): Promise<string | null> {
  if (!isShiprocketConfigured()) return null;

  // Use cached token if still valid (valid for 8 days)
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const email = process.env.SHIPROCKET_EMAIL!;
  const password = process.env.SHIPROCKET_PASSWORD!;

  try {
    const response = await fetch(`${SHIPROCKET_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error(`[Shiprocket Auth Failed] HTTP ${response.status}`);
      return null;
    }

    const data = (await response.json()) as ShiprocketAuthResponse;
    if (data?.token) {
      cachedToken = data.token;
      // Shiprocket tokens last ~10 days; refresh after 8 days
      tokenExpiresAt = Date.now() + 8 * 24 * 60 * 60 * 1000;
      return cachedToken;
    }

    return null;
  } catch (err: unknown) {
    console.error('[Shiprocket Auth Error]', err);
    return null;
  }
}

/**
 * Checks courier serviceability between pickup postcode and delivery postcode.
 */
export async function checkServiceability(
  params: ServiceabilityCheckParams
): Promise<IntegrationResult<ServiceabilityResult>> {
  if (!isShiprocketConfigured()) {
    return {
      success: false,
      configured: false,
      error: {
        code: 'SERVICE_NOT_CONFIGURED',
        message:
          'Shiprocket integration is currently disabled: SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD are not configured.',
      },
    };
  }

  const { pickup_postcode, delivery_postcode, weight = 0.5, cod = 0 } = params;

  if (!pickup_postcode || !delivery_postcode) {
    return {
      success: false,
      configured: true,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Both pickup_postcode and delivery_postcode are required.',
      },
    };
  }

  const token = await getAuthToken();
  if (!token) {
    return {
      success: false,
      configured: true,
      error: {
        code: 'AUTHENTICATION_FAILED',
        message: 'Unable to authenticate with Shiprocket. Please verify credentials.',
      },
    };
  }

  try {
    const query = new URLSearchParams({
      pickup_postcode: pickup_postcode.trim(),
      delivery_postcode: delivery_postcode.trim(),
      weight: String(weight),
      cod: String(cod),
    });

    const response = await fetch(`${SHIPROCKET_BASE_URL}/courier/serviceability/?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        configured: true,
        error: {
          code: 'EXTERNAL_API_ERROR',
          message: errorData?.message || `Shiprocket serviceability check failed with HTTP ${response.status}`,
          details: errorData,
        },
      };
    }

    const data = (await response.json()) as ServiceabilityResult;
    return {
      success: true,
      configured: true,
      data,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error checking Shiprocket serviceability';
    return {
      success: false,
      configured: true,
      error: {
        code: 'EXTERNAL_API_ERROR',
        message,
      },
    };
  }
}

/**
 * Creates a new shipment order in Shiprocket.
 */
export async function createShiprocketOrder(
  payload: CreateShiprocketOrderPayload
): Promise<IntegrationResult<CreateShiprocketOrderResponse>> {
  if (!isShiprocketConfigured()) {
    return {
      success: false,
      configured: false,
      error: {
        code: 'SERVICE_NOT_CONFIGURED',
        message:
          'Shiprocket integration is currently disabled: SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD are not configured.',
      },
    };
  }

  const defaultPickup = process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary';
  const orderPayload: CreateShiprocketOrderPayload = {
    ...payload,
    pickup_location: payload.pickup_location || defaultPickup,
  };

  const token = await getAuthToken();
  if (!token) {
    return {
      success: false,
      configured: true,
      error: {
        code: 'AUTHENTICATION_FAILED',
        message: 'Unable to authenticate with Shiprocket. Please verify credentials.',
      },
    };
  }

  try {
    const response = await fetch(`${SHIPROCKET_BASE_URL}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        configured: true,
        error: {
          code: 'EXTERNAL_API_ERROR',
          message: errorData?.message || `Shiprocket order creation failed with HTTP ${response.status}`,
          details: errorData,
        },
      };
    }

    const data = (await response.json()) as CreateShiprocketOrderResponse;
    return {
      success: true,
      configured: true,
      data,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error creating Shiprocket order';
    return {
      success: false,
      configured: true,
      error: {
        code: 'EXTERNAL_API_ERROR',
        message,
      },
    };
  }
}

/**
 * Tracks a shipment via AWB code or order ID.
 */
export async function trackShipment(identifier: {
  awbCode?: string;
  orderId?: string;
}): Promise<IntegrationResult<ShiprocketTrackingResult>> {
  if (!isShiprocketConfigured()) {
    return {
      success: false,
      configured: false,
      error: {
        code: 'SERVICE_NOT_CONFIGURED',
        message:
          'Shiprocket integration is currently disabled: SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD are not configured.',
      },
    };
  }

  const { awbCode, orderId } = identifier;
  if (!awbCode && !orderId) {
    return {
      success: false,
      configured: true,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Must provide either awbCode or orderId to track shipment.',
      },
    };
  }

  const token = await getAuthToken();
  if (!token) {
    return {
      success: false,
      configured: true,
      error: {
        code: 'AUTHENTICATION_FAILED',
        message: 'Unable to authenticate with Shiprocket. Please verify credentials.',
      },
    };
  }

  try {
    const endpoint = awbCode
      ? `${SHIPROCKET_BASE_URL}/courier/track/awb/${encodeURIComponent(awbCode)}`
      : `${SHIPROCKET_BASE_URL}/courier/track?order_id=${encodeURIComponent(orderId!)}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        configured: true,
        error: {
          code: 'EXTERNAL_API_ERROR',
          message: errorData?.message || `Shiprocket tracking failed with HTTP ${response.status}`,
          details: errorData,
        },
      };
    }

    const data = (await response.json()) as ShiprocketTrackingResult;
    return {
      success: true,
      configured: true,
      data,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error tracking shipment';
    return {
      success: false,
      configured: true,
      error: {
        code: 'EXTERNAL_API_ERROR',
        message,
      },
    };
  }
}
