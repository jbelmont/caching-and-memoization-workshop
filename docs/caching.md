# Caching

## What Is Caching?

* Caching is the term for storing reusable responses in order to make subsequent requests faster.
* There are different types of caching available.
* Application caches and memory caches are both popular for their ability to speed up certain responses.

## Types of Cache

1. Disk cache: The page cache in main memory is managed by the operating system kernel.
2. Web cache
3. Memoization
    1. A cache can store data that is computed on demand rather than retrieved from a backing store.
    2. Memoization is an optimization technique that stores the results of resource-consuming function calls within a lookup table, allowing subsequent calls to reuse the stored results and avoid repeated computation.

## Web Caching

Web caching is a core design feature of the HTTP protocol
    * It is meant to minimize network traffic while improving perceived responsiveness of the system as a whole.

Caches are found at every level of a content's journey from the original server to the browser.

Web caching works by caching the HTTP responses for requests according to certain rules.

Subsequent requests for cached content can then be fulfilled from a cache closer to the user instead of sending the request all the way back to the web server.

## Benefits

Effective caching aids both content consumers and content providers.

Some of the benefits that caching brings to content delivery are:

* Decreased network costs: Content can be cached at various points in the network path between the content consumer and content origin.

* When the content is cached closer to the consumer, requests will not add network latency
* Improved responsiveness: Caching enables content to be retrieved faster because an entire network round trip is not necessary.
* Caches maintained close to the user, like the browser cache, can make this retrieval nearly instantaneous.
* Increased performance on the same hardware
    * For the server where the content originated, more performance can be squeezed from the same hardware by allowing aggressive caching.
    * The content owner can leverage the powerful servers along the delivery path to take the brunt of certain content loads.
* Availability of content during network interruptions
* Certain caches can be used to serve content even when if unavailable for short periods of time from the origin

## Terminology

* Origin server: The origin server is the original location of the content.
    * If you are acting as the web server administrator, this is the machine that you control.
    * It is responsible for serving any content that could not be retrieved from a cache along the request route
    * Setting the caching policy for all content.

* Cache hit ratio: A cache's effectiveness is measured in terms of its cache hit ratio or hit rate.
    * This is a ratio of the requests able to be retrieved from a cache to the total requests made.
    * A high cache hit ratio means that a high percentage of the content was able to be retrieved from the cache.  * This is usually the desired outcome for most administrators.

* Freshness: Term used to describe whether an item in cache is considered a candidate to serve to a client.
    * Content in a cache will only be used to respond if it is within the freshness time frame specified by the caching policy.

* Stale content: Items in the cache expire according to the cache freshness settings in the caching policy.

* Expired content is "stale".
    * Expired content cannot be used to respond to client requests. The origin server must be re-contacted to retrieve the new content or at least verify that the cached content is still accurate.

* Validation: Stale items in the cache can be validated in order to refresh their expiration time.
    * Validation involves checking with the origin server to see if cached content is still up to date

* Invalidation: Invalidation is the process of removing content from the cache before its expiration date.
    * Triggered if the item is changed on the origin server and an outdated item in cache causes client issues

## Cacheable Content

Items that don't tend to change frequently are good candidates for caching.

Cache Friendly Content:

* Logos and brand images
* Nav Icons
* Style sheets
* Javascript files
* Downloadable Content
* Media Files

More volatile items to cache:

* HTML pages
* Rotating images
* Heavily modified JavaScript and CSS files
* Content tied to auth (Cookies, Tokens, etc)

Some items that should almost never be cached are:

* Sensitive Dat (banking info, social security numbers, credit card numbers)
* user specific information that can change

Web Content Cache Locations:

* Browser cache: Web browsers themselves maintain a small cache.
    * Browsers sets a policy that dictates the most important items to cache.
    * This may be user-specific content or content deemed expensive to download and likely to be requested again.
    * We will explore IndexDb and Local Storage
    * In memory caching as well

* Intermediary caching proxies: Any server in between the client and infrastructure can cache certain content.
    * These caches may be maintained by ISPs or other independent parties.

* Reverse Cache: Your server infrastructure can implement its own cache for backend services.
    * Content can be served from the point of contact instead of hitting backend servers on each request.
        * For example hitting a database for each route that has cacheable content

## Caching HTTP Headers

Caching policy is dependent upon two different factors:

1. The caching entity itself gets to decide whether or not to cache acceptable content.
2. It can decide to cache less than it is allowed to cache, but never more.

**The majority of caching behavior is determined by the caching policy, which is set by the content owner.**

These policies are mainly exercises through the use of specific HTTP headers.

Cache-focused HTTP Headers:

* Expires: The Expires header is very straight-forward, although fairly limited in scope.
    * Set a time in the future when the content will expire.
    * At this point, any requests for the same content will have to go back to the origin server.
    * This header is probably best used only as a fall back.

