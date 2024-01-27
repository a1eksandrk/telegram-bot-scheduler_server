import botManagerApp from '#modules/bot-manager/app.js'

import db from '#app/db.js'

try {
  await db.initialize()
  await botManagerApp.init(db)
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
}
