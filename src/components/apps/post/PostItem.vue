<template>
  <q-item class="bg-white q-pt-md" clickable :to="`/posts/${item.id}`">
    <q-item-section avatar top>
      <q-avatar>
        <img :src="postUser?.photoURL" alt="사용자 아바타" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex items-center">
        <span>{{ postUser?.displayName }}</span>
        <span class="q-mx-xs">&middot;</span>
        <span>
          {{ formatRelativeTime(item.createdAt) }}
        </span>
        <q-chip class="q-ml-sm" dense color="primary" text-color="white">
          {{ $t(item.category) }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ item.title }}</div>
      <div class="text-primary text-caption">
        <span v-for="tag in item.tags" :key="tag" class="q-mr-sm"
          >#{{ tag }}</span
        >
      </div>
      <div v-if="escapeHTML" class="text-grey-6 q-my-sm ellipsis-2-lines">
        {{ item.content }}
      </div>
      <div
        v-else
        class="text-grey-6 q-my-sm ellipsis-2-lines"
        v-html="item.content"
      ></div>
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_visibility"
              :label="item.readCount"
              :tooltip="$t('hits')"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_sms"
              :label="item.commentCount"
              :tooltip="$t('comments')"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent="toggleLike">
              <PostIcon
                :name="isLike ? 'favorite' : 'sym_o_favorite'"
                :label="likeCount"
                :tooltip="$t('like')"
              />
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn
              class="full-width"
              flat
              dense
              @click.prevent="toggleBookmark"
            >
              <PostIcon
                :name="isBookmark ? 'bookmark' : 'sym_o_bookmark'"
                :label="bookmarkCount"
                :tooltip="$t('bookmark')"
              />
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { formatRelativeTime } from 'src/utils/relative-time-format';
import { useLike } from 'src/composables/useLike';
import { useBookmark } from 'src/composables/useBookmark';
import { useAsyncState } from '@vueuse/core';
import { getUserById } from 'src/services';

import PostIcon from './PostIcon.vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  escapeHTML: {
    // 게시글 HTML 형식으로 보여줄지 여부
    type: Boolean,
    default: false,
  },
});

const { isLike, likeCount, toggleLike } = useLike(props.item.id, {
  initialCount: props.item.likeCount,
});
const { isBookmark, bookmarkCount, toggleBookmark } = useBookmark(
  props.item.id,
  {
    initialCount: props.item.bookmarkCount,
  },
);
const { state: postUser } = useAsyncState(
  () => getUserById(props.item.uid),
  {},
);
</script>

<style lang="scss" scoped></style>
