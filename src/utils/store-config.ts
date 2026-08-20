import store from "@/content/config/store.json";
import contact from "@/content/config/contact.json";
import address from "@/content/config/address.json";
import social from "@/content/config/social.json";
import seo from "@/content/config/seo.json";
import branding from "@/content/config/branding.json";
import status from "@/content/config/store-status.json";
import businessHours from "@/content/config/business-hours.json";
import shipping from "@/content/config/shipping.json";
import paymentMethods from "@/content/config/payment-methods.json";

import type { StoreCore } from "@/types/store";
import type { Contact } from "@/types/contact";
import type { Address } from "@/types/address";
import type { Social } from "@/types/social";
import type { Seo } from "@/types/seo";
import type { Branding } from "@/types/branding";
import type { Status } from "@/types/store-status";
import type { BusinessHours } from "@/types/business-hours";
import type { Shipping } from "@/types/shipping";
import type { PaymentMethods } from "@/types/payment-methods";

export interface StoreConfig {
  store: StoreCore;
  contact: Contact;
  address: Address;
  social: Social;
  seo: Seo;
  branding: Branding;
  status: Status;
  businessHours: BusinessHours;
  shipping: Shipping;
  paymentMethods: PaymentMethods;
}

export function getStoreConfig(): StoreConfig {
  return {
    store: store as StoreCore,
    contact: contact as Contact,
    address: address as Address,
    social: social as Social,
    seo: seo as Seo,
    branding: branding as Branding,
    status: status as Status,
    businessHours: businessHours as BusinessHours,
    shipping: shipping as Shipping,
    paymentMethods: paymentMethods as PaymentMethods,
  };
}