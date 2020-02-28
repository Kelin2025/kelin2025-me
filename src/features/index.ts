const includeAll = require.context(".", true, /index\.ts$/);
includeAll.keys().forEach(includeAll);