* Cache-Control: This is the more modern replacement for the Expires header.
    * It is well supported and implements a much more flexible design.
    * In almost all cases, this is preferable to Expires, but it may not hurt to set both values.
    * We will discuss the specifics of the options you can set with Cache-Control a bit later.

* Etag: The Etag header is used with cache validation.
    * The origin can provide a unique Etag for an item when it initially serves the content.
    * When a cache needs to validate the content it has on-hand upon expiration, it can send back the Etag it has for the content.
    * The origin will either tell the cache that the content is the same, or send the updated content and new Etag

* Last-Modified: Specifies the last time that the item was modified.
    * This may be used as part of the validation strategy to ensure fresh content.

* Content-Length: This header is important to set when defining caching policies.
    * Certain software will refuse to cache content if it does not know in advanced the size of the content

* Vary: A cache will use the requested host and the path to the resource as the key to store the cache item.
    * The Vary header can be used to tell caches to pay attention to an additional header when deciding whether a request is for the same item.
    * Tells caches to key by the Accept-Encoding header as well, so that the cache will know to differentiate between compressed and uncompressed content.

## Cache-Control Flags

Cache-Control options:

* no-cache: Specifies that any cached content must be re-validated on each request before being served to client.
    * Contents is marked as stale immediately, but uses revalidation techniques to avoid re-downloading again

* no-store: This instruction indicates that the content cannot be cached in any way.
    * This is appropriate to set if the response represents sensitive data.

* public: This marks the content as public, meaning it can be cached by the browser and any intermediate caches.
    * For requests that HTTP authentication, responses are marked private by default.
    * This header overrides that setting.

More options can be found at [Cache Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

Options can be used in different ways to achieve various caching behavior.

## Developing a Caching Strategy

Ideally everything would be cached and your servers would only be contacted to validate content occasionally.

This doesn't often happen in practice though, so you should try to set some sane caching policies that aim to balance between implementing long-term caching and responding to the demands of a changing site.

## Common Issues with Caching

There are many situations where caching cannot or should not be implemented due to how the content is produced

1. Dynamic content generated by users
2. Sensitive information such as banking information, etc.
3. Older versions of your content are already out even though new versions have been published.

## General Recommendations

* Specific directories for images, css, and shared content
    * Placing content into dedicated directories will allow you to easily refer to them from any page on your site.

* Use the same URL to refer to the same items
    * Caches key off of both the host and the path to the content requested
    * Ensure that you refer to your content in the same way on all of your pages.
    * The previous recommendation makes this significantly easier.

* Use CSS image sprites where possible
    * Sprites for items like icons and navigation decrease the number of round trips needed to render your site
    * Allowing your site to cache that single sprite for a long time.
    * Use Single SVG file instead of multiple svg as well

* Host scripts and external resources locally where possible
    * If you utilize javascript scripts and other external resources, consider hosting those resources on your own dedicated servers if the correct headers are not being provided upstream.
    * Keep up to date with downstream changes however so you can update your local copy

* Fingerprint cache items
    * For static content like CSS and Javascript files, it may be appropriate to fingerprint each item.
    * This means adding a unique identifier to the filename (often a hash of the file) so that if the resource is modified, the new resource name can be requested, causing the requests to correctly bypass the cache.
    * There are a variety of tools that can assist in creating fingerprints and modifying the references to them within HTML documents.

* Allow all caches to store generic assets
    * Static content and content that is not user-specific should be cached at all points in the delivery chain.
    * This will allow intermediary caches to respond with the content for multiple users.

* Allow browsers to cache user-specific assets
    * For per-user content, it is often acceptable and useful to allow caching within the user's browser.
    * Caching in the browser will allow for instant retrieval for users during subsequent visits.

* Make exceptions for essential time-sensitive content
    * Sites that have a shopping cart should reflect the items in the cart immediately.
        * The no-cache or no-store options can be set in the Cache-Control header to achieve this.

* Always provide validators
    * Validators allow stale content to be refreshed without having to download the entire resource again.
    * Setting the Etag and the Last-Modified headers allow caches to validate their content and re-serve it if it has not been modified at the origin, further reducing load.

* Set long freshness times for supporting content
    * Items like images and css that don't change often

* Set short freshness times for parent content
    * The HTML itself will be downloaded frequently, allowing it to respond to changes rapidly.
    * The supporting content can then be cached aggressively.

**The key is to strike a balance that favors aggressive caching where possible while leaving opportunities to invalidate entries in the future when changes are made.**

Each Site will likely have the following items:

1. Aggressively cached items
2. Cached items with a short freshness time and the ability to re-validate
3. Items that should not be cached at all

**The goal is to move content into the first and second category when possible while maintaining an acceptable level of accuracy.**
