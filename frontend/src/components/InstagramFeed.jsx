import { useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { viewportOnce, fadeUp } from "@/lib/motion";
import { IMAGES } from "@/data/catalog";
import { SITE_CONFIG } from "@/config/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const FALLBACK = IMAGES.socialGrid;

/**
 * Live Instagram grid for @nivoram.shop.
 * - Backend GET /api/instagram/feed returns cached Graph API posts
 *   (token stays server-side).
 * - Fewer than 4 posts (or endpoint/token unavailable) → honest fallback
 *   to real catalogue photography.
 */
export default function InstagramFeed() {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`${API}/instagram/feed`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((d) => mounted && setFeed(d))
      .catch(() => mounted && setFeed({ configured: false, posts: [] }));
    return () => {
      mounted = false;
    };
  }, []);

  const hasLive = Boolean(feed?.posts?.length >= 4);
  const tiles = hasLive ? feed.posts.slice(0, 8) : FALLBACK;

  return (
    <div data-testid="instagram-feed">
      {hasLive && feed.stale && (
        <p className="text-[12px] text-ink/45 mb-4">
          Showing the latest available posts — live sync is catching up.
        </p>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {tiles.map((post, i) => {
          const isLive = hasLive;
          const src = isLive
            ? post.media_type === "VIDEO"
              ? post.thumbnail_url || null
              : post.media_url || post.thumbnail_url || null
            : post;
          return (
            <motion.a
              key={isLive ? post.id : `fallback-${i}`}
              href={isLive ? post.permalink : SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
              className="group relative aspect-square overflow-hidden bg-white border border-sand"
              aria-label={isLive ? "View post on Instagram" : "Open Instagram"}
              data-testid={`social-tile-${i}`}
            >
              {src ? (
                <img
                  src={src}
                  alt={isLive && post.caption ? post.caption.slice(0, 80) : "Nivoram Instagram post"}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-cream">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50 px-4 text-center">
                    View on Instagram
                  </span>
                </div>
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/25 transition-colors duration-300">
                <Instagram size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </span>
            </motion.a>
          );
        })}
      </div>
      {!feed && (
        <p className="mt-4 text-[12px] text-ink/35" data-testid="instagram-feed-loading">
          Loading the latest from Instagram…
        </p>
      )}
    </div>
  );
}