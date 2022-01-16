import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'

import { Card, Tab, Tabs, Swipe, SwipeItem, Lazyload, Badge, Sidebar, SidebarItem, Collapse, CollapseItem} from 'vant';

createApp(App)
    .use(Swipe).use(SwipeItem).use(Lazyload, {
        loading: require('./assets/images/default.jpeg')
    }).use(Badge).use(Sidebar).use(SidebarItem)
	.use(Collapse).use(CollapseItem)
	.use(Tab).use(Tabs)
	.use(Card)
    .use(store).use(router).mount('#app')
