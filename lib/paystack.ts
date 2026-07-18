import { getPaystackSecretKey } from "./env";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

interface PaystackInitializeParams {
  email: string;
  amount: number; // in kobo (GH₵ 1 = 100 pesewas = 100)
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
  channels?: string[];
}

interface PaystackResponse<T = unknown> {
  status: boolean;
  message: string;
  data: T;
}

interface InitializeResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

interface VerifyResponse {
  id: number;
  domain: string;
  amount: number;
  currency: string;
  status: string;
  reference: string;
  metadata: Record<string, unknown>;
  gateway_response: string;
  paid_at: string;
  channel: string;
  customer: {
    email: string;
  };
}

async function paystackRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<PaystackResponse<T>> {
  const secretKey = getPaystackSecretKey();
  const res = await fetch(`${PAYSTACK_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!data.status) {
    throw new Error(data.message || "Paystack API error");
  }
  return data;
}

export async function initializeTransaction(params: PaystackInitializeParams) {
  return paystackRequest<InitializeResponse>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata || {},
      channels: params.channels || ["card", "mobile_money", "bank_transfer"],
    }),
  });
}

export async function verifyTransaction(reference: string) {
  return paystackRequest<VerifyResponse>(
    `/transaction/verify/${reference}`
  );
}

export function generateReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `VOYAGE_${timestamp}_${random}`.toUpperCase();
}

export function pesewasToGhs(pesewas: number): number {
  return pesewas / 100;
}

export function ghsToPesewas(ghs: number): number {
  return Math.round(ghs * 100);
}
