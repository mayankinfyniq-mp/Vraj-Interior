import { revealDirective, parallaxDirective } from './reveal'
import { cursorDirective } from './cursor'

export default {
  install(app) {
    app.directive('reveal', revealDirective)
    app.directive('parallax', parallaxDirective)
    app.directive('cursor', cursorDirective)
  }
}
