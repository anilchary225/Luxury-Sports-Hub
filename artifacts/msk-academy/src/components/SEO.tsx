import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
}: SEOProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Description
    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute("content", description);

    // Keywords
    if (keywords) {
      let keywordsTag = document.querySelector(
        'meta[name="keywords"]'
      ) as HTMLMetaElement | null;

      if (!keywordsTag) {
        keywordsTag = document.createElement("meta");
        keywordsTag.setAttribute("name", "keywords");
        document.head.appendChild(keywordsTag);
      }

      keywordsTag.setAttribute("content", keywords);
    }

    // Canonical
    if (canonical) {
      let canonicalTag = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement | null;

      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalTag);
      }

      canonicalTag.setAttribute("href", canonical);
    }
  }, [title, description, keywords, canonical]);

  return null;
};

export default SEO;