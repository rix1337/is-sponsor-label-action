require('dotenv').config()
const { Toolkit } = require('actions-toolkit')
const getAuthorNodeId = require('./lib/get-author-id')
const userIsSponsor = require('./lib/user-is-sponsor')
const createLabel = require('./lib/create-label')
const addSponsorLabel = require('./lib/add-sponsor-label')
const addNotASponsorLabel = require('./lib/add-not-a-sponsor-label')

Toolkit.run(async tools => {
  // Get the user id of the submitter
  const nodeId = getAuthorNodeId(tools.context.payload)

  // Check if the user is a sponsor
  const isSponsor = await userIsSponsor(tools, nodeId)
  
  // Add the label
  await createLabel(tools)
  if (isSponsor) {
      await addSponsorLabel(tools)
  } else {
    await addNotASponsorLabel(tools)
  }
  tools.log.success('Label successfully applied. Have a nice day!')
}, {
  event: [
    'pull_request.opened',
    'issues.opened'
  ],
  secrets: [
    'GITHUB_TOKEN'
  ]
})
