/**
 * Grabs the name of the author
 * @param {object} payload
 */
module.exports = function getAuthorName (payload) {
  if (payload.issue) {
    return payload.issue.user.login
  } else if (payload.pull_request) {
    return payload.pull_request.user.login
  } else {
    throw new Error('No user name found')
  }
}
