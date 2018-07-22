import { Pricing } from "../../../entity/Pricing";

let i: any;

export const insertPricing = async (
  data: any,
  locationId: any,
  pricingArray: any = []
) => {
  const intervals = data.product_pricing_interval;
  const amounts = data.product_pricing_amount;

  if (!intervals || !amounts) {
    return;
  }

  const intervalArray = intervals.split(",").map((item: any) => {
    return item.trim();
  });

  const amountArray = amounts.split(",").map((item: any) => {
    return item.trim();
  });

  if (intervalArray.length !== amountArray.length) {
    throw new Error("pricing import error");
  }

  for (i = 0; i < intervalArray.length; i++) {
    const interval = Number(intervalArray[i]);
    const amount = Number(amountArray[i]);

    let pricing = await Pricing.findOne({
      where: { locationId, interval, amount }
    });

    if (!pricing) {
      pricing = new Pricing();
      pricing.interval = interval;
      pricing.amount = amount;
      pricing.location = locationId;
    }

    pricingArray.push(pricing);
  }

  return pricingArray;
};
