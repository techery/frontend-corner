<script lang="ts">
	let cookies: string;
	let username: string;
	let emptyName = false;

	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}

	function setDataFromCookies() {
		cookies = document.cookie;
		username = getCookie('auth');
	}

	function sendPost(data) {
		return fetch('/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	}

	function onSubmit(e) {
		const action = e.submitter.id;
		const { username } = Object.fromEntries(new FormData(e.target));

		let needToSendQuery = false;

		switch (action) {
			case 'login':
				emptyName = !username;
				needToSendQuery = !emptyName;
				break;

			case 'logout':
				needToSendQuery = true;
				break;
		}

		if (needToSendQuery) {
			sendPost({ action, username })
				.then((response) => response.json())
				.then(({ message }) => {
					alert(message);
					setDataFromCookies();
				});
		}
	}

	setDataFromCookies();
</script>

<svelte:head>
	<title>Auth</title>
</svelte:head>

<div>
	<h1>Auth simulation</h1>

	<h3>Hello, {username ? username : 'Anonymous'}</h3>
	<div>
		<form on:submit|preventDefault={onSubmit}>
			{#if !username}
				<div>
					<label for="username">Username</label>
					<input id="username" name="username" type="text" />
					{#if emptyName}
						<p class="error-message">Username is required</p>
					{/if}
				</div>

				<div>
					<label for="password">Password</label>
					<input id="password" name="password" type="password" value="123" />
				</div>

				<button id="login" type="submit">Log In</button>
			{:else}
				<button id="logout" type="submit">Logout</button>
			{/if}
		</form>
	</div>

	<h3>All of your cookies that available in JS:</h3>
	<textarea>{cookies}</textarea>
</div>

<style>
	form {
		margin: 100px auto;
		display: flex;
		flex-direction: column;
		width: 300px;
	}

	form > div {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	form > div + * {
		margin-top: 10px;
	}

	.error-message {
		color: tomato;
		flex: 0 0 100%;
		margin: 0 2px;
		font-size: 0.8em;
	}

	textarea {
		width: 350px;
		height: 60px;
	}
</style>
