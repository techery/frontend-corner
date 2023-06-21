<script lang="ts">
  import { onMount } from 'svelte';
  import Portal from 'svelte-portal/src/Portal.svelte';
  import Section from "$lib/section.svelte";
  import { HomePageSection } from "../types";

  let hypnofrogRef: HTMLElement;
  let notificationsRef: HTMLElement;

  let hypnofrogRect: DOMRectReadOnly | null;
  let isHypnofrogGifVisible = false;

  let notificationText = '';
  const MAX_NOTIFICATIONS = 5;

  const onNotificationChange = (event: Event) => {
    const target = event?.target;

    if (target instanceof HTMLTextAreaElement) {
      notificationText = target.value;
    }
  }

  const onNotificationSend = (text: string) => () => {
    const container = document.getElementById('notifications');

    if (container) {
      const notification = document.createElement('div');

      notification.className = 'notification';
      notification.innerHTML = `
        <b><i>${new Date().toLocaleTimeString('en-us', { weekday: "narrow", year: "2-digit", month: "narrow", day: "2-digit"})}</i></b> 
        <span>${text || 'No message'}</span>
      `;

      container.appendChild(notification);

      setTimeout(() => {
        container.removeChild(notification);
      }, 5000);
    }
  }
 
  onMount(() => {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        hypnofrogRect = entry.contentRect;
        document.documentElement.style.setProperty('--hypnofrog-angle', Math.floor(entry.contentRect.width / 360 * 100) + "deg");

        if (entry.contentRect.width === 400) {
          isHypnofrogGifVisible = true;
        } else {
          isHypnofrogGifVisible = false;
        }
      });
    });

    observer.observe(hypnofrogRef);

    return () => {
      observer.disconnect();
    }
  });

  onMount(() => {
    const observer = new MutationObserver(entries => {
      entries.forEach(({ target }) => {
        const childrensCount = target.childNodes.length;

        if (childrensCount > MAX_NOTIFICATIONS)  {
          target.removeChild(target.childNodes[0]);
        }
      });
    });

    observer.observe(notificationsRef, {
      childList: true,
    });

    return () => {
      observer.disconnect();
    }
  });
</script>

<Section title="Intersection Observer" anchor={HomePageSection.IntersectionObserver} imageSrc="/intersection-observer.png">
  <pre class="intersectionCallback">
    {`
      const callback = (entries, observer) => {
        entries.forEach(entry => {
            entry.time;               // a DOMHightResTimeStamp indicating when the intersection occurred.
            entry.rootBounds;         // a DOMRectReadOnly for the intersection observer's root.
            entry.boundingClientRect; // a DOMRectReadOnly for the intersection observer's target.
            entry.intersectionRect;   // a DOMRectReadOnly for the visible portion of the intersection observer's target.
            entry.intersectionRatio;  // the number for the ratio of the intersectionRect to the boundingClientRect.
            entry.target;             // the Element whose intersection with the intersection root changed.
            entry.isIntersecting;     // intersecting: true or false
        });
      };
    `}
  </pre>
</Section>

<Section title="Mutation Observer" anchor={HomePageSection.MutationObserver} imageSrc="/mutation-observer.png">
  <div class="notificationControls">
    <textarea class="notificationInput" on:input={onNotificationChange} value={notificationText} placeholder="Write notification message" />

    <button class="notificationButton" on:click={onNotificationSend(notificationText)}>Send notification!</button>
  </div>

  <Portal target="body">
    <div class="notificationContainer" id="notifications" bind:this={notificationsRef} /> 
  </Portal>
</Section>

<Section title="Resize Observer" anchor={HomePageSection.ResizeObserver} imageSrc="/resize-observer.png">
  <div class="hypnofrogContainer">
    <textarea class="hypnofrogInput" />

    <div class="hypnofrog" bind:this={hypnofrogRef}>
      <span class="hypnofrogWidth">{hypnofrogRect?.width || 0}px</span>

      <b class="hypnofrogText"><i><span>hypnofrog</span></i></b>

      {#if isHypnofrogGifVisible}
        <img class="hypnofrogImage" src="/hypnofrog.gif" alt="">
      {/if}
    </div>
  </div>
</Section>

<style>
  :global(:root) {
    --hypnofrog-angle: 0deg;
  }

  .intersectionCallback {
    font-size: 18px;
  }

  .hypnofrogContainer {
    display: flex;
    width: 100%;
    min-width: 800px;
    gap: 24px;
  }

  .hypnofrogInput {
    min-width: calc(25% - 24px);
    max-width: calc(100% - 224px);
    height: 400px;
    padding: 8px;
    resize: horizontal;
  }

  .hypnofrog {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 400px;
    overflow: hidden;
    background-image: linear-gradient(var(--hypnofrog-angle), rgba(131,58,180,1) 0%, rgba(174,88,103,1) 13%, rgba(90,108,170,1) 22%, rgba(191,108,77,1) 34%, rgba(181,59,56,1) 41%, rgba(167,253,29,1) 50%, rgba(45,95,222,1) 70%, rgba(127,161,141,1) 82%, rgba(101,196,196,1) 92%, rgba(252,176,69,1) 100%);
  }

  .hypnofrogText {
    will-change: transform;
    transform: rotate(calc(var(--hypnofrog-angle) / -1.5));
  }

  .hypnofrogWidth {
    position: absolute;
    z-index: 1;
    top: 4px;
    left: 4px;
  }

  .hypnofrogImage {
    position: absolute;
    z-index: 2;
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  .notificationContainer {
    position: fixed;
    z-index: 7;
    left: 24px;
    bottom: 24px; 
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .notificationControls {
    display: flex;
    gap: 24px;
  }

  .notificationInput,
  .notificationButton {
    width: 400px;
    min-width: 400px;
    height: 400px;
  }

  .notificationInput {
    padding: 8px;
    resize: none;
  }

  .notificationButton {
    background-color: gainsboro;
    cursor: pointer;
    will-change: transform;

    &:active {
      transform: scale(0.99);
    }
  }

  :global(.notification) {
    width: 500px;
    background-color:darkslategray;
    padding: 16px;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>