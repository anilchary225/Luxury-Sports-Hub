import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image,
  type = "website",
}: SEOProps) => {
  useEffect(() => {
    // Page title
    document.title = title;

    // Meta description
    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.content = description;

    // Meta keywords
    if (keywords) {
      let keywordsTag = document.querySelector(
        'meta[name="keywords"]'
      ) as HTMLMetaElement | null;

      if (!keywordsTag) {
        keywordsTag = document.createElement("meta");
        keywordsTag.name = "keywords";
        document.head.appendChild(keywordsTag);
      }

      keywordsTag.content = keywords;
    }

    // Canonical URL
    if (canonical) {
      let canonicalTag = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement | null;

      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.rel = "canonical";
        document.head.appendChild(canonicalTag);
      }

      canonicalTag.href = canonical;
    }

    const socialTags = {
      "og:title": title,
      "og:description": description,
      "og:type": type,
      "twitter:title": title,
      "twitter:description": description,
      ...(canonical ? { "og:url": canonical, "twitter:url": canonical } : {}),
      ...(image ? {
        "og:image": image,
        "og:image:alt": title,
        "twitter:image": image,
        "twitter:image:alt": title,
      } : {}),
    };
    const previousTags = Object.entries(socialTags).map(([key, value]) => {
      const attribute = key.startsWith("og:") ? "property" : "name";
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      const existing = Boolean(tag);
      const previous = tag?.content ?? "";
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = value;
      return { tag, existing, previous };
    });
    return () => {
      previousTags.forEach(({ tag, existing, previous }) => {
        if (existing) tag.content = previous;
        else tag.remove();
      });
    };
  }, [title, description, keywords, canonical, image, type]);

  return null;
};

export default SEO;
