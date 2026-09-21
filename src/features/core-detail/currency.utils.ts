import { currencyCodes } from "@/features/reusable";
import { getSiteDetails } from "./site-detail.utils";

export const formatPriceShort = (amount: number): string => {
  // 1. Fetch live currency configuration from your site detail JSON file
  const siteDetails = getSiteDetails();
  const currencyCode = siteDetails.currency.code;
  const position = siteDetails.currency.position;

  // 2. Find the correct symbol from your static array (fallback to the code itself)
  const currencyObj = currencyCodes.find(c => c.value === currencyCode);
  const symbol = currencyObj ? currencyObj.code : currencyCode;

  const isBefore = position === 'before';
  let formattedNumber = '';

  // 3. Process formatting shortcuts based on the discovered currency code
  if (currencyCode === 'PKR') {
    if (amount >= 10000000) { // 1 Crore
      formattedNumber = `${Number((amount / 10000000).toFixed(1))} Crore`;
    } else if (amount >= 100000) { // 1 Lakh
      formattedNumber = `${Number((amount / 100000).toFixed(1))} Lakh`;
    }
  } else {
    if (amount >= 1000000) { // 1 Million
      formattedNumber = `${Number((amount / 1000000).toFixed(1))}M`;
    } else if (amount >= 1000) { // 1 Thousand
      formattedNumber = `${Number((amount / 1000).toFixed(1))}K`;
    }
  }

  // 4. Fallback for smaller values that don't trigger Lakh/Crore/K/M milestones
  if (!formattedNumber) {
    const rawFormatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0
    }).format(amount);

    return isBefore ? `${symbol} ${rawFormatted}` : `${rawFormatted} ${symbol}`;
  }

  // 5. Combine and deliver the final string layout
  return isBefore ? `${symbol} ${formattedNumber}` : `${formattedNumber} ${symbol}`;
};
