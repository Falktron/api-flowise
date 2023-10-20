const { connectToDB } = require("./lib/db.cjs");

const handle = async ({ event, resolve }) => {
  const dbconn = await connectToDB();
  event.locals = { dbconn };

  const response = await resolve(event);
  dbconn.release();

  return response;
};

module.exports = { handle };
