const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

// Wait, the backend uses in-memory DB or local DB?
// If it uses in-memory, updating a standalone local DB won't affect the running server!
// The server running `npm run dev` has an in-memory DB or a local DB?
// Let's check `server.js`! It tries `mongodb://localhost/blinkbasket` first. If it succeeds, it uses that.
// But earlier `dbConnected` health check showed true.
// Let's just make an HTTP PUT to update the product? But we don't have a bulk update API.
