// libs polyfills
// import 'core-js/es/number/is-nan';
// swiper
import 'core-js/modules/es.math.sign';
// tippy
import 'core-js/es/object/assign';
import 'core-js/es/array/find';
// colorpicker
import 'core-js/es/string/pad-start';

window.components = {};

import Menu from '../components/menu/index';
window.components['Menu'] = new Menu;
window.components['Menu'].init();
