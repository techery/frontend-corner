<script lang="ts">
  import { onMount } from 'svelte';
  import { active } from '../stores/nav';
  import { Loading, type HomePageSection } from '../types';

	export let anchor: HomePageSection | null = null;
	export let title = '';
	export let imageSrc: string | null = null;

  let rootRef: HTMLElement;
  let imageRef: HTMLElement;

  let isAnimating = false;
  let imageLoading = Loading.Idle;

  const onImageLoad = () => {
    imageLoading = Loading.Finished;
  }

  const onImageError = () => {
    imageLoading = Loading.Failed;
  }

  onMount(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        switch(entry.target.getAttribute('data-observe')) {
          case 'image':
            // NOTE: Load image
            if (entry.isIntersecting && entry.intersectionRatio >= 0.51 && imageLoading === Loading.Idle) {
              imageLoading = Loading.Started;
              observer.unobserve(imageRef);
            }

            break;
          default:
            // NOTE: Set active section
            if (entry.isIntersecting && entry.intersectionRatio >= 0.51) {
              active.set(entry.target.id);
            }

            // NOTE: Run animation
            if (entry.isIntersecting && entry.intersectionRatio >= 0.01 && !isAnimating) {
              isAnimating = true;
            }
        }
      });
    }, {
      rootMargin: '0px',
      threshold: [0.01, 0.51]
    });

    observer.observe(rootRef);
    observer.observe(imageRef);

    return () => {
      observer.disconnect();
    }
  });
</script>

<section class="root" id={anchor} bind:this={rootRef}>
  <div class="container">
    <h2 class="title isAnimated" class:runAnimation={isAnimating}>{title}</h2>

    <div class="imageContainer isAnimated" class:runAnimation={isAnimating}>
      <img
        bind:this={imageRef}
        class="image"
        class:isVisible={imageLoading === Loading.Finished}
        src="{imageLoading !== Loading.Idle ? imageSrc : undefined}"
        alt=""
        on:load={onImageLoad}
        on:error={onImageError}
        data-observe="image"
      >

      {#if imageLoading === Loading.Idle || imageLoading === Loading.Started}
        <div class="imageLoader" />
      {/if}

      {#if imageLoading === Loading.Failed}
        <div class="imageError">
          <span class="imageErrorText">Failed to load</span>
        </div>
      {/if}
    </div>

    <div class="content isAnimated" class:runAnimation={isAnimating}>
      <slot></slot>
    </div>

  </div>
</section>

<style>
  @keyframes appear {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .root {
    height: 100vh;
    background-color: bisque;
  }

  .container {
    padding: 74px 24px 24px;
    height: 100%;
    overflow: auto;
  }

  /* NOTE: Element for debugging */
  .root::after {
    display: none;
    content: '';
    position: absolute;
    z-index: 10;
    top: 49%;
    left: 0;
    width: 100%;
    height: 2%;
    background-color: red;
    opacity: 0.25;
  }

  .title {
    margin: 0 0 24px;
    animation-delay: 0.25s;
  }

  .content {
    animation-delay: 0.5s;
  }

  .imageContainer {
    position: relative;
    z-index: 1;
    display: flex;
    width: 200px;
    height: 200px;
    margin-bottom: 24px;
    animation-delay: 0.375s;
  }

  .imageLoader,
  .imageError {
    position: absolute;
    z-index: 2;
    display: flex;
    inset: 0;
    width: inherit;
    height: inherit;
    background-color: beige;
  }

  .imageLoader::after {
    content: '';
    width: 24px;
    height: 24px;
    margin: auto;
    border: 4px solid gray;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s ease-in-out infinite;
  }

  .imageErrorText {
    margin: auto;
    text-align: center;
  }

  .image {
    position: relative;
    z-index: 1;
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    visibility: hidden;
  }

  .runAnimation {
    animation-name: appear;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
    animation-duration: 0.75s;
  }

  .isAnimated {
    transform: translateY(50px);
    opacity: 0;
    will-change: transform, opacity;
  }
 
  .isVisible {
    visibility: visible;
  }
</style>