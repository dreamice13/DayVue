<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
    <h3 v-show="!isCollapse">通用后台管理系统</h3>
    <h3 v-show="isCollapse">后台</h3>
    <el-menu-item :index="item.id" v-for="item in menuNoChildren"
                  :key = 'item.id'
                  @click="clickMenu(item)">
      <el-icon v-if="item.icon == 'home-filled'"><home-filled /></el-icon>
      <el-icon v-if="item.icon == 'user'"><user/></el-icon>
      <el-icon v-if="item.icon == 'data-analysis'"><data-analysis/></el-icon>
      <template #title>{{item.label}}</template>
    </el-menu-item>
    <el-sub-menu :index="item.id" v-for="item in menuHasChildren"
                 :key = item.id>
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>{{item.label}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path"
                      v-for="(subItem, subIndex) in item.children"
                      :key="subIndex"
                      @click="clickMenu(subItem.path)">
          {{subItem.label}}
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

  </el-menu>
</template>

<script>
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {
  HomeFilled,
  DataAnalysis,
  Location,
  Menu as IconMenu,
  User,
  Setting,
} from '@element-plus/icons-vue';
import {useStore} from "vuex";


export default {
  name: "CommonAside",
  components: {
    HomeFilled,
    DataAnalysis,
    Location,
    IconMenu,
    User,
    Setting
  },
  setup() {
    const store = useStore();
    let isCollapse = ref(false);
    const menu = ref([]);
    let menuNoChildren = ref([]);
    let menuHasChildren = ref([]);

    const router = useRouter();

    menu.value = [
      {
        id: '1',
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home-filled',
        url: 'MallManage/MallManage'
      },
      {
        id: '2',
        path: '/website',
        name: 'website',
        label: '网站管理',
        icon: 'data-analysis',
        url: 'WebsiteManage/WebsiteManage'
      },
      {
        id: '3',
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'MallManage/MallManage'
      },

      {
        id: '4',
        label: '其他',
        icon: 'location',
        children: [
          {
            path: '/page1',
            name: 'page1',
            label: '页面1',
            icon: 'setting',
            url: 'Other/PageOne'
          },
          {
            path: '/page2',
            name: 'page2',
            label: '页面2',
            icon: 'setting',
            url: 'Other/PageTwo'
          }
        ]
      }];

    menuNoChildren = computed(() => {
      return menu.value.filter((item) => !item.children)
    });
    menuHasChildren = computed(() => {
      return menu.value.filter((item) => item.children)
    })
    isCollapse = computed(() => {
      return store.state.tab.isCollapse;
    })

    const handleOpen = (key, keyPath) => {
      console.log(key);
    }
    const handleClose = (key, keyPath) => {
      console.log(key);
    }

    // 菜单点击，通过name匹配组件
    const clickMenu = (item) => {
      router.push({
        name: item.name
      })
    }



    return {
      isCollapse,
      menu,
      menuNoChildren,
      menuHasChildren,
      handleOpen,
      handleClose,
      clickMenu
    }
  }
}
</script>

<style lang="scss" scoped>
  h3 {
    margin-top: 0px;
    padding-top: 20px;
    color: #FFFFFF;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu-vertical-demo {
    border-width: 0px;
    height: 100vh;
  }
</style>