export default {
  isDate(d) {
    const date = new Date(d);
    if (date instanceof Date && !isNaN(date.valueOf())) {
      return false;
    }
    return "Invalid date";
  },
  isRequired(v) {
    return Boolean(v) || "Required";
  },
  isCraftCentral(v) {
    return (
      (v.includes("craftcentral.ie") && v.includes("variant=")) ||
      "Not a craftcentral URL"
    );
  },
};
