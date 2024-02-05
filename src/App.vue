<template>
  <div>
    <RouterView />
  </div>
</template>

<style lang="scss">
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #7316f613;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #7316f638;
}
</style>