const addressObj = {
  address: "",
  address2: "",
  city: "",
  state: "",
  postalCode: ""
};

export const mapAddress = (components: any) => {
  for (const component of components) {
    // Street address
    if (component.types[0] === "street_number") {
      addressObj.address = component.long_name;
    }

    if (component.types[0] === "route") {
      addressObj.address = addressObj.address + " " + component.long_name;
    }

    // City
    if (component.types[0] === "locality") {
      addressObj.city = component.long_name;
    }

    // State
    if (component.types[0] === "administrative_area_level_1") {
      addressObj.state = component.short_name;
    }

    // Postal code
    if (component.types[0] === "postal_code") {
      addressObj.postalCode = component.long_name;
    }
  }

  return addressObj;
};
