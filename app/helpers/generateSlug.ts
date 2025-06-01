interface IgenerateSlug {
  name: string;
  existingSlugs: string[];
}
const generateSlug = ({ name, existingSlugs = [] }: IgenerateSlug) => {
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "-") //for removing space and replace with hyphen
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .trim();

  let counter = 1;
  let uniqueSlug = slug;
  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  return uniqueSlug;
};
export { generateSlug };
