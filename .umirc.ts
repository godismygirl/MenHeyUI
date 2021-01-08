import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: 'history', component: '@/pages/History' },
  ],
  proxy: {
    '/API': {
      //target: 'http://192.168.1.67:9010',
      //target: 'http://192.168.1.28:9010',
      target: 'http://hdyy.menhey.com:9056',
      changeOrigin: true,
      pathRewrite: { '^/API': '' },
    },
  },
});
