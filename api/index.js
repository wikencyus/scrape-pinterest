import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await fetch(
      `https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`
    );

    const json = await response.json();
    const data = json.resource_response.data.results;

    if (!data || !data.length) {
      return res.status(404).json({ error: `No results found for query: ${query}` });
    }

    const randomImage = data[Math.floor(Math.random() * data.length)].images.orig.url;
    res.json({ imageUrl: randomImage });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Pinterest' });
  }
}
