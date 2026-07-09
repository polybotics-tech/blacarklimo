import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://blacarklimo.com",
      lastModified: new Date(),
    },
    {
      url: "https://blacarklimo.com/booking",
      lastModified: new Date(),
    },
    {
      url: "https://blacarklimo.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://blacarklimo.com/fleet",
      lastModified: new Date(),
    },
  ];
}
