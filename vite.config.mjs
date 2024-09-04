// Plugins
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Fonts from 'unplugin-fonts/vite';
import Layouts from 'vite-plugin-vue-layouts';
import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {
  getPascalCaseRouteName,
  VueRouterAutoImports,
} from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      getRouteName: (routeNode) => {
        return getPascalCaseRouteName(routeNode)
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase();
      },
      dts: './typed-router.d.ts',
      pathParser: {
        dotNesting: false,
      },
    }),
    Layouts({
      layoutsDirs: './src/layouts/',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    vueJsx(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/assets/styles/setting.scss',
      },
    }),
    Components({
      dirs: ['src/components', 'src/@core/components'],
      dts: true,
    }),
    Fonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
        ],
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        VueRouterAutoImports,
        '@vueuse/core',
        '@vueuse/math',
        'pinia',
      ],
      dirs: ['./src/@core/utils', './src/@core/composable/', './src/utils/'],
      dts: './auto-imports.d.ts',
      vueTemplate: true,
      ignore: ['useCookies', 'useStorage'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 5000,
    sourcemap: false,
  },
  define: { 'process.env': process.env },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@images': fileURLToPath(
        new URL('./src/assets/images/', import.meta.url)
      ),
      '@styles': fileURLToPath(
        new URL('./src/assets/styles/', import.meta.url)
      ),
      '@json': fileURLToPath(new URL('./src/assets/json/', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: '6616',
    // https: true,
    // origin: ''
  },
});
