<template>
  <div class="empty">
    <div class="loading"></div>
  </div>
</template>

<style scoped lang="scss">
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .loading {
    background-color: #439571;
    width: 150px;
    height: 150px;
    animation: pulseLoad 1.5s ease-in-out infinite;
    border-radius: 100%;
  }
  @keyframes pulseLoad {
    0% {
      transform: scale(0);
      opacity: 0.25;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0.25;
    }
  }
}
</style>
