<template>
<div class="commentViewBox">
    <CommentCard v-for="item in commentList" :key="item.id" :commentInfo="item" :replyItem="state.replyItem"
        :canDelete="!disabled" :canReply="!disabled"
        @handleReplyBox="handleReplyBox"
        @handleReplyDelete="handleReplyDelete(item)">
        <CommentInputBox v-show="inputShow(item)" 
            :class="{'commentInputBox-cur': state.replyItem && state.replyItem.id }"
            :mentionData="mentionData"
            v-model="item.replyText" 
            @handleAdd="handleAddReply"></CommentInputBox>
        <div class="replyListBox" v-show="item.replyListShow">
            <CommentCard  v-for="(rItem) in item.children" :key="rItem.id" :commentInfo="rItem"
                    :canDelete="!disabled"
                    @handleReplyDelete="handleReplyDelete(rItem, item)" />
        </div>
    </CommentCard>
</div>
</template>
<script lang="ts" setup>
import anime from 'animejs'
const props = withDefaults(defineProps<{
    commentList: any,
    disabled: boolean,
    mentionData?: 'mention'
}>(),{
    //@ts-ignore
    mentionData: []
})
//@ts-ignore
const state = reactive({
    replyItem: null
})
const emits = defineEmits(['handleReply','handleReplyDelete'])
function inputShow (row) {
    return state.replyItem && state.replyItem.id === row.id
}
// 回复成功后仅重新加载该commentId下的commentList(children)
function hideReplyBox (children, clearReplyText = true) {
    // const _commentInfo = props.commentList.find(item => item.id = state.replyItem.id)
    state.replyItem.children = children
    state.replyItem.replyListShow = true
    state.replyItem.replyInputShow = false
    setTimeout(() => {
        state.replyItem = null
    })
}
function handleAddReply (text, cb) {
    const param = {
        parentId: state.replyItem.id,
        text: text
    }
    emits('handleReply', param, (children) => {
        cb()
        hideReplyBox(children)
    })
}
function handleReplyBox (commentInfo) {
    if (commentInfo.replyInputShow) {
        state.replyItem = commentInfo
    } else {
        state.replyItem = null
        handleScroll()
    }
}
function handleScroll () {
    //@ts-ignore
    nextTick(() => {
        const viewBox = document.getElementsByClassName('commentViewBox')[0]
        const inputBox = document.getElementsByClassName('commentInputBox-cur')[0]
        // @ts-ignore
        if ((viewBox.scrollTop + viewBox.offsetHeight) < (inputBox.offsetTop + inputBox.scrollHeight)) {
            // @ts-ignore
            const scrollTop = inputBox.offsetTop + inputBox.scrollHeight * 2
            anime({
                targets: '.commentViewBox',
                duration: 200,
                scrollTop,
                easing:'easeInSine',
            })
        }
    })
}
function handleReplyDelete (item, parentItem) {
    emits('handleReplyDelete', item, parentItem)
}
</script>
<style lang="scss" scoped>
.commentViewBox {
    height: 100%;
    overflow: auto;
    .replyListBox {
        background-color: var(--app-grey-900);
        padding: 0 var(--app-space-xs);
        border-radius: var(--app-border-radius-s);
    }
    :deep(.commentCard_slot) {
        .commentInputBox {
            margin: var(--app-space-xs) 0;
        }
    }
}
</style>


