<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { initTheme } from '@atom/b2c-tokens';

initTheme({ darkMode: true, checkDarkModeFunc: _f.Falcon.isDark }); // NOSONAR
export default {
  name: 'App',
  data() {
    return {};
  },
};
</script>
