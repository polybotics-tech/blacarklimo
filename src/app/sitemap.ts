import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.blacarklimo.com",
      lastModified: new Date(),
    },
    {
      url: "https://www.blacarklimo.com/booking",
      lastModified: new Date(),
    },
    {
      url: "https://www.blacarklimo.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://www.blacarklimo.com/fleet",
      lastModified: new Date(),
    },
  ];
}
