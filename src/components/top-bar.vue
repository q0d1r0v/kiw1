<template>
    <div class="top-bar">
        <div class="desktop">
            <div class="left-side">
                Left side
            </div>

            <div class="right-side">
                Right side
            </div>
        </div>

        <div class="mobile">
            Mobile
        </div>
    </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 1180px) {
    .desktop {
        display: none !important;
    }

    .mobile {
        display: flex !important;
        align-items: center;
        max-height: 100px;
    }
}

.top-bar {
    height: 65px;
    background: #fff;
    box-shadow: 0px 12px 10px -10px rgba(0, 0, 0, 0.1);

    & .desktop {
        height: 100%;
        padding-left: 200px;
        padding-right: 200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .mobile {
        display: none;
    }
}
</style>