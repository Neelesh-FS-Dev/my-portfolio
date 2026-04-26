import { Helmet } from "react-helmet-async";

const SITE_URL = "https://neeleshyadav.vercel.app";
const DEFAULT_TITLE =
  "Neelesh Yadav — React Native & React Developer | Pune, India";
const DEFAULT_DESCRIPTION =
  "React Native & React Developer with 3+ years building high-performance cross-platform mobile and web apps. Published 10+ apps on App Store & Play Store. TypeScript, Redux, Firebase, REST APIs. Based in Pune, India.";
const TWITTER_HANDLE = "@neeleshyadav25";

function ogImageUrl(title, description) {
  return `${SITE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
}

function absoluteUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  type = "website",
  schema,
}) {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : ogImageUrl(title, description);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Neelesh Yadav" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {schema && Array.isArray(schema) ? (
        schema.map((s, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(s)}
          </script>
        ))
      ) : schema ? (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      ) : null}
    </Helmet>
  );
}

export { SITE_URL };
