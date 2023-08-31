import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
  VantResolver,
  ElementPlusResolver
} from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Inspect from "vite-plugin-inspect";

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  components: pathResolve("src/components"),
  views: pathResolve("src/views"),
  assets: pathResolve("src/assets"),
  network: pathResolve("src/network"),
  store: pathResolve("src/store"),
  router: pathResolve("src/router"),
  utils: pathResolve("src/utils"),
  hooks: pathResolve("src/hooks"),
  styles: pathResolve("src/styles")
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://ketang.api.test.duia.com/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      },
      "/sku": {
        target: "http://sku.test.duia.com/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/sku/, "")
      },
      "/image": {
        target: "http://tu.duia.com/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/image/, "")
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon"
        })
      ]
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"]
        }),
        ElementPlusResolver(),
        VantResolver()
      ]
    }),
    Icons({
      autoInstall: true
    }),
    Inspect()
  ]
});
