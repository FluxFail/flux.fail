export default {
  flashError (state, msg) {
    state.errors.push(msg)
  },
  flashWarning (state, msg) {
    state.warnings.push(msg)
  },
  flashInfo (state, msg) {
    state.infos.push(msg)
  },
  flashSuccess (state, msg) {
    state.successes.push(msg)
  }
}
