import auth from './auth'
import fluxStream from './fluxStream'
import fluxReport from './fluxReport'

export default {
  ...auth,
  ...fluxStream,
  ...fluxReport
}
