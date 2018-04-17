const CDN = s => `https://cdnjs.cloudflare.com/ajax/libs/${s}`;
const ramda = CDN("ramda/0.21.0/ramda.min");
const jquery = CDN("jquery/3.0.0-rc1/jquery.min");

requirejs.config({ paths: { ramda, jquery } });
require(["jquery", "ramda"], ($, { compose, curry, map, prop, pipe }) => {
  // -- Utils ----------------------------------------------------------
  const Impure = {
    getJSON: curry((callback, url) => $.getJSON(url, callback)),
    setHTML: curry((sel, html) => $(sel).html(html)),
    trace: curry((tag, x) => {
      console.log(tag, x);
      return x;
    }),
  };

  // -- Pure -----------------------------------------------------------
  const host = "api.flickr.com";
  const path = "/services/feeds/photos_public.gne";
  const query = t => `?tags=${t}&format=json&jsoncallback=?`;
  const url = t => `https://${host}${path}${query(t)}`;

  const img = src => $("<img />", { src });
  const mediaUrl = compose(prop("m"), prop("media"));
  // const mediaUrls = compose(map(mediaUrl), prop("items"));
  // const images = compose(map(img), mediaUrls);

  // inline call to mediaUrls
  // const images = compose(map(img), map(mediaUrl), prop("items"));

  // apply composition law
  /*
    compose(map(f), map(g)) === map(compose(f, g));
    compose(map(img), map(mediaUrl)) === map(compose(img, mediaUrl));
  */
  // const images = compose(map(compose(img, mediaUrl)), prop("items"));

  // extract compose out to function
  const mediaToImg = compose(img, mediaUrl);
  const images = compose(map(mediaToImg), prop("items"));

  // -- Impure ---------------------------------------------------------
  const render = compose(Impure.setHTML("#js-main"), images);
  const app = compose(Impure.getJSON(render), url);

  app("cats");
});
