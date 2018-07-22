import * as slug from "slug";

export const slugGenerator = async (
  value: string,
  locationId: string,
  model: any
) => {
  const generateSlug = slug(value, { lower: true });
  const params =
    model === "Location"
      ? { id: locationId, slug: generateSlug }
      : { location: locationId, slug: generateSlug };
  const checkSlug = await model.find({
    where: params
  });

  return checkSlug.length > 0
    ? generateSlug + "-" + (checkSlug.length + 1)
    : generateSlug;
};
