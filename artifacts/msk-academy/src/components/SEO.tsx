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
  }, [title, description, keywords, canonical]);

  return null;
};

export default SEO;