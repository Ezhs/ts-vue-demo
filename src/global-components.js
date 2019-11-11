import Vue from 'vue';
import LayoutMainSidebar from '@/components/layout/main-sidebar';
import Flex, { FlexItem } from '@/components/flex';
import WhiteSpace from '@/components/white-space';
import WingBlank from '@/components/wing-blank';
import Card from '@/components/card';
import Pagination from '@/components/pagination';
import ButtonConfirm from '@/components/button-confirm';
import Panel from '@/components/panel';
import Timeline from '@/components/timeline';
import DataEmptySimple from '@/components/data-empty/simple';
import FormWrap from '@/components/form-wrap';

// register global components
Vue.component('layout-main-sidebar', LayoutMainSidebar);
Vue.component('card', Card);
Vue.component('pagination', Pagination);
Vue.component('flex', Flex);
Vue.component('flex-item', FlexItem);
Vue.component('white-space', WhiteSpace);
Vue.component('wing-blank', WingBlank);
Vue.component('button-confirm', ButtonConfirm);
Vue.component('panel', Panel);
Vue.component('timeline', Timeline);
Vue.component('data-empty-simple', DataEmptySimple);
Vue.component('form-wrap', FormWrap);
