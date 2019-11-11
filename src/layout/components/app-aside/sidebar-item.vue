<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- eslint-disable max-len -->
    <template
      v-if="
        hasOneShowingChild(item.childList, item) &&
        (!onlyOneChild.childList || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link
        :to="resolvePath(onlyOneChild.url)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.url)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            :icon="item.type === '一级菜单' ? 'pages-icon' : ''"
            :title="item.name"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.url)"
      popper-append-to-body
    >
      <template slot="title">
        <item :title="item.name" :icon="item.type === '一级菜单' ? 'pages-icon' : ''"/>
      </template>
      <sidebar-item
        v-for="child in item.childList"
        :key="child.url"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(item.url)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path';
import { isExternal } from '@/utils/validate';
import Item from './item';
import AppLink from './link';

export default {
  name: 'SidebarItem',
  components: {
    Item,
    AppLink,
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        }

        // Temp set(will be used if only has one showing child)
        this.onlyOneChild = item;
        return true;
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath || '', routePath || '');
    },
  },
};
</script>
