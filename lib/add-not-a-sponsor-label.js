/**
 * Adds the configured label to the created issue or pull request
 * @param {import('actions-toolkit').Toolkit} tools
 */
module.exports = async function addNotASponsorLabel (tools) {
  // Get the label to add
  const label = tools.inputs.not_sponsor_label
  tools.log.debug(`Author is not a sponsor! Adding the [${label}] label!`)

  // User is not a sponsor, let's add a label
  return tools.github.issues.addLabels({
    ...tools.context.repo,
    issue_number: tools.context.issue.issue_number,
    labels: [label]
  })
}
