

<template>
  <div class="min-h-screen flex">
    <ServNavigation />

    <ChatContainer />
  </div>
</template>


<script >
import ServNavigation from './components/Serv-navigation.vue';
import ChatContainer from './components/chat-container.vue';
export default {
  components: {
    ServNavigation,
    ChatContainer
  }
}
</script>