import { storeToRefs } from 'pinia';
import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth';

function requiresAuth(to) {
  const { isAuthenticated } = storeToRefs(useAuthStore());
  // 보안이 걸려있는데, 로그인이 안되어 있다면~
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !isAuthenticated.value
  ) {
    alert('로그인이 필요한 페이지 입니다.');
    return '/';
  }
  return true;
}
export default boot(async ({ app, router }) => {
  router.beforeEach(requiresAuth);
});
