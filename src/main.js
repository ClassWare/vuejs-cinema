import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import { checkFilter, setDay } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

import routes from './util/routes';
const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment(),
    bus
  },
  created() {
    this.$http.get('/api').then(response => {
      this.movies = response.data;
    });
    this.$bus.$on('check-filter', checkFilter.bind(this));
    this.$bus.$on('set-day', setDay.bind(this));
  },
  router
})

import { addClass, removeClass } from './util/helpers';

let mouseoverHandler = function(ev) {
  let span = ev.target.parentNode.getElementsByTagName('SPAN')[0];
  addClass(span,'tooltip-show');
};

let mouseoutHandler = function(ev) {
  let span = ev.target.parentNode.getElementsByTagName('SPAN')[0];
  removeClass(span,'tooltip-show');
};

Vue.directive('tooltip', {
  bind(el, bindings) {
    let span = document.createElement('SPAN');
    let text = document.createTextNode(`Seats available: ${ bindings.value.seats }`);
    span.appendChild(text);
    addClass(span, 'tooltip');
    el.appendChild(span);
    let div = el.getElementsByTagName('DIV')[0];
    div.addEventListener('mouseover', mouseoverHandler);
    div.addEventListener('mouseout', mouseoutHandler);
    div.addEventListener('touchstart', mouseoverHandler);
    div.addEventListener('touchend', mouseoutHandler);
  },
  unbind(el) {
    let div = el.getElementsByTagName('DIV')[0];
    div.removeEventListener('mouseover', mouseoverHandler);
    div.removeEventListener('mouseout', mouseoutHandler);
    div.removeEventListener('touchstart', mouseoverHandler);
    div.removeEventListener('touchend', mouseoutHandler);
  }
})
