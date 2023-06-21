<script lang="ts">
  import { active } from '../stores/nav';
  import { HomePageSection } from '../types';

  let activeSection: HomePageSection | null = null;

  active.subscribe((section: HomePageSection) => {
    activeSection = section;
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
</svelte:head>

<header class="header">
  <nav class="nav">
    <a class="link" class:active={activeSection === HomePageSection.IntersectionObserver} href="/#{HomePageSection.IntersectionObserver}">Intersection Observer</a>
    <a class="link" class:active={activeSection === HomePageSection.MutationObserver} href="/#{HomePageSection.MutationObserver}">Mutation Observer</a>
    <a class="link" class:active={activeSection === HomePageSection.ResizeObserver} href="/#{HomePageSection.ResizeObserver}">Resize Observer</a>
  </nav>
</header>

<slot></slot>

<style>
  :global(*) {
		box-sizing: border-box;
	}

  :global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
    padding: 0;
    font-family: 'Kanit', sans-serif;
	}

  :global(button, input, textarea) {
    font-family: 'Kanit', sans-serif;
	}

  .header {
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    padding: 0 16px;
    background-color: burlywood;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .nav {
    display: flex;
    gap: 8px;
    height: 100%;
  }

  .link {
    display: flex;
    align-items: center;
    padding: 0 8px;
    text-decoration: none;
    color: black;
  }

  .link:active,
  .link.active {
    background-color: dimgray;
    color: bisque;
  }

  .link:hover {
    background-color: black;
    color: bisque;
  }
</style>