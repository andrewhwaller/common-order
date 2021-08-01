const faunadb = require('faunadb');

const q = faunadb.query;
const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_DB_KEY,
  domain: 'db.us.fauna.com',
  scheme: 'https',
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 500, body: 'method must be get' };
  }

  try {
    const req = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('documents'))),
        q.Lambda((x) => q.Get(x)),
      ),
    );
    return { statusCode: 200, body: JSON.stringify(req.data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
